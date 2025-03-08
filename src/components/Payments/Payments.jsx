import React, { useState } from 'react'
import './Payments.css'
import { propertyData } from '../../data/propertyData'
import { MapPin } from 'lucide-react';
import { useParams } from 'react-router-dom';

function Payments() {
    const {id} = useParams();
    const propertyId = parseInt(id);
    const property = propertyData.find(p => p.id === propertyId);

    const [isRedirecting , setIsRedirecting] = useState(false);

    if (!property){
        return <div className='text-center mt-5'>Property Not Found</div>
    }

    const handleBookNow = () => {
        // starting the redirecting process
        setIsRedirecting(true);
        initiatePayment(property);
    };

    const initiatePayment = (property) => {
        const paymentData = {
            merchant_id: "1229745",
            return_url: "http://localhost:5173/payment-success",
            cancel_url: "http://localhost:5173/payment-cancel",
            notify_url: "http://localhost:5173/payment-notify",
            order_id: `order_${Date.now()}`,
            items: property.name,
            amount: property.price,
            currency: "LKR",
        };

        // redirecting the user to PayHere payment page with all the payment data
        const payHereURL = `https://sandbox.payhere.lk/pay/checkout?${new URLSearchParams(paymentData).toString()}`;
        window.location.href = payHereURL;
    };

    if (isRedirecting) {
        return <p>Redirecting to the Payments Page.....</p>
    }


  return (
    <div className='payment-details container d-flex justify-content-center align-items-center min-vh-100'>
        <div className='card shadow p-4 text center w-75 m-md-50'>
            <h2 className='mb-3'>Booking Details: <br /><br /> {property.name}</h2>
            <h4 className='text-primary'>Price: {property.price} </h4>
            <h4>Location: <MapPin size={24} color='red' /> {property.location} </h4>
            <button className='btn btn-primary mt-3 w-100' onClick={handleBookNow}>Proceed to pay</button>
        </div>
    
    </div>
  )
}

export default Payments