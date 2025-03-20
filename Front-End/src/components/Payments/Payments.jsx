import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { propertyData } from '../../data/propertyData'

function Payments() {

    const {id} = useParams();
    const propertyId = parseInt(id);
    const property = propertyData.find((p) => p.id === propertyId);
    const [isPopupOpen , setIsPopupOpen] = useState(false);

    if(!property){
        return <div className='text-container mt-5'>Property Not Found</div>
    }

    const handleProceedToPay = () => {
        setIsPopupOpen(true);
    }

    const handleClosePopUp = () => {
        setIsPopupOpen(false);
    }
  return (
    <div className='container d-flex justify-content-center align-items-center min-vh-100'>
        <div className='card shadow p-4 text-center w-75' id='payments-container'>
            

        </div>

    </div>
  )
}

export default Payments