import { useState, useEffect } from "react";
import accService from "../services/account.service.js";
import mockdata from '../assets/mockChars.json'

function CharacterView() { 
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCharacters = async () => {
            // const data = await accService.getCharactersService();
            const data = mockdata.characters; 
            setCharacters(data);
            setLoading(false);
        };

        fetchCharacters();
    }, []);
    
    if (loading) {
        return <div>Loading...</div>;
    } 

    return (
    <div className="d-flex flex-column mx-auto col-12 vh-100 text-bg-dark align-items-center" >
        <div className='title'>
            <h1 className="col-12 text-center fs-1 fw-bold text-light" >My Characters</h1>  
        </div>
        {characters.map((character) => (
            <div key={character._id} className="m-2 h-25 text-bg-info col-12 col-md-6 col-lg-4"> 
                <p className="col-12 text-center fs-1 fw-bold text-light " >Character Name: { character.name}</p>  
            </div>
        ))} 
    </div> 
    );
}

export default CharacterView;