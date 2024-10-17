//LoginPage.js

import React, { useState } from 'react';
import { loginUser } from '../services/authServices';
import { useNavigate } from 'react-router-dom'; // For navigation

const LoginPage = () => {
  const [username, setUsername] = useState(''); // Change email to username
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous error
    if (!username || !password) {
      setError('Both username and password are required');
      return;
    }
    
    try {
      const userData = await loginUser(username, password);
      navigate('/dashboard'); // Redirect on successful login
    } catch (err) {
      setError(err.message); // Show the error message from the backend
    }
  };
  

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label> {/* Update label to username */}
          <input
            type="text"  // Change type to text for username
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>

      <p>Don't have an account?</p>
      <button onClick={() => navigate('/signup')}>Sign Up</button> {/* Sign up button */}
    </div>
  );
};

export default LoginPage;
