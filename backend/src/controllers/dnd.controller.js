import { searchMonstersService, searchSpellsService } from "../services/dnd.services.js";

export const searchMonstersController = async (req, res) => { 
    const invalidError = new Error("Invalid request"); 
    
    try {
        if (!req) throw invalidError; 
        const monsters = await searchMonstersService(req); 
        res.status(200).send(monsters);
    }
    catch (e) {
        res.status(400).json({ message: e.message });
    }
};

export const searchSpellsController = async (req, res) => { 
    const invalidError = new Error("Invalid request"); 
    
    try {
        if (!req) throw invalidError;
        const spells = await searchSpellsService(req); 
        res.status(200).send(spells);
    }
    catch (e) {
        res.status(400).json({ message: e.message });
    }
};