 import User from "../models/user.model.js";

export const addUserService = async ({ email, password }) =>
{
    try {
        const newUser = new User(account);
        return await newUser.save();
    } catch (e) {
        throw e;
    }
}; 

export const loginUserService = async ({ email, password }) =>
{
    if (!email || !password) return null;
    try { 
        const user = await User.findOne({ email: email });  
        if (user && password === user.password) {
            return user;
        } else {
            return null;
        }
    } catch (e) {
        throw e;
    }
};