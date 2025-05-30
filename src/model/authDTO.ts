export interface LoginRequest {
    username: string;
    password: string
}

export interface LogoutRequest {
    token : string | null;
}

export interface RegisterRequest {
    username : string;
    email : string;
    password : string;
}

export interface ApiResponse {
    status: string
    message: string
    data?: Data
}

export interface Data {
    token: string
}

