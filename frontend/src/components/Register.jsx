import validationService from "../services/validation.helper"; 
import { useState } from "react"; 
import accService from "../services/account.service"; 
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [errorMessage, setErrorMessage] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
      
    const passVal = validationService.validPassword(password);
    const emailVal = validationService.validEmail(email);

    if (passVal && emailVal) {
      
      const res = await accService.registerService({
        email: email,
        password: password 
      });

      if (res.status == 201) {
        console.log("Success!")
        navigate(`/login`);
      }

      setEmail("");
      setPassword("");
      setErrorMessage(false);
    } else {
      setErrorMessage(true);
    }
  }; 

  return (
    <form onSubmit={handleSubmit}>
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
          <input type="submit" value="Register" />
      </div> 
    </form>
  );
};

export default Register;