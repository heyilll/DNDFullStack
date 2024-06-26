import axios from "axios";

const registerService = async ({email, password}) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/register`, { 
            email: email,
            password: password
        });

        return response;
    } catch (e) {
        return e;
    }
};

const loginService = async ({ email, password }) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, {
            email: email,
            password: password
        }); 
        return response;
    } catch (e) {
        return e;
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

const getCampaignsService = async ({ email, password }) => {  
    try { 
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/getfavourites`, {
            email: email,
            password: password
        });
        return response.data;
    } catch (e) {
        return e;
    }
}

const addCampaignService = async ({ email, password, location }) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/favourites`, {
            email: email,
            password: password,
            location: location
        });
        return response;
    } catch (e) {
        return e;
    }
}

const removeCampaignService = async ({ email, password, id }) => {
    
    try {
        const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/campaigns`, {
            email: email,
            password: password,
            id: id
        });
        return response;
    } catch (e) {
        return e;
    }
}

const getCharactersService = async ({ email, password }) => {  
    try { 
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/characters`, {
            email: email,
            password: password
        });
        return response.data;
    } catch (e) {
        return e;
    }
}

const addCharacterService = async ({ email, password, location }) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/characters`, {
            email: email,
            password: password,
            location: location
        });
        return response;
    } catch (e) {
        return e;
    }
}

const removeCharacterService = async ({ email, password, id }) => {
    
    try {
        const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/characters`, {
            email: email,
            password: password,
            id: id
        });
        return response;
    } catch (e) {
        return e;
    }
}

const logout = () => {
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
    addCampaignService,
    removeCampaignService,
    getCharactersService,
    addCharacterService,
    removeCharacterService
};

export default accService;