import { Link } from "react-router-dom"; 
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import campaignService from "../services/campaigns.service";
import characterService from "../services/characters.service";

function CharacterCards({ character }) {
    if (typeof character === 'string') {
        const { id } = useParams();
        const [thisCharacter, setThisCharacter] = useState([]); 
        const [loading, setLoading] = useState(true);
        const navigate = useNavigate();

        const handleRemoveFromCam = async (characterId) => { 
            try {
            const res = await campaignService.removeCharacterFromCampaignService(id, characterId);
            console.log(res);

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

        useEffect(() => { 
            const fetchCharacter = async () => {
                const data = await characterService.getSpecificCharactersService(character); 
                setThisCharacter(data); 
                setLoading(false);
            };   

            fetchCharacter(); 
        }, []); 

        if (loading) {
            return <div>Loading...</div>;
        }  

        return (  
            <>
                <div className="card bg-info text-white mb-3 hover-effect">
                    <div className="card-body p-4">
                        <Link to={`../characters/${thisCharacter._id}`} className="text-white text-decoration-none" >
                            <h3 className="card-title text-center mb-3">{thisCharacter.name}</h3>
                        </Link>
                        <div className="text-center">
                            <button onClick={() => handleRemoveFromCam(thisCharacter._id)} className="btn btn-danger btn-sm" >
                                Remove from Campaign
                            </button>
                        </div>
                    </div>
                </div>
            </>  
        ); 
    }

    return (
        <div className="card bg-info text-white mb-3 hover-effect">
            <div className="card-body p-4">
                <Link to={`../characters/${character._id}`} className="text-white text-decoration-none" >
                    <h3 className="card-title text-center mb-3">{character.name}</h3>
                </Link> 
            </div>
        </div>
    ); 
}

export default CharacterCards;