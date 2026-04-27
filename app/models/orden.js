const mongoose = require('mongoose');

const OrdenSchema = new mongoose.Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },

    numeroPedido: { type: String, required: true, unique: true }, 
    
    items: [
        {
            producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto' },
            cantidad: { type: Number, required: true },
            precioUnitario: { type: Number, required: true } 
        }
    ],

    total: { type: Number, required: true },

    metodoPago: { 
        type: String, 
        required: true,
        default: 'Tarjeta de Crédito' 
    },

    metodoEnvio: { 
        type: String, 
        required: true,
        default: 'Envío a domicilio'
    },

    direccionEnvio: { 
        type: String 
    },

    estado: { 
        type: String, 
        enum: ['pendiente', 'confirmado', 'entregado', 'cancelado'], 
        default: 'pendiente' 
    },
    fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Orden', OrdenSchema);