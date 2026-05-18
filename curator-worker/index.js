/**
 * Curator Worker — Cloudflare Worker
 *
 * Proxy seguro entre la webapp (GitHub Pages) y la API de Managed Agents de Anthropic.
 * La API key NUNCA sale del worker; el navegador solo ve la URL pública del worker.
 *
 * Variables de entorno necesarias (configurar en Cloudflare Dashboard → Workers → Settings → Variables):
 *   ANTHROPIC_API_KEY  → secret  (tu API key de Anthropic)
 *   AGENT_ID           → text    (agent_018WY2x8bsCxN5HVgLtCiSqA)
 *   ENVIRONMENT_ID     → text    (tu environment ID, empieza por env_)
 *   ALLOWED_ORIGIN     → text    (p.ej. https://alejandrozh.github.io — o * para cualquier origen)
 */

const ANTHROPIC_API   = 'https://api.anthropic.com';
const ANTHROPIC_VER   = '2023-06-01';
const MANAGED_BETA    = 'managed-agents-2026-04-01';

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '*';
    const allowedOrigin = env.ALLOWED_ORIGIN || '*';

    const corsHeaders = {
      'Access-Control-Allow-Origin': allowedOrigin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (request.method !== 'POST') {
      return json({ error: 'Method not allowed' }, 405, corsHeaders);
    }

    try {
      // ── 1. Crear la sesión ──────────────────────────────────────────────
      const sessionRes = await fetch(`${ANTHROPIC_API}/v1/sessions`, {
        method: 'POST',
        headers: anthropicHeaders(env),
        body: JSON.stringify({
          agent: env.AGENT_ID,
          environment_id: env.ENVIRONMENT_ID,
          title: `Barrido manual — ${new Date().toISOString().slice(0, 10)}`,
        }),
      });

      if (!sessionRes.ok) {
        const err = await sessionRes.text();
        console.error('Error al crear sesión:', err);
        return json({ error: 'No se pudo crear la sesión', detail: err }, sessionRes.status, corsHeaders);
      }

      const session = await sessionRes.json();

      // ── 2. Disparar el evento de inicio ────────────────────────────────
      const eventRes = await fetch(`${ANTHROPIC_API}/v1/sessions/${session.id}/events`, {
        method: 'POST',
        headers: anthropicHeaders(env),
        body: JSON.stringify({
          events: [{
            type: 'user.message',
            content: [{
              type: 'text',
              text: 'Inicia el barrido de curación ahora. Rastrea las fuentes habituales y devuelve los hallazgos como borrador para revisión humana.',
            }],
          }],
        }),
      });

      if (!eventRes.ok) {
        const err = await eventRes.text();
        console.error('Error al enviar evento:', err);
        return json({ error: 'Sesión creada pero no se pudo iniciar', session_id: session.id, detail: err }, eventRes.status, corsHeaders);
      }

      // ── 3. OK ──────────────────────────────────────────────────────────
      return json({
        success: true,
        session_id: session.id,
        status: session.status,
        started_at: new Date().toISOString(),
      }, 200, corsHeaders);

    } catch (err) {
      console.error('Error inesperado:', err);
      return json({ error: err.message }, 500, corsHeaders);
    }
  },
};

// ── Helpers ────────────────────────────────────────────────────────────────

function anthropicHeaders(env) {
  return {
    'Content-Type': 'application/json',
    'x-api-key': env.ANTHROPIC_API_KEY,
    'anthropic-version': ANTHROPIC_VER,
    'anthropic-beta': MANAGED_BETA,
  };
}

function json(body, status = 200, extra = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...extra },
  });
}
