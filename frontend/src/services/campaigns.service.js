import axios from "axios";
import authHeader from "./authHeader"; 

const getCampaignsService = async () => {  
    try { 
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/campaigns`, { headers: authHeader() });
        return response.data;
    } catch (e) {
        return e;
    }
}

const getSpecificCampaignService = async (id) => {  
    try { 
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/campaigns/${id}`, { headers: authHeader() });
        return response.data;
    } catch (e) {
        return e;
    }
}

const addCampaignService = async ({ name, description, dungeon_master, created_by }) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/campaigns`, { 
            name: name,
            description: description,
            dungeon_master: dungeon_master,
            created_by: created_by 
        },  { headers: authHeader() });
        return response;
    } catch (e) {
        return e;
    }
}

const removeCampaignService = async (id) => { 
    try {
        const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/campaigns/${id}`, { headers: authHeader() });
        return response;
    } catch (e) {
        return e;
    }
}

const editCampaignService = async (id, updateData) => { 
    try {
        const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/campaigns/${id}`, updateData, { headers: authHeader() });
        return response;
    } catch (e) {
        return e;
    }
}

const addCharacterToCampaignService = async (id, characterId) => {
    try {
        const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/campaigns/${id}`,{ $addToSet: { players: characterId } },  { headers: authHeader() });
        return response;
    } catch (e) {
        return e;
    }
}

const removeCharacterFromCampaignService = async (id, characterId) => {
    try {
        const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/campaigns/${id}`,{ $pull: { players: characterId } },  { headers: authHeader() });
        return response;
    } catch (e) {
        return e;
    }
}

const campaignService = { 
    getCampaignsService,
    getSpecificCampaignService,
    addCampaignService,
    removeCampaignService,
    editCampaignService, 
    addCharacterToCampaignService,
    removeCharacterFromCampaignService
};

export default campaignService;