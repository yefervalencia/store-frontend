# 🏪 Store Frontend - Gestión Moderna de Tiendas y Productos

¡Bienvenido a **Store Frontend**! Esta es la interfaz de usuario oficial para el panel de administración del catálogo comercial. 

Este proyecto es una **Single Page Application (SPA)** construida con lo más reciente del ecosistema Angular. Está diseñado para ser rápido, reactivo y ofrecer una experiencia de usuario fluida sin recargas de página.

---

## 📋 ¿Qué hace esta aplicación?

Este frontend permite a los administradores gestionar su negocio de manera visual y en tiempo real. Se conecta directamente a la [Store API (Backend)](#) para realizar las siguientes operaciones:

- **Categorías:** Crear, editar, eliminar y listar clasificaciones con búsqueda reactiva.
- **Tiendas:** Administrar sucursales físicas o digitales con operaciones CRUD completas.
- **Productos:** Gestión avanzada de inventario. Permite crear productos y vincularlos a tiendas y categorías existentes mediante formularios dinámicos.
- **Búsqueda en Tiempo Real:** Filtros ultra rápidos utilizando operadores de RxJS (`debounceTime`, `switchMap`) para no saturar el servidor.

---

## 🛠️ Tecnologías y Prácticas Utilizadas

Este proyecto no es solo funcional, sino que aplica las mejores prácticas modernas de la industria:

- **Angular 17/18+ (Standalone Components):** Arquitectura sin `NgModules` para un código más limpio y modular.
- **Signals:** Manejo del estado reactivo de forma síncrona y eficiente (reemplazo moderno del `async` pipe para variables locales).
- **Nuevo Control Flow:** Uso de la sintaxis moderna `@if`, `@for` y `@empty` directamente en el HTML.
- **Formularios Reactivos Tipados:** Formularios seguros (`nonNullable`) validados desde TypeScript.
- **RxJS Avanzado:** Uso extensivo de Observables y operadores como `forkJoin` para peticiones HTTP paralelas.
- **Bootstrap 5:** Diseño responsive, limpio y profesional con una paleta de colores personalizada (azules y grises).

---

## 🚀 Inicio Rápido (Cómo ejecutar el proyecto)

Sigue estos pasos para clonar y ejecutar este panel administrativo en tu máquina local.

### 1. Requisitos Previos
Asegúrate de tener instalado en tu computadora:
- **Node.js** (Versión 18.x o superior). [Descargar aquí](https://nodejs.org/).
- **Angular CLI** instalado globalmente. Si no lo tienes, instálalo con:
  ```bash
  npm install -g @angular/cli
  ```

- **Backend en ejecución:** Esta aplicación necesita que la API de Spring Boot esté corriendo localmente en http://localhost:8081.

**2. Instalación de Dependencias**

Abre tu terminal, navega hasta la raíz de este proyecto y descarga las librerías necesarias:

```bash
npm install
```

*(Nota: Esto instalará Angular, RxJS y Bootstrap, además de restablecer correctamente librerías críticas como zone.js).*

**3. Encender el Servidor de Desarrollo**

Una vez instaladas las dependencias, levanta la aplicación con:

```bash
ng serve -o
```

*(El flag -o abrirá automáticamente tu navegador por defecto).*

¡Listo! La aplicación estará corriendo en **http://localhost:4200**.

**🗺️ Estructura del Proyecto**

El código está organizado siguiendo un enfoque modular por "Features" (Funcionalidades) para facilitar su escalabilidad:

Plaintext

src/

├── app/

│   ├── core/                  # El corazón de datos (Servicios y Modelos)

│   │   ├── models/            # Interfaces de TypeScript (Category, Product, Store)

│   │   └── services/          # Conexiones HTTP al backend (Categorías, Productos, Tiendas)

│   │

│   ├── features/              # Funcionalidades de la aplicación (Vistas principales)

│   │   ├── categories/        # Listado y formulario de categorías

│   │   ├── products/          # Listado y formulario de productos

│   │   └── stores/            # Listado y formulario de tiendas

│   │

│   └── shared/                # Componentes reutilizables

│       └── navbar/            # Menú de navegación principal

│

├── styles.css                 # Estilos globales y paleta de colores personalizada

└── main.ts                    # Punto de arranque de la aplicación (SPA pura sin SSR)

**💡 Decisiones de Arquitectura y Solución de Problemas**

**1. Eliminación del SSR (Server-Side Rendering)** Para este panel administrativo, se deshabilitó intencionalmente el SSR y la pre-renderización. Esto garantiza que la aplicación funcione como una SPA pura, evitando conflictos de "hidratación" con librerías del lado del cliente como Bootstrap y asegurando la estabilidad del motor zone.js.

**2. Caché de Vite (Errores NG0908)** Si alguna vez experimentas un error indicando que "Angular requires Zone.js" tras realizar cambios profundos, puedes limpiar la caché de Vite ejecutando:

```bash
rmdir /s /q .angular

ng serve --force
``` 