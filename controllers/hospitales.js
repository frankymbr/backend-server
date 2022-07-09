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

const updateHospitals = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const hospital = await Hospital.findById(id);

        if ( !hospital ) {
            return res.status(400).json({
                ok:true,
                msg: 'El hospital no existe',
                id
            });  
        }

        const updateHospital = {
            ...req.body,
            usuario:uid
        }

        const HospitalUpdate = await Hospital.findByIdAndUpdate( id, updateHospital, { new: true } );

        res.json({
            ok:true,
            Hospital: HospitalUpdate
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admininstrador'
        });
    }

  
}

const deleteHospitals = async(req, res = response) => {
    const id = req.params.id;
    
    try {

        const hospital = await Hospital.findById(id);

        if ( !hospital ) {
            return res.status(400).json({
                ok:true,
                msg: 'El hospital no existe',
                id
            });  
        }

        await Hospital.findByIdAndDelete( id );

        res.json({
            ok:true,
            msg: 'Hospital eliminado'
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
    getHospitals,
    createHospitals,
    updateHospitals,
    deleteHospitals
}