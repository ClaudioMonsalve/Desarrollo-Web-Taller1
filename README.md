# Ábaco - Plataforma para PYMEs

## Equipo de Desarrollo
* Benjamín Vega
* Claudio Monsalve
* Diego Ravanal
* Angel Iriarte

---

## Arquitectura y Estructura del Proyecto

El proyecto está diseñado siguiendo dos principios fundamentales para asegurar escalabilidad y mantenibilidad usando solo HTML, CSS y Vanilla JS (Web Components nativos):

1. **Screaming Architecture**: Los archivos se agrupan por "dominio" o "feature" de negocio, no por tipo técnico (todos los controllers juntos, etc.). Al ver las carpetas, el proyecto "grita" de qué se trata la aplicación.
2. **Atomic Design**: La interfaz de usuario se divide en partes reutilizables de menor a mayor complejidad:
   * **Atoms (`a-`)**: Componentes básicos e indivisibles (ej. botones, íconos).
   * **Molecules (`m-`)**: Unión de átomos que forman un componente con propósito (ej. barra de búsqueda).
   * **Organisms (`o-`)**: Secciones complejas e independientes de la UI (ej. carrusel, navbar, lista de bancos).
   * **Pages (`*.page.js`)**: Ensamblaje de organismos que componen la vista final.

### Estructura de Directorios

```text
.
├── index.html              # Página principal (Home)
├── financiamiento.html     # Evaluador de Bancos
├── capacitaciones.html     # Vista de capacitaciones
├── red-contactos.html      # Vista de networking
├── tailwind.config.js      # Configuración de Tailwind CSS
├── dist/                   # CSS compilado (output.css)
└── src/
    ├── assets/             # Recursos estáticos (imágenes SVG, logos)
    ├── data/               # 'initial-state.json' - Datos semilla para simular BD global
    ├── styles/             # 'global.css' - Tokens de diseño y variables globales
    ├── shared/             # Código y UI compartida en toda la app
    │   └── ui/
    │       └── atoms/      # Web Components reusables (ej. a-icon.js, a-dropdown-button.js)
    └── features/           # Dominios de negocio (Screaming Architecture)
        ├── home/           # Dominio "Inicio"
        ├── capacitaciones/ # Dominio "Capacitaciones"
        ├── financiamiento/ # Dominio "Financiamiento" (Evaluador de Bancos)
        └── networking/     # Dominio "Red de Contactos"
```

---

## Anatomía de un Feature (Dominio)

Cada "Feature" o dominio dentro de `src/features/` maneja una única responsabilidad del negocio. Esta estructura modular permite aislar la lógica y la UI de cada sección.

Todo feature sigue esta estructura interna:

```text
src/features/[nombre-del-feature]/
├── logic/
│   └── [nombre].service.js   # Lógica de datos (CRUD, fetch a JSON, localStorage)
├── ui/
│   ├── molecules/            # Componentes UI combinados específicos de este feature
│   └── organisms/            # Secciones UI pesadas (ej. o-courses-list.js)
└── [nombre].page.js          # El orquestador o "EntryPoint" de la página
```

### ¿Cómo crear un nuevo Feature?

Si se necesita agregar, por ejemplo, una vista de "Noticias" (`noticias.html`), el flujo de creación paso a paso es:

1. **Datos:** Agregar la data estática a `src/data/initial-state.json`.
2. **Directorio:** Crear `src/features/noticias/`.
3. **Servicio (`logic/noticias.service.js`):** Crear una función que recupere la información desde `initial-state.json` (o `localStorage` si requiere persistencia). Este servicio debe aislar a la UI de saber "de dónde" provienen los datos.
4. **Componente UI (`ui/organisms/o-news-list.js`):** Crear un Web Component usando `class ONewsList extends HTMLElement`.
   - En el evento `connectedCallback()`, importar y llamar al servicio para recuperar los datos.
   - Construir la vista internamente usando plantillas literales para inyectar en `this.shadowRoot.innerHTML`.
   - Registrar el componente con `customElements.define('o-news-list', ONewsList)`.
5. **Orquestador (`noticias.page.js`):** Crear un script vacío que solo importe el componente web que acabamos de crear (`import './ui/organisms/o-news-list.js'`). Su labor principal es garantizar el registro en el navegador.
6. **HTML Principal:** En el archivo `noticias.html` (en la raíz), agregar el Tag del componente (`<o-news-list></o-news-list>`) y vincular el orquestador (`<script type="module" src="src/features/noticias/noticias.page.js"></script>`).

### Roles de los Componentes

* **Archivos HTML (Raíz):** No contienen lógica JS, ni manipulación del DOM, ni datos estáticos quemados. Solo contienen la estructura semántica básica (Header, Main, tags HTML nativos) e invocan a los Custom Elements.
* **Componentes UI (Atoms, Molecules, Organisms):** Son 100% responsables de **renderizar el HTML y el CSS**. Todo su estilo queda encapsulado de forma segura dentro del Shadow DOM para evitar colisiones. Solo se enfocan en manipular e interactuar con la vista.
* **Services (`logic/`):** Son 100% responsables de **manejar datos**. Consultan, guardan y editan. Actúan como una "capa de repositorios" y NUNCA interactúan con el DOM.
* **Orquestadores (`.page.js`):** Son el "pegamento". Conectan e inicializan los Web Components, y en casos donde la página es compleja, manejan eventos globales (EventTarget o CustomEvents) para comunicar componentes aislados (ej. cuando una barra de búsqueda necesita actualizar los resultados en una tabla aparte).

---

## Flujo de Funcionamiento (Ejemplo Práctico)

1. El usuario entra a `capacitaciones.html`.
2. El archivo HTML llama al orquestador `src/features/capacitaciones/capacitaciones.page.js`.
3. El orquestador ejecuta el `import` de `o-courses-list.js`. El navegador asocia y registra el tag nativo `<o-courses-list>`.
4. El componente `<o-courses-list>` se monta en el DOM. Al montarse, se dispara su `connectedCallback()` que asíncronamente llama a `getAllCourses()` ubicado en `capacitaciones.service.js`.
5. El servicio verifica si hay datos en `localStorage`. Al no encontrar nada (primer acceso), consume `src/data/initial-state.json`, extrae los cursos, los guarda en el caché local, y los retorna.
6. El Web Component recibe los cursos, genera una plantilla HTML iterando los resultados, define sus propios estilos encapsulados y se renderiza de forma aislada, entregando al usuario la interfaz final sin haber contaminado el entorno global.