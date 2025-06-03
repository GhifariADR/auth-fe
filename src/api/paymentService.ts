import type { ApiResponse } from "../model/authDTO";
import type { PaymentFormData } from "../model/paymentDTO";
import axiosInstance from "../utils/axios";



export const addPayment = async (data:PaymentFormData): Promise<ApiResponse> => {
    const response = await axiosInstance.post<ApiResponse>(`/payment/add-payment`, data)
    return response.data
}