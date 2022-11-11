import React, { useState, useEffect, createContext } from 'react';
import Navbar from "./Navbar";
import Dashboard from './Dashboard';
import { BrowserRouter as Router } from 'react-router-dom';
import apiService from './utilities/ApiService';

export const GlobalContext = React.createContext({
  isAuthenticated: false,
  setIsAuthenticated: ()=>{},
  userId: '',
  username: ''
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    const getProfile = async () => {
      const userInfo = await apiService.me();
      if (userInfo !== undefined) {
        setIsAuthenticated(true)
        setUserId(userInfo._id);
        setUsername(userInfo.username);
      }
    };
    getProfile();
  }, []);

  const ctx = { 
    isAuthenticated: isAuthenticated,
    setIsAuthenticated: setIsAuthenticated,
    userId: userId,
    username: username
  }

  return (
    <div className="App">
      <Router>
      <GlobalContext.Provider value={ctx}>
        <Navbar isAuthenticated={isAuthenticated} username={username}/>
        <Dashboard 
        isAuthenticated={isAuthenticated} 
        setIsAuthenticated={isAuthenticated} 
        userId={userId} 
        />
      </GlobalContext.Provider>
      </Router>
    </div>
  );
}

export default App;
