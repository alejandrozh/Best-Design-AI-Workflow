# Best AI Design Workflow

Una herramienta viva sobre el workflow de diseño con IA: cinco fases del proceso, con las prácticas que están funcionando en Notion, Stripe, Uber, Airbnb, Anthropic y más.

Un agente curador (una tarea de Claude que Alex lanza a mano) rastrea fuentes primarias y **propone** cambios. Nada se publica sin revisión humana.

## Cómo funciona

```
web/content.json   ← TODO el contenido (fases, prácticas, prompts, fuentes)
web/index.html     ← la plantilla: diseño + código que pinta content.json
```

Como en un design system: el contenido y el diseño están separados. El agente solo edita `content.json`; el diseño no se toca.

```
Alex lanza la tarea "Curador · Best AI Design Workflow" en Claude
  → el agente edita web/content.json en una rama curator/AAAA-MM-DD y la sube
  → GitHub Action abre un Pull Request
  → Alex revisa y pulsa Merge
  → GitHub Pages publica la web actualizada
```

Sin API ni servidores propios: el curador corre dentro de la suscripción de Claude.

## Estructura

```
web/
  index.html                  plantilla de la herramienta
  content.json                contenido
  logo.png
curator/
  prompt.md                   instrucciones del curador (copia de la tarea de Claude)
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

`v0.4 · 12 nov 2026` · contenido separado del diseño, una sola página, curador como tarea de Claude que propone cambios por Pull Request.

---

Hecho por [@alejandrozh](https://github.com/alejandrozh) con la ayuda de Claude.
