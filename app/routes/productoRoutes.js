const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');
const auth = require('../middleware/auth');

router.post('/', productoController.crearProducto); 
router.get('/', productoController.obtenerProductos); 
router.get('/:id', auth, productoController.obtenerProductoPorId);

module.exports = router;