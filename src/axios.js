// import axios from "axios";

// export const makeRequest = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
//   withCredentials: true, // This is important for sending cookies
// });

import axios from "axios";

// Create a new axios instance
export const makeRequest = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Add a request interceptor to attach token from localStorage
makeRequest.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken"); // Get JWT from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add Bearer token to headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
