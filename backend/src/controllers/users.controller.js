import { addUserService, loginUserService, editPasswordService } from "../services/users.services.js"; 
import jwt from "jsonwebtoken"; 
    
export const addUserController = async (req, res) => { 
    const invalidError = new Error("Invalid request"); 

    try {
        if (!req) throw invalidError;
 
        const user = await addUserService(req.body);
        if (user == null) throw new Error("Register details are incorrect.");  

        res.status(201).send({ message: `User was registered successfully` }); 
    }
    catch (e) {
        res.status(400).json({ message: e.message });
    }
}; 

export const loginUserController = async (req, res) => { 
    const invalidError = new Error("Invalid request"); 

    try {
        if (!req) throw invalidError;
        const user = await loginUserService(req.body);

        if (user == null) throw new Error("Login details are incorrect.");   
        
        const token = jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: 86400 });

        res.status(200).send({
            id: user._id,
            username: user.username,
            email: user.email, 
            accessToken: token
        });
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
};

export const editPasswordController = async (req, res) => { 
    const invalidError = new Error("Invalid request"); 

    try {
        if (!req) throw invalidError; 
        const user = await editPasswordService(req);

        if (user == null) throw new Error("User not found.");    

        res.status(201).send({ message: `Success`, user }); 
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
};