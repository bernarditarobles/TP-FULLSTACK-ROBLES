const Carrito = require('../models/carrito');
const Producto = require('../models/producto'); 

const carritoController = {

    async agregarAlCarrito(req, res) {
        const { productoId, cantidad } = req.body;

        const usuarioId = req.usuario.id; 

        try {
            const productoExistente = await Producto.findById(productoId);
            if (!productoExistente) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }

            let carrito = await Carrito.findOne({ usuario: usuarioId });

            if (!carrito) {

                carrito = new Carrito({
                    usuario: usuarioId,
                    items: [{ producto: productoId, cantidad }],
                    total: productoExistente.precio * (cantidad || 1)
                });
            } else {
    
                const itemIndex = carrito.items.findIndex(item => item.producto.toString() === productoId);

                if (itemIndex > -1) {
                    carrito.items[itemIndex].cantidad += (cantidad || 1);
                } else {
                    carrito.items.push({ producto: productoId, cantidad: (cantidad || 1) });
                }


                carrito.total += productoExistente.precio * (cantidad || 1);
            }

            await carrito.save();
            res.status(200).json({ message: '¡Producto agregado con éxito!', carrito });

        } catch (error) {
            console.error("Error detallado:", error);
            res.status(500).json({ message: 'Error en el servidor', error: error.message });
        }
    },

    async obtenerCarrito(req, res) {
        try {
            const carrito = await Carrito.findOne({ usuario: req.usuario.id }).populate('items.producto');
            res.status(200).json(carrito || { items: [], total: 0 });
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener carrito', error: error.message });
        }
    },

    async eliminarDelCarrito(req, res) {

        const { productoId } = req.params; 
        const usuarioId = req.usuario.id;

        try {
            let carrito = await Carrito.findOne({ usuario: usuarioId });

            if (!carrito) {
                return res.status(404).json({ message: 'No se encontró el carrito' });
            }

            const nuevosItems = carrito.items.filter(item => item.producto.toString() !== productoId);

            if (nuevosItems.length === carrito.items.length) {
                return res.status(404).json({ message: 'El producto no estaba en el carrito' });
            }

            carrito.items = nuevosItems;
            await carrito.save();

            res.status(200).json({ message: 'Producto eliminado con éxito', carrito });

        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar', error: error.message });
        }
    }

};

module.exports = carritoController;

