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
        <div className="container-center">
          <h4>Are you sure you want to log out?</h4>
          <div className="logoutButtons">
            <button className="default-btn" data-cy="logout-yes" onClick={() => handleClick()}>
              Yes
            </button>
            <button onClick={goToMain} className="default-btn" data-cy="logout-no">
              No
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Logout;
