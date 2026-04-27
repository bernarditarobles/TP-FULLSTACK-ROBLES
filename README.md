TP FULLSTACK 2026 - BUILD MY PC 
Bernardita Robles

Proyecto elegido: Tienda de compra de productos de informática para armado de PCs (custom)

# Tecnologías Utilizadas
BACK-END -> Node.js (entorno de ejecucion) y Express.js (Framework) |

FRONT-END -> HTML, CSS y JavaScript   |  

BASE DE DATOS -> MongoDB

# Comunicacion entre BACK Y FRONT -> API REST
Peticiones HTTP que tienen un body en formato JSON. 
(GET para pedir, POST para crear, PUT para editar, DELETE para borrar). 

# Estructura del Backend
/app/models: estructura de los datos -> gestiona la interacción con BD.    |

/app/routes: donde defino direccion -> entrada de los endpoints.    |

/app/controllers: Contiene la lógica de negocio y coordina la respuesta del sistema.    

_____________________________________________________________________________________

## ACLARACION SOBRE EL VIDEO ENTREGADO:
primero ingreso con un usuario ADMIN_ROLE que tiene permisos para agregar y actualizar productos
luego, creo un nuevo usuario (con posibles errores al crear al sesion)
al manejar el carrito, utilizo el TOKEN generado al inicar la sesion ya que el usuario no puede manipular el carrito sin una cuenta ingresada
para recuperar contraseña, no se requiere TOKEN de SESION porque el usuario no está en una cuenta, el token que se genera es el que debería llegarle al usuario por mail para crear una nueva contraseña.

_______________________________________________________________________________________

# ENDPOINTS
### Autenticación y Usuarios
Registrar nuevo usuario: POST /api/users/register     |

Inicio de sesion - obtener token: POST /api/users/login    |

Obtener datos del perfil actual: GET /api/users/profile  (Requiere TOKEN).      |

UNA VEZ EN LA SESION SE REQUIERE TOKEN YA QUE MUESTRA LO QUE PUEDE HACER EL USUARIO EN SU SESION

### Productos
Obtener catálogo de productos completo: GET /api/products       |

Obtener catálogo de productos por una categoría: GET /api/products?categoria=Placas de video        |

Obtener catálogo de productos por marca: GET /api/products?search=Nvidia        |

Obtener especificiaciones de un producto particular: GET /api/products/:id      |

### Carrito de Compras
Recuperar un carrito pendiente al iniciar sesion: GET /api/cart         |

Agregar/Modificar cantidad de ítem: POST /api/cart      |

Eliminar ítem del carrito: DELETE /api/cart/:productoId     |

### Órdenes 
Finalizar compra y generar pedido: POST /api/orders/checkout        |

Ver historial de compras: GET /api/orders/historial     

# Recuperar contraseña
No requiere de TOKEN ya que el usuario no está en una sesión        |

Generar TOKEN para nueva contrasea: POST /api/users/password-reset        |

Guardar nueva contraseña: PUT /api/users/password-reset/{TOKEN GENERADO}        |