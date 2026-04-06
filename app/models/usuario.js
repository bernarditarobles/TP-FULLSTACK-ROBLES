const mongoose = require('mongoose');

// Definimos la estructura del Usuario
const UsuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true // Esto evita que dos personas usen el mismo mail
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    rol: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE'], // Solo permitimos estos dos valores
        default: 'USER_ROLE'
    },
    estado: {
        type: Boolean,
        default: true // Si después querés "borrar" un usuario, solo pasás esto a false
    }
}, {
    timestamps: true // Esto te crea "createdAt" y "updatedAt" automáticamente
});

// Truco profesional: Cuando devolvamos el usuario, NO mostramos la contraseña
UsuarioSchema.methods.toJSON = function() {
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id; 
    return usuario;
};

module.exports = mongoose.model('Usuario', UsuarioSchema);