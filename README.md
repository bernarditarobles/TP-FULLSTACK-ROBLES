TP FULLSTACK 2026 - BUILD MY PC 
Bernardita Robles

Proyecto elegido: Tienda de compra de productos de informática para armado de PCs (custom)

# Tecnologías Utilizadas
BACK-END -> Node.js (entorno de ejecucion) y Express.js (Framework)
FRONT-END -> HTML, CSS y JavaScript
BASE DE DATOS -> MongoDB

# Comunicacion entre BACK Y FRONT -> API REST
Peticiones HTTP que tienen un body en formato JSON. 
(GET para pedir, POST para crear, PUT para editar, DELETE para borrar). 

# Estructura del Backend
`/app/models`: estructura de los datos -> gestiona la interacción con BD. 
`/app/controllers`: donde defino direccion -> entrada de los endpoints.
`/app/routes`: Contiene la lógica de negocio y coordina la respuesta del sistema.

# Testing de Endpoints
Thunder Client
