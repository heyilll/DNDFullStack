import express from 'express'; 
import { addCharacterController, editCharacterController, getCharactersController, getSpecificCharacterController, removeCharacterController } from '../controllers/characters.controller';

const router = express.Router();
  
router.route(`/:id`)
    .get(getSpecificCharacterController)
    .delete(removeCharacterController)
    .put(editCharacterController);    
   
router.route(`/`)
    .get(getCharactersController)
    .post(addCharacterController);    

export { router as CharacterRouter };