const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UsuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'CAMPO OBLIGATORIO'],
        trim: true,
        match: [/^[a-zA-Z\s]+$/, 'El nombre no puede contener números']
    },
    email: {
        type: String,
        required: [true, 'CAMPO OBLIGATORIO'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/.+\@.+\..+/, 'Por favor ingrese un correo válido']
    },
    password: {
        type: String,
        required: [true, 'CAMPO OBLIGATORIO'],
        minlength: [8, 'La contraseña debe tener al menos 8 caracteres'],
        select: false
    },
    rol: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE'], 
        default: 'USER_ROLE'
    },
    direccionGuardada: { type: String, default: "" },
    resetPasswordToken: String,
    resetPasswordExpires: Date
}, {
    timestamps: true 
});

UsuarioSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

UsuarioSchema.methods.comparePassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password);
}

module.exports = mongoose.model('Usuario', UsuarioSchema);