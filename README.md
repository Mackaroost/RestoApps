 Restaurancy

Una aplicación web para explorar categorías de comidas y comidas por área utilizando la API de TheMealDB, construida con Next.js y estilizada con Tailwind CSS.

## Características

-   Navegar comidas por categoría.
-   Navegar comidas por área.
-   Enrutamiento dinámico para mostrar comidas basadas en el área.
-   Llamadas a API con `fetch`.
-   Gestión de estado con `useState`.
-   Estilos con Tailwind CSS.

## Comenzando

Primero, ejecuta el servidor de desarrollo:

bash

Copiar código

`npm run dev
# o
yarn dev
# o
pnpm dev
# o
bun dev` 

Abre [http://localhost:3000](http://localhost:3000) con tu navegador para ver el resultado.

## Descripción del Código

### Llamadas a la API

Las llamadas a la API se realizan usando la función `fetch` para obtener los datos de TheMealDB. Esto incluye obtener listas de categorías y detalles de comidas basadas en la categoría seleccionada.

### Gestión del Estado

La aplicación utiliza el hook `useState` para gestionar el estado de las categorías de comidas, la categoría seleccionada, los datos de las comidas y las áreas disponibles. Esto permite que los componentes se actualicen automáticamente cuando cambian los datos.

### Enrutamiento Dinámico

Next.js facilita el enrutamiento dinámico, permitiendo redirigir a los usuarios a páginas específicas basadas en el área seleccionada. Esto se logra mediante el uso del hook `useRouter` para manejar la navegación programáticamente.

### Estilos con Tailwind CSS

Tailwind CSS se utiliza para aplicar estilos a la aplicación de manera rápida y eficiente. Se han estilizado diversos componentes, como los selectores de categorías y áreas, para mejorar la apariencia y la usabilidad de la aplicación.
