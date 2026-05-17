# Flujos de trabajo con IA en diseño — Estado del arte 2026

> **Informe estratégico** para entender cómo las empresas más relevantes están integrando agentes de IA, MCPs y modelos generativos en sus procesos de diseño, UI, sistemas de diseño, investigación y diseño estratégico.
>
> *Fecha: mayo 2026 — Generado por revisión automatizada de noticias.*

---

## 0. TL;DR — Los 7 patrones que se repiten en todas las empresas

1. **El sistema de diseño deja de ser una guía y pasa a ser un *dataset* que entrena agentes.** Lo llaman *Active Governance*. Sin él, la IA produce inconsistencia a escala.
2. **El nuevo handoff no es Figma → Dev. Es Figma ↔ Código vía MCP.** Bidireccional, con tokens y componentes reales.
3. **Las empresas separan dos modos: *Chat* (pensar) y *Agent* (ejecutar).** Lovable lo formaliza, todas lo aplican implícitamente.
4. **El prompt ya no es el artefacto. El artefacto es la *skill* (Markdown) o la *spec* (estructurada).** Figma, Anthropic y Uber van por aquí.
5. **El diseñador se convierte en *director* de agentes**, no en operario de píxeles. Su valor sube en *taste*, criterio y validación.
6. **La adopción funciona por contagio, no por mandato** (caso Uber): compartir wins de pares supera a cualquier rollout top-down.
7. **El cuello de botella se desplaza de la producción al *governance*** (tokens, permisos, brand safety, validación humana en decisiones de alto impacto).

---

## 1. Casos por empresa

### 1.1 Anthropic — *Claude Design*

**Lanzamiento:** abril 2026. **Filosofía:** *"el diseño empaquetado para Claude Code"*.

- **Onboarding crítico:** un diseñador senior configura el sistema de diseño *antes* de abrir el grifo. Claude lee codebase + Figma y absorbe colores, tipografías y componentes.
- **Flujo tipo** que recomienda Anthropic para producto:
  1. PM escribe un prompt describiendo la feature.
  2. Claude genera prototipo inicial usando *design system + Code Connect*.
  3. Diseñador itera con *inline comments* y chat.
  4. PM comparte link para revisión asíncrona.
  5. Diseño valida componentes antes del handoff.
  6. Claude Code implementa.
- **Modos de edición:** chat (dirección amplia), comentarios inline (cambio puntual), edición directa en canvas, controles finos (spacing, color, layout).
- **Insight estratégico:** Anthropic está atacando el *ciclo completo* (prototipo → validación → código), no solo el prototipado.

---

### 1.2 Airbnb — *AI bajo supervisión humana*

**Postura:** **escéptica pero ejecutora.** Chesky dice abiertamente *"nadie ha resuelto AI para travel o e-commerce"*, pero el 60% del código nuevo lo escribe IA y el 80% de los ingenieros la usan.

- **Donde ganan:** workflows acotados y de partners (gestores de propiedades con software externo). Tareas que requerían equipos grandes, ahora las hace un grupo pequeño con agentes.
- **Sistema de diseño:** lo están reposicionando como *dataset entrenable*. Linting en tiempo real contra tokens.
- **Soporte autónomo:** el bot resuelve 40% sin escalar (subió del 33% en Q1).
- **Lección:** Airbnb no se traga el hype. Identifica *fit* y solo despliega donde el output es predecible.

---

### 1.3 Uber — *Documentación generada por agentes*

**Plataforma propia:** **uSpec + Agent Studio + Minion.**

- **uSpec:** agente conectado al **Figma Console MCP**. Extrae componentes, tokens, variables, mapea relaciones padre-hijo y **genera la spec page directamente en el Figma file**. Tiempo: de semanas a minutos.
- **Agent Studio:** orquestador donde *visualizan, depuran, trazan, versionan y evalúan* workflows multi-agente.
- **Minion:** agente de fondo con acceso a monorepo. Escribe **1.800 PRs/semana autónomamente.**
- **Adopción:** 84% de devs son usuarios agénticos; 65-72% del código se genera vía IDE.
- **Cómo lo expandieron:** **adopción por pares, no por mandato.** Compartir wins de compañeros supera cualquier directiva.

