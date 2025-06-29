import React, { useEffect, useState } from 'react'
import { getAllUnit } from '../api/unitService'
import '../style/RentalUnit.css'
import LoadingOverlay from './LoadingOverlay'
import { useNavigate } from 'react-router-dom'
import type { RentalUnit} from '../model/unitDTO'
import { toast } from 'react-toastify'
import { handleAxiosError } from '../utils/handelAxiosError'

const RentalUnitList:React.FC = () => {

    const [units, setUnits] = useState<RentalUnit[]>([])
    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    useEffect(() => {
        fetchUnit();
    }, [])


    const fetchUnit = async () => {

        setLoading(true)

        try {
            const response = await getAllUnit();

            if(response.data == null){
                toast.error(response.message)
            }

            setUnits(response.data)
            console.log(response.data);
    
        } catch(err){
            handleAxiosError(err)
            
        } finally {
            setLoading(false)
        }
    }

    const detailUnit = (id:number) => {
        navigate(`/rentalUnitDetail/${id}`);
    }


  return (
    <div>
        <div className='row'>
            {units.map((unit) =>(
                <div key={unit.id} className='col-md-4 col-sm-12 mb-3' onClick={() =>{detailUnit(unit.id)}} style={{cursor: 'pointer'}}>
                    <div className='unit-box shadow-sm'>
                        <div className='card-body'>
                            <h5 className='card-title text-capitalize'>{unit.name}</h5>
                            <p className='card-text'>Alamat : {unit.address}</p>
                            <p className='card-text'>Harga : Rp {unit.monthlyRent.toLocaleString()} /bulan</p>
                            <p className='card-text'>Status : {unit.status}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        <LoadingOverlay show={loading}/>
    </div>
  )
}

export default RentalUnitList