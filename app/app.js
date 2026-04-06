// app.js es mi MAIN

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();   // objeto que me permite crear app

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

const productoRoutes = require('./routes/productoRoutes');
app.use('/api/productos', productoRoutes);

const usuarioRoutes = require('./routes/usuarioRoutes');
app.use('/api/usuarios', usuarioRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/biblio.html'));
})

module.exports = app