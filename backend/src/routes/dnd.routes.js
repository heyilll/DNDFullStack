import express from 'express'; 
import { searchMonstersController, searchSpellsController } from '../controllers/dnd.controller.js';
import authJwt from '../middlewares/authJWT.js';

const router = express.Router();
router.use((req, res, next) => {
    res.header(
        `Access-Control-Allow-Headers`,
        `x-access-token, Origin, Content-Type, Accept`
    );
    next();
});
 
router.route(`/monsters/:search`)
    .get(searchMonstersController);    

router.route(`/spells/:search`)
    .get(searchSpellsController); 

export { router as DndRouter };