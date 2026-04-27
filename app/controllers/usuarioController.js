const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');
const Carrito = require('../models/carrito');
const CONFIG = require('../config/config');
const crypto = require('crypto');

const usuarioController = {

    async registrarUsuario(req, res) {
        try {
            const { nombre, email, password, rol} = req.body;

            const existeEmail = await Usuario.findOne({ email });
            if (existeEmail) {
            return res.status(409).json({ msg: 'Ese correo ya está registrado'
                });
            }

            const usuario = new Usuario({ nombre, email, password, rol });
            await usuario.save();

            res.status(201).json({ message: 'Usuario creado con éxito' });

        } catch (error) {
                if (error.name === 'ValidationError') {
                    const mensajes = Object.values(error.errors).map(el => el.message);
                    return res.status(400).json({ message: 'Error de validación', errores: mensajes });
                }
                res.status(500).json({ message: 'Error al registrar usuario', error: error.message });
        }
    },

    async loginUsuario(req, res){
        try{
            const { email, password} = req.body;
            const usuario = await Usuario.findOne({ email }).select('+password');
            if (!usuario) {
                return res.status(401).json({ message: 'Su usuario es invalido' });
            }

            const isMatch = await usuario.comparePassword(password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Su contrasena es incorrecta.' });
            }

            const token = jwt.sign(
                { id: usuario._id, email: usuario.email, rol: usuario.rol },
                CONFIG.JWT_SECRET,
                { expiresIn: CONFIG.JWT_EXPIRES_IN }
            );            

            const carritoPendiente = await Carrito.findOne({ usuario: usuario._id }).populate('items.producto');

            res.status(200).json({
                message: 'Inicio de sesión exitoso',
                token,
                carrito: carritoPendiente || { items: [], total: 0 } // Requisito de persistencia
            });
        
        }catch (error){
            res.status(500).json({ message: 'Error al iniciar sesión.', error: error.message });
        }

    },

    async olvidoPassword(req, res) {
        try {
            const { email } = req.body;
            const usuario = await Usuario.findOne({ email });

            if (!usuario) {
                return res.status(404).json({ message: 'No existe un usuario con ese correo' });
            }

            const token = crypto.randomBytes(20).toString('hex');


            usuario.resetPasswordToken = token;
            usuario.resetPasswordExpires = Date.now() + 3600000; 

            await usuario.save();

            res.status(200).json({ 
                message: 'Se ha generado el token de recuperación',
                token: token
            });

        } catch (error) {
            res.status(500).json({ message: 'Error al procesar la solicitud', error: error.message });
        }
    },

    async restablecerPassword(req, res) {
        try {
            const { token } = req.params;
            const { password } = req.body;

            const usuario = await Usuario.findOne({
                resetPasswordToken: token,
                resetPasswordExpires: { $gt: Date.now() }
            });

            if (!usuario) {
                return res.status(400).json({ message: 'El token es inválido o ha expirado' });
            }

            usuario.password = password;
            usuario.resetPasswordToken = undefined;
            usuario.resetPasswordExpires = undefined;

            await usuario.save();

            res.status(200).json({ message: 'Contraseña actualizada con éxito' });

        } catch (error) {
            res.status(500).json({ message: 'Error al restablecer la contraseña', error: error.message });
        }
    },

    async obtenerPerfil(req, res) {
        try {
            const usuario = await Usuario.findById(req.usuario.id);

            if (!usuario) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            res.status(200).json({
                id: usuario._id,
                nombre: usuario.nombre,
                email: usuario.email,
                rol: usuario.rol
            });
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener el perfil', error: error.message });
        }
    }

};

module.exports = usuarioController;