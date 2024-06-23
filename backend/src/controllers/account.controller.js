import { addUserService, loginUserService } from "../services/users.services"; 
    
export const addUserController = async (req, res) => { 
    const invalidError = new Error("Invalid request");

    try {
        if (!req) throw invalidError;
        const account = await addUserService(req.body);
        res.status(201).json({ account });
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
        res.status(200).send({ message: `Login Success`, user });
    }
    catch (e) {
        res.status(400).json({ message: e.message });
    }
};