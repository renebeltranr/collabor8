import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../App";
import "./Navbar.css";

function Navbar() {
  const ctx = React.useContext(GlobalContext);

  useEffect(() => {}, [ctx]);

  return (
    <div className="Navbar">
      <Link to="/">
        <div className="logoContainer">
          <img className="logo" src="/navLogo.png" alt="Collabor8" />
        </div>
      </Link>
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
