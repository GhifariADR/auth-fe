import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useParams } from 'react-router-dom'
import { getDetailUnit} from '../api/unitService';
import type { RentalUnitDetailResponse} from '../model/unitDTO';
import LoadingOverlay from '../components/LoadingOverlay';
import PaymentHistoryTable from '../components/PaymentHistoryTable';
import { toast } from 'react-toastify';

const RentalUnitDetail: React.FC = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [unit, setUnit] = useState<RentalUnitDetailResponse| null> (null)
    const {id} = useParams<string>();

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

    if (loading) return <LoadingOverlay show={loading}/>

    const rentalUnit = unit?.data;

  return (
    <div>
        <Navbar/>
        <div className='container'>
            <div className='row mt-5'>
                <h1 className='text-capitalize'>{rentalUnit?.name}</h1>
            </div>
            <div className='row mt-3 mx-1'>
                <PaymentHistoryTable payments={rentalUnit?.payment ?? []}/>
            </div>
            
        </div>
        
    </div>
  )
}

export default RentalUnitDetail