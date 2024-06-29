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
    <div className="container flex-column bg-white p-5 my-4 form-border">
        <h1 style={{ color: "#001450" }}>Register</h1>
        <form onSubmit={handleSubmit} method="post">
        <div className="mb-3">
            <label className="form-label" htmlFor="username">
              Username:
            </label>
            <input
                type="username"
                name="username"
                id="username"
                placeholder="Tav"
                value={userName}
                onChange={(e) =>
                    setUserName(e.target.value)
                }
                required
            />
        </div>
        <div className="mb-3">
          <label className="form-label"htmlFor="email">
            Email:
          </label>
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
          <label className="form-label px-0" htmlFor="password">
            Password:
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
          Register
        </button>
        {errorMessage && <ErrorMessage message={'Error. Please try again.'}/> }      
    </form> 
    </div>
  );
};

export default Register;