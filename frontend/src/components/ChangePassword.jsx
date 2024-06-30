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
                  <div className="container flex-column bg-white p-5 my-4 form-border">
                    <h1 style={{ color: "#001450" }}>Change Password</h1>
                    <form onSubmit={handleSubmit } method="patch"> 
                    <div className="mb-3">
                        <label className="form-label px-0" htmlFor="password">New Password: 
                        </label>
                        <input
                            type="password"
                            name="newpassword"
                            id="newpassword"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) =>
                                setNewPassword(e.target.value)
                            }
                            required
                        />
                    </div> 
                    <button type="submit" className="btn btn-primary button-primary">
                    Submit
                    </button>
                    {errorMessage && <ErrorMessage message={'Try again.'}/> }
                </form>  
                </div>   
                </>
            )}
        </>
    );
}

export default ChangePassword;