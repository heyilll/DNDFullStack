import { useState } from "react"; 
import accService from "../services/account.service.js" 
import { Link, useNavigate } from "react-router-dom";    
import ErrorMessage from "./ErrorMessage.jsx";

function Login() {  
    const currUser = accService.getCurrentUser();  
    
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
                  <div className="container">
  <div className="row justify-content-center">
    <div className="col-md-6">
      <div className="card shadow-lg my-5">
        <div className="card-body p-5">
          <h1 className="text-center mb-4" style={{ color: "#001450" }}>Login</h1>
          
          <form onSubmit={sendLogin} method="post">
            <div className="mb-3">
              <label className="form-label" htmlFor="email">Email</label>
              <div className="input-group">
                <span className="input-group-text"><i className="fas fa-envelope"></i></span>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="you@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="form-label" htmlFor="password">Password</label>
              <div className="input-group">
                <span className="input-group-text"><i className="fas fa-lock"></i></span>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="d-grid">
              <button type="submit" className="btn btn-primary btn-lg">
                Login
              </button>
            </div>
            
            {errorMessage && <ErrorMessage message={'Try again.'} />}
          </form>
          
          <div className="mt-4 text-center">
            <p>Don't have an account? <Link to='../register'>Register here</Link></p>
          </div>
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

export default Login;