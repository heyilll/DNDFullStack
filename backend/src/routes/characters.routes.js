import express from 'express'; 
import { addCharacterController, editCharacterController, getCharactersController, getSpecificCharacterController, removeCharacterController } from '../controllers/characters.controller.js';
import authJwt from '../middlewares/authJWT.js';

const router = express.Router();
router.use((req, res, next) => {
    res.header(
        `Access-Control-Allow-Headers`,
        `x-access-token, Origin, Content-Type, Accept`
    );
    next();
});

router.route(`/:id`)
    .get([authJwt.verifyToken], getSpecificCharacterController)
    .delete([authJwt.verifyToken], removeCharacterController)
    .put([authJwt.verifyToken], editCharacterController);    
   
router.route(`/`)
    .get([authJwt.verifyToken], getCharactersController)
    .post([authJwt.verifyToken], addCharacterController);    

export { router as CharacterRouter };