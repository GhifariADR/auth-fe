import type { ApiResponse } from "../model/authDTO"
import axiosInstance from "../utils/axios"

export interface RentalUnitRequest{
    name: string
    address: string
    monthlyRent: number
    status: string
} 

export const createRentalUnit = async (data:RentalUnitRequest) : Promise<ApiResponse> => {
    const response = await axiosInstance.post<ApiResponse>(`/rental-unit/create`,data);
    return response.data
}