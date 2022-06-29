require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

//Crear el servidor de express 
const app = express();

//configurar CORS
app.use(cors());

//base datos
dbConnection();

//username: frank
//password: MongoDB123.
//rutas
app.get( '/', (req, res) => {

    res.json({
        ok: true,
        msg: 'Hola Frank'
    });
});

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' +process.env.PORT);
});