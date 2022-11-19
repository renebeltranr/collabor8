import React, { useState } from "react";
import authApiService from "../../utilities/authApiService";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../App";
import "./Register.css";
import { IError } from "../../utilities/types";

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
    <div className="main">
      <div className="register">
        <div className="registerFlex">
          <h2>Register</h2>
          <form className="mainForm" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="username"
              name="username"
              minLength={4}
              value={state.username}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="password"
              name="password"
              value={state.password}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="password confirmation"
              name="passwordConf"
              value={state.passwordConf}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Spain"
              name="country"
              value={state.country}
              onChange={handleChange}
            />
            <button
              id="register-btn"
              className="default-btn"
              type="submit"
              disabled={validateForm()}
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
