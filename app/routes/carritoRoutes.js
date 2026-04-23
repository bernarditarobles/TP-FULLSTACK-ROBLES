const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/carritoController');
const auth = require('../middleware/auth');

router.post('/', auth, carritoController.agregarAlCarrito);
router.get('/', auth, carritoController.obtenerCarrito);
router.delete('/:productoId', auth, carritoController.eliminarDelCarrito);

module.exports = router;