# DOCUMENTACIÓN EN ESPAÑOL
Este es un proyecto de [Next.js](https://nextjs.org/) creado desde cero con [`npx create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app), para la gestión de Menús de restaurantes y otras entidades dedicadas a la gastronomía.

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

### Librerías NPM utilizadas en el desarrollo
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

### Estructura de la base de datos
Por las características del proyecto, para la persistencia de la información se utilizó __SQLite__ como base de datos relacional y el __ORM Prisma__. Con el msimo, a partir de las funcionalidades que requiere el sistema, se definió en el fichero `./prisma/schema.prisma` el siguiente esquema para los modelos:
```
model Product {
  id          Int       @id @default(autoincrement())
  name        String
  description String?
  category    String
  createdAt   DateTime  @default(now())
  menus       ProductsOnMenu[]
}

model Menu {
  id            Int     @id @default(autoincrement())
  title         String
  description   String?
  active        Boolean @default(false)
  products      ProductsOnMenu[]
}

model ProductsOnMenu {
  product_id  Int
  menu_id     Int
  product     Product @relation(fields: [product_id], references: [id], onDelete: Cascade)
  menu        Menu @relation(fields: [menu_id], references: [id], onDelete: Cascade)
  price       Float

  @@id([menu_id, product_id])
}
```

Con el esquema anterior se puede apreciar la estructura de la base de datos, con dos modelos: __*Product*__ y __*Menu*__; y una relación de mucho-a-mucho (*many-to-many*) entre ambas que genera una nueva tabla llamada __*ProductsOnMenu*__, que almacena además el *precio* de un producto en un menú determinado.

La base de datos *SQLite* se almacena en el fichero que se especifique en el fichero de configuración del proyecto (`.env`). En este caso
```
DATABASE_URL="file:./menus.db"
```
almacenando los datos de la aplicación en el fichero *menu.db* dentro de la carpeta `./prisma`.

Dicho fichero puede ser leído por cualquier gestor de base de datos que soporte *SQLite*.

## Inicio rápido
Después de clonar el repositorio del proyecto, usted debe:
1. Instalar las dependencias de Node ejecutando el comando `npm install`.
2. Ejecutar el proyecto con el comando `npm run dev`.

Al realizar los pasos anteriores, el proyecto estará ejecutándose en la dirección local http://localhost:3000, el cual podrá acceder desde su navegador y podrá visualizar e interactuar con el sistema.

## Solución desarrollada
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


# ENGLISH DOCUMENTATION
This is a [Next.js](https://nextjs.org/) project created from scratch with [`npx create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app), for the management of restaurant's Menus and other companies dedicated to gastronomy.

## Objectives
1. Develop a menu planning web application with React, TypeScript and NodeJS.
2. Use UI/UX libraries of choice to enhance the user experience.

## Sections and Tasks:
- Design and Structure:
    1. Create a web application with responsive and attractive design.
    2. Include header, title and navigation menu.
    3. Design sections for weekly menu creation and display.

- Functionality (JavaScript):
    1. Allow users to create custom weekly menus.
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
|[SQLite](https://www.sqlite.org/)|-|Database|

### Libraries used in the development
|Library|Version|Description|
|-|-|-|
|[@mui/material](https://mui.com/material-ui)|v5.15.10|Framework for UI/UX layout|
|[@mui/icons-material](https://mui.com/material-ui/getting-started/installation/#icons)|v5.15.10|Material UI icons|
|[prism](https://www.prisma.io/)|v5.9.1|ORM|
|[@reduxjs/toolkit](https://redux-toolkit.js.org/)|v2.2.1|For handling global states in the application|

### Other tools used in the development
|Tool|Version|Description|
|-|-|-|
|[VS Code](https://code.visualstudio.com/)|v1.86.2|Integrated development environment|
|[Thunder Client](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client) extension|v2.17.8|Extension for testing API Rest in VS Code|
|[SQLite Viewer](https://marketplace.visualstudio.com/items?itemName=qwtel.sqlite-viewer) extension|v0.3.17|Extension to view SQLite database content in VSCode|
|['React Developer Tools'](https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) extension|v5.0.0|Google Chrome extension for inspecting React components, editing props and states, and identifying performance issues.

### Database structure
Due to the characteristics of the project, __SQLite__ was used as a relational database and the __ORM Prisma__ for the persistence of the information. With the same, based on the functionalities required by the system, the following schema for the models was defined in the file `./prisma/schema.prisma`:
```
model Product {
  id Int @id @default(autoincrement())
  name String
  description String?
  category String
  createdAt DateTime @default(now())
  menus ProductsOnMenu[]
}
model Menu {
  id Int @id @default(autoincrement())
  title String
  description String?
  active Boolean @default(false)
  products ProductsOnMenu[]
}
model ProductsOnMenu {
  product_id Int
  menu_id Int
  product Product Product @relation(fields: [product_id], references: [id], onDelete: Cascade)
  menu Menu @relation(fields: [menu_id], references: [id], onDelete: Cascade)
  price Float
  @@id([menu_id, product_id])
}
```
With the above schema you can see the structure of the database, with two models: __*Product*__ and __*Menu*__; and a *many-to-many* relationship between the two that generates a new table called __*ProductsOnMenu*__, which also stores the *price* of a product in a given menu.
The *SQLite* database is stored in the file specified in the project configuration file (`.env`). In this case
```
DATABASE_URL="file:./menus.db"
```
storing the application data in the *menu.db* file inside the `./prism` folder.
This file could be read by any database manager that supports *SQLite*.

## Quickstart
After cloning the project repository, you must:
1. Install the Node dependencies by running the `npm install` command.
2. Run the project with the `npm run dev` command.

## Solution developed
### Main functionalities
1. Add products.
2. Edit products.
3. Delete products.
4. Search products (filter by name).
5. Add menu.
6. Edit menu.
7. Delete menu.
8. Activate menu.
9. To see products of a menu grouped by categories.
10. Select products of interest.
11. Add selected products to the shopping cart.
12. View products in the shopping cart and the total amount.
13. Remove products from the shopping cart.

### Final clarifications and improvement suggestions
- The system is fully responsive and has a user-friendly graphical interface.
- Due to time constraints an authentication to the system was not included.
- For the same reason above, the system does not allow you to upload a custom image, so it has static images.
- To add more quantities of the same product to the cart, you must add the same product as many times as you want to have.
- Being a small system, the listings are not paginated.