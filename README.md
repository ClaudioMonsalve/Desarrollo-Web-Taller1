# Ábaco - Plataforma para PYMEs

## Equipo de Desarrollo
* Benjamín Vega
* Claudio Monsalve
* Diego Ravanal
* Angel Iriarte

---

## Estructura del Proyecto

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
    ├── data/               # Datos simulados y conexión base
    │   ├── initial-state.json # Base de datos en formato JSON estático
    │   └── api.js          # Lógica centralizada para consumir el JSON o LocalStorage
    ├── styles/             # 'global.css' - Tokens de diseño global
    └── features/           # Dominios de negocio (Screaming Architecture)
        ├── home/           
        │   └── home.js     # Lógica DOM para index.html
        ├── capacitaciones/
        │   └── capacitaciones.js # Lógica DOM para capacitaciones.html
        ├── financiamiento/ 
        │   └── financiamiento.js # Lógica DOM para financiamiento.html
        └── networking/     
            └── networking.js # Lógica DOM para red-contactos.html
```

---

## Anatomía de un Feature (Dominio)

La estructura actual elimina la complejidad de los Web Components (Shadow DOM) para facilitar la lectura. Cada "Feature" consiste simplemente en:

1. **Un archivo HTML en la raíz:** Define toda la estructura visual semántica y las clases de Tailwind CSS.
2. **Un archivo JavaScript en `src/features/`:** Manipula dinámicamente ese HTML específico.

### ¿Cómo crear un nuevo Feature?

Si necesitas agregar una nueva vista, por ejemplo, "Noticias" (`noticias.html`), sigue estos pasos:

1. **Datos:** Agrega la información en formato JSON estático dentro de `src/data/initial-state.json`.
2. **API (Simulada):** Abre `src/data/api.js` y crea un método público simple que recupere la llave de datos que creaste (ej. `getNoticias: async () => ...`).
3. **Página HTML:** Crea el archivo `noticias.html` en la raíz del proyecto.
   - Construye tu maquetación usando HTML y Tailwind.
   - Asegúrate de dejar contenedores vacíos con `id` específicos (ej. `<div id="lista-noticias"></div>`).
   - Al final del `<body>`, vincula tu script: `<script type="module" src="src/features/noticias/noticias.js"></script>`.
4. **Carpeta y Script:** Crea el directorio `src/features/noticias/` y dentro el archivo `noticias.js`.
5. **Lógica DOM:** En `noticias.js`:
   - Importa la API: `import { api } from '../../data/api.js';`
   - Selecciona tu contenedor: `const contenedor = document.getElementById('lista-noticias');`
   - Pide los datos asíncronos y pinta el HTML iterando sobre ellos con un `map` y `innerHTML`.

### Roles de los Archivos

* **Archivos HTML (Raíz):** Contienen toda la maquetación visual estática y los contenedores "vacíos" (`divs`, `ul`) que el JavaScript llenará después.
* **Archivos JS (`src/features/...`):** Su única responsabilidad es reaccionar a la carga de la página, pedir datos a `api.js` y dibujar las plantillas iterando arrays (inyectando HTML mediante `innerHTML`).
* **Archivo API (`src/data/api.js`):** Actúa como un "Backend falso". Las páginas nunca hacen un `fetch` directamente ni tocan el `localStorage`; le piden a `api.js` que lo haga por ellos. Esto facilita que en un futuro se pueda conectar a una base de datos real cambiando un solo archivo.