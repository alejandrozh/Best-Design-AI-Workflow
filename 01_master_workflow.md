# Best AI Design Workflow — Master Workflow + Paso 1

**Versión:** 0.1 (2026-05-11)
**Autor:** Alex
**Estado:** Borrador para validación con equipo
**Fuente:** Investigación de patrones 2026 en Uber, Notion, Airbnb y Anthropic (ver página Notion del proyecto)

---

## 0. Tesis

La IA ya no es una herramienta auxiliar al lado del diseñador: es el **pegamento (AI Glue)** entre Figma, el Design System y el repositorio de código. Las empresas que están sacando ventaja en 2026 no lo hacen comprando más plugins, sino **estandarizando el proceso** para que cada fase del diseño tenga "Standard AI Tasks" claras, repetibles y verificables.

Este documento define ese estándar para nuestro equipo en dos niveles:

1. **Master Workflow** — Las 5 fases del diseño con sus tareas IA estándar, stack y criterios de validación.
2. **Paso 1 detallado: Figma → Código** — La pieza más accionable a corto plazo, lista para llevar al equipo.

---

## 1. Master Workflow — Las 5 Fases

El flujo completo, de investigación a producción, organizado como una matriz. Cada fase tiene la misma estructura para que sea fácil de adoptar fase por fase.

### Fase 1 — Discovery

**Objetivo:** Convertir señales no estructuradas (entrevistas, transcripciones, tickets, reviews) en insights accionables, sin pasar 3 días sintetizando notas.

**Standard AI Tasks:**

- Transcripción + diarización automática de entrevistas de usuario.
- Clusterización temática de respuestas abiertas (qué frases se repiten, en qué contextos).
- Extracción de "jobs to be done" y puntos de fricción con citas textuales asociadas.
- Resumen ejecutivo dirigido a stakeholders (no a diseñadores) en una página.

**Stack recomendado:**

- Otter.ai o Fathom para transcripción.
- Claude (proyectos) para síntesis con citas trazables a la fuente.
- Dovetail o Notion AI para repositorio de research consultable.

**Inputs / Outputs:**

- *Input:* audio/video de sesiones, notas en bruto, transcripciones de soporte.
- *Output:* documento de insights con citas, mapa de jobs-to-be-done, lista priorizada de oportunidades.

**Definition of Done:**

- Cada insight enlaza a al menos 2 citas textuales de usuarios reales.
- El resumen ejecutivo cabe en una pantalla.
- Un PM externo al estudio puede leerlo y formular preguntas concretas.

**Antipatrón a evitar:** Dejar que la IA "invente" insights sintetizando sin trazabilidad. Si no hay cita, no es insight, es opinión del modelo.

---

### Fase 2 — Ideation

**Objetivo:** Pasar de un brief a 20 variaciones de layout en una tarde, todas dentro del Design System, para discutir sobre opciones reales y no sobre wireframes en una pizarra.

**Standard AI Tasks:**

- Generación masiva de variantes de layout a partir de un brief + tokens del Design System.
- Auto-etiquetado de cada variante con sus trade-offs (densidad, accesibilidad, jerarquía).
- Filtrado por restricciones técnicas conocidas (componentes disponibles, breakpoints).
- "Devil's advocate prompt": forzar al modelo a explicar por qué cada propuesta podría fallar.

**Stack recomendado:**

- v0.dev o Lovable para generación de variantes con componentes reales.
- Figma + plugin de IA (estilo Uber uSpec) cuando el Design System ya está en Figma Variables.
- Claude o Cursor con MCP de Figma para iteración rápida sin abrir Figma.

**Inputs / Outputs:**

- *Input:* brief de la feature, screenshot del flow actual, tokens del Design System.
- *Output:* matriz de 10–20 variantes con scoring por criterios (claridad, esfuerzo, riesgo técnico).

**Definition of Done:**

- Mínimo 3 variantes radicalmente distintas (no son la misma idea pintada de otro color).
- Cada variante usa solo componentes del Design System actual.
- Hay una decisión documentada de por qué se descartan las que se descartan.

**Antipatrón a evitar:** Generar 50 variantes y elegir la más bonita. Sin criterios de scoring, esto es ruido caro.

---

### Fase 3 — Prototyping

**Objetivo:** Convertir la variante ganadora en un prototipo funcional (no clickable de Figma — funcional de verdad, en React/Tailwind) en menos de un día.

**Standard AI Tasks:**

- Conversión de wireframe Figma → componente React + Tailwind respetando tokens.
- Generación de estados (loading, empty, error, success) sin pedirlos uno a uno.
- Integración con datos mock realistas (no "Lorem ipsum").
- "Self-check" visual: el agente compara su salida contra el Figma y se corrige.

**Stack recomendado:**

- Claude Code / Cursor con MCP de Figma instalado.
- Storybook o un playground interno para alojar prototipos.
- v0.dev como atajo cuando el componente es estándar.

