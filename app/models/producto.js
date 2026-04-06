const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  nombre: { 
    type: String, 
    required: true 
  },
  descripcion: { 
    type: String, 
    required: true 
  },
  precio: { 
    type: Number, 
    required: true 
  },
  stock: { 
    type: Number, 
    default: 0 
  },
  categoria: { 
    type: String, 
    required: true 
  },
  imagenUrl: { 
    type: String 
  }
}, { timestamps: true }); 

module.exports = mongoose.model('Product', productSchema);