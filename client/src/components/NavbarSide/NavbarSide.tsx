import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../App";
import "./NavbarSide.css";
import { FaHome, FaRegUser, FaPlusCircle } from "react-icons/fa";


function Navbar() {
  const ctx = React.useContext(GlobalContext);

  useEffect(() => {}, [ctx]);

  

  return (
    <div className="Navbar-side">
      
      <Link to="/">
        <div className="logoContainer">
          <h1>Collabor8</h1>
        </div>
      </Link>

      <Link to="/">
      <div className="icon-with-title">
      <FaHome color="white" fontSize="1.5rem"/>
      <p>Home</p>
      </div>
     </Link>


      
      <Link to={ctx.username ? `/profile/${ctx.username}` : `/`} style={{pointerEvents: ctx.isAuthenticated ? 'auto' : 'none'}}>
      <div className="icon-with-title">
      <FaRegUser color="white" fontSize="1.5rem"/>
      <p>Profile</p>
      </div>
      </Link>


    <Link to="/collab/newCollab" style={{pointerEvents: ctx.isAuthenticated ? 'auto' : 'none'}}>
      <div className="icon-with-title">
      <FaPlusCircle color="white" fontSize="1.5rem"/>
      <p>Add Collab</p>
      </div>
      </Link>
  

      </div>

  );
}

export default Navbar;
