import axios from "axios";
import type { ApiResponse, LoginRequest, LogoutRequest } from "../model/authDTO";

const API_URL = 'http://localhost:8080';


export const login = async (data:LoginRequest): Promise<ApiResponse> =>{
    const response = await axios.post<ApiResponse>(`${API_URL}/auth/login`, data);
    return response.data
}

export const logout = async (data:LogoutRequest) : Promise<ApiResponse> => {
    const response = await axios.post<ApiResponse>(`${API_URL}/auth/logout`, data);
    return response.data
}