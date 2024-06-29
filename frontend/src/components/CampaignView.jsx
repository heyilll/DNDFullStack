import accService from "../services/account.service";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CampaignView({ }) {
    const { id } = useParams();
    const [campaign, setCampaign] = useState([]); 
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    
    useEffect(() => { 
        const fetchCampaign = async () => {
            const data = await accService.getSpecificCampaignService(id); 
            setCampaign(data);  
            setLoading(false);
        };   

        fetchCampaign(); 
    }, []); 
    
    if (loading) {
        return <div>Loading...</div>;
    }  

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const res = await accService.removeCampaignService(id);
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
            <div className="d-flex flex-column mx-auto col-12  text-bg-dark align-items-center" >
                <div className='title'>
                    <h1 className="col-12 text-center fs-1 fw-bold text-light" >Campaign Name: {campaign.name}</h1>
                </div>
                <div className='c h-25 text-bg-info col-12'>
                    <p className="col-12 text-center fs-1 fw-bold text-light " >Dungeon Master: {campaign.dungeon_master}</p>
                    <p className="col-12 text-center fs-1 fw-bold text-light " >Description: {campaign.description}</p>
                </div>
                <div className='h-75'>
                    <h2 className=" col-12 col-md-6 col-lg-6 text-center fs-1 fw-bold text-light text-bg-dark" >Notes: </h2>
                    <div className="form-group">
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="8"></textarea>
                    </div>
                    <div className="col-12 col-md-6 col-lg-6 text-center fs-1 fw-bold text-light text-bg-danger " >
                        {/* {campaign.players.map((character) => (
                            <CharacterCards key={character._id} character={character}> 
                            </CharacterCards>
                        ))} */}
                    </div>
                </div>
                <button onClick={handleSubmit} className="btn btn-primary">Remove Campaign</button>    
            </div>
        </>
        }
    </>        
    );
}

export default CampaignView;