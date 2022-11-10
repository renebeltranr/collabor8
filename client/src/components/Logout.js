import React from 'react';
import apiService from './../utilities/ApiService';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../App';

function Logout () {
  const ctx = React.useContext(GlobalContext); 
  let navigate = useNavigate();
  const handleClick = () => {
    if (ctx.isAuthenticated) {
      apiService.logout();
      ctx.setIsAuthenticated(false);
      navigate('/')
    } else console.log("User already logged out")
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
