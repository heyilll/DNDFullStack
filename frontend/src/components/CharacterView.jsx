import characterService from "../services/characters.service";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddCharacterToCampaign from "./AddCharacterToCampaign";

function CharacterView({ }) {  
    const { id } = useParams();
    const [character, setCharacter] = useState([]); 
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    
    useEffect(() => { 
        const fetchCharacter = async () => {
            const data = await characterService.getSpecificCharactersService(id); 
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
            const res = await characterService.removeCharacterService(id);

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
            {character && <div className="container-fluid py-5 bg-dark text-light">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="card bg-secondary mb-5">
                            <div className="card-body text-center">
                                <h1 className="display-4 mb-0">{character.name}</h1>
                            </div>
                        </div>

                        <div className="row g-4 mb-5">
                            <div className="col-md-4">
                                <div className="card bg-info h-100">
                                    <div className="card-body text-center d-flex flex-column justify-content-center">
                                        <h2 className="h5 mb-2">Race</h2>
                                        <p className="lead mb-0">{character.race}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card bg-info h-100">
                                    <div className="card-body text-center d-flex flex-column justify-content-center">
                                        <h2 className="h5 mb-2">Class</h2>
                                        <p className="lead mb-0">{character.class}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card bg-info h-100">
                                    <div className="card-body text-center d-flex flex-column justify-content-center">
                                        <h2 className="h5 mb-2">Level</h2>
                                        <p className="lead mb-0">{character.level}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="d-flex justify-content-center gap-3">
                            <button onClick={handleSubmit} className="btn btn-danger btn-lg">
                                Remove Character
                            </button>
                            <AddCharacterToCampaign id={id} />
                        </div>
                    </div>
                </div>
            </div>} 
        </>    
    );
}

export default CharacterView;