
export interface RentalUnitResponse {
  status: string;
  message: string;
  data: RentalUnit[];
}

export interface RentalUnit {
  id: number
  name: string
  address: string
  monthlyRent: number
  status: string
  payment: Payment[] | null
}

export interface Payment {
  id: number
  amount: number
  monthPaidFor: string
  payerName: string
  paymentDate: string
  paymentMethod: string
  notes: any
}

export interface RentalUnitDetailResponse{
  status: string;
  message: string;
  data: RentalUnit;
}
