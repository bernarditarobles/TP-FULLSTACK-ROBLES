const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/carritoController');
const auth = require('../middleware/auth');

router.use(auth);

router.post('/', carritoController.agregarAlCarrito);
router.get('/', carritoController.obtenerCarrito);
router.delete('/:productoId', carritoController.eliminarDelCarrito);

module.exports = router;