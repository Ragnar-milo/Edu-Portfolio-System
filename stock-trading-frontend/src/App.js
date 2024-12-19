import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Dashboard from './components/Dashboard';
import Trade from './components/Trade';
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [portfolio, setPortfolio] = useState({}); // User's stock portfolio
  const [error, setError] = useState(null); // Error state for handling errors

  // Load portfolio from local storage when the app initializes
  useEffect(() => {
    const savedPortfolio = localStorage.getItem('portfolio');
    if (savedPortfolio) {
      setPortfolio(JSON.parse(savedPortfolio));
    }
  }, []);

  // Save portfolio to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('portfolio', JSON.stringify(portfolio));
  }, [portfolio]);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPortfolio({}); // Optionally clear portfolio on logout
  };

  const handleSwitchToLogin = () => {
    setIsAuthenticated(false); // Ensure the user is not authenticated when switching to login
  };

  const handleTradeSuccess = () => {
    // Handle trade success logic here
  };

  const handleError = (error) => {
    setError(error);
  };

  return (
    <Router>
      <div>
        <h1>Edu-Portfolio System</h1>
        {error && <p style={{ color: 'red' }}>{error.message}</p>}
        <Routes>
          <Route path="/register" element={<Register onSwitchToLogin={handleSwitchToLogin} onError={handleError} />} />
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} setPortfolio={setPortfolio} onError={handleError} />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard portfolio={portfolio} onLogout={handleLogout} /> : <Login onLoginSuccess={handleLoginSuccess} setPortfolio={setPortfolio} onError={handleError} />} />
          <Route path="/" element={isAuthenticated ? <Dashboard portfolio={portfolio} onLogout={handleLogout} /> : <Login onLoginSuccess={handleLoginSuccess} setPortfolio={setPortfolio} onError={handleError} />} />
          <Route path="/trade/:symbol" element={<Trade onTradeSuccess={handleTradeSuccess} onError={handleError} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;