> *Aprendizaje aplicable a diseño:* la documentación de componentes y specs es la primera capa donde un agente devuelve valor inmediato.

---

### 1.4 Figma — *Abrir el canvas a los agentes*

**Apuesta central 2026:** el canvas ya no es solo para humanos.

- **Figma Make:** builder de flujos agénticos para PMs. Prompt → flujo interactivo en minutos.
- **Figma MCP Server:** convierte la API REST en *contexto eficiente para LLM*. Posiciones de píxeles → relaciones de layout. Hex → referencias a tokens. Capas anidadas → estructura aplanable.
- **Agents on canvas:** los agentes **no solo leen Figma, escriben en él**. Crean componentes, aplican variables, construyen usando el sistema de diseño existente.
- **Skills:** instrucciones en Markdown que definen cómo se comporta un agente dentro de Figma. *Sin plugin, sin código — solo un .md.*
- **Flujo bidireccional:** código → canvas → refinar tokens → push de vuelta al código.

> *La pieza más importante para tu agente:* Figma ha estandarizado las *skills* como archivos `.md` — exactamente el formato que estás usando aquí.

---

### 1.5 Google — *Stitch + Gemini Enterprise + Workspace Studio*

**Stitch (Google Labs):**
- Prompt o wireframe → **mockups multi-pantalla** con design tokens consistentes.
- **AI-native infinite canvas:** assets visuales + snippets de código + lógica de diseño conviven.
- **Design agent con voz:** crítica en tiempo real, "muéstrame esta pantalla en 3 paletas", entrevista al usuario para diseñar la landing.
- **Export:** AI Studio, Antigravity, Figma, HTML/CSS.

**Gemini Enterprise — Agent Designer:**
- Plataforma low-code/no-code para crear agentes single o multi-step.
- **Flow tab:** representación visual del workflow de un agente y sus subagentes.

**Workspace Studio:** agentes que automatizan tareas dentro de Google Workspace. Apunta a oficina, no a diseño puro.

---

### 1.6 Apple — *Liquid Glass + Foundation Model on-device*

- **Liquid Glass:** material dinámico (translucencia, refracción, profundidad, motion response) **unificado en iOS/iPadOS/macOS/watchOS/tvOS/visionOS 26**. Heredado del trabajo en visionOS.
- **Icon Composer:** workflow nuevo — capas vectoriales, blur, translucidez, specular highlights en tiempo real.
- **Foundation Model on-device:** developers pueden invocar el modelo desde scripts y plugins **sin enviar datos a terceros**. Privacidad como ventaja competitiva.
- **Postura:** Apple no compite en *prompt-to-UI*. Compite en *material design* + *AI privada*.

---

### 1.7 Lovable — *Chat / Agent / Visual Edits*

**Modelo mental más limpio del mercado:**

1. **Chat Mode** — *piensa.* Multi-step reasoning. No consume créditos. Para modelar datos, flujos y planear features.
2. **Agent Mode** — *construye.* Toma el control para implementar lo planeado.
3. **Visual Edits** — *refina.* Edición visual sobre la preview.

- **Full-stack:** frontend + backend + DB + deploy desde un prompt.
- **Lovable Cloud:** infra integrada (funciones, hosting, env vars).
- **Voice Mode:** describe cambios hablando.
- **Marzo 2026:** se expande más allá de apps (data analysis, BI, decks, marketing).

> *Patrón mental que puedes adoptar:* separar **pensar** de **ejecutar** evita iteraciones caras.

---

### 1.8 Vercel v0 — *Agentic UI generation*

- Prompt → React + shadcn/ui + Tailwind, en stream.
- **Modo agéntico:** busca referencias en la web, inspecciona sitios para patrones, debuggea autónomamente, integra herramientas externas.
- **Recuerda contexto entre iteraciones.**
- *Limitación señalada por la prensa:* sin memoria persistente de design system → repite decisiones inconsistentes.

---

### 1.9 Pencil (Brandtech Group) — *Brand-safe creative at scale*

- **Workflow:** concepto → generación → predicción de performance.
- **Brand governance:** sube assets una vez (logos, colores, fonts, claims y tono). La IA solo produce dentro del *brand box*.
- **Performance prediction:** scoring de variantes basado en $1B+ de gasto publicitario histórico.
- **Aplicable a diseño:** la lógica de "asset → brand box → generación masiva validada" es trasladable a sistemas de diseño UI.

