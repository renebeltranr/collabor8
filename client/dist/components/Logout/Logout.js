var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React from "react";
import authApiService from "../../utilities/authApiService";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../App";
import "./Logout.css";
function Logout() {
    const ctx = React.useContext(GlobalContext);
    let navigate = useNavigate();
    const handleClick = () => __awaiter(this, void 0, void 0, function* () {
        if (ctx.isAuthenticated) {
            if (authApiService.logout)
                yield authApiService.logout();
            ctx.setIsAuthenticated(false);
            ctx.setUserId("");
            ctx.setUsername("");
            navigate("/");
        }
        else
            console.log("User already logged out");
    });
    function goToMain() {
        navigate("/");
    }
    return (React.createElement("div", { className: "main" },
        React.createElement("div", { className: "logout" },
            React.createElement("div", { className: "logoutFlex" },
                React.createElement("h4", null, "Are you sure you want to log out?"),
                React.createElement("div", { className: "logoutButtons" },
                    React.createElement("button", { className: "default-btn", "data-cy": "logout-yes", onClick: () => handleClick() }, "Yes"),
                    React.createElement("button", { onClick: goToMain, "data-cy": "logout-no", className: "default-btn" }, "No"))))));
}
export default Logout;
//# sourceMappingURL=Logout.js.map