**Inputs / Outputs:**

- *Input:* frame de Figma final, tokens, ejemplo de datos reales (no inventados).
- *Output:* componente funcional con todos los estados, en una rama del repo o sandbox.

**Definition of Done:**

- El prototipo corre con datos reales (aunque sea de staging).
- Cubre los 4 estados mínimos: loading, empty, error, success.
- Pasa un diff visual contra Figma con tolerancia definida (ver Paso 1).

**Antipatrón a evitar:** Llamar "prototipo" a un mockup en Figma con un par de transiciones. Si no se puede probar con un usuario haciendo clic real, es maqueta.

---

### Fase 4 — Handoff (The Spec)

**Objetivo:** Eliminar el handoff tradicional. La especificación se genera sola desde el prototipo + Figma, y el ingeniero recibe algo verificable, no algo que interpretar.

**Standard AI Tasks:**

- Extracción automática de tokens, espaciados y tipografía desde Figma vía MCP.
- Generación de la especificación de accesibilidad (roles ARIA, contraste, focus order).
- Mapeo de cada elemento del diseño a su componente del Design System (o flag si no existe).
- Generación de PR description con screenshots, checklist y casos límite.

**Stack recomendado:**

- Figma MCP + Claude/Cursor para extracción de variables.
- GitHub Copilot Workspaces o Claude Code para la PR.
- Linear/Jira con plantilla de "Design Spec" pre-rellenada por el agente.

**Inputs / Outputs:**

- *Input:* frame final, prototipo funcional, contexto del Design System.
- *Output:* PR description + spec page con accesibilidad, tokens, edge cases.

**Definition of Done:**

- La spec se genera con un comando, no copy-pasteando.
- Ingeniería confirma que no necesita pedir aclaraciones para empezar.
- Si un elemento no tiene componente del DS, está marcado explícitamente como "nuevo componente".

**Antipatrón a evitar:** Tratar la spec generada por IA como definitiva sin que el diseñador la revise. La IA hace el 80%, tú firmas el 20% crítico.

---

### Fase 5 — Validation

**Objetivo:** Detectar problemas antes de poner el flujo delante de usuarios reales — y después, medirlos sin esperar al siguiente NPS trimestral.

**Standard AI Tasks:**

- Pruebas de usabilidad sintéticas (agentes simulando perfiles de usuario con sesgos definidos).
- Análisis automático de heurísticas de Nielsen + WCAG sobre el prototipo.
- Predicción de fricción en el flow (patrón Airbnb): identificar pasos con alta probabilidad de abandono.
- Post-launch: análisis de sesiones grabadas con tagging automático de fricción real.

**Stack recomendado:**

- Maze o UserTesting con módulos de IA para análisis.
- Claude con prompts de persona ("actúa como usuario senior poco familiarizado con apps bancarias").
- Hotjar / FullStory para sesiones reales + análisis con LLM.

**Inputs / Outputs:**

- *Input:* prototipo funcional, perfiles de usuario objetivo, hipótesis a validar.
- *Output:* reporte de fricciones predichas + medidas, priorizadas por impacto.

**Definition of Done:**

- Cada fricción detectada tiene una hipótesis de causa y una propuesta de fix.
- Los hallazgos sintéticos se contrastan con al menos 1 usuario real antes de actuar sobre ellos.
- Hay un loop: validation → backlog → siguiente iteración.

**Antipatrón a evitar:** Sustituir usuarios reales por agentes sintéticos. Los sintéticos son un filtro previo, no un reemplazo. Confundir esto es lo que hace que productos "validados" fracasen en producción.

---

## 2. Paso 1 detallado: Figma → Código

Es el paso con mayor ROI inmediato y el más fácil de empezar a estandarizar esta semana. Está basado en el patrón Notion (Brian Lovin) y adaptado a un equipo que ya tiene Design System.

### 2.1 Contexto — Por qué este paso primero

El handoff Figma → código es donde el equipo pierde más tiempo (estimación: 30–40% de las horas de diseño van a "explicar el diseño" después de hacerlo). Automatizarlo:

- Devuelve esas horas al diseñador para investigación y validación.
- Reduce el malentendido diseñador-ingeniero (la fuente nº1 de bugs visuales).
- Crea un loop verificable: el código se compara contra Figma, no contra la memoria del developer.

### 2.2 Stack requerido

| Capa | Herramienta | Por qué |
|---|---|---|
| Diseño | Figma con Variables + Design System actualizado | Sin tokens en Variables, el MCP no puede leer estilos limpios |
| Puente | Figma MCP server | Permite a Claude/Cursor consultar Figma como si fuera una API |
| Agente | Claude Code (terminal) o Cursor | Genera el código y orquesta la verificación |
| Verificación | Playwright/Puppeteer + diff visual | Compara screenshot del código vs export de Figma |
| Repositorio | Branch dedicada `design/<feature>` | Aísla el experimento del main |

