- **Backend en ejecución:** Esta aplicación necesita que la API de Spring Boot esté corriendo localmente en http://localhost:8081.

**2. Instalación de Dependencias**

Abre tu terminal, navega hasta la raíz de este proyecto y descarga las librerías necesarias:

Bash

npm install

*(Nota: Esto instalará Angular, RxJS y Bootstrap, además de restablecer correctamente librerías críticas como zone.js).*

**3. Encender el Servidor de Desarrollo**

Una vez instaladas las dependencias, levanta la aplicación con:

Bash

ng serve -o

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

Bash

rmdir /s /q .angular

ng serve --force

