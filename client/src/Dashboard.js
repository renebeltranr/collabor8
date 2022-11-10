import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Logout from "./components/Logout";
import Home from "./components/Home";
import NewCollab from "./components/NewCollab";
import {Collab} from "./components/Collab";

const Dashboard = ({ setIsAuthenticated, userId }) => {
  return (
    <div className="dashboard">
      <Routes>
        <Route
          path="/register"
          element={<Register setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/logout"
          element={<Logout setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route exact path="/" element={<Home />} />
        <Route path="/collab/newCollab" element={<NewCollab />} />
        <Route path="/collab/id/:id" element={<Collab userId={userId}/>} />
      </Routes>
    </div>
  );
};

export default Dashboard;
