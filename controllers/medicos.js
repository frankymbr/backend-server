const { response } = require('express');
const Medico = require('../models/medico');

const getMedicos = async(req, res = response) => {

    const medicos = await Medico.find().populate('usuario','nombre img')
                                .populate('hospital','nombre img');

    res.json({
        ok:true,
        medicos
    })
}


const createMedicos = async(req, res = response) => {


    const uid = req.uid;
    //const _id = req._id;
    const medico = new Medico({
        usuario: uid,
        //hospital: _id,
        ...req.body 
    });

    try {

       const medicoDB = await medico.save();

        res.json({
            ok:true,
            medicoDB
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'No se pudo crear el médico'
        })
    }
}

const updateMedicos = async(req, res = response) => {
    const id = req.params.id;
    const uid = req.uid;

    try {

        const medico = await Medico.findById(id);

        if ( !medico ) {
            return res.status(400).json({
                ok:true,
                msg: 'El médico no existe',
                id
            });  
        }

        const updateMedico = {
            ...req.body,
            usuario:uid
        }

        const MeidicoUpdate = await Medico.findByIdAndUpdate( id, updateMedico, { new: true } );

        res.json({
            ok:true,
            Hospital: MeidicoUpdate
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admininstrador'
        });
    }
}

const deleteMedicos = async(req, res = response) => {
    const id = req.params.id;
    
    try {

        const medico = await Medico.findById(id);

        if ( !medico ) {
            return res.status(400).json({
                ok:true,
                msg: 'El médico no existe',
                id
            });  
        }        

        await Medico.findByIdAndDelete( id );

        res.json({
            ok:true,
            msg: 'Médico eliminado'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admininstrador'
        });
    }
}

module.exports = {
    getMedicos,
    createMedicos,
    updateMedicos,
    deleteMedicos
}