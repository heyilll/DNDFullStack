import { useEffect, useState } from "react";
import accService from "../services/account.service"; 
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
            const data = await accService.getCampaignsService(); 
            setCampaigns(data); 
        }; 

        const fetchCharacters = async () => {
            const data = await accService.getCharactersService(); 
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
        <div className="d-flex flex-column mx-auto col-12 text-bg-dark align-items-center" >
            {!user && <p>Not logged in</p>}
            {user &&
                <>
                    <div className='title'>
                        <h1 className="col-12 text-center fs-1 fw-bold text-light" >My View</h1>  
                    </div> 
                    <div className='text-bg-info col-12 d-flex flex-column justify-content-center align-items-center'>
                        <p className="col-12 text-center fs-1 fw-bold text-light " >My User Info</p>  
                        <Link to={`../users/${user._id}`} className=" text-bg-info col-12 col-md-6 col-lg-4"> 
                            <p className="col-12 text-center fs-1 fw-bold text-light " > Logged in as: {user.username}</p> 
                    </Link>
                    <Link to='../changePassword' className="btn btn-primary">Change Password</Link> 
                    </div> 
                </>}     
        <div className=' text-bg-info col-12 text-bg-danger d-flex flex-column justify-content-center align-items-center'>
            <p className="col-12 text-center fs-1 fw-bold text-light " >My Campaigns</p> 
            {!campaigns && <p>No campaigns found</p>}    
            {campaigns && campaigns.map((campaign) => (
                <CampaignCards key={campaign._id} campaign={campaign}> 
                </CampaignCards>
            ))}
            <Link to="/addCampaign" className="btn btn-primary">Create new campaign</Link>    
        </div> 
        <div className=' text-bg-info col-12 text-bg-dark d-flex flex-column justify-content-center align-items-center'>
            <p className="col-12 text-center fs-1 fw-bold text-light " >My Characters</p> 
            {!characters && <p>No characters found</p>}     
            {characters && characters.map((character) => (
                <CharacterCards key={character._id} character={character}> 
                </CharacterCards>
            ))} 
            <Link to="/addCharacter" className="btn btn-primary ">Create new character</Link>    
        </div>  
    </div>
    );
}

export default MyView;