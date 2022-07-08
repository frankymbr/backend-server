/**********************************
 *Ruta: /api/uploads/
 *****************************/

 const { Router } = require('express');
 const expressFileUpload = require('express-fileupload');

 const router = Router();
 const { validarJWT } = require('../middlewares/validar-jwt');
 const { fileUpload, retornaImagen } = require('../controllers/uploads'); 

 router.use(expressFileUpload());

 //Obtener imagenes
 router.put( '/:tipo/:id',validarJWT, fileUpload);

 router.get( '/:tipo/:foto', retornaImagen);
 
 module.exports = router;