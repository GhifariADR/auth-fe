import axios from "axios";

const API_URL = 'http://localhost:8080';

export interface LoginRequest {
    username: string;
    password: string
}

export interface LoginResponse {
    status: string
    message: string
    data: Data
}

export interface Data {
    token: string
}

export const login = async (data:LoginRequest): Promise<LoginResponse> =>{
    const response = await axios.post<LoginResponse>(`${API_URL}/auth/login`, data)
    return response.data
}