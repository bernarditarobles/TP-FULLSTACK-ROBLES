const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const auth = require('../middleware/auth');

router.post('/register', usuarioController.registrarUsuario);
router.post('/login', usuarioController.loginUsuario);
router.post('/password-reset', usuarioController.olvidoPassword); 
router.put('/password-reset/:token', usuarioController.restablecerPassword);
router.get('/profile', auth, usuarioController.obtenerPerfil);

module.exports = router;