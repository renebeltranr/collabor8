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
      <h4 className="subTitle">Play with fellow musicians all around the world!</h4>
      <div className="sessionButtons">
        {ctx.isAuthenticated ? (
          <>
            <Link to="/profile">Profile</Link>
            <Link to="/logout">Logout</Link>
          </>
        ) : (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;