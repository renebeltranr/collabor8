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
        const res = yield authApiService.register(user);
        if (res.error) {
            alert(`${res.message}`);
            setState(initialState);
        }
        else {
            ctx.setIsAuthenticated(true);
            navigate(`/profile/${lowerCaseUsername}`);
        }
    });
    const validateForm = () => {
        return (!state.username ||
            !state.password ||
            !state.country ||
            !state.passwordConf);
    };
    return (React.createElement("div", { className: "main" },
        React.createElement("div", { className: "register" },
            React.createElement("div", { className: "registerFlex" },
                React.createElement("h2", null, "Register"),
                React.createElement("form", { className: "mainForm", onSubmit: handleSubmit },
                    React.createElement("input", { type: "text", placeholder: "username", name: "username", minLength: 4, value: state.username, onChange: handleChange }),
                    React.createElement("input", { type: "password", placeholder: "password", name: "password", value: state.password, onChange: handleChange }),
                    React.createElement("input", { type: "password", placeholder: "password confirmation", name: "passwordConf", value: state.passwordConf, onChange: handleChange }),
                    React.createElement("input", { type: "text", placeholder: "Spain", name: "country", value: state.country, onChange: handleChange }),
                    React.createElement("button", { id: "register-btn", className: "default-btn", type: "submit", disabled: validateForm() }, "Register"))))));
}
export default Register;
//# sourceMappingURL=Register.js.map