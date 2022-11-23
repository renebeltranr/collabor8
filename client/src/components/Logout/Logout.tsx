import React from "react";
import authApiService from "../../utilities/authApiService";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../App";
import "./Logout.css";

function Logout() {
  const ctx = React.useContext(GlobalContext);
  let navigate = useNavigate();

  const handleClick = async () => {
    if (ctx.isAuthenticated) {
      if (authApiService.logout) await authApiService.logout();
      ctx.setIsAuthenticated(false);
      ctx.setUserId("");
      ctx.setUsername("");
      navigate("/");
    } else console.log("User already logged out");
  }

  function goToMain() {
    navigate("/");
  }

  return (
    <>
      <div className="logout">
        <div className="logoutFlex">
          <h4>Are you sure you want to log out?</h4>
          <div className="logoutButtons">
<<<<<<< HEAD
            <button className="default-btn"  data-cy="logout-yes" onClick={()=>handleClick()}>
              Yes
            </button>
            <button onClick={goToMain} data-cy="logout-no" className="default-btn">
=======
            <button className="default-btn" data-cy="logout-yes" onClick={() => handleClick()}>
              Yes
            </button>
            <button onClick={goToMain} className="default-btn" data-cy="logout-no">
>>>>>>> 7435bb27b935b3cc48d41b7753aec596af239744
              No
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Logout;
