import React, { useState, useEffect } from 'react'
import './Payments.css'
import { propertyData } from '../../data/propertyData'
import { MapPin } from 'lucide-react';
import { useParams } from 'react-router-dom';

function Payments() {

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://sandbox.payhere.lk/payhere.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

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

    const initiatePayment = async (property) => {
        const orderId = `order_${Date.now()}`;
        const amount = property.price.toString();
        const currency = "LKR";

        try {
            // 🔥 Fetch the hash from the backend
            const response = await fetch("http://localhost:8080/api/payment/generate-hash", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    orderId: orderId,
                    amount: amount,
                    currency: currency
                })
            });

            const hash = await response.text();

            if (!hash) {
                throw new Error("Failed to generate hash");
            }

            // 🔥 Proceed with payment now that we have the hash
            const payment = {
                sandbox: true,
                merchant_id: "1229745",  // Your PayHere Merchant ID
                return_url: "http://localhost:5173/payment-success",
                cancel_url: "http://localhost:5173/payment-cancel",
                notify_url: "http://localhost:8080/api/payment/notify",
                order_id: orderId,
                items: property.name,
                amount: amount,
                currency: currency,
                hash: hash,  // 🔥 Use generated hash from backend
                first_name: "Test",
                last_name: "User",
                email: "test@example.com",
                phone: "0123456789",
                address: "Colombo",
                city: "Colombo",
                country: "Sri Lanka"
            };

            console.log("Starting PayHere payment with:", payment);

            payhere.onCompleted = function(orderId) {
                console.log("Payment completed. OrderID: ", orderId);
                window.location.href = `/payment-success`;
            };

            payhere.onDismissed = function() {
                console.log("Payment dismissed by user");
                window.location.href = `/payment-cancel`;
            };

            payhere.onError = function(error) {
                console.log("Error occurred: ", error);
                alert("Payment failed. Please try again.");
            };

            payhere.startPayment(payment);

        } catch (error) {
            console.error("Payment initiation error:", error);
            alert("Error initiating payment.");
        }
    };

    // const initiatePayment = (property) => {
    //     const payment = {
    //         sandbox: true,
    //         merchant_id: "1229745",
    //         return_url: "http://localhost:5173/payment-success",
    //         cancel_url: "http://localhost:5173/payment-cancel",
    //         notify_url: "http://localhost:8080/api/payment/notify",
    //         order_id: `order_${Date.now()}`,
    //         items: property.name,
    //         amount: property.price,
    //         currency: "LKR",
    //         first_name: "Test",
    //         last_name: "User",
    //         email: "test@example.com",
    //         phone: "0123456789",
    //         address: "Colombo",
    //         city: "Colombo",
    //         country: "Sri Lanka",
    //         hash: hash
    //     };

    //     console.log("Merchant ID: ", payment.merchant_id);
    //     console.log("Amount: ", payment.amount);
    //     console.log("Order ID: ", payment.order_id);
        

    //     payhere.onCompleted = function(orderId) {
    //         console.log("Payment completed. OrderID: ", orderId);
    //         window.location.href = `/payment-success`;
    //     };

    //     payhere.onDismissed = function() {
    //         console.log("Payment dismissed bu user ");
    //         window.location.href = `/payment-cancel`;
    //     };

    //     payhere.onError = function(error) {
    //         console.log("Error occurred: " , error);
    //         alert("Payment failed. Please try again,")
    //     };

    //     console.log("Attempting to start PayHere payment with:", payment);

    //     payhere.startPayment(payment);

        
        
    // };

    

  return (
    <div className='container d-flex justify-content-center align-items-center min-vh-100'>
        <div className='card shadow p-4 text center w-75 m-md-50' id='payments-container'>
            <h2 className='mb-3'>Booking Details: <br /><br /></h2>
            <h2 className='prop-name'>{property.name}</h2>
            <h4>Price: {property.price} LKR </h4>
            <h4>Location: <MapPin size={24} color='red' /> {property.location} </h4>
            <button className='btn mt-3 w-50' onClick={handleBookNow}>Proceed to pay</button>
        </div>
    
    </div>
  )
}

export default Payments