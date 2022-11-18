import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../App";
import "./Navbar.css";
function Navbar() {
    const ctx = React.useContext(GlobalContext);
    useEffect(() => { }, [ctx]);
    return (React.createElement("div", { className: "Navbar" },
        React.createElement(Link, { to: "/" },
            React.createElement("div", { className: "logoContainer" },
                React.createElement("img", { className: "logo", src: "/navLogo.png", alt: "Collabor8" }))),
        React.createElement("div", { className: "sessionButtons" }, ctx.isAuthenticated ? (React.createElement(React.Fragment, null,
            React.createElement(Link, { to: ctx.username ? `/profile/${ctx.username}` : `/` },
                React.createElement("button", { className: "default-btn" }, "Profile")),
            React.createElement(Link, { to: "/logout" },
                React.createElement("button", { className: "default-btn" }, "Logout")))) : (React.createElement(React.Fragment, null,
            React.createElement(Link, { to: "/register" },
                React.createElement("button", { className: "default-btn" }, "Register")),
            React.createElement(Link, { to: "/login" },
                React.createElement("button", { className: "default-btn" }, "Login")))))));
}
export default Navbar;
//# sourceMappingURL=Navbar.js.map