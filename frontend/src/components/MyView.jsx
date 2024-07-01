import { useEffect, useState } from "react";
import accService from "../services/account.service"; 
import campaignService from "../services/campaigns.service";
import characterService from "../services/characters.service";
import { Link } from "react-router-dom";
import CharacterCards from "./CharacterCards";
import CampaignCards from "./CampaignCards";

function MyView( ) { 
    const [campaigns, setCampaigns] = useState([]);
    const [characters, setCharacters] = useState([]);
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchUser = async () => {
            const data = await accService.getCurrentUser(); 
            setUser(data); 
        }; 

        const fetchCampaigns = async () => {
            const data = await campaignService.getCampaignsService(); 
            setCampaigns(data); 
        }; 

        const fetchCharacters = async () => {
            const data = await characterService.getCharactersService(); 
            setCharacters(data);
            setLoading(false);
        };

        fetchUser();
        fetchCampaigns();
        fetchCharacters(); 
    }, []); 
    
    if (loading) {
        return <div>Loading...</div>;
    } 

    return (
        <div className="container-fluid bg-dark text-light py-5">
            {!user && <p>Not logged in</p>}
            {user &&
            <>
                <h1 className="text-center mb-5">My View</h1>
    
                <section className="bg-primary rounded p-4 mb-5">
                    <h2 className="text-center mb-4">My User Info</h2>
                    <div className="d-flex flex-column align-items-center">
                        <Link to={`../users/${user._id}`} className="text-light text-decoration-none mb-3">
                            <p className="fs-5 mb-0">Logged in as: <strong>{user.username}</strong></p>
                        </Link>
                        <Link to='../changePassword' className="btn btn-light">Change Password</Link>
                    </div>
                </section>
            </>}     
            <section className="bg-danger rounded p-4 mb-5">
                <h2 className="text-center mb-4" >My Campaigns</h2> 
                    {!campaigns && <p className="text-center">No campaigns found</p>}
                <div className="row g-4">  
                    {campaigns && campaigns.map((campaign) => (
                        <div key={campaign._id} className="col-md-6 col-lg-4">
                            <CampaignCards key={campaign._id} campaign={campaign} /> 
                        </div>
                    ))}
                </div>  
                <div className="text-center mt-4">
                    <Link to="/addCampaign" className="btn btn-light">Create new campaign</Link>
                </div>
            </section>
            <section className="bg-info rounded p-4">
                <h2 className="text-center mb-4" >My Characters</h2> 
                {!characters && <p className="text-center">No characters found</p>}     
                {characters && characters.map((character) => (
                    <div key={character._id} className="col-md-6 col-lg-4">
                        <CharacterCards key={character._id} character={character} /> 
                    </div>
                ))} 
                <div className="text-center mt-4">
                    <Link to="/addCharacter" className="btn btn-light">Create new character</Link>
                </div>  
            </section> 
        </div>
    );
}

export default MyView;