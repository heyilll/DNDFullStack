import accService from "../services/account.service";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CharacterView({ }) {  
    const { id } = useParams();
    const [character, setCharacter] = useState([]); 
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    
    useEffect(() => { 
        const fetchCharacter = async () => {
            const data = await accService.getSpecificCharactersService(id); 
            setCharacter(data); 
            setLoading(false);
        };   

        fetchCharacter(); 
    }, []); 
    
    if (loading) {
        return <div>Loading...</div>;
    }  

    const handleSubmit = async (e) => {
        e.preventDefault();
        try { 
            const res = await accService.removeCharacterService(id); 

            if (res.status === 201) {
                navigate("/myview");
                console.log(`Removed successfully`);
            } else {
                console.log("Removal failed");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            {!character && <p>No character found</p>}
            {character && <div className="d-flex flex-column mx-auto col-12 text-bg-dark align-items-center" >  
                <div className='title'>
                    <h1 className="col-12 text-center fs-1 fw-bold text-light" >Character Name: {character.name}</h1>
                </div>
                <div className='c h-25 text-bg-info col-12'>
                    <p className="col-12 text-center fs-1 fw-bold text-light " >Race: {character.race}</p> 
                </div>
                <div className='c h-25 text-bg-info col-12'>
                    <p className="col-12 text-center fs-1 fw-bold text-light " >Class: {character.class}</p> 
                </div>
                <div className='c h-25 text-bg-info col-12'> 
                    <p className="col-12 text-center fs-1 fw-bold text-light " >Level: {character.level}</p>
                </div>
                <button onClick={handleSubmit} className="btn btn-primary">Remove Character</button>    
            </div>} 
        </>    
    );
}

export default CharacterView;