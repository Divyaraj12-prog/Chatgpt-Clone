import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000", // You can set a default base URL if needed
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