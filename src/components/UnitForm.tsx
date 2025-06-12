import React, { useState } from 'react'
import CurrencyInput from 'react-currency-input-field';
import { handleAxiosError } from '../utils/handelAxiosError';
import { createRentalUnit } from '../api/rentalUnitService';
import { toast } from 'react-toastify';
import LoadingOverlay from './LoadingOverlay';
import { useNavigate } from 'react-router-dom';

const UnitForm:React.FC = () => {

    const [loading, setLoading] = useState<boolean>(false)
    const [form, setForm] = useState({
        name : '',
        address : '',
        monthlyRent : 0 as number,
        status : ''
        
    })
    const navigate = useNavigate(); 

    const handleChange = (e:React.ChangeEvent<HTMLInputElement| HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setForm(prev => ({...prev, [name]: value}));
        console.log(form);          
    }

    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault();
        setLoading(true)

        try{
            const response = await createRentalUnit(form)

            if (response.status == 'error'){
                toast.error(response.message);
                return;
            }

            toast.success(response.message)
            navigate('/dashboard')


        } catch(err){
            handleAxiosError(err)

        } finally {
            setLoading(false)

        }


    }


  return (
    <div className='container'>
        <h1>Create New Unit</h1>

        <div className='card mt-5 w-100'>
            <form onSubmit={handleSubmit}>
                <div className='row mt-2'>
                    <div className='col-md-6 col-sm-12'>
                        <label className='form-label'>Name</label>
                        <input type='text' className='form-control' value={form.name} onChange={handleChange} placeholder='Input Name' name='name' required/>
                    </div>
                    <div className='col-md-6 col-sm-12'>
                        <label className='form-label'>Status</label>
                        <select className='form-select' value={form.status} onChange={handleChange} name='status' required>
                            <option value="" >Select Method</option>
                            <option value="available" >Available</option>
                            <option value="available" >Rent</option>
                        </select>
                    </div>
                    
                </div>
                <div className='row mt-3'>
                    <div className='col-md-4 col-sm-4'>
                        <label className='form-label'>Monthly Rent</label>
                        {/* <input type='number' className='form-control' value={form.monthlyRent} onChange={handleChange} name='monthlyRent' placeholder='Input Monthly Rent' required /> */}              
                        <CurrencyInput
                            name='monthlyRent'
                            className='form-control'
                            value={form.monthlyRent}
                            prefix='Rp '
                            groupSeparator='.'
                            decimalSeparator=','
                           
                            decimalsLimit={0}
                            onValueChange={(value, name, values) => {
                                setForm((prev) => ({
                                ...prev,
                                monthlyRent: values?.float ?? 0,
                                }));                                                            
                            }}
                            required
                        />
                    </div>
                    <div className='col-md-8 col-sm-8'>
                        <label className='form-label'>Address</label>
                        <input type='text' className='form-control' value={form.address} onChange={handleChange} name='address' placeholder='Input Address' required />
                    </div>
                </div>
                <div className='row mt-4'>
                    <button type='submit' className='btn btn-primary'>Submit</button>
                </div>
            </form>
            <LoadingOverlay show={loading}/>
        </div>

    </div>
  )
}

export default UnitForm