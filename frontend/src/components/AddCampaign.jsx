import { useEffect, useState } from "react";
import accService from "../services/account.service";
import { useNavigate } from "react-router-dom";

const AddCampaign = () => {
  const [campaignName, setCampaignName] = useState("");
  const [campaignDescription, setCampaignDescription] = useState(""); 
  const [campaignPlayers, setCampaignPlayers] = useState(""); 
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
      const res = await accService.addCampaignService({
        name: campaignName,
        description: campaignDescription,
        dungeon_master: user.username, 
        players: campaignPlayers,
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
          <div className="container flex-column bg-white p-5 my-4 form-border">
            <h1 style={{ color: "#001450" }}>Add a Campaign</h1>
            <form onSubmit={handleSubmit} method="post">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  placeholder="Your Campaign Name"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label px-0">
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  className="form-control"
                  placeholder="Enter your Campaign description"
                  value={campaignDescription}
                  onChange={(e) => setCampaignDescription(e.target.value)}
                  required
                />
              </div> 
              <div className="mb-3">
                <label htmlFor="players" className="form-label px-0">
                  Campaign Players
                </label>
                <input
                  type="text"
                  id="players"
                  name="players"
                  className="form-control"
                  placeholder="Enter your Campaign Players"
                  value={campaignPlayers}
                  onChange={(e) => setCampaignPlayers(e.target.value)}
                  required
                />
              </div>  
              <button type="submit" className="btn btn-primary button-primary">
                Submit
              </button>
            </form>
          </div>
        </>}

    </>
  );
};
export default AddCampaign;