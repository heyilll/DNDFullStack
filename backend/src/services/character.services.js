import { loginUserService } from "./users.services";
  
export const getCharactersService = async ({email, password }) => { 
    try { 
        if (loginUserService({email, password}) == null) {
            throw new Error("Unauthorised"); 
        } 
        return await Character.find({ email: email }); 
    } catch (e) {
        throw e;
    }
};

export const getSpecificCharacterService = async ({ email, password, name }) => { 
    try { 
        if (loginUserService({email, password}) == null) {
            throw new Error("Unauthorised"); 
        } 
        return await Character.find({ name: name }); 
    } catch (e) {
        throw e;
    }
};

export const addCharacterService = async ({ location, email, password }) => {
    try {
        if (loginUserService({ email, password }) == null) {
            throw new Error("Unauthorised");
        }
        const newCharacter = new Character({ location: location, email: email});
        return await newCharacter.save();
    } catch (e) {
        throw e;
    }
};

export const editCharacterService = async ({ id, email, password }) => {
    try {
        if (loginUserService({ email, password }) == null) {
            throw new Error("Unauthorised");
        }
        const character = new Character({ _id: id, email: email});
        return await character.save();
    } catch (e) {
        throw e;
    }
};

export const removeCharacterService = async ({ id, email, password }) => {
    
    try {
        if (loginUserService({email, password}) == null) {
            throw new Error("Unauthorised");
        }
        return await Character.deleteOne({ _id: id, email: email }); 
    } catch (e) {
        throw e;
    }
};