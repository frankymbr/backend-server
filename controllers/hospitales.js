const { response } = require('express');
const Hospital = require('../models/hospital');

const getHospitals = async(req, res = response) => {

const hospitales = await Hospital.find().populate('usuario','nombre img');

    res.json({
        ok:true,
        hospitales
    })
}


const createHospitals = async(req, res = response) => {

    const uid = req.uid;
    const hospital = new Hospital({
        usuario: uid,
        ...req.body 
    });

    try {

       const hospitalDB = await hospital.save();

        res.json({
            ok:true,
            hospitalDB
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'No se pudo crear el hospital'
        })
    }
    
    
}

const updateHospitals = (req, res = response) => {
    res.json({
        ok:true,
        msg: 'Update Hospitals'
    })
}

const deleteHospitals = (req, res = response) => {
    res.json({
        ok:true,
        msg: 'Delete Hospitals'
    })
}

module.exports = {
    getHospitals,
    createHospitals,
    updateHospitals,
    deleteHospitals
}