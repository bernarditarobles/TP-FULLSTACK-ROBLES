const express = require('express');
const router = express.Router();
const ordenController = require('../controllers/ordenController');
const auth = require('../middleware/auth'); 

router.post('/checkout', auth, ordenController.finalizarCompra);
router.get('/historial', auth, ordenController.obtenerOrdenes);

module.exports = router;