import axios from "axios";
import { getToken } from "./token";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Interceptor untuk menyisipkan token otomatis
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;    
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;