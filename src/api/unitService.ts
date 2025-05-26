import type { RentalUnitResponse } from "../model/unitDTO";
import axiosInstance from "../utils/axios";


interface unitResponse {
  status: string;
  message: string;
  data: RentalUnitResponse[];
}

export const getAllUnit = async () : Promise<RentalUnitResponse[]> => {
    const response = await axiosInstance.post<unitResponse> ("/rental-unit/getAll",{});
    return response.data.data;
}

export const getDetailUnit = async (id : string|undefined) : Promise<RentalUnitResponse> => {
    const response = await axiosInstance.post<RentalUnitResponse>(`/rental-unit/${id}`, {});
    return response.data;
}