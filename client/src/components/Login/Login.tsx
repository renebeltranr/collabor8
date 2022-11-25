import React from "react";
import { useState, useContext } from "react";
import authApiService from "../../utilities/authApiService";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../App";
import "./Login.css";
import { IError, IUser } from "../../utilities/types";

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
    if (authApiService.login) {
      const res: any = (await authApiService.login(user)) as
        any;
      if (res.status === 400) {
        const errorResponse = res as IError;
        alert(`${errorResponse.message}`);
        setState(initialState);
      } else {
        const userResponse = res as unknown as IUser;
        ctx.setIsAuthenticated(true);
        ctx.setUserId(userResponse._id as string);
        ctx.setUsername(userResponse.username);
        navigate(`/profile/${username}`);
      }
    }
  };

  const validateForm = () => {
    return !state.username || !state.password;
  };

  return (
    <>
      <div className="login">
        <div className="container-center">

        <div className="form-heading">
          <h2>Log In</h2>
        </div>
          
          <form className="form" onSubmit={handleSubmit}>

            <div className="textbox">
            <input
              type="text"
              data-cy="username"
              name="username"
              value={state.username}
              onChange={handleChange}
              required
            />
            <label>User name</label>
            <span className="material-symbols-outlined"> account_circle </span>
            </div>

            <div className="textbox">
            <input
              type="password"
              data-cy="password"
              name="password"
              value={state.password}
              onChange={handleChange}
              required
            />
            <label>Password</label>
            <span className="material-symbols-outlined"> key </span>
            </div>


            <button
              id="login-btn"
              type="submit"
              disabled={validateForm()}
            >
              Login
            </button>

          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
