import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useParams } from 'react-router-dom'
import { getDetailUnit } from '../api/unitService';
import type { RentalUnit } from '../model/unitDTO';
import LoadingOverlay from '../components/LoadingOverlay';

const RentalUnitDetail: React.FC = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [unit, setUnit] = useState<RentalUnit | null> (null)

    const {id} = useParams<string>();

    useEffect(() => {
        fetchData();
    },[])

    const fetchData = async () => {

        setLoading(true);

        try{
            const response = await getDetailUnit(id); 
            setUnit(response.data)
            console.log(response);
            
        } catch(err){
            console.log(err);
        } finally {
            setLoading(false)
        }
    }

    if (loading) return <LoadingOverlay show={loading}/>

  return (
    <div>
        <Navbar/>
        rental unit display {id}
    </div>
  )
}

export default RentalUnitDetail