import express from 'express'; 
import { addCampaignController, editCampaignController, getCampaignsController, getSpecificCampaignController, removeCampaignController } from '../controllers/campaigns.controller.js';
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
    .get([authJwt.verifyToken], getSpecificCampaignController)
    .delete([authJwt.verifyToken], removeCampaignController)
    .put([authJwt.verifyToken], editCampaignController);    
   
router.route(`/`)
    .get([authJwt.verifyToken], getCampaignsController)
    .post([authJwt.verifyToken], addCampaignController);   

export { router as CampaignRouter };