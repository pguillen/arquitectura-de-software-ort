# QueryTool

Este componente se encarga de recibir requests correspondientes a las 7 queries solicitadas para el proyecto.

## Colección de Postman
En la carpeta postman se encuentran los archivos .json correspondientes a las importaciones desde Postman de las colecciones de request's. 
Hay una colección correspondiente a la autenticación de usuarios y otra a las queries. Para visualizarlas deberá importarlas desde Postman con el asistente. Cada request contiene información relativa a su comportamiento y modo de uso.

## routes
Maneja las rutas a nuestros recursos. Colocamos cada ruta (para airlines, airports, flights, auth y query7) en un archivo separado dentro de la carpeta api, que luego es referenciado por index.js. Cada archivo de ruta se encarga de llamar a su controller correspondiente.

## controllers
Maneja los controllers que se encargan de llamar a los services. Definimos un controller por cada recurso (airlines, airports, flights, auth, query7).
A su vez se manejan los status codes (SUCCESS, INTERNAL_SERVER_ERROR, etc).

## services
Contiene los servicios con la lógica referente a las consultas a nuestra MongoDB. Cada service importa el model correspondiente.
También cuenta con un TimeServiceManager. Este componente auxiliar se utiliza para mostrar los timestamps de los request y response de cada query, para luego añadirlo a la variable res.locals y mostrarlos al cliente.

## models
Contiene los esquemas de datos de nuestra MongoDB, correspondientes a nuestras colecciones de airports, airlines, flights y users.

## database
Gestiona la conexión a la base de datos. 

## config
Contiene la configuración para el servidor de base de datos (MongoDB) y el manejo del package Passport, que empleamos para la gestión de autenticación de usuarios.