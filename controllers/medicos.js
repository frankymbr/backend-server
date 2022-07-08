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

const updateMedicos = (req, res = response) => {
    res.json({
        ok:true,
        msg: 'Update updateMedicos'
    })
}

const deleteMedicos = (req, res = response) => {
    res.json({
        ok:true,
        msg: 'Delete deleteMedicos'
    })
}

module.exports = {
    getMedicos,
    createMedicos,
    updateMedicos,
    deleteMedicos
}