// app.js es mi MAIN
const express = require('express');
const path = require('path');
const app = express(); 

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// RUTAS DE PRODUCTOS
const productoRoutes = require('./routes/productoRoutes');
app.use('/api/productos', productoRoutes);

// RUTAS DE USUARIOS 
const usuarioRoutes = require('./routes/usuarioRoutes');
app.use('/api/users', usuarioRoutes); 

// RUTAS DEL CARRITO
const carritoRoutes = require('./routes/carritoRoutes');
app.use('/api/carrito', carritoRoutes);

// RUTAS DE ORDENES
const ordenRoutes = require('./routes/ordenRoutes');
app.use('/api/orden', ordenRoutes);

// VISTA PRINCIPAL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/biblio.html'));
});

module.exports = app;