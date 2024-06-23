import express from 'express';
import { addAccountController, loginAccountController } from '../controllers/account.controller';
import { loginAccountValidation, newAccountValidation } from '../middlewares/account.validation';

const router = express.Router(); 

router.route(`/register`)
    .post(newAccountValidation, addAccountController);

 router.route(`/login`)
    .post(loginAccountValidation, loginAccountController);

export { router as AccountRouter };