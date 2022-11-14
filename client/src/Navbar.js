import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from './App';

function Navbar() {
  const ctx = React.useContext(GlobalContext); 

  useEffect(()=>{}, [ctx])

  return (
    <div className="Navbar">
      <Link to="/">
        <h1 className="mainTitle">Collabor8</h1>
      </Link>
      <h5 className="subTitle">Play with fellow musicians from all over the world!</h5>
      <div className="sessionButtons">
        {ctx.isAuthenticated ? (
            <>
            <Link to={ctx.username ? `/profile/${ctx.username}` : `/`}>
            <button className="default-btn">Profile</button>
            </Link>
            <Link to="/logout">
            <button className="default-btn">Logout</button>
            </Link>
            </>
        ) : (
          <>
            <Link to="/register">
            <button className="default-btn">Register</button>
            </Link>
            <Link to="/login">
            <button className="default-btn">Login</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;