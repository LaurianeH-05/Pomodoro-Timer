//SignUpPage.js

import React, { useState } from 'react';
import { signupUser } from '../services/authServices';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState(''); // New state for email
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateUsername = (username) => {
    // Username must be 3-20 characters long and alphanumeric
    const regex = /^[a-zA-Z0-9]{3,20}$/;
    return regex.test(username);
  };

  const validateEmail = (email) => {
    // Basic email validation regex
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    // Password must be at least 8 characters long
    return password.length >= 8;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true); // Start loading

    if (!validateUsername(username)) {
      setError('Username must be 3-20 characters long and alphanumeric.');
      setIsLoading(false); // Stop loading
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      setIsLoading(false); // Stop loading
      return;
    }

    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters long.');
      setIsLoading(false); // Stop loading
      return;
    }

    // Proceed with signup
    try {
      await signupUser(username, email, password); // Call signup service with email
      alert('Signup successful!');
      navigate('/'); // Redirect to home or another page
    } catch (error) {
      setError(error.message); // Show error message
    } 
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSignup}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email" // Change type to email for validation
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
