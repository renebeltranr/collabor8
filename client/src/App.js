import React, { useState, useEffect, createContext } from 'react';
import Navbar from "./Navbar";
import Dashboard from './Dashboard';
import { BrowserRouter as Router } from 'react-router-dom';
import authApiService from './utilities/authApiService';

export const GlobalContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: ()=>{},
  userId: '',
  username: '',
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    const getProfile = async () => {
      const userInfo = await authApiService.me();
      if (userInfo !== undefined) {
        setIsAuthenticated(true)
        setUserId(userInfo._id);
        setUsername(userInfo.username);
      }
      else {
        console.log("Couldn't retrieve user info")
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
        <Navbar isAuthenticated={ctx.isAuthenticated} username={ctx.username}/>
        <Dashboard 
          isAuthenticated={ctx.isAuthenticated} 
          setIsAuthenticated={ctx.setIsAuthenticated} 
          userId={ctx.userId}
          username={ctx.username}
        />
      </GlobalContext.Provider>
      </Router>
    </div>
  );
}

export default App;
