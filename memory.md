## Memoria del proyecto · Best Design AI Workflow

Aquí almaceno decisiones, contexto y aprendizajes para que las próximas sesiones no empiecen de cero.

---

### Repositorio
- **GitHub:** https://github.com/alejandrozh/Best-Design-AI-Workflow.git
- Registrado el 16 may 2026 por Alex.

### Naturaleza del producto
- No es una landing. Es **una herramienta interna del equipo de diseño**: workflow vivo con las prácticas más óptimas de trabajo con IA en cada fase del proceso.
- Curación quincenal por un agente con persona de senior product designer; revisión humana antes de publicar.
- La barra de entrada: proceso documentado en formato primario, reutilizable (un comando, un prompt, un stack, una métrica), mapeable a una fase concreta. Sin marketing, sin especulación.

### Estructura
- **5 fases** (no 4, aunque inicialmente Alex pidió 4 — al confirmar prefirió mantener las 5 que ya estaban escritas):
  1. Discovery — de señal a insight con cita
  2. Ideation — veinte variantes de layout en una tarde
  3. Prototyping — de Figma a código en minutos
  4. Handoff — la spec se genera sola
  5. Validation — fricciones antes de usuarios reales
- **Contenido profundo publicado:** Discovery y Prototyping (con caso Notion / Brian Lovin y Stripe / Owen Williams).
- **Contenido condensado:** Ideation, Handoff, Validation (esperan próxima ronda de curación, prevista 30 may 2026).

### Decisiones de diseño (sesión 16 may 2026)
- `web/index.html` reescrito como **herramienta single-page**, no landing. El workflow horizontal ocupa el centro de la pantalla.
- **Acordeón inline** para abrir cada fase (cierra el resto al abrir uno).
- **Tipografía:** Fraunces (serif elegante, opsz variable) para display y body editorial; Inter (sans) para UI labels, eyebrows y micro-tipografía; JetBrains Mono reservado para código.
- **Paleta limpia tipo Airbnb/Etsy:** fondo `#fafaf7` (cream casi blanco, no el beige denso anterior), surface blanco, acento brick `#b8492f`, verde pulse `#2d8659` para "Activo".
- **Estilos embebidos** en `index.html` para no romper las sub-páginas (`discovery.html`, `prototyping.html`) que siguen usando `styles.css` con la paleta cream original. Cuando rehagamos las sub-páginas, decidiremos si unificar.
- Deep-linking soportado: `#phase=prototyping` abre la fase correspondiente al cargar.

