# Case Study #1 — Notion: el "Prototype Playground" de Brian Lovin

**Versión:** 0.1 (2026-05-11)
**Compañía:** Notion AI
**Protagonista:** Brian Lovin (Product Designer, Notion AI)
**Fuente principal:** Entrevista *How I AI* (Claire Vo, ChatPRD/Lenny's, 23 feb 2026) + apariciones públicas posteriores
**Aplicabilidad a nuestro contexto:** Alta — es el patrón que inspira nuestro **Paso 1 (Figma → Código)**

---

## TL;DR (30 segundos)

Brian Lovin, diseñador en el equipo de Notion AI, construyó un entorno compartido llamado **Prototype Playground**: una sola app Next.js, un solo repo de GitHub, una carpeta por diseñador y los tokens del Design System ya integrados. Encima de eso montó tres flujos con Claude Code:

1. **De idea a prototipo funcional** en minutos, hablando (no escribiendo) el prompt.
2. **De Figma a código** con un comando `/figma` que extrae, implementa y **verifica visualmente** el resultado contra el diseño original, iterando hasta 3 veces.
3. **Automatización de tareas repetitivas** mediante *Claude Skills* (p. ej. resolver nombres de iconos) y comandos custom (p. ej. `/deploy` que hace branch + commit + PR + monitoriza CI y se autoarregla si falla).

La frase que resume todo: *"No he escrito una sola línea de código de front-end en 3 meses."* La filosofía que la hace posible: *"Cada vez que la IA te pida hacer algo, intenta primero enseñarle a contestárselo a sí misma."*

---

## 1. Contexto — Por qué Notion lo hizo así

Notion vende un producto donde el diseño es el producto. Pero al meterse en IA (chat, agentes, generación), Brian se topó con un problema: **Figma no representa la realidad de un producto con IA**. No puedes *sentir* cómo responde un chat ni descubrir los edge cases de un LLM desde un mockup.

Su tesis: los diseños deben **"encontrarse con la realidad lo antes posible"**, y la única manera de hacer eso es poner el diseño en un navegador real, con sus cuirks, latencias y constraints. Pero pedirle a cada diseñador que se monte un repo, configure un stack y aprenda Next.js para cada prototipo no escala. Por eso construyó la infraestructura compartida.

**Lectura para nosotros:** si tu producto incluye IA, modelos generativos, o cualquier cosa con incertidumbre temporal (streaming, agentes, errores no deterministas), Figma como entregable final es insuficiente. Esto no aplica a todos los productos, pero aplica a más de los que pensamos.

---

## 2. La infraestructura: Prototype Playground

No es nada exótico. Es deliberadamente simple:

| Decisión | Implementación | Por qué importa |
|---|---|---|
| **Una sola app** | Next.js, monorepo en GitHub | Toda la visibilidad. Los diseñadores se inspiran y copian piezas entre sí. |
| **Una carpeta por diseñador** | Directorios *namespaced* (`/prototypes/<designer-name>/...`) | Cero conflictos. Nadie sobrescribe a nadie. |
| **Sin base de datos** | Estado en memoria o JSON local | Cero fricción para empezar un prototipo. La persistencia se añade si el experimento sobrevive. |
| **Componentes compartidos** | Colores, tipografía, iconos del DS de Notion ya integrados | Cualquiera arranca un prototipo "que se siente Notion" sin partir de cero. |
| **Enlaces externos** | Permite linkear prototipos en Figma, V0, etc. | El playground es el *hub*, no un silo más. |
| **Stack:** | Next.js + Tailwind + Bun | Decisión de equipo para que todos hablen el mismo idioma. |

**Lectura para nosotros:** la infraestructura es lo que hace que el workflow sea adoptable. Sin un playground compartido, Claude Code + Figma MCP es una herramienta individual. Con él, es un sistema de equipo. Vale la pena que el tech lead invierta una semana en montar algo parecido.

---

## 3. Workflow 1 — De idea a prototipo en minutos

El setup físico:

- **Pantalla izquierda:** terminal con Claude Code.
- **Pantalla central:** editor (Cursor).
- **Pantalla derecha:** navegador con preview en vivo.

Brian no teclea los prompts: usa **Monologue** para dictar. Es más rápido y, según él, fuerza a explicar mejor.

El paso crítico que casi todo el mundo se salta: **plan mode**. Antes de generar nada, Claude lista qué componentes va a crear, qué librerías va a instalar y qué estructura va a montar. **Brian se obliga a leer ese plan** y vetar lo que vea raro. Con algo de criterio técnico, esto detecta el 80% de los errores antes de escribir una línea de código.

**Ejemplo real de la entrevista** — el prompt que dictó para crear una página de detalle de episodio de podcast:

> *"I wanna build a new prototype in this How I AI directory, and we are a podcast, and I want to build a detail page for a podcast episode that has both a video player and an audio player. Underneath the page should have the title of the episode, a description, and how about if you hit play, there's little confetti that shoots up out of the player."*

Resultado: Claude instaló una librería de confetti, estructuró la página en Tailwind, montó los componentes React, y el confetti funcionaba al darle play. Total: un par de minutos.

**Lectura para nosotros:** el dictado + plan mode son los dos hábitos que más diferencia marcan. Recomendaría introducirlos como práctica obligatoria desde el día 1.

---

## 4. Workflow 2 — Figma → Código con loop de auto-corrección (el clave)

Este es **el patrón que adoptamos en nuestro Paso 1**. Aquí los detalles exactos:

### El comando

Brian creó un *slash command* custom: `/figma`. En la práctica:

```
/figma <URL pública del frame de Figma>
```

Y se acabó. No hay prompt adicional. Toda la lógica está dentro del comando.

### Las 4 fases internas del comando

1. **Extract** — Usa el **Figma MCP server** para conectarse a la API de Figma. Extrae tokens de diseño (colores, espaciados, tipografía), información de layout y assets.

2. **Implement** — Genera código Next.js + Tailwind para construir la UI a partir de lo extraído.

3. **Verify** — Y aquí está el truco que cambia todo: usa **otro MCP, el Chrome DevTools MCP**, para abrir el prototipo recién generado en un navegador real, inspeccionarlo y compararlo visualmente con el Figma original.

4. **Iterate** — Si detecta discrepancias (imagen rota, layout mal, color que no cuadra), vuelve al paso 2, intenta arreglarlo y repite la verificación. Brian lo configuró para **iterar hasta que el resultado sea correcto, o máximo 3 ciclos sin cambios**.

### El resultado real que mostraron

Brian le pidió que recreara un sidebar tipo Notion a partir de un Figma. En la primera pasada, algunas imágenes salieron rotas. En la segunda iteración, el ciclo de verificación detectó el error y arregló las rutas de las imágenes. El resultado final estaba **~80% terminado**, ahorrando lo que habrían sido horas de píxel-pushing manual.

### Lo que esto significa en la práctica

- El 20% restante (afinado fino, accesibilidad, edge cases) sigue siendo trabajo del diseñador. No es magia, es palanca.
- La parte verdaderamente innovadora **no es generar código desde Figma** (eso ya lo hacían v0, Anima, Animaapp). Es el **loop de verificación visual**: el agente compara, ve su error y se corrige solo.
- El requisito previo no negociable: **el Design System tiene que estar en Figma Variables**. Sin tokens limpios, el MCP extrae basura.

**Lectura para nosotros:** nuestro Paso 1 calca este patrón, pero hay una diferencia que conviene apuntar — Brian usa Chrome DevTools MCP para el diff visual. Eso es más sofisticado que un simple `playwright + diff de pixels`: el agente puede *inspeccionar el DOM*, no solo comparar imágenes. Cuando tengamos el piloto andando, valdría la pena evaluar si conviene subir a ese nivel.

---

## 5. Workflow 3 — Automatización con Skills y comandos custom

Brian formula su regla número uno así (y vale la pena memorizarla):

> **"Cada vez que la IA te pida hacer algo, intenta primero ver si puedes enseñarle a contestárselo a sí misma."**

Dos ejemplos concretos de cómo aplica esa regla:

### Ejemplo A — El "find-icon" Skill

**Problema:** Claude se inventaba nombres de iconos. Pedía `search-icon` cuando en el codebase real se llamaba `magnifying-glass-icon`. Resultado: imágenes rotas y errores de compilación constantes.

**Solución:** Brian creó un **Claude Skill** llamado `find-icon`. Un Skill es una capacidad reutilizable que el modelo decide invocar automáticamente cuando detecta una situación relevante. Este combina instrucciones en lenguaje natural con un script TypeScript ejecutable. Cuando Claude necesita un icono, el Skill ejecuta el script, busca entre los **5.000+ iconos** del proyecto el nombre correcto, e incluso comprueba sinónimos.

Resultado: cero horas perdidas arreglando imports de iconos rotos.

### Ejemplo B — El comando `/deploy`

**Problema:** los diseñadores no suelen estar cómodos con Git. Crear branch, commit, push, abrir PR, vigilar CI... es intimidatorio.

**Solución:** un comando `/deploy` que automatiza todo el ciclo:

1. Comprueba que GitHub CLI está instalado y autenticado (y guía la instalación si no).
2. Detecta si estás en `main` y, si lo estás, crea una branch nueva con nombre descriptivo automáticamente.
3. Stagea archivos, hace commit, pushea, crea PR.
4. **Abre la PR en el navegador automáticamente.** (Pequeño detalle UX que importa.)
5. Entra en loop monitorizando el CI cada 30–60 segundos. **Si falla un check (lint, types), intenta arreglarlo solo, pushea el fix y sigue vigilando hasta que esté todo verde.**

**Lectura para nosotros:** el patrón general es lo importante. Cualquier tarea repetitiva-y-frágil que tu equipo haga (subir assets, generar specs, lanzar diffs visuales, abrir tickets de QA con screenshots...) es candidata a convertirse en un Skill o comando. Cuando montemos nuestro Paso 1, este es el segundo nivel de inversión: identificar qué pasos siguen siendo manuales y convertirlos en automatismos.

---

## 6. Filosofía operativa — Las 3 ideas que conviene robar

1. **"El diseño debe encontrarse con la realidad lo antes posible."** Sustituye "lo entregamos a ingeniería" por "lo metemos en un browser hoy mismo, aunque sea feo".

2. **"Si la IA te pide hacer algo, enséñale a hacerlo sola la próxima vez."** Cada fricción es una oportunidad de automatización, no una queja. Convertir esto en cultura es el multiplicador.

3. **"La calidad del output está directamente correlacionada con la calidad del input."** Si los resultados son malos, normalmente el problema es el prompt, no el modelo. Y a veces el mejor prompt es irte a dormir y volver mañana.

---

## 7. Métricas y resultados

Brian no publicó dashboards, pero la frase pública es la métrica más cualitativa que vas a encontrar:

> **"No he escrito una sola línea de código de front-end en 3 meses."**

Para un diseñador en el equipo de IA de Notion, eso significa que el ciclo de prototipado se ha desplazado por completo del trabajo manual a la dirección de un agente. Esto no es un *vanity claim* — es una declaración de cómo se reparte su tiempo: pasa de programar a **dirigir**.

Otras métricas implícitas en la entrevista:

- Conversión Figma → prototipo funcional: **minutos**, no horas.
- Calidad inicial post-`/figma`: **~80% del trabajo final** en segundos.
- Reducción de errores de iconos: prácticamente eliminados tras el Skill `find-icon`.
- Diseñadores no técnicos haciendo deploy a producción: posible gracias a `/deploy`.

---

## 8. Aplicabilidad a nuestro contexto (enterprise + DS consolidado)

Lo que **sí** es trasladable directamente:

- El patrón Figma → código con verificación visual (= nuestro Paso 1, ya alineado).
- La filosofía de "enseñar a la IA en lugar de obedecerla".
- La idea de un playground compartido. En un equipo enterprise con DS maduro, esto encajaría incluso mejor que en Notion, porque el DS ya está más cerrado.
- Los Claude Skills para resolver problemas recurrentes (iconos, tokens, naming de componentes).

Lo que **necesita adaptación**:

- **Permisos y compliance.** Brian publica Figma frames públicos al `/figma` MCP. En banca o consultoría enterprise (Sopra Steria, BBVA), eso no va a colar. Hay que evaluar Figma MCP en infra controlada, no SaaS.
- **Stack.** Next.js + Tailwind + Bun puede no ser el stack de tu cliente. Si el front es React + styled-components (o peor, jQuery legacy), el `/figma` necesita una variante por proyecto. Tarea: definir un *template* por stack soportado.
- **Diseñadores no técnicos.** En Notion, los diseñadores tienen perfil "design engineer" o cercano. En un equipo enterprise medio, el 50% no toca terminal. El comando `/deploy` es exactamente la pieza pensada para ese caso, pero hace falta soporte de adopción (talleres, pair sessions).

Lo que **no** es trasladable y conviene reconocer:

- La velocidad de iteración cultural de Notion. Brian construyó el playground sin pedir permiso a nadie. Ese nivel de autonomía es excepción, no regla. En enterprise hay que vendérselo a stakeholders antes de tocar nada.

---

## 9. Diferencias con nuestro Paso 1 actual y posibles ajustes

| Pieza | Nuestro Paso 1 (v0.1) | Notion (Brian Lovin) | Recomendación |
|---|---|---|---|
| Verificación visual | `playwright + diff de píxeles` | **Chrome DevTools MCP** (inspecciona DOM, no solo imagen) | Evaluar upgrade en v0.2 |
| Stack target | Genérico React + Tailwind | Next.js + Tailwind + Bun (deliberado) | Mantener genérico hasta saber stack cliente |
| Infraestructura compartida | No definida | Playground monorepo con namespaces | **Añadir como prerrequisito a la fase piloto** |
| Dictado de prompts | No mencionado | Monologue + plan mode | **Añadir como buena práctica** |
| Custom Skills | No (todavía) | `find-icon`, otros internos | Identificar 2–3 candidatos tras el piloto |
| Deploy automatizado | No incluido | `/deploy` con auto-fix de CI | Fuera de scope inicial, candidato para v0.3 |

**Acciones concretas que sacaría:**

1. Añadir a la v0.2 del Paso 1: **plan mode obligatorio** antes de cualquier generación.
2. Añadir a la v0.2 del Paso 1: evaluar **Chrome DevTools MCP** como motor de verificación (más potente que un diff de píxeles puro).
3. Crear un mini-spec del **Playground** como prerrequisito del piloto. Tech lead, una semana de trabajo.
4. Identificar **2–3 frustraciones del equipo** que sean candidatas a Skill. Empezar por la más concreta.

---

## 10. Fuentes y referencias

- **Fuente principal:** Claire Vo / *How I AI* — "How Notion Designs with AI: Brian Lovin's Prototype Playground and Claude Code Workflows" (ChatPRD blog, 23 feb 2026). [Enlace](https://www.chatprd.ai/how-i-ai/how-notion-designs-with-ai-brian-lovins-prototype-playground-and-claude-code-workflows)
- **Podcast / vídeo:** *How Notion designers ship live prototypes in minutes* — YouTube (canal Lenny's Newsletter / How I AI). [Enlace](https://www.youtube.com/watch?v=s4HGbIhUgVo)
- **Artículo Lenny's Newsletter:** "*I haven't written a single line of front-end code in 3 months*". [Enlace](https://www.lennysnewsletter.com/p/i-havent-written-a-single-line-of)
- **Workflow detallado (Figma → código con loop):** *Build an AI Workflow to Convert Figma Designs to Code with a Self-Correction Loop* (ChatPRD, feb 2026). [Enlace](https://www.chatprd.ai/how-i-ai/workflows/build-an-ai-workflow-to-convert-figma-designs-to-code-with-a-self-correction-loop)
- **Web personal de Brian Lovin:** [brianlovin.com](https://brianlovin.com/)
- **Contexto Figma MCP:** lanzamiento oficial el 17 feb 2026 (Dylan Field, CEO de Figma) — referencia útil para argumentar la madurez del MCP como pieza estándar.

**Herramientas mencionadas y enlaces directos:**

- Claude Code: claude.ai
- Cursor: cursor.sh
- Monologue (dictado): monologue.to
- Next.js: nextjs.org
- Tailwind: tailwindcss.com
- Bun: bun.sh
- GitHub CLI: cli.github.com

---

*Próximo case study sugerido: **Uber — Documentación Agéntica** (cómo automatizan la generación de specs en Fase 4 con agentes sobre Figma + MCP). Pendiente de confirmar contigo.*
