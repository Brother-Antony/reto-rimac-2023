# Proyecto de Prueba Técnica - FrontEnd

Bienvenido a la documentación de mi proyecto de prueba técnica para FrontEnd. Este proyecto implementa las vistas de Login, Plans, Summary y la página de error 404 (404 Not Found). Siguiendo el diseño proporcionado en Figma. A continuación, encontrarás detalles sobre las librerías y bibliotecas utilizadas, cómo se dividieron las tareas, cómo levantar el proyecto y otras notas importantes.

## Librerías y Bibliotecas Utilizadas

- **React**: Utilicé React como mi biblioteca principal para construir la interfaz de usuario. React es ampliamente utilizado y proporciona una estructura organizada para crear componentes reutilizables.

- **React Router Dom**: Implementé React Router Dom para gestionar la navegación entre las diferentes vistas (Login, Plans, Summary).

- **Tailwind CSS**: Utilicé Tailwind CSS como mi framework de estilos. Tailwind proporciona clases predefinidas que facilitaron la creación de diseños receptivos y atractivos.

- **Sass**: Integré Sass para preprocesar mis estilos. Sass simplificó la escritura de estilos y permitió una mejor organización de mis hojas de estilo.

- **Font Awesome**: Importé Font Awesome para incluir iconos en mi aplicación.

- **Axios**: Utilicé Axios para realizar peticiones a APIs externas. Esto permitió la integración de datos externos en la aplicación, como obtener información de planes y otras funcionalidades basadas en datos en tiempo real.

- **universal-cookie**: Integré la biblioteca universal-cookie para gestionar las cookies en la aplicación. Esto permitió almacenar y gestionar datos importantes del usuario, como las credenciales de inicio de sesión y otras preferencias, de manera segura y eficiente.

## División de Tareas

- **Login**: Implementé la vista de inicio de sesión, incluyendo la recopilación de datos del usuario y la autenticación. Me aseguré de que la interfaz de usuario fuera intuitiva y amigable. Además, agregué validaciones personalizadas para mejorar la experiencia del usuario, incluyendo mensajes de error informativos. Estas validaciones garantizan que los usuarios ingresen datos válidos y proporcionan retroalimentación en caso de errores.

- **Plans**: Creé la vista de Plans, donde los usuarios pueden seleccionar opciones y personalizar su plan. Integramos la lógica para mostrar las opciones de plan y calcular el precio.

- **Summary**: Desarrollé la vista de Summary, que muestra un mensaje de bienvenida al usuario y resumen de su selección de plan.

- **Página de Error 404 (404 Not Found)**: Diseñé y desarrollé la página de error 404 para manejar situaciones en las que los usuarios intentan acceder a una página que no existe. Esta página proporciona una experiencia amigable al usuario en caso de rutas incorrectas.

- **Modales**: Agregué dos modales en la aplicación. Uno se activa cuando el usuario selecciona "COMPRA POR ESTE MEDIO" y el otro se muestra cuando se hace clic en "APLICAN TÉRMINOS Y CONDICIONES". Implementé estos modales utilizando React Hooks para gestionar su estado y comportamiento.

## Implementación del SEO

Además de la funcionalidad principal, también implemente técnicas de SEO para mejorar la visibilidad en los motores de búsqueda. He optimizado las etiquetas HTML y metadatos, lo que mejora la indexación y la clasificación en los resultados de búsqueda. Esto asegura que la aplicación sea más fácilmente descubrible por los motores de búsqueda, lo que es esencial para atraer tráfico y usuarios.

He tenido en cuenta los siguientes aspectos clave de SEO:

- **Título de Página Principal**: La aplicación utiliza un título de página principal constante en todas las vistas. Este título refleja el propósito general de la aplicación y es importante para los motores de búsqueda.

- **Meta Descripciones Relevantes**: Se han agregado meta descripciones relevantes para cada página. Estas descripciones proporcionan un resumen conciso del contenido de la página y pueden aparecer en los resultados de búsqueda.

- **Etiquetas Alt para Imágenes**: Se han proporcionado etiquetas alt descriptivas para las imágenes utilizadas en la aplicación. Esto es importante para la accesibilidad y ayuda a los motores de búsqueda a comprender el contenido de las imágenes.

- **URLs Legibles**: Las URLs de las páginas son legibles y reflejan la estructura de la aplicación. Esto facilita la comprensión de la jerarquía de contenido por parte de los motores de búsqueda.

- **Uso de Palabras Clave Relevantes**: Hemos incluido palabras clave relevantes en el contenido de la aplicación para mejorar la indexación y clasificación en los resultados de búsqueda.

- **Sitemap XML**: Se ha generado un sitemap XML que enumera todas las páginas de la aplicación. Esto ayuda a los motores de búsqueda a rastrear e indexar todas las páginas de manera eficiente.

La implementación del SEO es una parte crucial de garantizar que la aplicación sea visible y accesible para los usuarios en línea. Esto contribuye a atraer tráfico y aumentar la presencia en línea, lo que es beneficioso para cualquier proyecto web.

## Cómo Levantar el Proyecto

1. Clona este repositorio en tu máquina local utilizando el siguiente comando:

git clone https://github.com/Brother-Antony/reto-rimac-2023.git

2. Entra en el directorio del proyecto:

cd reto-rimac-2023

3. Instala las dependencias necesarias:

npm install

4. Inicia la aplicación en modo de desarrollo:

npm run dev

5. Abre tu navegador y ve a `http://localhost:5173` para ver la aplicación en acción.

¡Gracias por revisar mi proyecto! Espero que sea de tu interés y te invite a considerar mi candidatura para esta posición.
