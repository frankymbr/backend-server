/**********************************
 *Ruta: /api/hospitales
 *****************************/

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validar-campos');

const router = Router();
const { validarJWT } = require('../middlewares/validar-jwt');

const { getHospitals,
        createHospitals,
        updateHospitals,
        deleteHospitals } = require('../controllers/hospitales');

//Obtener usuarios
router.get( '/', getHospitals);
//crear usuarios
router.post( '/',
    [ 
        validarJWT,
        check('nombre','El nombre del hospital es necesario').not().isEmpty(),
        validateFields
    ],
    createHospitals
);

router.put( '/:id',
    [
        validarJWT,
        check('nombre','El nombre del hospital es necesario').not().isEmpty(),
        validateFields
    ],
    updateHospitals
);

router.delete( '/:id', validarJWT, deleteHospitals );





module.exports = router;