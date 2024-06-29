import { useState } from "react"; 
import accService from "../services/account.service.js" 
import { Link, useNavigate } from "react-router-dom";    
import ErrorMessage from "./ErrorMessage.jsx";

function Login() {  
    const currUser = accService.getCurrentUser()?.user;  
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 
    const [errorMessage, setErrorMessage] = useState(false); 
    const navigate = useNavigate();

    const sendLogin = async (e) => {
        e.preventDefault(); 
        setErrorMessage(false);
        try {
            const res = await accService.loginService({ email: email, password: password });
            
            if (res.status === 200) { 
                navigate(`/myview`);
            } else {
                console.error("Login failed");
                setErrorMessage(true);
            }
        } catch (error) {
            console.error("Error during login: ", error);
            setErrorMessage(true);
        }
        
        setEmail("");
        setPassword("");
    }; 

    const sendLogout = async (e) => { 
        e.preventDefault(); 
        accService.logout();
        window.location.reload();
    }

    return (
        <>
            {currUser && (
                <>
                    <p>User is logged in with email: {currUser.email}</p>
                    <button onClick={ sendLogout }>Logout</button>
                </>
            )}
            {!currUser && (
                <>
                  <div className="container flex-column bg-white p-5 my-4 form-border">
                    <h1 style={{ color: "#001450" }}>Login</h1>
                    <form onSubmit={sendLogin } method="post">
                    <div className="mb-3">
                        <label className="form-label"htmlFor="email">
                            Email: </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="you@domain.com"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label px-0" htmlFor="password">Password: 
                                    
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            required
                        />
                    </div> 
                    <button type="submit" className="btn btn-primary button-primary">
                    Submit
                    </button>
                    {errorMessage && <ErrorMessage message={'Try again.'}/> }
                </form>
                <Link to='../register' >Register</Link>  
                </div>   
                </>
            )}
        </>
    );
}

export default Login;