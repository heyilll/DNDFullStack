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

const editPasswordService = async ({ newPassword }) => {
    try {
        const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/changePassword`, { 
            newPassword: newPassword
        }, { headers: authHeader() }); 
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
    getCurrentUser
};

export default accService;