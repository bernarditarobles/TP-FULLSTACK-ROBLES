const mongoose = require('mongoose');

const OrdenSchema = new mongoose.Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    items: [
        {
            producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto' },
            cantidad: Number,
            precioUnitario: Number 
        }
    ],
    total: { type: Number, required: true },
    estado: { type: String, default: 'confirmado' },
    fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Orden', OrdenSchema);