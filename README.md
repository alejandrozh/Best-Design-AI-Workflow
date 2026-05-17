# Best AI Design Workflow

Una herramienta viva sobre el workflow de diseño con IA. Cinco fases del proceso, con las prácticas que están funcionando en Notion, Stripe, Uber, Airbnb, Anthropic y más.

Editorial humano sobre material recogido por un agente curador que rastrea fuentes primarias (engineering blogs, podcasts, charlas, repos abiertos). Lo que no funciona, no entra.

## Cómo verla

Abre [`web/index.html`](web/index.html) en el navegador.

Si tienes GitHub Pages activado en este repo apuntando a `/web`, también funciona como sitio público.

## Estructura

```
web/
  index.html        # La herramienta — workflow con 5 fases en acordeón
  styles.css        # Estilos compartidos de las páginas largas
  discovery.html    # Lectura larga de Fase 01
  prototyping.html  # Lectura larga de Fase 03
```

Material de investigación (markdown, fuente del contenido):

```
01_master_workflow.md
02_case_study_notion.md
informe_flujos_ia_diseno_2026.md
```

## Las cinco fases

1. **Discovery** — de señal a insight con cita
2. **Ideation** — veinte variantes de layout en una tarde
3. **Prototyping** — de Figma a código en minutos
4. **Handoff** — la spec se genera sola
5. **Validation** — fricciones antes de usuarios reales

Cada fase incluye prácticas reales con fuente nombrada, stack mínimo, checklist previa, prompt o comando copiable, y métricas de setup vs. runtime.

## Curaduría

Un agente curador con persona de senior product designer rastrea fuentes cada 1 y 15 del mes. Los hallazgos se publican como borrador para revisión humana antes de incorporarse a la herramienta. La barra de entrada: proceso documentado en formato primario, reutilizable, mapeable a una fase concreta. Sin marketing, sin especulación.

## Estado

`v0.3 · 16 may 2026` · Discovery y Prototyping con contenido completo. Ideation, Handoff y Validation con contenido condensado, esperando la próxima ronda de curación.

---

Hecho por [@alejandrozh](https://github.com/alejandrozh) con la ayuda de Claude.
