import { addCharacterService, editCharacterService, getCharactersService, getSpecificCharacterService, removeCharacterService } from "../services/character.services.js";
 
export const getCharactersController = async (req, res) => { 
    const invalidError = new Error("Invalid request"); 
    
    try {
        if (!req) throw invalidError;
        const characters = await getCharactersService(req); 
        res.status(200).send(characters);
    }
    catch (e) {
        res.status(400).json({ message: e.message });
    }
};

export const getSpecificCharacterController = async (req, res) => { 
    const invalidError = new Error("Invalid request"); 
    
    try {
        if (!req) throw invalidError;
        const characters = await getSpecificCharacterService(req); 
        res.status(200).send(characters);
    }
    catch (e) {
        res.status(400).json({ message: e.message });
    }
};

export const addCharacterController = async (req, res) => { 
    const invalidError = new Error("Invalid request");

    try {
        if (!req) throw invalidError;
        const character = await addCharacterService(req.body);
        res.status(201).send({ message: `Success`, character });
    }
    catch (e) {
        res.status(400).json({ message: e.message });
    }
};

export const editCharacterController = async (req, res) => { 
    const invalidError = new Error("Invalid request");

    try {
        if (!req) throw invalidError;
        const character = await editCharacterService(req);
        res.status(201).send({ message: `Success`, character });
    }
    catch (e) {
        res.status(400).json({ message: e.message });
    }
};

export const removeCharacterController = async (req, res) => {
    const invalidError = new Error("Invalid request"); 

    try {
        if (!req) throw invalidError;
        const character = await removeCharacterService(req);
        res.status(201).send({ message: `Success`, character });
    }
    catch (e) {
        res.status(400).json({ message: e.message });
    }
};