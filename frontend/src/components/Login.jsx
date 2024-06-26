import { useState } from "react"; 
import accService from "../services/account.service.js" 
import { Link } from "react-router-dom"; 

function Login() {  
    const currUser = accService.getCurrentUser()?.user;  
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 
    const [errorMessage, setErrorMessage] = useState(false); 

    const sendLogin = async (e) => {
        e.preventDefault(); 

        const res = await accService.loginService({ email: email, password: password });  
        if (res.status === 200) {  
            localStorage.setItem("currentUser", JSON.stringify(res.data)); 
            window.location.reload(); 
        } else {
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
                <form onSubmit={sendLogin }>
                    <div>
                        <label htmlFor="email">Email: </label>
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
                    <div>
                        <label htmlFor="password">Password: </label>
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
                    <div>
                        <input type="submit" value="Login" />
                    </div> 
                </form>
                <Link to='../register' >Register</Link> 
                </>
            )}
        </>
    );
}

export default Login;