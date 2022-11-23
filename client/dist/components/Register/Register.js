var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { useState } from "react";
import authApiService from "../../utilities/authApiService";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../App";
import "./Register.css";
import { Link } from "react-router-dom";
const initialState = {
    username: "",
    password: "",
    passwordConf: "",
    country: "",
};
function Register() {
    const ctx = React.useContext(GlobalContext);
    const navigate = useNavigate();
    const [state, setState] = useState(initialState);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setState((prevState) => (Object.assign(Object.assign({}, prevState), { [name]: value })));
    };
    const handleSubmit = (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        const { password, passwordConf, country } = state;
        if (password !== passwordConf) {
            return alert("Passwords do not match."); // TO DO: instead of alert add a div under the form
        }
        let lowerCaseUsername = state.username.toLowerCase();
        const user = { username: lowerCaseUsername, password, country };
        if (authApiService.register) {
            const res = (yield authApiService.register(user));
            if (res.status === 400) {
                const errorResponse = res;
                alert(`${errorResponse.message}`);
                setState(initialState);
            }
            else {
                ctx.setIsAuthenticated(true);
                navigate(`/profile/${lowerCaseUsername}`);
            }
        }
    });
    const validateForm = () => {
        return (!state.username ||
            !state.password ||
            !state.country ||
            !state.passwordConf);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "register" },
            React.createElement("div", { className: "container-center" },
                React.createElement("h2", null, "Register"),
                React.createElement("form", { className: "form", onSubmit: handleSubmit },
                    React.createElement("div", { className: "textbox" },
                        React.createElement("input", { "data-cy": "username", type: "text", name: "username", minLength: 4, value: state.username, onChange: handleChange, required: true }),
                        React.createElement("label", null, "User name"),
                        React.createElement("span", { className: "material-symbols-outlined" }, " account_circle ")),
                    React.createElement("div", { className: "textbox" },
                        React.createElement("label", { htmlFor: "username-input" }, "Username"),
                        React.createElement("input", { "data-cy": "username", type: "text", name: "username", minLength: 4, value: state.username, onChange: handleChange })),
                    React.createElement("div", { className: "textbox" },
                        React.createElement("label", { htmlFor: "password-input" }, "Password"),
                        React.createElement("input", { "data-cy": "password", type: "password", name: "password", value: state.password, onChange: handleChange })),
                    React.createElement("div", { className: "textbox" },
                        React.createElement("label", { htmlFor: "password-confirmation" }, "Password Confirmation"),
                        React.createElement("input", { "data-cy": "passwordConf", type: "password", name: "passwordConf", value: state.passwordConf, onChange: handleChange })),
                    React.createElement("div", { className: "textbox" },
                        React.createElement("label", { htmlFor: "country" }, "Country"),
                        React.createElement("input", { "data-cy": "country", type: "text", name: "country", value: state.country, onChange: handleChange })),
                    React.createElement("p", null,
                        "Signed up already? ",
                        React.createElement(Link, { to: "/login" },
                            React.createElement("p", null, "Log in"))),
                    React.createElement("button", { id: "register-btn", className: "default-btn", type: "submit", disabled: validateForm() }, "Register"))))));
}
export default Register;
//# sourceMappingURL=Register.js.map