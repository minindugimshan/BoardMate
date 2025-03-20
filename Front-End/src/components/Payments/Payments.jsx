import { useState } from "react"
import { useParams } from "react-router-dom"
import { propertyData } from "../../data/propertyData"
import { MapPin } from "lucide-react"
import "./Payments.css"
import "bootstrap/dist/css/bootstrap.min.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'; 

function Payments() {
  const { id } = useParams()
  const propertyId = Number.parseInt(id)
  const property = propertyData.find((p) => p.id === propertyId)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [selectedMethod, setSelectedMethod] = useState(null)

  if (!property) {
    return <div className="text-container mt-5">Property Not Found</div>
  }

  const handleProceedToPay = () => {
    setIsPopupOpen(true)
  }

  const handleClosePopUp = () => {
    setIsPopupOpen(false)
  }

  const handleMethodSelect = (methodId) => {
    setSelectedMethod(methodId)
  }

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
    "Internet Banking": [{ id: "bank", name: "Internet Banking", icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDnE_apx1xxwayXZulkEHC_PLDeU9MTmXz-LxwGNP5jvX49oXDvgcBO-0hgLac2D0mrnA&usqp=CAU" }],
  }

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
                  <div className="order-id">S00013-1</div>
                  <div className="amount">Rs. {property.price}</div>
                </div>

                <button className="close-btn" onClick={handleClosePopUp}>
                  X
                </button>

              </div>

              {/* Body */}
              <div className="payhere-body">
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
                          <img src={method.icon || "/placeholder.svg"} alt={method.name} className="payment-icon" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="payhere-actions mt-4">
                  <button
                    className="btn btn-success payhere-pay-btn"
                    disabled={!selectedMethod}
                    onClick={() => {
                      if (selectedMethod) {
                        
                      }
                    }}
                  >
                    Pay Now
                  </button>
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