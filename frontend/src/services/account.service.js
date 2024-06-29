import axios from "axios";
import authHeader from "./authHeader"; 

const registerService = async ({username, email, password}) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/register`, { 
            username: username,
            email: email,
            password: password
        });

        return response;
    } catch (error) {
        return error;
    }
};

const loginService = async ({ email, password }) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, {
            email: email,
            password: password
        });
        if (response.data.accessToken) {
            localStorage.setItem(`currentUser`, JSON.stringify(response.data));
 
            // Cookies.set("user", response.data.accessToken);
        }

        return response; 
    } catch (error) {
        return { error: error.response.data.message };
    }
}

const editPasswordService = async ({ email, password, newpassword }) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/changePassword`, {
            email: email,
            password: password,
            newpassword: newpassword
        }); 
        return response;
    } catch (e) {
        return e;
    }
}

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

const addCampaignService = async ({ name, description, dungeon_master, created_by, players }) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/campaigns`, { 
            name: name,
            description: description,
            dungeon_master: dungeon_master,
            created_by: created_by,
            players: players
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

const logout = () => {
    //Cookies.remove('token');
    localStorage.removeItem(`currentUser`); 
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem(`currentUser`)); 
};

const accService = {
    registerService,
    loginService,
    editPasswordService,
    logout,
    getCurrentUser,
    getCampaignsService,
    getSpecificCampaignService,
    addCampaignService,
    removeCampaignService,
    getCharactersService,
    getSpecificCharactersService,
    addCharacterService,
    removeCharacterService
};

export default accService;