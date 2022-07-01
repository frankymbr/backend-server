/**********************************
 *Ruta: /api/usuarios
 *****************************/

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validar-campos');

const router = Router();
const { getUsuarios, createUsuario, updateUsuario, deleteUsuario } = require('../controllers/usuarios');
const { validarJWT } = require('../middlewares/validar-jwt');

//Obtener usuarios
router.get( '/', validarJWT, getUsuarios);
//crear usuarios
router.post( '/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validateFields,
    ],
    createUsuario
);

router.put( '/:id',
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('role', 'El rol es obligatorio').not().isEmpty(),
        validateFields,
    ],
    updateUsuario
);

router.delete( '/:id', validarJWT, deleteUsuario );





module.exports = router;