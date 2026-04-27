const Carrito = require('../models/carrito');
const Producto = require('../models/producto');

const carritoController = {
    async agregarAlCarrito(req, res) {
        const { productoId, cantidad } = req.body;
        const usuarioId = req.usuario.id;
        const unidades = parseInt(cantidad) || 1;

        try {
            const productoExistente = await Producto.findById(productoId);
            if (!productoExistente) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }

            if (productoExistente.stock < unidades) {
                return res.status(400).json({ message: 'Stock insuficiente' });
            }

            let carrito = await Carrito.findOne({ usuario: usuarioId });

            if (!carrito) {
                carrito = new Carrito({
                    usuario: usuarioId,
                    items: [{ producto: productoId, cantidad: unidades }],
                    total: productoExistente.precio * unidades
                });
            } else {
                const itemIndex = carrito.items.findIndex(item => item.producto.toString() === productoId);

                if (itemIndex > -1) {
                    carrito.items[itemIndex].cantidad += unidades;
                } else {
                    carrito.items.push({ producto: productoId, cantidad: unidades });
                }

                carrito.total += productoExistente.precio * unidades;
            }

            await carrito.save();
            const montoOperacion = productoExistente.precio * unidades;

            res.status(200).json({ 
                message: "¡Producto agregado con éxito!",
                data: {
                    productoAgregado: productoExistente.nombre,
                    cantidadAgregada: unidades,
                    subtotalOperacion: montoOperacion,
                    totalCarrito: carrito.total
                }
            });

        } catch (error) {
            res.status(500).json({ message: 'Error en el servidor', error: error.message });
        }
    },

    async obtenerCarrito(req, res) {
        try {

            const carrito = await Carrito.findOne({ usuario: req.usuario.id }).populate('items.producto');

            if (!carrito || carrito.items.length === 0) {
                return res.status(200).json({
                    usuarioId: req.usuario.id,
                    items: [],
                    montoTotalCompra: 0
                });
            }

            const itemsFormateados = carrito.items.map(item => ({
                productoId: item.producto._id,
                nombre: item.producto.nombre,
                categoria: item.producto.categoria,
                cantidad: item.cantidad,
                montoTotalItem: item.producto.precio * item.cantidad
            }));

            res.status(200).json({
                usuarioId: carrito.usuario,
                productos: itemsFormateados,
                montoTotalCompra: carrito.total
            });

        } catch (error) {
            res.status(500).json({ 
                message: 'Error al obtener el carrito', 
                error: error.message 
            });
        }
    },

    async eliminarDelCarrito(req, res) {
        const { productoId } = req.params;
        const usuarioId = req.usuario.id;

        try {

            let carrito = await Carrito.findOne({ usuario: usuarioId }).populate('items.producto');

            if (!carrito) {
                return res.status(404).json({ message: 'No se encontró el carrito' });
            }


            const itemIndex = carrito.items.findIndex(item => item.producto._id.toString() === productoId);

            if (itemIndex === -1) {
                return res.status(404).json({ message: 'El producto no está en el carrito' });
            }


            if (carrito.items[itemIndex].cantidad > 1) {
                carrito.items[itemIndex].cantidad -= 1;
            } else {
                carrito.items.splice(itemIndex, 1);
            }

            carrito.total = carrito.items.reduce((acc, item) => {
                return acc + (item.producto.precio * item.cantidad);
            }, 0);

            await carrito.save();

            const itemActualizado = carrito.items.find(item => item.producto._id.toString() === productoId);

            res.status(200).json({ 
                message: "Cantidad actualizada con éxito",
                data: {
                    productoId: productoId,
                    cantidadActualizada: itemActualizado ? itemActualizado.cantidad : 0,
                    totalCarrito: carrito.total
                }
            });

        } catch (error) {
            console.error("Error al eliminar:", error);
            res.status(500).json({ message: 'Error al eliminar', error: error.message });
        }
    }
};

module.exports = carritoController;