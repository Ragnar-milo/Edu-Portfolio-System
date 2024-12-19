// src/components/Auth/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css';

const Register = ({ onSwitchToLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to the registration endpoint
      await axios.post('http://localhost:5000/api/auth/register', {
        username,
        password,
      });
      setMessage('Registration successful! You can now log in.');
      setUsername(''); // Clear the username field
      setPassword(''); // Clear the password field
      setError(''); // Clear any previous error messages
    } catch (error) {
      console.error('Error registering:', error);
      setError('Registration failed. Please try again.'); // Set error message
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)} // Update username state
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Update password state
          required
        />
        <button type="submit">Register</button>
      </form>
      {message && <div className="message">{message}</div>} {/* Display success message */}
      {error && <div className="error">{error}</div>} {/* Display error message */}
      <button onClick={onSwitchToLogin}>Already have an account? Login</button>
    </div>
  );
};

export default Register;