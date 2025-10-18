import axios from 'axios';

const API_URL = 'https://toto-backend-bw80.onrender.com/api/v1'; // Adjust if your backend URL is different

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// You can add an interceptor to include the auth token in requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Or however you store the token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
