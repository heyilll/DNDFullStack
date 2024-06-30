import Character from "../models/character.model.js";
  
export const getCharactersService = async ({ userId }) => { 
    try {  
        return await Character.find({ created_by: userId }); 
    } catch (e) {
        throw e;
    }
};

export const getSpecificCharacterService = async ({ params, userId }) => { 
    try { 
        return await Character.findOne({ _id: params.id, created_by: userId }); 
    } catch (e) {
        throw e;
    }
};

export const addCharacterService = async ({ name, race, dndclass, level, created_by }) => {
    try { 
        const newCharacter = new Character({ name: name, race: race, class: dndclass, level: level, created_by: created_by });
        return await newCharacter.save();
    } catch (e) {
        throw e;
    }
};

export const editCharacterService = async ({ params, userId, updateData }) => {
    try { 
        const character = Character.findOneAndUpdate({ _id: params.id, created_by: userId }, updateData,
            { new: true, runValidators: true });
        if (!character) throw new Error(`Campaign not found`);
        return character;
    } catch (e) {
        throw e;
    }
};

export const removeCharacterService = async ({ params, userId }) => { 
    try {
        return await Character.deleteOne({ _id: params.id, created_by: userId }); 
    } catch (e) {
        throw e;
    }
};