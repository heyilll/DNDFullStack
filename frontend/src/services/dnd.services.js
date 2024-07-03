import axios from "axios";
import authHeader from "./authHeader"; 

const monstersService = async (search) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/monsters/${search}` );

        return response.data;
    } catch (error) {
        return error;
    }
};

const spellsService = async (search) => {
    try { 
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/spells/${search}` );

        return response.data;
    } catch (error) {
        return error;
    }
};

const dndService = {
    monstersService,
    spellsService, 
};

export default dndService;