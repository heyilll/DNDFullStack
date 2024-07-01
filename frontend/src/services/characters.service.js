import axios from "axios";
import authHeader from "./authHeader"; 

const getCharactersService = async () => {  
    try { 
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/characters`,  { headers: authHeader() });
        return response.data;
    } catch (e) {
        return e;
    }
}

const getSpecificCharactersService = async (id) => {  
    try { 
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/characters/${id}`,  { headers: authHeader() });
        return response.data;
    } catch (e) {
        return e;
    }
}

const addCharacterService = async ({ name, race, dndclass, level, created_by }) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/characters`, { 
            name: name,
            race: race,
            dndclass: dndclass, 
            level: level,
            created_by: created_by
        },  { headers: authHeader() });
        return response;
    } catch (e) {
        return e;
    }
}

const removeCharacterService = async (id) => {
    
    try {
        const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/characters/${id}`,  { headers: authHeader() });
        return response;
    } catch (e) {
        return e;
    }
}

const editCharacterService = async (id, updateData) => {
    try {
        const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/characters/${id}`, updateData,  { headers: authHeader() });
        return response;
    } catch (e) {
        return e;
    }
}

const characterService = { 
    getCharactersService,
    getSpecificCharactersService,
    addCharacterService,
    removeCharacterService,
    editCharacterService
};

export default characterService;

