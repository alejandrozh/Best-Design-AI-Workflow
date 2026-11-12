/**
 * Curator Worker — Cloudflare Worker
 *
 * Lanza el agente curador (Claude Managed Agents) de dos formas:
 *   1. Solo, el 1 y el 15 de cada mes (cron en wrangler.toml).
 *   2. A mano, desde el botón de la web, SOLO si se envía la clave correcta.
 *
 * El agente recibe el repo de GitHub montado, edita web/content.json en una rama
 * nueva (curator/AAAA-MM-DD) y la sube. Una GitHub Action abre el Pull Request
 * para que Alex lo revise y lo apruebe. Nada se publica sin esa aprobación.
 *
 * Secretos (wrangler secret put …):
 *   ANTHROPIC_API_KEY  → API key de Anthropic
 *   GITHUB_TOKEN       → token fine-grained con permiso de escritura SOLO en este repo
 *   CURATOR_KEY        → la clave que escribes en el botón de la web
 * Variables (wrangler.toml): AGENT_ID, ENVIRONMENT_ID, ALLOWED_ORIGIN, REPO_URL
 */

const API = 'https://api.anthropic.com';
const HEADERS = env => ({
  'Content-Type': 'application/json',
  'x-api-key': env.ANTHROPIC_API_KEY,
  'anthropic-version': '2023-06-01',
  'anthropic-beta': 'managed-agents-2026-04-01',
});

async function launchCurator(env, trigger) {
  const today = new Date().toISOString().slice(0, 10);

  const sessionRes = await fetch(`${API}/v1/sessions`, {
    method: 'POST',
    headers: HEADERS(env),
    body: JSON.stringify({
      agent: env.AGENT_ID,
      environment_id: env.ENVIRONMENT_ID,
      title: `Curación ${today} (${trigger})`,
      resources: [{
        type: 'github_repository',
        url: env.REPO_URL,
        mount_path: '/workspace/repo',
        authorization_token: env.GITHUB_TOKEN,
      }],
    }),
  });
  if (!sessionRes.ok) throw new Error(`No se pudo crear la sesión: ${await sessionRes.text()}`);
  const session = await sessionRes.json();

  const eventRes = await fetch(`${API}/v1/sessions/${session.id}/events`, {
    method: 'POST',
    headers: HEADERS(env),
    body: JSON.stringify({
      events: [{
        type: 'user.message',
        content: [{ type: 'text', text: `Hoy es ${today}. Haz la ronda de curación sobre /workspace/repo siguiendo tus instrucciones. Rama: curator/${today}.` }],
      }],
    }),
  });
  if (!eventRes.ok) throw new Error(`Sesión ${session.id} creada pero no arrancó: ${await eventRes.text()}`);
  return session.id;
}

function safeEqual(a, b) {
  if (!a || !b || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export default {
  // 1. Ejecución programada (cron)
  async scheduled(event, env, ctx) {
    ctx.waitUntil(launchCurator(env, 'programada').catch(err => console.error(err.message)));
  },

  // 2. Botón de la web
  async fetch(request, env) {
    const cors = {
      'Access-Control-Allow-Origin': env.ALLOWED_ORIGIN,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Curator-Key',
    };
    const json = (body, status = 200) => Response.json(body, { status, headers: cors });

    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    if (request.method !== 'POST') return json({ error: 'Método no permitido' }, 405);
    if (!safeEqual(request.headers.get('X-Curator-Key'), env.CURATOR_KEY)) {
      return json({ error: 'Clave incorrecta' }, 401);
    }

    try {
      const sessionId = await launchCurator(env, 'manual');
      return json({ success: true, session_id: sessionId });
    } catch (err) {
      console.error(err.message);
      return json({ error: err.message }, 502);
    }
  },
};