---

### 1.10 Spotify — *Honk + Code Workflow Agent*

- **Honk** (powered by Claude Code): algunos top engineers no escriben código desde diciembre y han enviado 50+ features.
- **Code Workflow Agent:** PMs y no-engineers describen lo que quieren *vía Slack*. El agente lo construye.
- Tres agentes: Workflow + Background Coding + PR Review.

> *Para diseño:* el patrón de **"describir desde Slack"** es exportable a operaciones de diseño (variantes de componente, exportar specs, generar handoff docs).

---

### 1.11 Shopify — *Agentic Storefronts*

- **Marzo 2026:** los clientes compran productos *dentro de conversaciones con IA* (ChatGPT, Copilot, Google AI Mode, Gemini).
- **Implicación para diseño:** las interfaces de compra se desplazan del navegador al *chat*. Diseñar para agentes consumidores es una nueva disciplina.

---

## 2. La pila técnica: MCPs como nuevo *handoff*

### 2.1 ¿Qué es y por qué importa?

**Model Context Protocol (MCP)** es el estándar que permite a un agente leer/escribir en una herramienta (Figma, Notion, GitHub, Slack...) **con descripciones de tools optimizadas para LLM**, no APIs REST rígidas.

### 2.2 Figma MCP — *el más maduro para diseño*

- Setup vía **plugin de Figma + cliente compatible** (Claude Code, Cursor, VS Code, Codex, Windsurf).
- **Lo que devuelve al agente:**
  - Layout en lenguaje semántico ("centered inside parent") en vez de coordenadas.
  - Hex → referencias a tokens del sistema.
  - Capas aplanadas a estructura *implementable*.
  - Variables + componentes + Code Connect.
- **Bidireccional:** "selecciono un frame, copio la URL, pego en Claude Code con *implement this design*" → output: código que respeta tu DS.

### 2.3 Notion MCP — *el cerebro documental del equipo*

- **Casos de uso para diseño:**
  - Generar PRDs, especificaciones técnicas, *design briefs* a partir de research disperso.
  - Indexar y buscar a través de todo el workspace.
  - Convertir notas de research en bases de datos estructuradas.
- **Diseñado para agentes**, no para devs: tools con descripciones en lenguaje natural, contenido en Notion-flavored Markdown.

### 2.4 Otros relevantes

- **GitHub MCP:** lectura/escritura de issues, PRs y código.
- **Slack MCP:** contexto conversacional para agentes (lo usa Spotify).
- **Linear / Jira MCP:** estados de proyecto y backlog.

---

## 3. Sistemas de diseño en la era agéntica

### 3.1 De *guía estática* a *Active Governance*

| Antes (2023) | Ahora (2026) |
|---|---|
| Documentación en Notion/Storybook | Dataset que entrena agentes |
| Linting manual en PR | Linting en tiempo real en canvas |
| Tokens como referencia | Tokens como *contrato* para el LLM |
| Componentes que se *copian* | Componentes que se *consumen vía MCP* |

### 3.2 Arquitectura de tokens estándar 2026

**Patrón:** `{category}-{role}-{variant}-{state}`

Ejemplo: `color-surface-danger-hover`

→ Permite al agente entender que el valor aplica **exclusivamente a elementos destructivos interactivos en hover**.

### 3.3 Realidad incómoda

- Solo **8% de los equipos enterprise** consideran su DS "muy estable".
- La adopción de IA introduce un *Token Tax*: pasa de pagar asientos a **pagar asientos + compute**.
- *Los sistemas de diseño se siguen tratando como proyecto con fecha de lanzamiento, no como producto con dueño permanente.* Ese es el error de fondo.

---

## 4. Investigación con IA

### 4.1 Dovetail como hub de síntesis

- **Repositorio + análisis:** transcripción, tagging automático, detección de patrones en archivos históricos.
- **Limitación:** trae transcripciones de fuera. No reemplaza la entrevista, organiza el output.

### 4.2 Pipeline emergente de research con IA

