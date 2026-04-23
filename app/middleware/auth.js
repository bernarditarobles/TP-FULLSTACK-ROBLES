const jwt = require("jsonwebtoken"); 
const CONFIG = require('../config/config');

function auth(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.startsWith('Bearer ') && authHeader.slice(7);

    if(!token){
        return res.status(401).json({message: 'Acceso denegado. Se requiere TOKEN'});
    }

    try{
        console.log("Token recibido:", token);
        console.log("Usando clave secreta:", CONFIG.JWT_SECRET);
        const payload = jwt.verify(token, CONFIG.JWT_SECRET);
        req.usuario = payload;
        next();
    } catch(error){
        console.log("Error de JWT:", error.message);
        res.status(401).json({ message: 'TOKEN invalido'});
    }
}

module.exports = auth;