import axiosInstance from "../utils/axios"

interface UserPaginationRequest{
    page : string,
    sortBy ?: string,
    keyword ?: string,
    direction ?: string

}

export interface User{
    id: number;
    username: string;
    email: string;
    role: string;
}

interface UserApiResponse {
    status: string;
    message: string;
    data: {
        totalItems: number;
        totalPage: number;
        currentPage: number;
        users: User[];
    };
}

export const getAllUser = async (data:UserPaginationRequest) : Promise<UserApiResponse> => {
    const response = await axiosInstance.post<UserApiResponse>('/user/getAll', data);
    return(response.data)

}