const Producto = require('../models/producto');

const productoController = {
    async crearProducto(req, res) {
        try {
            const { nombre } = req.body;

            const existeProducto = await Producto.findOne({ nombre });
            
            if (existeProducto) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Error: Ya existe un componente con ese nombre exacto.'
                });
            }

            const nuevoProducto = new Producto(req.body);
            await nuevoProducto.save();
            
            res.status(201).json({
                ok: true,
                msg: 'Producto guardado con éxito',
                producto: nuevoProducto
            });
        } catch (error) {
            res.status(500).json({
                ok: false,
                msg: 'Error interno en el servidor',
                error: error.message
            });
        }
    },

    async obtenerProductos(req, res) {
        try {
            const { search, categoria, minPrecio, maxPrecio } = req.query;
            let query = {};

            if (search) {
                query.nombre = { $regex: search, $options: 'i' };
            }

            if (categoria) {
                query.categoria = categoria;
            }

            if (minPrecio || maxPrecio) {
                query.precio = {};
                if (minPrecio) query.precio.$gte = Number(minPrecio);
                if (maxPrecio) query.precio.$lte = Number(maxPrecio);
            }

            const productos = await Producto.find(query);
            res.status(200).json(productos);

        } catch (error) {
            res.status(500).json({ message: 'Error al obtener productos', error: error.message });
        }
    },

    //ESPECIFICACIONES DE UN PRODUCTO EN PARTICULAR
    async obtenerProductoPorId(req, res) {
        try {
            const producto = await Producto.findById(req.params.id);
            if (!producto) return res.status(404).json({ message: 'Producto no encontrado' });
            
            res.status(200).json(producto);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener el detalle', error: error.message });
        }
    },

    async actualizarProducto(req, res)  {
    try {
        const producto = await Producto.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        );
        if (!producto) return res.status(404).json({ message: 'Producto no encontrado' });
        res.json({ message: 'Producto actualizado!', producto });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar', error });
    }
    }
};

module.exports = productoController;