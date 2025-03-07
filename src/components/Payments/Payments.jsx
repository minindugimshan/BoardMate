import React, { useState } from 'react'
import './Payments.css'
import { propertyData } from '../../data/propertyData'
import { Currency } from 'lucide-react';

function Payments({property}) {

    const [isRedirecting , setIsRedirecting] = useState(false);

    const handleBookNow = () => {
        // starting the redirecting process
        setIsRedirecting(true);
        initiatePayment(propertyData);
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
    <div>
        <h2>Book Your Property: {propertyData.name}</h2>
        <h4>Price: {propertyData.price} </h4>
        <button onClick={handleBookNow}>Proceed to pay</button>
    </div>
  )
}

export default Payments