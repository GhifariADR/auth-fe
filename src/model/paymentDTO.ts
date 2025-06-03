export interface PaymentFormData {
    rentalUnitId: number,
    amount: number;
    payerName: string;
    monthPaidFor: string;
    paymentMethod : string;
    notes?: string

}