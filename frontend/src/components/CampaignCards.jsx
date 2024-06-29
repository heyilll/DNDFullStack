import { Link } from "react-router-dom";

function CampaignCards({ campaign }) {
    return (
        <Link to={`../campaigns/${campaign._id}`} className="m-2 h-25 text-bg-info col-12 col-md-6 col-lg-4"> 
            <p className="col-12 text-center fs-1 fw-bold text-light " >Campaign: { campaign.name }</p>  
        </Link>
    ); 
}

export default CampaignCards;