import { check } from "express-validator";
import Account from "../models/account.model.js";

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
    try {
        const user = await Account.findOne({ email: req.body.email });
        if (user) { 
            return res.status(400).send({ message: 'Failed! Email already in use' });
        }
        next();
    } catch (err) {
        res.status(500).send({ message: err });
    }
};

export const newAccountValidation = [
    check(`email`).exists().normalizeEmail().escape().isEmail(), 
    check(`password`).exists().escape(),
    checkDuplicateUsernameOrEmail 
];

export const loginAccountValidation = [
    check(`email`).exists().normalizeEmail().escape().isEmail(), 
    check(`password`).exists().escape() 
]; 