1. **Recolección** — herramienta de entrevistas con IA (Conveo, Koji, Perspective).
2. **Transcripción** — automática, multi-idioma.
3. **Tagging temático** — el agente extrae temas, no solo keywords.
4. **Síntesis cruzada** — patrones entre estudios distintos.
5. **Generación de insights estructurados** — pegan a tu sistema (Notion, Figma).
6. **Recall en tiempo real** — research disponible para agentes de diseño vía MCP.

### 4.3 Punto crítico

La IA acelera la síntesis, pero **el *framing* de las preguntas sigue siendo trabajo humano de alto valor.** El research mediocre amplificado es research mediocre más rápido.

---

## 5. Diseño estratégico y product ops

### 5.1 Distinción operativa clave

- **Workflow** = secuencia fija, automatizada, predecible.
- **Agente** = autonomía, razonamiento, adaptación al contexto.

Las empresas serias **combinan ambos**: agentes para decisiones, workflows para ejecución repetible.

### 5.2 Principios que están funcionando

- **Empieza por un cuello de botella, no por una visión.** "Implementa todos los agentes" fracasa; "ataca el peor bottleneck" funciona (validado en Uber, Spotify).
- **Dale al agente acceso a contexto de negocio**: product strategy, personas, restricciones técnicas, goals. Sin eso, alucina.
- **Diseño debe pensar en agentes como *usuarios*** que interactúan con tus sistemas a nombre de personas (esta es la frontera).

### 5.3 La pregunta estratégica que NN/g pone sobre la mesa

*¿Qué de lo que haces sigue siendo defendible cuando un agente puede prototipar en 30 segundos?* Respuesta corta: **criterio, gusto, framing de problema y validación con realidad.** Todo lo demás se automatiza.

---

## 6. Diseño conversacional

### 6.1 El terreno se ha movido

- **Shopify Agentic Storefronts:** comercio dentro de la conversación.
- **Stitch voice agent:** crítica de diseño hablada.
- **Apple Foundation Model on-device:** conversación con privacidad.

### 6.2 Implicación práctica

Diseñar conversacionalmente ya no es *escribir copy de chatbot*. Es **diseñar el comportamiento de un agente** que actúa: qué pregunta, cuándo confirma, dónde escala a humano, cómo expone su incertidumbre.

---

## 7. Stack recomendado para un diseñador estratégico en 2026

Basado en lo que estas empresas están usando, una pila razonable y trasladable a tu día a día:

**Pensar y planear**
- **Claude** (con este agente) para sparring estratégico y framing.
- **Notion** + Notion MCP como cerebro documental.

**Prototipar**
- **Figma** + Figma MCP + Figma Make.
- **Claude Design** o **v0** para drafts rápidos.
- **Lovable** cuando necesitas full-stack funcional.

**Producir**
- **Claude Code** + Figma MCP para handoff bidireccional.
- **Code Connect** para mantener componentes alineados.

**Investigar**
- **Dovetail** como repositorio.
- Herramientas de entrevista con IA según necesidad.

**Generar assets**
- **Stitch** para multi-pantalla rápido.
- **Pencil** si entras en territorio publicitario/brand.

---

## 8. Recomendaciones para tu agente personal

Basado en todo lo anterior, tres movimientos concretos que tendrían más impacto que cualquier otro:

1. **Convierte tu sistema de diseño en un dataset entrenable.** Aunque sea pequeño: tokens con naming semántico, componentes con descripción en `.md`, decisiones documentadas. Ese es el activo que multiplicará todo lo demás.

2. **Adopta el modelo Chat / Agent / Visual de Lovable como disciplina personal.** Antes de pedirle a un agente que ejecute, *piensa con él en chat*. Reduce iteraciones caras y mejora outputs.

3. **Empieza a escribir tus propias *skills* en Markdown.** Figma y Anthropic ya han estandarizado este formato. Cada flujo recurrente que tengas (revisión de UI, auditoría de accesibilidad, generación de specs) puede ser una skill. Tu agente se vuelve más experto cada vez que escribes una.

---

## 9. Fuentes

