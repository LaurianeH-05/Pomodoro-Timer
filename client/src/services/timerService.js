//timerServices.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Adjust this URL if needed

// Function to save timer settings with auth
export const saveTimerSettings = async (workMinutes, breakMinutes) => {
  try {
    const token = localStorage.getItem('token'); // Retrieve token after user login
    const response = await axios.post(
      `${API_URL}/timer/settings`,
      { workMinutes, breakMinutes },
      {
        headers: { Authorization: `Bearer ${token}` }, // Attach token to request
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error saving timer settings:', error);
    throw error;
  }
};

// Function to get timer settings with auth
export const getTimerSettings = async () => {
  try {
    const token = localStorage.getItem('token'); // Retrieve token after user login
    const response = await axios.get(`${API_URL}/timer/settings`, {
      headers: { Authorization: `Bearer ${token}` }, // Attach token to request
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching timer settings:', error);
    throw error;
  }
};

// Function to log session data with auth
export const logSession = async (sessionData) => {
  try {
    const token = localStorage.getItem('token'); // Retrieve token after user login
    const response = await axios.post(
      `${API_URL}/session`,
      sessionData,
      {
        headers: { Authorization: `Bearer ${token}` }, // Attach token to request
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error logging session:', error);
    throw error;
  }
};

// Function to get user stats with auth
export const getStats = async () => {
  try {
    const token = localStorage.getItem('token'); // Retrieve token after user login
    const response = await axios.get(`${API_URL}/stats`, {
      headers: { Authorization: `Bearer ${token}` }, // Attach token to request
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching stats:', error);
    throw error;
  }
};
