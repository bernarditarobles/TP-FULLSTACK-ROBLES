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

_______________________________________________________________________________________

# ENDPOINTS
### Autenticación y Usuarios
Registrar nuevo usuario: POST /api/users/register     |

Inicio de sesion - obtener token: POST /api/users/login    |

Obtener datos del perfil actual: GET /api/users/profile  (Requiere TOKEN).      |

UNA VEZ EN LA SESION SE REQUIERE TOKEN

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
