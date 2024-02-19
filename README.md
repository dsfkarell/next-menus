# DOCUMENTACIÓN EN ESPAÑOL
Este es un proyecto de [Next.js](https://nextjs.org/) creado con [`npx create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app), para la gestión de Menús de restaurantes y otras entidades dedicadas a la gastronomía.

## Objetivos
1. Desarrollar una aplicación web de planificación de menús con React, TypeScript
y NodeJS.
2. Utilizar librerías de UI/UX de elección para mejorar la experiencia del usuario.

## Secciones y Tareas:
- Diseño y Estructura:
    1. Crear una aplicación web con diseño responsive y atractivo.
    2. Incluir encabezado, título y menú de navegación.
    3. Diseñar secciones para la creación y visualización de menús semanales.


- Funcionalidad (JavaScript):
    1. Permitir a los usuarios crear menús semanales personalizados.
    2. Implementar búsqueda y adición de recetas a los menús desde una fuente simulada.
    3. Habilitar la edición y eliminación de elementos de los menús.
    4. Generar listas de compras basadas en los elementos seleccionados en los menús.
    5. Alguna funcionalidad agregada por usted.

## Información técnica
### Tecnologías utilizadas para el desarrollo
|Tecnología|Versión|Descripción|
|-|-|-|
|[Node.js](https://nodejs.org/)|v20.11.0|Servidor web|
|[Next.js](https://nextjs.org/)|v14.1.0|Framework backend|
|[React](https://react.dev/)|v18.2.0|Framework frontend|
|[Typescript](typescript)|v5.3.3|Lenguaje de programación|
|[SQLite](https://www.sqlite.org/)|-|Base de datos|

### Librerías utilizadas en el desarrollo
|Librería|Versión|Descripción|
|-|-|-|
|[@mui/material](https://mui.com/material-ui)|v5.15.10|Framework para maquetar UI/UX|
|[@mui/icons-material](https://mui.com/material-ui/getting-started/installation/#icons)|v5.15.10|Íconos de Material UI|
|[prisma](https://www.prisma.io/)|v5.9.1|ORM|
|[@reduxjs/toolkit](https://redux-toolkit.js.org/)|v2.2.1|Para el manejo estados globales en la aplicación|

### Otras herramientas utilizadas en el desarrollo
|Herramienta|Versión|Descripción|
|-|-|-|
|[VS Code](https://code.visualstudio.com/)|v1.86.2|Entorno de desarrollo integrado|
|Extensión [Thunder Client](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client)|v2.17.8|Extension para probar API Rest en VS Code|
|Extensión [SQLite Viewer](https://marketplace.visualstudio.com/items?itemName=qwtel.sqlite-viewer)|v0.3.17|Extensión para visualizar el contenido de bases de datos SQLite en VSCode|
|Extensión ['React Developer Tools'](https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)|v5.0.0|Extensión de Google Chrome para inspeccionar componentes React, editar props y estados, e identificar problemas de rendimiento.|

## Inicio rápido
Después de clonar el repositorio del proyecto, usted debe:
1. Instalar las dependencias de Node ejecutando el comando `npm install`.
2. Ejecutar el proyecto con el comando `npm run dev`.

Al realizar los pasos anteriores, el proyecto estará ejecutándose en la dirección local http://localhost:3000, el cual podrá acceder desde su navegador y podrá visualizar e interactuar con el sistema.

## Solución desarrollada
### Interfaz de usuario
#### Página principal

### Principales funcionalidades
1. Adicionar productos.
2. Editar productos.
3. Eliminar productos.
4. Buscar productos (filtro por nombre).
5. Adicionar menú.
6. Editar menú.
7. Eliminar menú.
8. Activar menú.
9. Ver productos de un menú agrupados por categorías.
10. Seleccionar productos de interés.
11. Adicionar productos seleccionados al carrito de compra.
12. Ver productos en el carrito de compra y el importe total.
13. Eliminar productos del carrito de compra.


### Aclaraciones finales y propuestas de mejora
- El sistema es totalmente responsive y con interfaz gráfica agradable al usuario.
- Por cuestiones de tiempo no se incluyó una autenticación al sistema.
- Por la misma razón anterior el sistema también carece de la funcionalidad de subir una imagen personalizada, por lo que tiene imágenes estáticas.
- Para agregar más cantidades de un mismo producto al carrito, se debe agregar el mismo tantas veces se desee tener.
- Por ser un sistema pequeño, los listados carecen de paginación.

# DOCUMENTATION IN ENGLISH
This is a [Next.js](https://nextjs.org/) project created with [`npx create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app), for the management of Menus of restaurants and other entities dedicated to gastronomy.

## Objectives
1. Develop a menu planning web application with React, TypeScript and NodeJS.
2. Use UI/UX libraries of choice to enhance the user experience.

## Sections and Tasks:
- Design and Structure:
    Create a web application with responsive and attractive design 2.
    2. Include header, title and navigation menu.
    3. Design sections for weekly menu creation and display.


- Functionality (JavaScript):
    Allow users to create custom weekly menus 2.
    2. Implement searching and adding recipes to menus from a mock source.
    3. Enable editing and deletion of items from menus.
    4. Generate shopping lists based on the selected items in the menus.
    5. Some functionality added by you.

## Technical information
### Technologies used for development
|Technology|Version|Description|
|-|-|-|
|[Node.js](https://nodejs.org/)|v20.11.0|Web server|
|[Next.js](https://nextjs.org/)|v14.1.0|Framework backend|
|[React](https://react.dev/)|v18.2.0|Framework frontend|
|[Typescript](typescript)|v5.3.3|Programming language|
|v5.3.3|[SQLite](https://www.sqlite.org/)|-|Database|

Translated with DeepL.com (free version)