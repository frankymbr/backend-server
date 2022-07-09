require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

//Crear el servidor de express 
const app = express();

//configurar CORS
app.use(cors());

//Carpeta publica
app.use( express.static('public') );

//Lectura y parseo del body
app.use( express.json() );

//base datos
dbConnection();

//Rutas
app.use( '/api/usuarios', require('./routes/usuarios') );
app.use( '/api/hospitales', require('./routes/hospitales') );
app.use( '/api/medicos', require('./routes/medicos') );
app.use( '/api/login', require('./routes/auth') );
app.use( '/api/busquedas', require('./routes/busquedas') );
app.use( '/api/uploads', require('./routes/uploads') );

//username: frank
//password: MongoDB123.
//rutas


app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' +process.env.PORT);
});