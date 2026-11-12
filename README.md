# Best AI Design Workflow

Una herramienta viva sobre el workflow de diseño con IA: cinco fases del proceso, con las prácticas que están funcionando en Notion, Stripe, Uber, Airbnb, Anthropic y más.

Un agente curador rastrea fuentes primarias cuando Alex lo lanza desde la web y **propone** cambios. Nada se publica sin revisión humana.

## Cómo funciona

```
web/content.json   ← TODO el contenido (fases, prácticas, prompts, fuentes)
web/index.html     ← la plantilla: diseño + código que pinta content.json
```

Como en un design system: el contenido y el diseño están separados. El agente solo edita `content.json`; el diseño no se toca.

```
Botón de la web (con clave) → Cloudflare Worker
  → Agente curador (Claude Managed Agents) edita web/content.json en una rama curator/AAAA-MM-DD
  → GitHub Action abre un Pull Request
  → Alex revisa y pulsa Merge
  → GitHub Pages publica la web actualizada
```

## Estructura

```
web/
  index.html                  plantilla de la herramienta
  content.json                contenido
  logo.png
curator-worker/
  index.js                    Worker: lanza el curador desde el botón (protegido con clave)
  wrangler.toml               configuración del Worker
  agent-system-prompt.md      instrucciones del agente (copiadas en la Console de Claude)
.github/workflows/
  curator-pr.yml              abre el PR cuando el agente sube su rama
index.html                    redirige a web/ (para GitHub Pages)
*.md (raíz)                   material de investigación original
```

## Ver en local

`content.json` no se puede leer abriendo el HTML con doble clic. Usa la URL de GitHub Pages o, en local:

```
npx serve web
```

## Las cinco fases

1. **Discovery** — de señal a insight con cita
2. **Ideation** — veinte variantes de layout en una tarde
3. **Prototyping** — de Figma a código en minutos
4. **Handoff** — la spec se genera sola
5. **Validation** — fricciones antes de usuarios reales

Más la **capa de fundación**: cinco patrones de infraestructura que las grandes empresas aplican por debajo del proceso.

## Estado

`v0.4 · 11 nov 2026` · contenido separado del diseño, subpáginas integradas en una sola página, curador que propone cambios por Pull Request.

---

Hecho por [@alejandrozh](https://github.com/alejandrozh) con la ayuda de Claude.
