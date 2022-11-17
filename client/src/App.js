import React, { useState, useEffect, createContext } from "react";
import Navbar from "./components/Navbar/Navbar";
//import Dashboard from "./Dashboard";
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
  setIsAuthenticated: () => {},
  setUserId: () => {},
  setUsername: () => {},
  userId: "",
  username: "",
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const getProfile = async () => {
      const userInfo = await authApiService.me();
      if (userInfo !== undefined) {
        setIsAuthenticated(true);
        setUserId(userInfo._id);
        setUsername(userInfo.username);
      } else {
        console.log("Couldn't retrieve user info");
      }
    };
    getProfile();
  }, []);

  const ctx = {
    isAuthenticated: isAuthenticated,
    setIsAuthenticated: setIsAuthenticated,
    setUserId: setUserId,
    setUsername: setUsername,
    userId: userId,
    username: username,
  };

  return (
    <div className="App">
      <Router>
        <GlobalContext.Provider value={ctx}>
          <Navbar
            isAuthenticated={ctx.isAuthenticated}
            username={ctx.username}
          />
          <Routes>
            <Route
              path="/register"
              element={<Register setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route
              path="/login"
              element={<Login setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route
              path="/profile/:username"
              element={<Profile isAuthenticated={isAuthenticated} />}
            />
            <Route path="/" element={<Home />} />
            <Route path="/collab/id/:id" element={<Collab userId={userId} />} />
            {isAuthenticated ? (
              <>
                <Route
                  path="/collab/newCollab"
                  element={<NewCollab isAuthenticated={isAuthenticated} />}
                />
                <Route
                  path="/logout"
                  element={<Logout setIsAuthenticated={setIsAuthenticated} />}
                />
                <Route
                  path="/record/:id"
                  element={
                    <Record isAuthenticated={isAuthenticated} userId={userId} />
                  }
                />
              </>
            ) : (
              <></>
            )}
          </Routes>
        </GlobalContext.Provider>
      </Router>
    </div>
  );
}

export default App;
