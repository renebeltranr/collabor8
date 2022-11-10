import React, { useState, useEffect, createContext } from 'react';
import Navbar from "./Navbar";
import Dashboard from './Dashboard';
import { BrowserRouter as Router } from 'react-router-dom';
import apiService from './utilities/ApiService';

export const GlobalContext = React.createContext({
  isAuthenticated: false,
  setIsAuthenticated: ()=>{},
  userId: '',
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const getProfile = async () => {
      const userInfo = await apiService.profile();
      if (userInfo !== undefined) {
        setIsAuthenticated(true)
        setUserId(userInfo._id);
      }
    };
    getProfile();
  }, []);

  const ctx = { 
    isAuthenticated: isAuthenticated,
    setIsAuthenticated: setIsAuthenticated,
    userId: userId
  }

  return (
    <div className="App">
      <Router>
      <GlobalContext.Provider value={ctx}>
        <Navbar isAuthenticated={isAuthenticated} />
        <Dashboard setIsAuthenticated={isAuthenticated} userId={userId} />
      </GlobalContext.Provider>
      </Router>
    </div>
  );
}

export default App;
