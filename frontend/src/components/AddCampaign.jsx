import { useEffect, useState } from "react";
import accService from "../services/account.service";
import campaignService from "../services/campaigns.service";
import { useNavigate } from "react-router-dom";

const AddCampaign = () => {
  const [campaignName, setCampaignName] = useState("");
  const [campaignDescription, setCampaignDescription] = useState("");  
  const [user, setUser] = useState([]);

  const navigate = useNavigate();  

  useEffect(() => {
        const fetchUser = async () => {
            const data = await accService.getCurrentUser(); 
            setUser(data); 
        };  

        fetchUser(); 
  }, []); 
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await campaignService.addCampaignService({
        name: campaignName,
        description: campaignDescription,
        dungeon_master: user.username, 
        created_by: user.id
      });
      console.log(res);

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

  return (
    <>
      {!user && <p>Not logged in</p>}
      {user &&
        <>
          <div className="container py-5">
  <div className="row justify-content-center">
    <div className="col-md-8 col-lg-6">
      <div className="card shadow-lg border-0">
        <div className="card-body p-5">
          <h1 className="text-center mb-4" style={{ color: "#001450" }}>Create Your Campaign</h1>
          <form onSubmit={handleSubmit} method="post">
            <div className="mb-4">
              <label htmlFor="name" className="form-label">
                Campaign Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control form-control-lg"
                placeholder="Enter your campaign name"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="form-label">
                Campaign Description
              </label>
              <textarea
                id="description"
                name="description"
                className="form-control form-control-lg"
                placeholder="Describe your campaign"
                value={campaignDescription}
                onChange={(e) => setCampaignDescription(e.target.value)}
                required
                rows="4"
              ></textarea>
            </div>  
            <div className="d-grid">
              <button type="submit" className="btn btn-primary btn-lg">
                Create Campaign
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
        </>}

    </>
  );
};
export default AddCampaign;