import axios from "axios";
import { logoutUser } from "../utils/authService";

const secureAxiosInstance = axios.create({
  baseURL: "https://hiring-dev.internal.kloudspot.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach Bearer token
secureAxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: handle global errors
secureAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      logoutUser(); // force logout
    }
    return Promise.reject(error);
  }
);

export default secureAxiosInstance;
