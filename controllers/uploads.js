const path = require('path');
const fs = require('fs');

const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { ActualizarImagen } = require("../helpers/Actualizar-imagen");


const fileUpload = (req, res = response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    //validar tipo de
    const tiposValidos = ['hospitales','medicos','usuarios'];
    if( !tiposValidos.includes(tipo) ){
        return res.status(400).json({
            ok:false,
            msg: 'No es un médico, usuario u hospital'
        });
    }

    //validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok:false,
            msg: 'No hay ningún archivo'
        });
      }

    //procesar la imagen

    const file = req.files.imagen;

    const cutName = file.name.split('.');
    const extensionFile = cutName[ cutName.length - 1];

    //Validar extension

    const extensionValidas = ['png','jpg','jpeg','gif'];
    if( !extensionValidas.includes( extensionFile ) ){
        return res.status(400).json({
            ok:false,
            msg: 'No es una extensión válida'
        });
    }

    //generar nombre de la imagen
    const nombreArchivo = `${ uuidv4() }.${ extensionFile }`;

    //path para guardar imagene
    const path = `./uploads/${ tipo }/${ nombreArchivo }`;

    // move the imagen
    file.mv(path, (err) => {
       // console.log(err);
        if (err)
            return res.status(500).json({ 
                ok: false,
                msg: 'Error al mover la imagen'
            });

            //Actualizar base de datos

            ActualizarImagen( tipo, id, nombreArchivo );

            res.json({
                ok: true,
                msg: 'Archivo subido',
                nombreArchivo
            });
        }); 

}

const retornaImagen = ( req, res = response ) =>{

    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join( __dirname, `../uploads/${ tipo }/${ foto }`);

   //default image
    if ( fs.existsSync( pathImg ) ) {
            res.sendFile( pathImg );
    } else {
        const pathImg = path.join( __dirname, `../uploads/no-img.jpg`);
        res.sendFile( pathImg );
    }

}

module.exports = {
    fileUpload,
    retornaImagen
}