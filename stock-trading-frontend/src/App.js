import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import './App.css'; 

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState(null); // Fixed variable name
    const [error, setError] = useState(null);

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId'); // Fixed variable name
        if (storedUserId) {
            setIsAuthenticated(true);
            setUserId(storedUserId); // Fixed variable name
        }
    }, []);

    const handleLoginSuccess = (id) => {
        setIsAuthenticated(true);
        setUserId(id); // Fixed variable name
        localStorage.setItem('userId', id);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setUserId(null); // Fixed variable name
        localStorage.removeItem('userId');
    };

    const handleSwitchToLogin = () => {
        setIsAuthenticated(false);
    };

    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/contact">Contact Us</Link></li>
                        {isAuthenticated ? (
                            <li><Link to="/dashboard">Dashboard</Link></li>
                        ) : (
                            <>
                                <li><Link to="/login">Login</Link></li>
                                <li><Link to="/register">Register</Link></li>
                            </>
                        )}
                    </ul>
                </nav>

                {error && <p style={{ color: 'red' }}>{error.message}</p>}
                <Routes>
                    {/* Public Routes */}
                    <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} onError={setError} />} />
                    <Route path="/register" element={<Register onSwitchToLogin={handleSwitchToLogin} onError={setError} />} />

                    {/* Protected Routes */}
                    {isAuthenticated ? (
                        <>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/dashboard" element={<Dashboard userId={userId} onLogout={handleLogout} />} />
                        </>
                    ) : (
                        <Route path="/" element={<Navigate to="/login" />} />
                    )}

                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;