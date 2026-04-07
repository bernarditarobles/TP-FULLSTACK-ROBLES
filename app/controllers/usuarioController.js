const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');
const CONFIG = require('../config/config');

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

        res.status(201).json({
            message: 'Usuario creado con éxito'});
    } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error al registrar usuario', error: error.message
        });
    }
},

    async loginUsuario(req, res){
        try{
            const { email, password} = req.body;
            const usuario = await Usuario.findOne({ email });
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

            res.status(200).json({token});
        
        }catch (error){
            res.status(500).json({ message: 'Error al iniciar sesión.', error: error.message });
        }

    }

};

module.exports = usuarioController;