### 2.3 Setup one-time (por el tech lead, no por cada diseñador)

1. Instalar Figma MCP server en la máquina de desarrollo (o servidor compartido).
2. Generar token de Figma con permisos de lectura del Design System.
3. Configurar Claude Code / Cursor con el MCP apuntando al server.
4. Definir en el repo un script `npm run design-diff <component>` que:
   - Renderiza el componente con datos mock.
   - Toma screenshot.
   - Lo compara contra el export del frame de Figma.
   - Devuelve "PASS / FAIL + diferencia en px".
5. Documentar tolerancia aceptable (p. ej. <2% de píxeles distintos en zonas no críticas).

### 2.4 Workflow operativo (lo que hace el diseñador cada vez)

1. **Cerrar el diseño en Figma.** El frame final está en una página `Ready for code` y usa solo componentes del Design System.
2. **Abrir Claude Code / Cursor** y ejecutar:
   ```
   /figma <URL del frame>
   Genera el componente React + Tailwind respetando los tokens del Design System.
   Incluye estados: loading, empty, error, success.
   Usa datos mock realistas (no Lorem).
   ```
3. **El agente genera el código** en la branch correspondiente.
4. **El agente lanza `npm run design-diff <component>`** y:
   - Si PASA → abre PR con la spec auto-generada (Fase 4).
   - Si FALLA → se autoasigna la corrección, itera hasta 3 veces, y si no, escala al diseñador con el diff visual.
5. **El diseñador revisa la PR** (no el código línea a línea — el screenshot y la accesibilidad).
6. **Merge.**

### 2.5 Prompts / comandos clave

**Generación inicial:**

```
Eres un ingeniero de UI senior. Lee el frame de Figma en {URL}.
Genera un componente React funcional con Tailwind.
Reglas:
- Usa exclusivamente tokens definidos en design-tokens.json.
- No introduzcas colores, espaciados o tipografías fuera de los tokens.
- Cubre estados: loading, empty, error, success.
- Datos de ejemplo: usa el archivo mocks/{component}.json si existe; si no, genéralo con datos realistas.
- Accesibilidad: roles ARIA, navegación por teclado, foco visible.
Devuelve: el componente, el archivo de mocks si lo creas, y un breve changelog.
```

**Auto-corrección tras diff fallido:**

```
El diff visual ha fallado con {N}% de diferencia.
Zonas afectadas: {coordenadas}.
Compara el screenshot del código con el export de Figma adjunto.
Identifica la causa más probable (token incorrecto, espaciado, tipografía, alineación).
Aplica el fix y vuelve a lanzar el diff. Máximo 3 intentos.
```

### 2.6 Definition of Done del Paso 1

- El componente vive en una PR, no en una rama suelta.
- `npm run design-diff` pasa dentro de tolerancia.
- Los 4 estados están cubiertos.
- La PR description fue generada por el agente, no escrita a mano.
- El diseñador firmó la accesibilidad (no la sintaxis).

### 2.7 Antipatrones que vamos a evitar explícitamente

- **"Lo regenero entero cada vez":** la idea es iterar, no rehacer. Si el diff falla en una zona, se corrige esa zona.
- **"El agente sabe mejor":** si el código se aleja del Design System por iniciativa del modelo, se rechaza. El DS es la fuente de verdad.
- **"Lo apruebo porque es bonito":** si no pasa el diff y la accesibilidad, no entra. Sin excepciones de "esta vez sí".
- **Mockups con datos falsos:** los mocks deben ser plausibles (nombres, fechas, importes coherentes), no "Lorem ipsum" — esto cambia decisiones de layout.

### 2.8 Métricas para los primeros 60 días

| Métrica | Línea base actual | Objetivo a 60 días |
|---|---|---|
| Horas/semana en handoff manual | (a medir) | −60% |
| Bugs visuales en QA | (a medir) | −50% |
| Tiempo Figma → PR abierta | 2–3 días | <4 horas |
| % de PRs aceptadas sin retoque visual | (a medir) | >70% |

Sin medir la línea base la primera semana, las cifras de mejora son cuento. Empezar midiendo, aunque sea a ojo.

---

## 3. Próximos pasos sugeridos

1. **Validar este documento con el equipo** (1 sesión de 45 min). Bloqueante: si no hay buy-in, el resto no avanza.
2. **Piloto del Paso 1 con un solo componente** del Design System (sugerencia: algo con varios estados, p. ej. una Card de transacción). 1 semana.
3. **Medir línea base** durante el piloto: tiempo, bugs, satisfacción del diseñador y del ingeniero.
4. **Decidir adopción** o iterar el estándar antes de extender al resto de fases.
5. **Documentar el case study interno** — esto es a la vez nuestro primer estándar y el primer contenido publicable en la web "Best AI Design Workflow".

---

*Documento vivo. Versionado en la carpeta del proyecto y sincronizado con la página Notion homónima.*
