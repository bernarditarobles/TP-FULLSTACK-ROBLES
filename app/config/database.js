
const mongoose = require('mongoose');
const CONFIG = require('./config');

mongoose.set('strictQuery', false);

module.exports = {
    connection: null,
    connect: function() {
        if (this.connection) return this.connection;
        
        return mongoose.connect(CONFIG.URIDB)
            .then(connection => {
                this.connection = connection;
                console.log('✅ Conexión a Base de Datos exitosa');
            })
            .catch(err => console.log('❌ Error en DB:', err));
    }
};