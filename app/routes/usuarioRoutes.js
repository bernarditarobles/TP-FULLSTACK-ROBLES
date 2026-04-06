const express = require('express');
const router = express.Router();
const { registrarUsuario } = require('../controllers/usuarioController');

// Definimos la ruta para el registro
router.post('/', registrarUsuario);

module.exports = router;