### Iteración 5 (16 may 2026 · misma sesión)
- **Nueva sección "La capa de fundación"** añadida entre el workflow y el curator. NO es una sexta fase, son 5 patrones transversales que las grandes (Google, Meta, Atlassian, Stripe a escala, Adobe, Microsoft, Spotify, Netflix...) practican como infraestructura por debajo del proceso de diseño. Decisión consensuada con Alex.
- Los 5 patrones: Knowledge graph del producto · DS como contrato · Agentes en lugar de comandos · Telemetría continua como research · Modelos internos. Mismo formato visual que los patrones de Ideación (card numerada, 3 filas: Por qué importa / Cómo lo aplican / Cómo replicarlo).
- Audiencia explícita: tech leads, design ops, principals — no diseñadores junior. Pensado como "saber que existe" para equipos &lt;20 personas, "implementarlo" para &gt;100.
- Visualmente diferenciada del workflow con una franja superior de gradiente (accent → pulse → ink) para indicar que es otra capa de información.
- Reorganizado también el panel de **Ideación** previamente (iteración entre #5 e ésta): contexto cross-company + 4 patrones compartidos + playbook de 2 días. Se reemplazaron las dos practice cards empresa-por-empresa.

### Regla operativa (16 may 2026)
**No hacer git push automáticamente.** Alex prefiere controlar cuándo se actualiza GitHub para minimizar el consumo de tokens y revisar los cambios antes de que sean públicos. Solo lanzar git add/commit/push cuando Alex lo pida explícitamente ("sube esto", "actualízalo en git", etc.). Trabajar siempre en local; el push es manual y a su ritmo.

### Iteración 4 (16 may 2026 · misma sesión)
- **`styles.css` reescrito** desde cero con los mismos design tokens del `index.html` (Fraunces serif, paleta `#fafaf7` / `#b8492f`, mismos radios y sombras). Las sub-páginas (`discovery.html`, `prototyping.html`) ahora son visualmente idénticas al tool. Clases legacy mantenidas (no toqué el HTML de las sub-páginas más de lo necesario): `.phase-hero`, `.before-after`, `.company`, `.stack-grid`, `.tutorial`, `.callout-warning`, `.callout-danger`, `.aside`, etc. — todas restiladas a la nueva estética.
- **Topbar de sub-páginas actualizado:** quitada la nav rota (`#fases`, `#vivo`, `#metodo` ya no existen en el nuevo `index.html`), reemplazada por un único link "← Volver al workflow". `.brand-dot` ahora se renderiza como `.brand-mark` (círculo negro con la "B" blanca) vía pseudo-elemento.
- **Footer de sub-páginas actualizado:** los enlaces a `Estado`, `Método editorial` apuntaban a anchors muertos. Reemplazada esa columna por una columna "Repo" con link a GitHub. La columna "Fases" ahora apunta a `index.html#phase={nombre}` (deep-linking que el tool soporta).
- **Breadcrumbs limpiados:** `Inicio / Fases / Discovery` → `Workflow / Discovery`.
- **`index.html` raíz convertido en redirect** a `web/index.html`. La versión dark-mode anterior se preserva en el historial git. Esto facilita que GitHub Pages (servido desde root) aterrice directamente en el tool nuevo.
- **`README.md` creado** con descripción, estructura, fases y estado. Pensado para que cuando alguien aterrice en el repo de GitHub entienda el proyecto en 30 segundos.
- **`.gitignore` añadido** (OS files, editor scratch). `memory.md` se mantiene en el repo como changelog.
- **GitHub push pendiente:** la VM de bash falla constantemente esta sesión ("Workspace unavailable. The isolated Linux environment failed to start"). Le paso a Alex los comandos exactos para que él los lance desde su terminal. Mientras la VM esté caída no puedo hacer git ni `gh` desde mi lado.

### Iteración 3 (16 may 2026 · misma sesión)
- **Tags renombrados** porque Alex no entendía qué era "Patrón":
  - `Caso` → `Caso real` (color brick, fondo `--accent-soft`)
  - `Patrón` → `Patrón común` (color tinta suave, fondo gris)
  - `DIY` → `Ruta DIY` (color verde pulse, fondo verde suave)
  - Leyenda discreta en el header del workflow con los 3 tags + descripción de cada uno.
- **Detalle replicable añadido a cada fase**. Estructura nueva del panel-body:
  - panel-head ahora incluye `phase-meta` strip con 3 píldoras (Setup · Por iteración · Métrica/ahorro).
  - Practices con cuerpo más concreto (regla del equipo, cifra mínima, comparativa entre opciones).
  - Nuevo bloque `Checklist antes de empezar` con 4 ítems (checkboxes visuales, no funcionales).
  - Nuevo bloque `Prompt clave / Comando clave` a ancho completo, con fondo oscuro estilo terminal, monospace, botón Copiar con feedback verde.
- **Prompts reales escritos para las 5 fases:**
  - Discovery: prompt de síntesis con citas obligatorias (JSON output).
  - Ideation: prompt de generación de 20 variantes con restricciones de DS.
  - Prototyping: comando `/figma` simplificado en 6 pasos (Brian Lovin / Notion).
  - Handoff: prompt de diff diseño↔código (3 columnas markdown).
  - Validation: prompt de clustering por fricción + check contra hipótesis previas.
- Todos los prompts copiables al portapapeles con un botón en la esquina del card. Mismo patrón JS que el botón del Curador.

### Iteración 2 (16 may 2026 · misma sesión)
- **Logos de empresas** añadidos vía `simpleicons.org` CDN. En cada `practice-team` (Notion, Stripe, Dovetail, Figma, Anthropic, Vercel, Linear, Maze, UserTesting) y en la strip de "Rastreando". Stripe en su violeta `#635BFF`, Airbnb en su coral `#FF5A5F`, resto en tinta. Hover sube opacidad y devuelve color. Fallback con `onerror` por si el slug no existe en simpleicons (Dovetail/UserTesting podrían fallar).
- **Panel "Agente curador"** añadido entre el workflow y la strip de fuentes. Diseño con gradiente sutil hacia `--accent-soft`. Muestra estado del curador (activo, última ronda, próxima programada) + botón `Lanzar barrido ahora`.
- **Botón curador funcional con limitación honesta:** `index.html` es archivo local, no puede invocar el MCP de scheduled-tasks directamente. El botón copia al portapapeles una orden bien escrita ("Lanza ahora la tarea programada best-ai-design-curator…") para que Alex la pegue en chat. Feedback visual: el botón cambia a verde con "✓ Copiado al portapapeles" durante 4s.
- **Strip de fuentes reestructurada** en dos filas: empresas con logos arriba, voces individuales (Brian Lovin, Owen Williams, How I AI, Lenny's) como chips de texto debajo separadas por línea punteada.

### Tarea programada confirmada
- **taskId:** `best-ai-design-curator`
- **Schedule:** `0 9 1,15 * *` (1 y 15 de cada mes, 09:00)
- **Última ejecución:** 11 may 2026
- **Próxima:** 1 jun 2026
- **Status:** habilitada

### Lo que NO está hecho aún
- Sub-páginas para Ideation, Handoff, Validation (los enlaces en el index todavía dicen "lectura larga próximamente").
- Unificación visual entre `index.html` (nueva paleta clara) y `discovery.html` / `prototyping.html` (paleta cream original en `styles.css`).
- Hay un `index.html` en la raíz del proyecto en modo oscuro que parece ser una versión anterior — confirmar con Alex si se borra.
- Migrar la herramienta a un Cowork artifact (con `mcp__cowork__create_artifact`) si Alex quiere que el botón del curador llame al MCP directamente sin pasar por copy-paste. Decisión pendiente.

### Próximos pasos probables
- Refinar la herramienta tras el feedback de Alex ("luego vamos refinando").
- Rehacer las sub-páginas con la nueva estética, o decidir que la herramienta single-page es suficiente y deprecar las lecturas largas.
- Continuar con la curación quincenal del agente.
