import React, { useState, useEffect, createContext } from 'react';
import Navbar from "./Navbar";
import Dashboard from './Dashboard';
import { BrowserRouter as Router } from 'react-router-dom';
import apiService from './utilities/ApiService';

export const GlobalContext = React.createContext({
  isAuthenticated: false,
  setIsAuthenticated: ()=>{}
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const getProfile = async () => {
      const userInfo = await apiService.profile();
      console.log("USERINFO:", userInfo)
      if (userInfo !== undefined) {
        setIsAuthenticated(true)
      }
    };
    getProfile();
  }, []);

  const ctx = { 
    isAuthenticated: isAuthenticated,
    setIsAuthenticated: setIsAuthenticated
  }
  
  return (
    <div className="App">
      <Router>
      <GlobalContext.Provider value={ctx}>
        <Navbar isAuthenticated={isAuthenticated} />
        <Dashboard setIsAuthenticated={isAuthenticated} />
      </GlobalContext.Provider>
      </Router>
    </div>
  );
}

export default App;
