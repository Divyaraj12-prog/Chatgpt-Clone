import axios from "axios";

const BASE = import.meta.env.VITE_API_URL;

const instance = axios.create({
  baseURL: BASE,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});

// Add response interceptor to handle errors
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default instance;