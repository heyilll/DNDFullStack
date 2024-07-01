import { Link } from "react-router-dom";

function CampaignCards({ campaign }) {
    return (
        <Link to={`../campaigns/${campaign._id}`} className="card bg-info text-white text-decoration-none mb-3 hover-effect">
            <div className="card-body p-4">
                <h3 className="card-title text-center mb-0">
                {campaign.name}
                </h3>
            </div>
        </Link>
    ); 
}

export default CampaignCards;