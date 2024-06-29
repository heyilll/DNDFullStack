import { check } from "express-validator";
import Account from "../models/user.model.js";

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
    try {
        const userEmail = await Account.findOne({ email: req.body.email });
        if (userEmail) { 
            return res.status(400).send({ message: 'Failed! Email already in use' });
        }
        
        const userUsername = await Account.findOne({ username: req.body.username });
        if (userUsername) { 
            return res.status(400).send({ message: 'Failed! Username already in use' });
        }
        next();
    } catch (err) {
        res.status(500).send({ message: err });
    }
};

export const newAccountValidation = [
    check(`username`).exists().escape(),
    check(`email`).exists().normalizeEmail().escape().isEmail(), 
    check(`password`).exists().escape(),
    checkDuplicateUsernameOrEmail 
];

export const loginAccountValidation = [
    check(`email`).exists().normalizeEmail().escape().isEmail(), 
    check(`password`).exists().escape() 
]; 
