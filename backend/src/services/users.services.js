import User from "../models/user.model.js";
import bcrypt from 'bcrypt';

export const addUserService = async ({ username, email, password }) =>
{
    try {
        const newUser = new User({
            username: username,
            email: email,
            password: bcrypt.hashSync(password, 8)
        });
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

        const passwordIsValid = bcrypt.compareSync(password, user.password)
        if (user && !passwordIsValid) {  
            return null;
        } else {
            console.log(true)
            return user;
        } 
    } catch (e) {
        throw e;
    }
};