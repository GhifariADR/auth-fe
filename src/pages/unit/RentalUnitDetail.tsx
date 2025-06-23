import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getDetailUnit} from '../../api/unitService';
import type { RentalUnitDetailResponse} from '../../model/unitDTO';
import LoadingOverlay from '../../components/LoadingOverlay';
import PaymentHistoryTable from '../../components/PaymentHistoryTable';
import { toast } from 'react-toastify';
import PaymentForm from '../../components/PaymentForm';
import { addPayment} from '../../api/paymentService';
import { handleAxiosError } from '../../utils/handelAxiosError';
import type { PaymentFormData } from '../../model/paymentDTO';
import SideBar from '../../components/sideBar/SideBar';

const RentalUnitDetail: React.FC = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [unit, setUnit] = useState<RentalUnitDetailResponse| null> (null)
    const {id} = useParams<string>();
    const rentalUnitId = Number(id)

    useEffect(() => {
        fetchData();
        
    },[])

    const fetchData = async () => {

        setLoading(true);

        try{
            const response = await getDetailUnit(id); 

            if(response.status == "error"){
                toast.error(response.message)
                return
            }

            setUnit(response)
        
            console.log(response);
            
        } catch(err){
            console.log(err);
        } finally {
            setLoading(false)
        }
    }
    const handleSubmitPayment = async (paymentData: PaymentFormData) =>{
        setLoading(true)

        try{           
            
           const response =  await addPayment(paymentData);
           console.log(response);
           
           if (response.status == 'error'){
                toast.error(response.message)
                return
           }

           toast.success(response.message)
           fetchData();

        } catch(err){
            handleAxiosError(err)
        } finally {
            setLoading(false)
        }

    }

    const rentalUnit = unit?.data;

  return (
    <div>
        <SideBar/>
        <div className='container'>
            <div className='row mt-1'>
                <h1 className='text-capitalize'>{rentalUnit?.name}</h1>
            </div>
            <div className='row mt-3 mx-1'>
                <PaymentForm rentalUnitId={rentalUnitId} onSubmit={handleSubmitPayment}/>
            </div>
            <div className='row mt-3 mx-1'>
                <PaymentHistoryTable payments={rentalUnit?.payment ?? []}/>
            </div>
        </div>
        <LoadingOverlay show={loading}/>
        
    </div>
  )
}

export default RentalUnitDetail