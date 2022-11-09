import React, { useState } from 'react';
import Navbar from "./Navbar";
import Dashboard from './Dashboard';
import Auth from './utilities/Auth';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  const initialState = Auth.isAuthenticated();
  const [isAuthenticated, setIsAuthenticated] = useState(initialState);

  return (
    <div className="App">
      <Router>
        <Navbar isAuthenticated={isAuthenticated} />
        <Dashboard setIsAuthenticated={setIsAuthenticated} />
      </Router>
    </div>
  );
}

export default App;
