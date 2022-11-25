import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../App";
import "./Navbar.css";

function Navbar() {
  const ctx = React.useContext(GlobalContext);

  useEffect(() => {}, [ctx]);

  return (
    <div className="Navbar">
      <div className="sessionButtons">
        {ctx.isAuthenticated ? (
          <>
            <Link to="/logout">
              <button className="regular-btn">Logout</button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/register">
              <button className="regular-btn">Register</button>
            </Link>
            <Link to="/login">
              <button className="login-btn">Login</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
