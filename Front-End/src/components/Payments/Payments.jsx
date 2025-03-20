import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { propertyData } from "../../data/propertyData"
import { MapPin, AlertCircle, CheckCircle, Loader2 } from "lucide-react"
import Tesseract from "tesseract.js"
import "./Payments.css"
import "bootstrap/dist/css/bootstrap.min.css"

function Payments() {
  const { id } = useParams()
  const propertyId = Number.parseInt(id)
  const property = propertyData.find((p) => p.id === propertyId)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [paymentStep, setPaymentStep] = useState('paymentMethod'); // or 'cardDetails'
  const [selectedMethod, setSelectedMethod] = useState(null)
  const [isCardDetailsVisible, setIsCardDetailsVisible] = useState(false);
  const [orderId, setOrderId] = useState('')
  const [image, setImage] = useState(null)
  const [isImageUploaded, setIsImageUploaded] = useState(false)


  if (!property) {
    return <div className="text-container mt-5">Property Not Found</div>
  }

  const handleProceedToPay = () => {
    setIsPopupOpen(true)
  }

  const handleClosePopUp = () => {
    setIsPopupOpen(false)
  }

  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  // New state to track payment success
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleMethodSelect = (methodId) => {
    setSelectedMethod(methodId);
    setImage(null);
    setIsImageUploaded(false);
    setCardDetails({
      cardNumber: '',
      expiryDate: '',
      cvv: '',
    });
  };

  const handleCardDetailsChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Function to handle the card details form submission
  const handleCardDetailsSubmit = () => {
    // Validation before submission
    if (!cardDetails.cardNumber || !cardDetails.expiryDate || !cardDetails.cvv) {
      alert('Please fill all the fields');
      return;
    }
    setPaymentStep('paymentSuccess')
    setPaymentSuccess(true);
  };


  const handlePayNowClick = () => {
    if (selectedMethod === 'visa' || selectedMethod === 'mastercard') {
      setPaymentStep('cardDetails'); // Go to the card details page
    }
    else if (selectedMethod === 'bank') {
      setPaymentStep('uploadBankImage');
    }
  };

  // New function to handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Preview image
      setIsImageUploaded(true); // Mark image as uploaded
    }
  };

  const handleImageVerification = () => {
    if (!isImageUploaded) {
      alert("Please upload an image to verify.");
      return;
    }
    // In Here, you can add logic to verify the image if necessary
    alert("Image uploaded successfully for verification.");
  };

  // Payment methods data with icons
  const paymentMethods = {
    "Credit/Debit Card": [
        { id: "visa", name: "Visa", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Visa_2021.svg/1200px-Visa_2021.svg.png" },
        { id: "mastercard", name: "Mastercard", icon: 'https://www.pngplay.com/wp-content/uploads/12/Visa-Card-Logo-No-Background.png' },
        { id: "amex", name: "American Express", icon: 'https://www.citypng.com/public/uploads/preview/hd-amex-american-express-logo-png-701751694708970jttzjjyo6e.png' },
      ],
    "Mobile Wallet": [
      { id: "genie", name: "Genie", icon: "https://www.genie.lk/wp-content/uploads/2021/03/genie-logo.png" },
      { id: "ezcash", name: "Ez Cash", icon: "https://yt3.googleusercontent.com/eJyvaQmKtG_F-8JC6qJLIjcfHzyIwD0O5bOnmfZP0ed2XjbCiPJfPHPqL9FGlbvw7942CBar=s900-c-k-c0x00ffffff-no-rj" },
      { id: "mcash", name: "mCash", icon: "https://play-lh.googleusercontent.com/vJsVOZbuNfKbLshcBmxIQaisdkI_8isieqkXhtxuqnr-PKnc53v-8GwdzgaI53P8_lA" },
      { id: "frimi", name: "FriMi", icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_ys1jHPlXUOGwBhVXQQIwYt5VgmQmteZDCA&s" },
    ],
    "Bank Transfer": [{ id: "bank", name: "Bank Transfer", icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDnE_apx1xxwayXZulkEHC_PLDeU9MTmXz-LxwGNP5jvX49oXDvgcBO-0hgLac2D0mrnA&usqp=CAU" }],
  }

  // generating a unique order id for properties

  const generateOrderId = () => {
    const uniqueOrderId = `order_${Date.now()}`
    setOrderId(uniqueOrderId)
  }

  useEffect(() => {
    generateOrderId();
  }, []);


  return (
    <div className={`container d-flex justify-content-center align-items-center min-vh-100 ${isPopupOpen ? "blur-background" : ""}`}>
      <div className="card shadow p-4 text-center w-75" id="payments-container">
        <h2 className="mb-3">Your Booking Details Are As Follows: </h2>
        <h2 className="prop-name"> {property.name} </h2>
        <h4>Price: {property.price} </h4>
        <h4>
          location: <MapPin size={24} color="red" /> {property.location}
        </h4>
        <button className="btn mt-3 w-50 btn-primary" onClick={handleProceedToPay}>
          Proceed To Pay
        </button>
      </div>

      {/* PayHere Payment Popup */}
      {isPopupOpen && (
        <div className="payhere-popup-overlay">
          <div className="payhere-popup-container">
            <div className="payhere-popup">
              {/* Header */}
              <div className="payhere-header">
                <div className="payhere-logo-wrapper">
                  <img src="https://payherestorage.blob.core.windows.net/payhere-resources/www/images/PayHere-Logo.png" alt="PayHere" className="payhere-logo" />
                </div>
                <div className="payhere-merchant-info">
                  <div className="merchant-name">{property.name}</div>
                  <div className="order-id">Order ID: {orderId} </div>
                  <div className="amount">Rs. {property.price}</div>
                </div>

                <button className="close-btn" onClick={handleClosePopUp}>
                  X
                </button>
              </div>

              {/* Body */}
              <div className="payhere-body">
                {paymentStep === 'paymentMethod' && (
                  <>
                    <div className="payment-method-title">SELECT A PAYMENT METHOD</div>

                    {Object.entries(paymentMethods).map(([category, methods]) => (
                      <div key={category} className="payment-category">
                        <div className="category-title">{category}</div>
                        <div className="payment-methods-row">
                          {methods.map((method) => (
                            <div
                              key={method.id}
                              className={`payment-method-item ${selectedMethod === method.id ? "selected" : ""}`}
                              onClick={() => handleMethodSelect(method.id)}
                            >
                              <img
                                src={method.icon || "/placeholder.svg"}
                                alt={method.name}
                                className="payment-icon"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </>
                )}

                {paymentStep === 'cardDetails' && (
                  <div className="card-details-form">
                    <div className="form-group">
                      <label htmlFor="cardNumber">Card Number</label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={cardDetails.cardNumber}
                        onChange={handleCardDetailsChange}
                        required
                        placeholder="Enter your card number"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="expiryDate">Expiration Date</label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        value={cardDetails.expiryDate}
                        onChange={handleCardDetailsChange}
                        required
                        placeholder="MM/YY"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="cvv">CVV</label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={cardDetails.cvv}
                        onChange={handleCardDetailsChange}
                        required
                        placeholder="Enter your CVV"
                      />
                    </div>

                    <div className="payhere-actions mt-4">
                      <button
                        className="btn btn-success payhere-pay-btn"
                        onClick={handleCardDetailsSubmit}
                      >
                        Submit Payment
                      </button>
                    </div>
                  </div>
                )}

                {paymentStep === 'paymentSuccess' && (
                  <div className="payment-success">
                    <div className="success-icon">
                      <img src="https://www.pngall.com/wp-content/uploads/9/Green-Tick-No-Background.png" alt="" />
                    </div>
                    <h3>Payment Successful!</h3>
                    <p className="success-message">Your payment has been processed successfully.</p>
                    <button onClick={handleClosePopUp} className="btn btn-primary">
                      Close
                    </button>
                  </div>
                )}

                <div className="payhere-actions mt-4">
                  {paymentStep === 'paymentMethod' && (
                    <button
                      className="btn btn-success payhere-pay-btn"
                      disabled={!selectedMethod}
                      onClick={handlePayNowClick}
                    >
                      Pay Now
                    </button>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="payhere-footer">
                <div className="secured-by">
                  <span>Secured by</span>
                  <img src="https://payherestorage.blob.core.windows.net/payhere-resources/www/images/PayHere-Logo.png" alt="PayHere" className="payhere-footer-logo" />
                </div>
                <div className="central-bank-text">Central Bank approved Secure Payment Gateway Service</div>
              </div>
              <br /><br />
            </div>
          </div>
          
        </div>
      )}
      
    </div>
  )
}

export default Payments