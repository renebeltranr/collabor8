import React, { useState, useEffect, createContext } from "react";
import Navbar from "./components/Navbar/Navbar";
import NavbarSide from "./components/NavbarSide/NavbarSide";
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
import { IGlobalContext, IUser } from "./utilities/types";
import './index.css';


export const GlobalContext = createContext<IGlobalContext>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  setUserId: () => {},
  setUsername: () => {},
  userId: "",
  username: "",
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<string>("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const getProfile = async () => {
      const userInfo: IUser = await  (authApiService.me && authApiService.me()) as any as IUser;
      if (userInfo !== undefined) {

        setIsAuthenticated(true);
        setUserId(userInfo._id as string);
        setUsername(userInfo.username);
      } else {
        console.log("Couldn't retrieve user info");
      }
    };
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

  return (
      <Router>
        <GlobalContext.Provider value={ctx}>
          <div className="main">
          <NavbarSide />
          <Navbar />
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/" element={<Home />} />
            <Route path="/collab/id/:id" element={<Collab />} />
            {isAuthenticated ? (
              <>
                <Route path="/collab/newCollab" element={<NewCollab />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/record/:id" element={<Record />} />
              </>
            ) : (
              <></>
            )}
          </Routes>
          </div>
        </GlobalContext.Provider>
      </Router>
  );
}

export default App;
