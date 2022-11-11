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
      navigate('/');
    } else console.log("User already logged out")
  };

  function goToMain () {
    navigate('/');
  }

  return (
    <div className='logout'>
      <div className="logoutButtons">
      <h3>Are you sure you want to log out?</h3>
      <button className="default-btn" onClick={() => handleClick()}>
        Yes
      </button>
        <button onClick={goToMain} className="default-btn">
        No
        </button>
      </div>
    </div>
  );
};

export default Logout;
