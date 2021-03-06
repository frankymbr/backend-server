/**********************************
 *Ruta: /api/medicos
 *****************************/

 const { Router } = require('express');
 const { check } = require('express-validator');
 const { validateFields } = require('../middlewares/validar-campos');
 
 const router = Router();
 const { validarJWT } = require('../middlewares/validar-jwt');
 
 const { getMedicos,
        createMedicos,
        updateMedicos,
        deleteMedicos,
        getMedicoById } = require('../controllers/medicos');
 
 //Obtener usuarios
 router.get( '/', validarJWT , getMedicos);
 //crear usuarios
 router.post( '/',
     [ 
        validarJWT,
        check('nombre','El nombre del médico es necesario').not().isEmpty(),
        check('hospital','El hospital id debe ser válido').isMongoId(),
        validateFields
     ],
     createMedicos
 );
 
 router.put( '/:id',
     [ 
        validarJWT,
        check('nombre','El nombre del médico es necesario').not().isEmpty(),
        check('hospital','El hospital id debe ser válido').isMongoId(),
        validateFields
     ],
     updateMedicos
 );
 
 router.delete( '/:id',validarJWT, deleteMedicos );

 router.get( '/:id',validarJWT, getMedicoById );
 
 
 
 
 
 module.exports = router;