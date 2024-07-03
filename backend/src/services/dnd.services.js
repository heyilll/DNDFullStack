import axios from 'axios'

export const searchMonstersService = async ({ params }) => { 
    try { 
        const search = params.search;
        const res = await axios.get(`https://api.open5e.com/monsters/?search=${search}&limit=5`); 
        return res.data;
    } catch (e) {
        throw e;
    }
};

export const searchSpellsService = async ({ params }) => { 
    try {  
        const search = params.search;
        const res = await axios.get(`https://api.open5e.com/spells/?search=${search}&limit=5`);
        return res.data;
    } catch (e) {
        throw e;
    }
};