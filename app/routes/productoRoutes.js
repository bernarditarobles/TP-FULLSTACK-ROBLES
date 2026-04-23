const express = require('express');
const router = express.Router();
const { crearProducto, obtenerProductos } = require('../controllers/productoController');

const auth = require('../middleware/auth');
router.get('/', auth, obtenerProductos);

// Definimos los endpoints
router.post('/', crearProducto); // Para crear: POST /api/productos
router.get('/', obtenerProductos); // Para ver: GET /api/productos

module.exports = router;