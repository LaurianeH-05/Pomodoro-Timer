//authServices.js
import axios from 'axios';

// Replace with your backend API URL
const API_URL = 'http://localhost:5000/api';

// Login user with real backend
export const loginUser = async (username, password) => { // Updated to accept username
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password }); // Changed email to username
    const { user } = response.data; // Adjusted to not expect token
    return { user }; // Return the user data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

// Sign up new user with real backend
export const signupUser = async (username, email, password) => { // Updated to accept email
  try {
    const response = await axios.post(`${API_URL}/signup`, { username, email, password }); // Included email in request
    return response.data; // Return user data from the server
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Signup failed');
  }
};
