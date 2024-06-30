import { Link } from "react-router-dom";
 
function AddCharacterToCampaign({ id }) {
    const [campaigns, setCampaigns] = useState([]); 
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {  
        const fetchCampaigns = async () => {
            const data = await accService.getCampaignsService(); 
            setCampaigns(data); 
        };  
 
        fetchCampaigns(); 
    }, []); 
    
    if (loading) {
        return <div>Loading...</div>;
    } 

    return (
        <Link to={`../campaigns/${campaign._id}`} className="m-2 h-25 text-bg-info col-12 col-md-6 col-lg-4"> 
            <p className="col-12 text-center fs-1 fw-bold text-light " >Campaign: { campaign.name }</p>  
        </Link>
    ); 
}

export default AddCharacterToCampaign;