import validationService from "../services/validation.helper"; 
import { useState } from "react"; 
import accService from "../services/account.service";
import ErrorMessage from "./ErrorMessage"; 
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [userName, setUserName] = useState(""); 
  const [errorMessage, setErrorMessage] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
      
    setErrorMessage(false); 
    const passVal = validationService.validPassword(password);
    const emailVal = validationService.validEmail(email);

    if (passVal && emailVal) {
      try {
        const res = await accService.registerService({
          username: userName,
          email: email,
          password: password 
        });

        if (res.status == 201) { 
          navigate(`/login`);
        } else {
          setErrorMessage(true);
        }
      } catch (error) {
        console.error("Error during login: ", error);
        setErrorMessage(true);
      } 
      setEmail("");
      setPassword("");
    } else {
      setEmail("");
      setPassword("");
      setErrorMessage(true);
    }
  }; 

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg my-5">
            <div className="card-body p-5">
              <h1 className="text-center mb-4" style={{ color: "#001450" }}>Register</h1>
          
              <form onSubmit={handleSubmit} method="post">
                <div className="mb-3">
                  <label className="form-label" htmlFor="username">Username</label>
                  <div className="input-group">
                    <span className="input-group-text"><i className="fas fa-envelope"></i></span>
                    <input
                      type="username"
                      className="form-control"
                      id="username"
                      name="username"
                      placeholder="Tav"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      required
                    />
                  </div>
                </div>
            
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
                    Register
                  </button>
                </div>
            
                {errorMessage && <ErrorMessage message={'Try again.'} />}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div > 
  );
};

export default Register;