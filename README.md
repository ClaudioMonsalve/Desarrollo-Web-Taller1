# Desarrollo-Web-Taller1
## Dev equip
* Benjamín Vega
* Claudio Monsalve
* Diego Ravanal
* Angel Iriarte

## Patrones de diseño
* Atomic design
* Screaming Architecture

## estructura de directorios

```text
.
├── README.md
├── tailwind.config.js
└── src
    ├── assets          # Recursos estáticos (imágenes, iconos, fuentes)
    ├── components      # UI Genérica (Atomic Design)
    │   ├── atoms       # Componentes mínimos (botones, inputs)
    │   └── molecules   # Uniones simples (campo de formulario + label)
    ├── data            # Datos de ejemplo (JSON/JS) para el CRUD 
    ├── features        # Lógica por Entidad (Screaming Architecture)
    │   └── [entidad]   # Carpeta por problema asignado (ej: Ganancias)
    │       ├── organisms # Componentes complejos (Formulario, Tabla CRUD)
    │       └── service.js # Lógica de manipulación de datos (CRUD) 
    ├── logic           # Utilidades globales (validaciones, localStorage)
    ├── pages           # Vistas principales (Index, Crear, Editar)
    ├── styles          # global.css y configuración visual 
    └── templates       # Layouts y estructuras de navegación