import { useState, useEffect } from "react";
import campaignService from "../services/campaigns.service";
import { useNavigate } from "react-router-dom"; 
 
function AddCharacterToCampaign({id}) {
    const [campaigns, setCampaigns] = useState([]); 
    const [chosenCampaign, setChosenCampaign] = useState(""); 
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); 
    
    useEffect(() => {  
        const fetchCampaigns = async () => {
            const data = await campaignService.getCampaignsService(); 
            setCampaigns(data); 
            setLoading(false);
        };  
 
        fetchCampaigns(); 
    }, []); 

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await campaignService.addCharacterToCampaignService( chosenCampaign, id ); 
        if (res.status === 201) {
            navigate("/myview");
            console.log(`Added successfully`);
        } else {
            console.log("Addition failed");
        }
        } catch (error) {
            console.log(error);
        }
    };
    
    if (loading) {
        return <div>Loading...</div>;
    } 

    return (
        <>
            {!campaigns && <p>No campaigns found</p>}
            {campaigns && <form onSubmit={handleSubmit} method="patch" className="bg-light p-4 rounded shadow-sm">
                <h2 className="mb-4 text-center">Add to Campaign</h2>
                <div className="mb-4">
                    <label htmlFor="campaign" className="form-label fw-bold">
                        Select Campaign
                    </label>
                    <select 
                    className="form-select form-select-lg mb-3"
                    id="campaign"
                    name="campaign"
                    value={chosenCampaign}
                    onChange={(e) => setChosenCampaign(e.target.value)}
                    required
                    >
                        <option value="" disabled>Choose a campaign...</option>
                        {campaigns.map((campaign) => (
                            <option key={campaign._id} value={campaign._id}>{campaign.name}</option>
                        ))}
                    </select>
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary btn-lg">
                    Add to Campaign
                    </button>
                </div>
            </form>}
        </> 
    ); 
}

export default AddCharacterToCampaign;