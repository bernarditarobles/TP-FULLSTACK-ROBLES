const Orden = require('../models/orden');
const Carrito = require('../models/carrito');
const Producto = require('../models/producto');

const ordenController = {
    async finalizarCompra(req, res) {
        try {
            const usuarioId = req.usuario.id;

            const carrito = await Carrito.findOne({ usuario: usuarioId }).populate('items.producto');

            if (!carrito || carrito.items.length === 0) {
                return res.status(400).json({ ok: false, message: "El carrito está vacío." });
            }

            const itemsOrden = [];
            for (const item of carrito.items) {
                if (item.producto.stock < item.cantidad) {
                    return res.status(400).json({ 
                        ok: false,
                        message: `Stock insuficiente para: ${item.producto.nombre}. Disponible: ${item.producto.stock}` 
                    });
                }
                

                item.producto.stock -= item.cantidad;
                await item.producto.save();

                itemsOrden.push({
                    producto: item.producto._id,
                    cantidad: item.cantidad,
                    precioUnitario: item.producto.precio
                });
            }

            const nuevaOrden = new Orden({
                usuario: usuarioId,
                items: itemsOrden,
                total: carrito.total,
                numeroPedido: `ORD-${Date.now()}`, 
                estado: 'PENDIENTE' 
            });

            await nuevaOrden.save();

            await Usuario.findByIdAndUpdate(usuarioId, { direccionGuardada: req.body.direccionEnvio });

            carrito.items = [];
            carrito.total = 0;
            await carrito.save();

            res.status(201).json({
                ok: true,
                message: "¡Compra finalizada con éxito!",
                orden: nuevaOrden
            });

        } catch (error) {
            res.status(500).json({ ok: false, message: "Error al procesar el checkout", error: error.message });
        }
    },


    async obtenerOrdenes(req, res) {
        try {
            const usuarioId = req.usuario.id; 

            const ordenes = await Orden.find({ usuario: usuarioId })
                .populate('items.producto') 
                .sort({ createdAt: -1 }); 

            res.status(200).json({ ok: true, ordenes });
        } catch (error) {
            res.status(500).json({ 
                ok: false,
                message: "Error al obtener el historial", 
                error: error.message 
            });
        }
    }
};

module.exports = ordenController;