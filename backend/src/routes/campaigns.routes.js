import express from 'express'; 
import { addCampaignController, editCampaignController, getCampaignsController, getSpecificCampaignController, removeCampaignController } from '../controllers/campaigns.controller';

const router = express.Router();
  
router.route(`/:id`).get(getSpecificCampaignController);    
   
router.route(`/`)
    .get(getCampaignsController)
    .post(addCampaignController)
    .delete(removeCampaignController)
    .patch(editCampaignController);    

export { router as CampaignRouter };