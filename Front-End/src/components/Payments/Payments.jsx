import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { propertyData } from '../../data/propertyData'
import { MapPin } from 'lucide-react';
import './Payments.css'

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
    <div className={`container d-flex justify-content-center align-items-center min-vh-100 ${isPopupOpen ? "blur-background" : ""}`}>
        <div className='card shadow p-4 text-center w-75' id='payments-container'>
            <h2 className='mb-3'>Your Booking Details Are As Follows: </h2>
            <h2 className='prop-name'> {property.name} </h2>
            <h4>Price: {property.price} </h4>
            <h4>
                location: <MapPin size={24} color='red' /> {property.location}
            </h4>
            <button className='btn mt-3 w-50 btn-primary' onClick={handleProceedToPay}>
                Proceed To Pay
            </button>
        </div>

        {/* Payment pop up section */}
        {isPopupOpen && (
            <div className='payhere-popup-overlay'>
                <div className='payhere-popup fade-in'>
                    <h2 className='payhere title'>Payhere Payment</h2>
                    <h4> {property.name} </h4>
                    <p className='payhere-amount'>Total: <strong> {property.price} </strong> </p>
                </div>

                <div className='payment-methods'>
                    <p>Select Payment Method: </p>
                    <button className='payhere-method btn'>💳 Credit/Debit Cards</button>
                    <button className='payhere-method btn'>🏦 Bank Transfer</button>
                </div>

                <button className='payhere-pay-btn'>Pay Now</button>

                <button className='payhere-close-btn' onClick={handleClosePopUp}>Cancel</button>

            </div>
        )}

    </div>
  )
}

export default Payments