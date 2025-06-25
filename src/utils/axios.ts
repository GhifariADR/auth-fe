import axios from "axios";
import { clearToken, getToken, isTokenExpired } from "./token";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Interceptor untuk menyisipkan token otomatis
axiosInstance.interceptors.request.use(
    (config) => {
        const token = getToken();

        if (token) {
            if(isTokenExpired()){
                clearToken();
                toast.error('Token Expired')
                window.location.href = '/'
            }
            config.headers.Authorization = `Bearer ${token}`;    
        }
        return config;
    },

    (error) => Promise.reject(error)
);

export default axiosInstance;