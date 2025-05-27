import type { ApiResponse, LoginRequest, LogoutRequest, RegisterRequest } from "../model/authDTO";
import axiosInstance from "../utils/axios";

const API_URL = 'http://localhost:8080';


export const login = async (data:LoginRequest): Promise<ApiResponse> =>{
    const response = await axiosInstance.post<ApiResponse>(`/auth/login`, data);
    return response.data
}

export const logout = async (data:LogoutRequest) : Promise<ApiResponse> => {
    const response = await axiosInstance.post<ApiResponse>(`${API_URL}/auth/logout`, data);
    return response.data
}

export const register = async (data:RegisterRequest): Promise<ApiResponse> => {
    const response = await axiosInstance.post<ApiResponse>(`${API_URL}/auth/register`, data)
    return response.data;
}