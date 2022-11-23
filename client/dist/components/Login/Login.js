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
import { useState, useContext } from "react";
import authApiService from "../../utilities/authApiService";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../App";
import "./Login.css";
function Login() {
    const ctx = useContext(GlobalContext);
    let navigate = useNavigate();
    const initialState = {
        username: "",
        password: "",
    };
    const [state, setState] = useState(initialState);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setState((prevState) => (Object.assign(Object.assign({}, prevState), { [name]: value })));
    };
    const handleSubmit = (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        const { username, password } = state;
        const user = { username, password };
        if (authApiService.login) {
            const res = (yield authApiService.login(user));
            if (res.status === 400) {
                const errorResponse = res;
                alert(`${errorResponse.message}`);
                setState(initialState);
            }
            else {
                const userResponse = res;
                ctx.setIsAuthenticated(true);
                ctx.setUserId(userResponse._id);
                ctx.setUsername(userResponse.username);
                navigate(`/profile/${username}`);
            }
        }
    });
    const validateForm = () => {
        return !state.username || !state.password;
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "login" },
            React.createElement("div", { className: "loginFlex" },
                React.createElement("h2", null, "Login"),
                React.createElement("form", { className: "mainForm", onSubmit: handleSubmit },
                    React.createElement("input", { type: "text", "data-cy": "username", placeholder: "username", name: "username", value: state.username, onChange: handleChange }),
                    React.createElement("input", { type: "password", "data-cy": "password", placeholder: "password", name: "password", value: state.password, onChange: handleChange }),
                    React.createElement("button", { id: "login-btn", className: "default-btn", type: "submit", disabled: validateForm() }, "Login"))))));
}
export default Login;
//# sourceMappingURL=Login.js.map