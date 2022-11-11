import { useState, useContext } from "react";
import apiService from "./../utilities/ApiService";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../App";

function Login (){
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
    const res = await apiService.login(user);
    if (res.error) {
      alert(`${res.message}`);
      setState(initialState);
    } else {
      ctx.setIsAuthenticated(true);
      navigate(`/profile/${username}`);
    }
  };

  const validateForm = () => {
    return !state.username || !state.password;
  };

  return (
    <div className='login'>
    <section>
      <h2>Login</h2>
      <form className="form" onSubmit={handleSubmit}>
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
        <button className="form-submit" type="submit" disabled={validateForm()}>
          &nbsp;Login&nbsp;
        </button>
      </form>
    </section>
    </div>
  );
};

export default Login;
