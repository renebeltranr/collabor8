import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Logout from "./components/Logout";
import Home from "./components/Home";
import NewCollab from "./components/NewCollab";
import { Collab } from "./components/Collab";
import Record from "./components/Record";

const Dashboard = ({ isAuthenticated, setIsAuthenticated, userId }) => {
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
        <Route 
          path="/profile/:username" 
          element={<Profile isAuthenticated={isAuthenticated}/>} 
        />
        <Route
          path="/logout"
          element={<Logout setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route 
          path="/" 
          element={<Home />} 
        />
        <Route 
          path="/collab/newCollab" 
          element={<NewCollab isAuthenticated={isAuthenticated}/>} 
        />
        <Route 
          path="/collab/id/:id" 
          element={<Collab userId={userId} />} 
        />
        <Route 
          path="/record/:id" 
          element={<Record isAuthenticated={isAuthenticated} userId={userId} />} 
        />
      </Routes>
    </div>
  );
};

export default Dashboard;
