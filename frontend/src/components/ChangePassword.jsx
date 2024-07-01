import { useState } from "react"; 
import accService from "../services/account.service.js" 
import { useNavigate } from "react-router-dom";    
import ErrorMessage from "./ErrorMessage.jsx";

function ChangePassword() {  
    const currUser = accService.getCurrentUser(); 
     
    const [newPassword, setNewPassword] = useState(""); 
    const [errorMessage, setErrorMessage] = useState(false); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        setErrorMessage(false);
        try {
            const res = await accService.editPasswordService({ newPassword: newPassword });
            
            if (res.status === 201) { 
                console.error("Success");
                navigate(`/myview`);
            } else {
                console.error("Change Password failed");
                setErrorMessage(true);
            }
        } catch (error) {
            console.error("Error during Change Password: ", error);
            setErrorMessage(true);
        }
         
        setNewPassword("");
    };  

    return (
        <>
            {!currUser && (
                <>
                    <p>Not logged in</p> 
                </>
            )}
            {currUser && (
                <>
                    <div className="container">
  <div className="row justify-content-center">
    <div className="col-md-6">
      <div className="card shadow-lg my-5">
        <div className="card-body p-5">
          <h1 className="text-center mb-4" style={{ color: "#001450" }}>Change Password</h1>
          
          <form onSubmit={handleSubmit} method="patch">
            <div className="mb-3">
              <label className="form-label" htmlFor="password">New Password:</label>
              <div className="input-group">
                <span className="input-group-text"><i className="fas fa-envelope"></i></span>
                <input
                  type="password"
                  className="form-control"
                  id="newpassword"
                  name="newpassword"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary btn-lg">
                        Login
                    </button>
                </div> 
                {errorMessage && <ErrorMessage message={'Try again.'} />}
                </div>
          </form>        
            </div>
            </div>   
            </div>   
            </div>   
            </div>   
                </>
            )}
        </>
    );
}

export default ChangePassword;