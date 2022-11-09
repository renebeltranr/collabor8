import React from 'react';
import auth from '../utilities/Auth';
import apiService from './../utilities/ApiService';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Logout (props) {
  let navigate = useNavigate();
  const handleClick = () => {
    apiService.logout();
    handleAuth();
  };

  const handleAuth = () => {
    props.setIsAuthenticated(false);
    auth.logout(() => navigate('/'));
  };

  return (
    <div className='logout'>
      <h2>Are you sure you want to log out?</h2>
      <Link to="/">
        <button className="default-btn">No</button>
      </Link>
      <button className="default-btn" onClick={() => handleClick()}>
        Yes
      </button>
    </div>
  );
};

export default Logout;
