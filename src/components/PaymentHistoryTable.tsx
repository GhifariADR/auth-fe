import React from 'react'
import type { Payment } from '../model/unitDTO'

interface Props{
    payments: Payment[];
}

const PaymentHistoryTable:React.FC<Props> = ({payments}) => {

    if(!payments || payments.length === 0){
        return <p className='text-muted'>No data</p>
    }

  return (
    <div className='table-responsive'>
        <h4 className='mb-3'>Payment History</h4>
        <table className='table table-bordered table-striped'>
            <thead className='table-dark'>
                <tr>
                    <th>Mounth Paid</th>
                    <th>Amount</th>
                    <th>Payer</th>
                    <th>Payment Date</th>
                    <th>Payment Method</th>
                    <th>Notes</th>
                </tr>
            </thead>
            <tbody>
                {payments.map((payment) => (
                    <tr key={payment.id}>
                        <td>{payment.monthPaidFor}</td>
                        <td>Rp {payment.amount.toLocaleString('id-ID')}</td>
                        <td>{payment.payerName}</td>
                        <td>{payment.paymentDate}</td>
                        <td>{payment.paymentMethod}</td>
                        <td>{payment.notes ?? '-'}</td>
                    </tr>
                ))}

            </tbody>
        

        </table>
    </div>
  )
}

export default PaymentHistoryTable