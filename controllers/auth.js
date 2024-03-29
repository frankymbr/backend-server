const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');
const { getMenuFrontend } = require('../helpers/menu-frontend');

const login = async( req, res = response) =>{

    const {email, password} = req.body;

    try {

        //verificar email
        const usuarioDB = await Usuario.findOne({ email });

        if(!usuarioDB){
            return res.status(400).json({
                ok: false,
                msg: 'Email no valido'
            });
        }

        //verificar contraseña

        const validPassword = bcrypt.compareSync( password, usuarioDB.password );
        if( !validPassword ){
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no valida'
            })
        }

        //generar el TOKEN
        const token = await generarJWT( usuarioDB.id );
        
        res.json({
            ok: true,
            token,
            menu: getMenuFrontend( usuarioDB.role )
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}


const googleSingIn = async( req, res = response) =>{

    try {

        const { email, name, picture } = await googleVerify( req.body.token );

        const usuarioDB  = await Usuario.findOne({ email });
        let usuario;

        if( !usuarioDB ){
            usuario = new Usuario({
                nombre: name,
                email, 
                password: '@@@',
                img: picture,
                google: true
            })
        }else{
            usuario = usuarioDB;
            usuario.google = true;
        }

        //Guardar usuario
        await usuario.save();

        //generar el TOKEN
        const token = await generarJWT( usuario.id );

        res.json({
            ok: true,
            email, name, picture,
            token,
            menu: getMenuFrontend( usuario.role )
        });
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Token de Google incorrecto'
        });
    }
}

const renewToken = async(req, res = response) => {

    const uid = req.uid;

    //generar el TOKEN
    const token = await generarJWT( uid );

    const usuario = await Usuario.findById( uid );

    res.json({
        ok:true,
        token,
        usuario,
        menu: getMenuFrontend( usuario.role )
    });

}


module.exports = {
    login,
    googleSingIn,
    renewToken
}