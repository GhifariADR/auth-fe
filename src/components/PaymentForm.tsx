import React, { useState } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import type { PaymentFormData } from "../model/paymentDTO";
import {isAdmin } from "../utils/token";

interface PaymentFormProps {
    rentalUnitId:number;
    onSubmit: (data:PaymentFormData) => void;

}

const PaymentForm: React.FC<PaymentFormProps> = ({rentalUnitId, onSubmit}) => {

    const [form, setForm] = useState({
        amount: '',
        payerName: '',
        monthPaidFor: new Date(),
        paymentMethod: '',
        notes : '',

    });

    const handleChange = (e:React.ChangeEvent<HTMLInputElement| HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setForm(prev => ({...prev, [name]: value}));
        
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const paymentData: PaymentFormData ={
            rentalUnitId,
            amount: Number(form.amount),
            monthPaidFor : form.monthPaidFor.toISOString(),
            payerName: form.payerName,
            paymentMethod: form.paymentMethod,
            notes: form.notes
        }

        onSubmit(paymentData)
    }


  return (
    <div>
        {isAdmin() && 
        <form onSubmit={handleSubmit} className="card mt-2 w-100">       
            <h4>Payment Form</h4>
            <div className="row">
                <div className="col-6 mb-3">
                    <label className="form-label">Amount</label>
                    <input type="number" name="amount" className="form-control" value={form.amount} onChange={handleChange} placeholder="Input amount" required />
                </div>
                <div className="col-6 mb-3">
                    <label className="col-md-12 form-label">Month Paid For</label>
                    <DatePicker 
                        selected={form.monthPaidFor}
                        onChange={date => setForm(prev => ({...prev, monthPaidFor: date as Date}))}
                        dateFormat="MMMM yyyy"
                        showMonthYearPicker
                        className="col-md-12 form-control"
                        required
                        />
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 mb-3">
                    <label className="form-label">Payer Name</label>
                    <input type="text" name="payerName" placeholder="Input payer name" className="form-control" value={form.payerName} onChange={handleChange} required />
                </div>
                <div className="col-md-6 ">
                    <label className="form-label">Payment Method</label>
                    <select name="paymentMethod" className="form-select" value={form.paymentMethod} onChange={handleChange} required>
                        <option value="">Select Method</option>
                        <option value="transfer">Transfer</option>
                        <option value="cash">Cash</option>
                    </select>
                </div>
                
            </div>
            <div className="row">
                <div className="mb-3">
                    <label className="form-label">Notes</label>
                    <textarea name="notes" placeholder="Input notes" className="form-control" value={form.notes} onChange={handleChange} />
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <button type="submit" className="btn btn-primary w-100">Submit Payment</button>
                </div>
                
            </div>

        </form>
        }
        

    </div>
    
  )
}

export default PaymentForm