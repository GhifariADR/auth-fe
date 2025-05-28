import type { ApiResponse, LoginRequest, LogoutRequest, RegisterRequest } from "../model/authDTO";
import axiosInstance from "../utils/axios";

export interface ForgotPasswordRequest {
    email : string | null
}

export interface ResetPasswordRequest {
    token : string | null;
    newPassword : string;
}

export const login = async (data:LoginRequest): Promise<ApiResponse> =>{
    const response = await axiosInstance.post<ApiResponse>(`/auth/login`, data);
    return response.data
}

export const logout = async (data:LogoutRequest) : Promise<ApiResponse> => {
    const response = await axiosInstance.post<ApiResponse>(`/auth/logout`, data);
    return response.data
}

export const register = async (data:RegisterRequest): Promise<ApiResponse> => {
    const response = await axiosInstance.post<ApiResponse>(`/auth/register`, data)
    return response.data;
}

export const forgotPassword = async (data:ForgotPasswordRequest) : Promise<ApiResponse> => {
    const response = await axiosInstance.post<ApiResponse>(`/auth/forgot-password`, data)
    return response.data
}

export const resetPassword = async (data:ResetPasswordRequest) : Promise<ApiResponse> => {
    const response = await axiosInstance.post<ApiResponse>(`/auth/reset-password`, data)
    return response.data
}
