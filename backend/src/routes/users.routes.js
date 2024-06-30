import express from 'express';
import { addUserController, loginUserController, editPasswordController } from '../controllers/users.controller.js';
import { loginAccountValidation, newAccountValidation } from '../middlewares/account.validation.js'; 
import authJwt from '../middlewares/authJWT.js';

const router = express.Router();  

router.use((req, res, next) => {
    res.header(`Access-Control-Allow-Headers`, `x-access-token, Origin, Content-Type, Accept`);
    next();
});

router.route(`/register`)
    .post(newAccountValidation, addUserController);

router.route(`/login`)
    .post(loginAccountValidation, loginUserController);

router.route(`/changePassword`)
    .patch([authJwt.verifyToken], editPasswordController);    

export { router as UserRouter };