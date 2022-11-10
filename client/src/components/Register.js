import React, { useState } from 'react';
import apiService from './../utilities/ApiService';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../App';

const initialState = {
  username: '',
  password: '',
  country: '',
};

function Register () {
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
    const { username, password, country } = state;
    const user = { username, password, country };
    const res = await apiService.register(user);
    if (res.error) {
      alert(`${res.message}`);
      setState(initialState);
    } else {
      ctx.setIsAuthenticated(true);
      navigate('/profile');
    }
  };

  const validateForm = () => {
    return (
      !state.username || !state.password || !state.country
    );
  };

  return (
    <div className='register'>
    <section>
      <h2>Register</h2>
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
        <input
          type="text"
          placeholder="Spain"
          name="country"
          value={state.firstName}
          onChange={handleChange}
        />
        <button className="form-submit" type="submit" disabled={validateForm()}>
          &nbsp;Register&nbsp;
        </button>
      </form>
    </section>
    </div>
  );
};

export default Register;