### Anthropic / Claude Design
- [Introducing Claude Design by Anthropic Labs](https://www.anthropic.com/news/claude-design-anthropic-labs)
- [Using Claude Design for prototypes and UX](https://claude.com/resources/tutorials/using-claude-design-for-prototypes-and-ux)
- [Anthropic launches Claude Design — TechCrunch](https://techcrunch.com/2026/04/17/anthropic-launches-claude-design-a-new-product-for-creating-quick-visuals/)

### Airbnb
- [Airbnb's New Design Is Really a Bet on the AI Era — Skift](https://skift.com/2026/05/11/airbnbs-new-design-is-really-a-bet-on-the-ai-era/)
- [Airbnb says AI now writes 60% of its new code — TechCrunch](https://techcrunch.com/2026/05/08/airbnb-says-ai-now-writes-60-of-its-new-code/)
- [Intelligent Automation Platform at Airbnb](https://airbnb.tech/ai-ml/intelligent-automation-platform-empowering-conversational-ai-and-beyond-at-airbnb/)

### Uber
- [How Uber Built an Agentic System to Automate Design Specs](https://www.uber.com/us/en/blog/automate-design-specs/)
- [AI Prototyping Is Changing How We Build Products at Uber](https://www.uber.com/us/en/blog/ai-prototyping/)
- [Uber Automates Design Documentation with Agentic Systems — InfoQ](https://www.infoq.com/news/2026/03/uber-ai-design/)
- [How Uber uses AI for development — Pragmatic Engineer](https://newsletter.pragmaticengineer.com/p/how-uber-uses-ai-for-development)

### Figma
- [Agents, Meet the Figma Canvas](https://www.figma.com/blog/the-figma-canvas-is-now-open-to-agents/)
- [AI Agent Workflow Builder — Figma Make](https://www.figma.com/solutions/ai-agent-workflow-builder/)
- [Guide to the Figma MCP server](https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Figma-MCP-server)
- [From Claude Code to Figma](https://www.figma.com/blog/introducing-claude-code-to-figma/)

### Google
- [Design UI using AI with Stitch from Google Labs](https://blog.google/innovation-and-ai/models-and-research/google-labs/stitch-ai-ui-design/)
- [Stitch — Design with AI](https://stitch.withgoogle.com/)
- [Agent Designer overview — Gemini Enterprise](https://docs.cloud.google.com/gemini/enterprise/docs/agent-designer)
- [Workspace Studio](https://workspace.google.com/studio/)

### Apple
- [Apple unveils iOS 26 — Dezeen](https://www.dezeen.com/2025/06/10/apple-ios-26-software-update-liquid-glass/)
- [Liquid Glass UI 2026 — Medium / Expert App Devs](https://medium.com/@expertappdevs/liquid-glass-2026-apples-new-design-language-6a709e49ca8b)
- [Apple Developer — New design gallery 2026](https://developer.apple.com/design/new-design-gallery-2026/)

### Lovable
- [Lovable for Designers — Muzli](https://muz.li/blog/lovable-for-designers-the-complete-guide-to-building-apps-with-ai-2026/)
- [Lovable Review 2026 — AI Builder Club](https://www.aibuilderclub.com/blog/lovable-ai-review-2026)

### Vercel v0
- [v0 by Vercel](https://v0.app/)
- [How to prompt v0](https://vercel.com/blog/how-to-prompt-v0)

### Pencil
- [Pencil AI](https://trypencil.com/)
- [Pencil for Enterprise](https://trypencil.com/for-enterprise)

### Spotify / Shopify
- [How Spotify is using AI Agents — Department of Product](https://departmentofproduct.substack.com/p/deep-how-spotify-is-using-ai-agents)
- [Inside Shopify's AI-first engineering playbook — Bessemer](https://www.bvp.com/atlas/inside-shopifys-ai-first-engineering-playbook)

### MCPs y design ops
- [Notion MCP](https://developers.notion.com/docs/mcp)
- [Figma MCP + Claude Code — Build MVP Fast](https://www.buildmvpfast.com/blog/figma-claude-code-mcp-design-to-code-ai-2026)
- [Design Systems 2026 — Presta](https://wearepresta.com/design-systems-for-scale-2026/)

### Investigación y estrategia
- [25 AI Tools for UX Research — Dovetail](https://dovetail.com/ux/ai-tools-for-ux-research/)
- [AI Analysis & Synthesis for UX Research — Great Question](https://greatquestion.co/ux-research/ai-analysis-synthesis)
- [Redefine Your Design Skills to Prepare for AI — NN/G](https://www.nngroup.com/articles/prepare-for-ai/)
