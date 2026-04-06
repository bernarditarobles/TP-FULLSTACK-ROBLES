const Producto = require('../models/producto');

// Función para crear un producto (POST)
const crearProducto = async (req, res) => {
    try {
        const { nombre } = req.body;

        // 1. Buscamos si ya existe un producto con ese nombre
        const existeProducto = await Producto.findOne({ nombre });
        
        if (existeProducto) {
            return res.status(400).json({
                ok: false,
                msg: 'Error: Ya existe un componente con ese nombre exacto.'
            });
        }

        // 2. Si no existe, lo creamos
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
};

// Función para ver todos los productos (GET)
const obtenerProductos = async (req, res) => {
    const productos = await Producto.find();
    res.json(productos);
};

module.exports = {
    crearProducto,
    obtenerProductos
};