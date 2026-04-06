// app/config/config.js
require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 3000,
    URIDB: process.env.MONGO_URI
};