import campaignService from "../services/campaigns.service";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CharacterCards from "./CharacterCards";
import MonsterSearch from "./MonsterSearch";
import SpellSearch from "./SpellSearch";

function CampaignView({}) {
    const { id } = useParams();
    const [campaign, setCampaign] = useState([]); 
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    
    useEffect(() => { 
        const fetchCampaign = async () => {
            const data = await campaignService.getSpecificCampaignService(id); 
            setCampaign(data);  
            setLoading(false); 
        }; 

        fetchCampaign();   
    }, []); 
    
    if (loading) {
        return <div>Loading...</div>;
    }  

    const handleRemove = async (e) => {
        e.preventDefault();
        try {
        const res = await campaignService.removeCampaignService(id);
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

    return (
    <>
        {!campaign && <p>No campaign found</p>}
        {campaign &&
        <>
            <div className="container-fluid py-5 bg-dark text-light">
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <header className="mb-5">
                            <h1 className="display-4 text-center">{campaign.name}</h1>
                        </header>

                        <div className="card bg-info text-light mb-5">
                            <div className="card-body">
                                <h2 className="h4 mb-3">Campaign Details</h2>
                                <p className="mb-2"><strong>Dungeon Master:</strong> {campaign.dungeon_master}</p>
                                <p className="mb-0"><strong>Description:</strong> {campaign.description}</p>
                            </div>
                        </div>

                        <div className="card bg-secondary text-light mb-5">
                            <div className="card-body">
                                <h2 className="h4 mb-3">Notes</h2>
                                <textarea className="form-control bg-dark text-light" id="campaignNotes" rows="6" placeholder="Write your campaign notes here..."></textarea>
                            </div>
                        </div> 
                        <MonsterSearch /> 
                        <SpellSearch /> 
                        <div className="card bg-danger text-light mb-5">
                            <div className="card-body">
                            <h2 className="h4 mb-3">Players</h2>
                                {!campaign.players || campaign.players.length == 0 && <p>No players added</p>} 
                                <div className="row g-4">
                                    {campaign.players && campaign.players.map((characterId) => (
                                        <div key={characterId} className="col-md-6 col-lg-4">
                                            <CharacterCards key={characterId} character={characterId} /> 
                                        </div>
                                    ))}
                                </div> 
                            </div>
                        </div>

                        <div className="text-center">
                            <button onClick={handleRemove} className="btn btn-danger btn-lg">Remove Campaign</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
        }
    </>        
    );
}

export default CampaignView;