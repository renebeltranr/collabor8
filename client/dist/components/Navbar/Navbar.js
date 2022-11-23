import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../App";
import "./Navbar.css";
function Navbar() {
    const ctx = React.useContext(GlobalContext);
    useEffect(() => { }, [ctx]);
    return (React.createElement("div", { className: "Navbar" },
        React.createElement("div", { className: "sessionButtons" }, ctx.isAuthenticated ? (React.createElement(React.Fragment, null,
            React.createElement(Link, { to: "/logout" },
                React.createElement("button", { className: "regular-btn" }, "Logout")))) : (React.createElement(React.Fragment, null,
            React.createElement(Link, { to: "/register" },
                React.createElement("button", { className: "regular-btn" }, "Register")),
            React.createElement(Link, { to: "/login" },
                React.createElement("button", { className: "login-btn" }, "Login")))))));
}
export default Navbar;
//# sourceMappingURL=Navbar.js.map