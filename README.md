En este proyecto se ha desarrollado un frontend utilizando Next.js, React, Redux
Toolkit, Tailwind CSS, Formik y Yup. El frontend cuenta con un sistema de autenticación
(login y registro), una página principal que carga todos los productos utilizando lazy
loading, una sección para ver los productos del usuario logueado, una sección para ver
las categorías y otra para ver detalladamente cada producto. Además, el usuario puede
crear, actualizar y borrar productos.

En cuanto al backend, se han implementado dos rutas: la ruta "auth" que utiliza JWT y
bcrypt para la autenticación de usuarios. Esta ruta contiene las siguientes propiedades
del usuario: uniqueName (nombre único), username (nombre de usuario), email, password,
age (edad) e image (imagen). Por otro lado, la ruta "product" permite crear, borrar y
actualizar productos. También es posible obtener productos por ID, por categoría o por
autor.

Este proyecto utiliza MongoDB como base de datos. El backend está desplegado en Deta
Space y el frontend en Vercel.

Para ejecutar este proyecto en local es necesario seguir los siguientes pasos:

1. Clonar el repositorio en tu máquina local.
2. Instalar todas las dependencias del proyecto utilizando el comando `npm install`.
3. Crear un archivo `.env` en la raíz del proyecto con las variables de entorno
necesarias para conectarse a MongoDB, tambien para jwt.
3. Ejecutar el servidor local con el comando `npm run dev`.
4. Abrir el navegador e ingresar a `http://localhost:3000` para acceder al frontend.

Espero que esta explicación sea útil para poder entender cómo funciona este proyecto y
poder ejecutarlo correctamente en local.