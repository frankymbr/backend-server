/**********************************
 *Ruta: /api/busquedas/
 *****************************/

const { Router } = require('express');

const router = Router();
const { getTodo, getDocumentosColeccion} = require('../controllers/busquedas');
const { validarJWT } = require('../middlewares/validar-jwt');


//Obtener busqueda
router.get( '/:busqueda',validarJWT, getTodo);

router.get( '/coleccion/:tabla/:busqueda',validarJWT, getDocumentosColeccion);

module.exports = router;