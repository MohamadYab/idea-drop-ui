import axios from 'axios';

// Everything we put here affect all requests that uses this instance
const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;