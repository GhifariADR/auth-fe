import type { RentalUnitDetailResponse, RentalUnitResponse } from "../model/unitDTO";
import axiosInstance from "../utils/axios";


export const getAllUnit = async () : Promise<RentalUnitResponse> => {
  const response = await axiosInstance.post<RentalUnitResponse> ("/rental-unit/getAll",{});
  return response.data;
}

// export const getPaymentHistory = async (id : string|undefined) : Promise<RentalUnitResponse> => {
//   const response = await axiosInstance.post<RentalUnitResponse>(`/rental-unit/${id}`, {});
//   return response.data;
// }

export const getDetailUnit = async (id : string|undefined) : Promise<RentalUnitDetailResponse> => {
  const response = await axiosInstance.post<RentalUnitDetailResponse>(`/rental-unit/${id}`, {});
  return response.data;
}