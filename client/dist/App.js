var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { useState, useEffect, createContext } from "react";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import authApiService from "./utilities/authApiService";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import Home from "./components/Home/Home";
import { Collab } from "./components/Collab/Collab";
import NewCollab from "./components/NewCollab/NewCollab";
import Logout from "./components/Logout/Logout";
import Record from "./components/Record/Record";
export const GlobalContext = createContext({
    isAuthenticated: false,
    setIsAuthenticated: () => { },
    setUserId: () => { },
    setUsername: () => { },
    userId: "",
    username: "",
});
function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState("");
    const [username, setUsername] = useState("");
    useEffect(() => {
        const getProfile = () => __awaiter(this, void 0, void 0, function* () {
            const userInfo = yield authApiService.me();
            if (userInfo !== undefined) {
                setIsAuthenticated(true);
                setUserId(userInfo._id);
                setUsername(userInfo.username);
            }
            else {
                console.log("Couldn't retrieve user info");
            }
        });
        getProfile();
    }, []);
    const ctx = {
        isAuthenticated,
        setIsAuthenticated,
        setUserId,
        setUsername,
        userId,
        username,
    };
    return (React.createElement("div", { className: "App" },
        React.createElement(Router, null,
            React.createElement(GlobalContext.Provider, { value: ctx },
                React.createElement(Navbar, null),
                React.createElement(Routes, null,
                    React.createElement(Route, { path: "/register", element: React.createElement(Register, null) }),
                    React.createElement(Route, { path: "/login", element: React.createElement(Login, null) }),
                    React.createElement(Route, { path: "/profile/:username", element: React.createElement(Profile, null) }),
                    React.createElement(Route, { path: "/", element: React.createElement(Home, null) }),
                    React.createElement(Route, { path: "/collab/id/:id", element: React.createElement(Collab, null) }),
                    isAuthenticated ? (React.createElement(React.Fragment, null,
                        React.createElement(Route, { path: "/collab/newCollab", element: React.createElement(NewCollab, null) }),
                        React.createElement(Route, { path: "/logout", element: React.createElement(Logout, null) }),
                        React.createElement(Route, { path: "/record/:id", element: React.createElement(Record, null) }))) : (React.createElement(React.Fragment, null)))))));
}
export default App;
//# sourceMappingURL=App.js.map