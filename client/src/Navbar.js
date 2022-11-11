import React from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from './App';

function Navbar() {
  const ctx = React.useContext(GlobalContext); 

  return (
    <div className="Navbar">
      <Link to="/">
        <h1 className="mainTitle">Collabor8</h1>
      </Link>
      <h5 className="subTitle">Play with fellow musicians from all over the world!</h5>
      <div className="sessionButtons">
        {ctx.isAuthenticated ? (
          <><div className="navButtons">
            <Link to="/profile">
            <button className="default-btn">Profile</button>
            </Link>
            <Link to="/logout">
            <button className="default-btn">Logout</button>
            </Link>
            </div>
          </>
        ) : (
          <>
          <div className="navButtons">
            <Link to="/register">
            <button className="default-btn">Register</button>
            </Link>
            <Link to="/login">
            <button className="default-btn">Login</button>
            </Link>
            </div>
          </>
          
        )}
      </div>
    </div>
  );
}

export default Navbar;