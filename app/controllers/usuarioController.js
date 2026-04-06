const Usuario = require('../models/usuario');

const registrarUsuario = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        // 1. Verificamos si el mail ya existe
        const existeEmail = await Usuario.findOne({ email });
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'Ese correo ya está registrado'
            });
        }

        // 2. Creamos el usuario con los datos TAL CUAL llegan (sin encriptar)
        const usuario = new Usuario({ nombre, email, password });

        // 3. Guardamos en MongoDB Atlas
        await usuario.save();

        res.status(201).json({
            ok: true,
            msg: 'Usuario creado con éxito',
            usuario
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al registrar usuario'
        });
    }
};

module.exports = { registrarUsuario };