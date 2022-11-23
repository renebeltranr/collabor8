import React, { useState } from "react";
import authApiService from "../../utilities/authApiService";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../App";
import "./Register.css";
import { IError } from "../../utilities/types";
import { Link } from "react-router-dom";

const initialState = {
  username: "",
  password: "",
  passwordConf: "",
  country: "",
};

function Register() {
  const ctx = React.useContext(GlobalContext);
  const navigate = useNavigate();
  const [state, setState] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, passwordConf, country } = state;
    if (password !== passwordConf) {
      return alert("Passwords do not match."); // TO DO: instead of alert add a div under the form
    }
    let lowerCaseUsername = state.username.toLowerCase();
    const user = { username: lowerCaseUsername, password, country };
    if (authApiService.register) {
      const res: IError | Response = (await authApiService.register(user)) as
        | IError
        | Response;
      if (res.status === 400) {
        const errorResponse = res as IError;
        alert(`${errorResponse.message}`);
        setState(initialState);
      } else {
        ctx.setIsAuthenticated(true);
        navigate(`/profile/${lowerCaseUsername}`);
      }
    }
  };

  const validateForm = () => {
    return (
      !state.username ||
      !state.password ||
      !state.country ||
      !state.passwordConf
    );
  };

  return (
    <>
      <div className="register">
        <div className="container-center">

          <div className="form-heading">
          <h2>Register</h2>
          </div>


       <form className="form" onSubmit={handleSubmit}>

      <div className="textbox">
          <input 
              data-cy="username"
              type="text"
              name="username"
              minLength={4}
              value={state.username}
              onChange={handleChange} 
              required />
          <label>User name</label>
          <span className="material-symbols-outlined"> account_circle </span>
        </div>

          <div className="textbox">
            <input
              data-cy="password"
              type="password"
              name="password"
              value={state.password}
              onChange={handleChange}
              required
            />
            <label>Password</label>
            <span className="material-symbols-outlined"> key </span>
          </div>

          <div className="textbox">
            <input
              data-cy="passwordConf"
              type="password"
              name="passwordConf"
              value={state.passwordConf}
              onChange={handleChange}
              required
            />
            <label>Confirm Password</label>
            <span className="material-symbols-outlined"> key </span>
            </div>

            <div className="textbox">
            <input
              data-cy="country"
              type="text"
              name="country"
              value={state.country}
              onChange={handleChange}
              required
            />
            <label htmlFor="country">Country</label>
            <span className="material-symbols-outlined"> location_on </span>
            </div>

            <div className="navigation-link">
            Signed up already? <Link id="link" to="/login"><p>Log in</p></Link>
            </div>

            <button
              id="register-btn"
              type="submit"
              disabled={validateForm()}
            >
              Join
            </button>
            
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
