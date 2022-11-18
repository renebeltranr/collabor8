import React from "react";
import { useState, useContext } from "react";
import authApiService from "../../utilities/authApiService";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../App";
import "./Login.css";

function Login() {
  const ctx = useContext(GlobalContext);
  let navigate = useNavigate();
  const initialState = {
    username: "",
    password: "",
  };
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
    const { username, password } = state;
    const user = { username, password };
    const res = await authApiService.login(user);
    if (res.error) {
      alert(`${res.message}`);
      setState(initialState);
    } else {
      ctx.setIsAuthenticated(true);
      ctx.setUserId(res._id);
      ctx.setUsername(res.username);
      navigate(`/profile/${username}`);
    }
  };

  const validateForm = () => {
    return !state.username || !state.password;
  };

  return (
    <div className="main">
      <div className="login">
        <div className="loginFlex">
          <h2>Login</h2>
          <form className="mainForm" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="username"
              name="username"
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
            <button
              id="login-btn"
              className="default-btn"
              type="submit"
              disabled={validateForm()}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
