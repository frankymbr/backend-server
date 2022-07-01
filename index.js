require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

//Crear el servidor de express 
const app = express();

//configurar CORS
app.use(cors());

//Lectura y parseo del body
app.use( express.json() );

//base datos
dbConnection();

//Rutas
app.use( '/api/usuarios', require('./routes/usuarios') );
app.use( '/api/login', require('./routes/auth') );

//username: frank
//password: MongoDB123.
//rutas


app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' +process.env.PORT);
});