import React, { useState, useEffect } from 'react';
import './Payments.css';
import { propertyData } from '../../data/propertyData';
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

    const { id } = useParams();
    const propertyId = parseInt(id);
    const property = propertyData.find(p => p.id === propertyId);

    const [isRedirecting, setIsRedirecting] = useState(false);

    if (!property) {
        return <div className="text-center mt-5">Property Not Found</div>;
    }

    const handleBookNow = async () => {
        setIsRedirecting(true);
        await initiatePayment(property);
    };

    const initiatePayment = async (property) => {
        const orderId = `order_${Date.now()}`;
        const amount = property.price.toString();
        const currency = "LKR";

        try {
            const hashResponse = await fetch(`http://localhost:8080/api/payment/generate-hash?orderId=${orderId}&amount=${amount}&currency=${currency}`);

            if (!hashResponse.ok) {
                throw new Error('Error generating hash');
            }

            const hash = await hashResponse.text();
            console.log("Generated Hash:", hash);

            if (typeof window.payhere === "undefined") {
                console.error("PayHere script not loaded yet.");
                alert("Payment system is not ready. Please try again.");
                return;
            }

            // Example: sending payment data from frontend to backend (using fetch)
            const response = await fetch("http://localhost:8080/api/payment/initiate-payment", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(paymentRequest),  // paymentRequest should be the object with payment data
            });
  
            const result = await response.json();
            // Handle the result, redirect the user to PayHere if needed
            window.location.href = result.redirectUrl;

            // PayHere payment object
            const payment = {
                sandbox: true,
                merchant_id: "1229745", // Replace with your Merchant ID
                return_url: "http://localhost:5173/payment-success",
                cancel_url: "http://localhost:5173/payment-cancel",
                notify_url: "http://localhost:8080/api/payment/notify",
                order_id: orderId,
                items: property.name,
                amount: amount,
                currency: currency,
                hash: hash, // Use generated hash from backend
                first_name: "Test",
                last_name: "User",
                email: "test@example.com",
                phone: "0123456789",
                address: "Colombo",
                city: "Colombo",
                country: "Sri Lanka"
            };

            console.log("Starting PayHere payment with:", payment);

            payhere.onCompleted = function (orderId) {
                console.log("Payment completed. OrderID:", orderId);
                window.location.href = `/payment-success`;
            };

            payhere.onDismissed = function () {
                console.log("Payment dismissed by user");
                window.location.href = `/payment-cancel`;
            };

            payhere.onError = function (error) {
                console.log("Error occurred:", error);
                alert("Payment failed. Please try again.");
            };

            // Start PayHere payment popup
            payhere.startPayment(payment);

        } catch (error) {
            console.error("Payment initiation error:", error);
            alert("Error initiating payment.");
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card shadow p-4 text center w-75 m-md-50" id="payments-container">
                <h2 className="mb-3">Booking Details:</h2>
                <h2 className="prop-name">{property.name}</h2>
                <h4>Price: {property.price} LKR</h4>
                <h4>Location: <MapPin size={24} color="red" /> {property.location}</h4>
                <button className="btn mt-3 w-50" onClick={handleBookNow} disabled={isRedirecting}>
                    {isRedirecting ? "Redirecting..." : "Proceed to Pay"}
                </button>
            </div>
        </div>
    );
}

export default Payments;
