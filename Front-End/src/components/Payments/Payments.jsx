import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AlertCircle, CheckCircle, Loader2, CreditCard, Landmark, WalletCards, Printer } from "lucide-react";
import Tesseract from "tesseract.js";
import "./Payments.css";
import "bootstrap/dist/css/bootstrap.min.css";
import useAuthStore from '../../store/auth-store';
import apiService from '../../services/api-service';
import { toast } from "react-toastify";

function Payments() {
  const { id } = useParams();
  const navigate = useNavigate();
  const propertyId = Number.parseInt(id);
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [paymentStep, setPaymentStep] = useState("paymentMethod");
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [orderId, setOrderId] = useState("");
  const [image, setImage] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardType, setCardType] = useState('unknown');
  const [showSuccessDetails, setShowSuccessDetails] = useState(false);

  const { user, isAuthenticated } = useAuthStore();
  const [verificationDetails, setVerificationDetails] = useState({
    bankName: false,
    date: false,
    amount: false,
    accountNumber: false,
    isSlip: false,
  });

  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardHolder: "",
  });

  // Test cards for development
  const testCards = [
    {
      type: "Visa",
      number: "4111 1111 1111 1111",
      expiry: "12/25",
      cvv: "123",
      holder: "TEST USER"
    },
    {
      type: "Mastercard",
      number: "5555 5555 5555 4444",
      expiry: "06/24",
      cvv: "456",
      holder: "TEST USER"
    },
    {
      type: "Amex",
      number: "3782 822463 10005",
      expiry: "09/26",
      cvv: "1234",
      holder: "TEST USER"
    }
  ];

  // Utility functions
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const detectCardType = (cardNumber) => {
    const cleaned = cardNumber.replace(/\s/g, '');
    if (/^4/.test(cleaned)) return 'visa';
    if (/^5[1-5]/.test(cleaned)) return 'mastercard';
    if (/^3[47]/.test(cleaned)) return 'amex';
    return 'unknown';
  };

  const getCardIcon = (cardType) => {
    switch(cardType) {
      case 'visa':
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Visa_2021.svg/1200px-Visa_2021.svg.png';
      case 'mastercard':
        return 'https://www.pngplay.com/wp-content/uploads/12/Visa-Card-Logo-No-Background.png';
      case 'amex':
        return 'https://www.citypng.com/public/uploads/preview/hd-amex-american-express-logo-png-701751694708970jttzjjyo6e.png';
      default:
        return 'https://cdn-icons-png.flaticon.com/512/196/196578.png';
    }
  };

  // Component handlers
  const handleProceedToPay = () => {
    if (!isAuthenticated || !user) {
      toast.error("Please log in to proceed with payment.");
      return;
    }
    setIsPopupOpen(true);
  };

  const handleClosePopUp = () => {
    setIsPopupOpen(false);
    setVerificationResult(null);
    setVerificationDetails({
      bankName: false,
      date: false,
      amount: false,
      accountNumber: false,
      isSlip: false,
    });
    if (paymentSuccess) {
      navigate('/profile');
    }
  };

  const handleMethodSelect = (methodId) => {
    setSelectedMethod(methodId);
    setImage(null);
    setCardDetails({
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardHolder: "",
    });
    setVerificationResult(null);
    setVerificationDetails({
      bankName: false,
      date: false,
      amount: false,
      accountNumber: false,
      isSlip: false,
    });
    setCardType('unknown');
  };

  const handleCardDetailsChange = (e) => {
    const { name, value } = e.target;

    if (name === "cardNumber") {
      const sanitizedValue = value.replace(/[^0-9]/g, "").slice(0, 16);
      const formattedValue = sanitizedValue.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
      setCardDetails(prev => ({ ...prev, [name]: formattedValue }));
      
      if (sanitizedValue.length > 4) {
        setCardType(detectCardType(sanitizedValue));
      } else {
        setCardType('unknown');
      }
    } else if (name === "expiryDate") {
      let sanitizedValue = value.replace(/[^0-9]/g, "").slice(0, 4);
      if (sanitizedValue.length > 2) {
        sanitizedValue = sanitizedValue.slice(0, 2) + "/" + sanitizedValue.slice(2);
      }
      setCardDetails(prev => ({ ...prev, [name]: sanitizedValue }));
    } else if (name === "cvv") {
      const sanitizedValue = value.replace(/[^0-9]/g, "").slice(0, 4);
      setCardDetails(prev => ({ ...prev, [name]: sanitizedValue }));
    } else {
      setCardDetails(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAutoFill = (card) => {
    setCardDetails({
      cardNumber: card.number,
      expiryDate: card.expiry,
      cvv: card.cvv,
      cardHolder: card.holder
    });
    setCardType(detectCardType(card.number));
    toast.success(`${card.type} test card details filled`);
  };

  const validateCardDetails = () => {
    if (!cardDetails.cardNumber || cardDetails.cardNumber.replace(/\s/g, "").length < 13) {
      toast.error("Please enter a valid card number");
      return false;
    }

    if (!cardDetails.expiryDate || !cardDetails.expiryDate.includes("/")) {
      toast.error("Please enter a valid expiry date in MM/YY format");
      return false;
    }

    const [month, year] = cardDetails.expiryDate.split("/");
    const expiryDate = new Date(2000 + Number.parseInt(year), Number.parseInt(month) - 1);
    const currentDate = new Date();

    if (expiryDate < currentDate) {
      toast.error("The card has expired. Please use a valid card.");
      return false;
    }

    if (!cardDetails.cvv || cardDetails.cvv.length < 3) {
      toast.error("Please enter a valid CVV");
      return false;
    }

    if (!cardDetails.cardHolder || cardDetails.cardHolder.trim().length < 3) {
      toast.error("Please enter card holder name");
      return false;
    }

    return true;
  };

  const handleCardDetailsSubmit = async () => {
    if (!validateCardDetails()) return;

    setIsProcessing(true);
    
    // Simulate payment processing
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 80% chance of success for demo purposes
      const isSuccess = Math.random() < 0.8;
      
      if (isSuccess) {
        setPaymentStep("paymentSuccess");
        setPaymentSuccess(true);
        await handlePaymentSuccess();
      } else {
        toast.error("Payment failed. Please try again or use a different card.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment processing failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePayNowClick = () => {
    if (["visa", "mastercard", "amex"].includes(selectedMethod)) {
      setPaymentStep("cardDetails");
    } else if (selectedMethod === "bank") {
      setPaymentStep("uploadBankImage");
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setVerificationResult(null);
      setVerificationDetails({
        bankName: false,
        date: false,
        amount: false,
        accountNumber: false,
        isSlip: false,
      });
    }
  };

  const verifyBankSlip = async () => {
    if (!image) {
      toast.error("Please upload an image to verify.");
      return;
    }

    setIsVerifying(true);
    setVerificationResult(null);

    try {
      const result = await Tesseract.recognize(
        image,
        "eng",
        { logger: (info) => console.log(info) }
      );

      const text = result.data.text.toLowerCase();
      console.log("Extracted text:", text);

      const hasBankName = /bank|hsbc|commercial|sampath|peoples|boc|hnb|dfcc|cargills|seylan|nations trust/i.test(text);
      const hasDate = /\d{1,2}[/\-.]\d{1,2}[/\-.]\d{2,4}|\d{1,2}(?:st|nd|rd|th)?\s(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i.test(text);
      const hasAmount = /amount|rs\.?|total|sum|cash|coins|paid|payment/i.test(text) && /\d+(?:\.\d{2})?/i.test(text);
      const hasAccountNumber = /acc(?:ount)?\s*(?:no|number|#)?[\s:.]?\s*\d+/i.test(text);
      const isLikelySlip = /receipt|computer validation|signature|depositor|name|transaction|payment|deposit|transfer|slip|reference|ref|confirmation/i.test(text);

      const details = {
        bankName: hasBankName,
        date: hasDate,
        amount: hasAmount,
        accountNumber: hasAccountNumber,
        isSlip: isLikelySlip,
      };

      setVerificationDetails(details);
      const verificationScore = Object.values(details).filter(Boolean).length / Object.values(details).length;
      const passes = verificationScore >= 0.6;

      setVerificationResult({
        passes,
        score: Math.round(verificationScore * 100),
        message: passes
          ? "Verification successful! This appears to be a valid bank slip."
          : "Verification failed. This doesn't appear to be a valid bank slip or is missing key information.",
      });

      if (passes) {
        setTimeout(() => {
          setPaymentStep("paymentSuccess");
          setPaymentSuccess(true);
          handlePaymentSuccess();
        }, 2000);
      }
    } catch (error) {
      console.error("Error during OCR:", error);
      setVerificationResult({
        passes: false,
        score: 0,
        message: "Error during verification. Please try again with a clearer image.",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handlePaymentSuccess = async () => {
    if (!property || !user) {
      toast.error("Property or user information is missing.");
      return;
    }

    const paymentData = {
      userId: user.id,
      propertyId: property.id,
      propertyName: property.title,
      propertyAddress: property.address,
      propertyContact: property.contactNumber || "",
      bookingDate: new Date().toLocaleDateString("en-CA"),
      price: property.price,
      paymentMethod: selectedMethod,
      transactionId: orderId,
    };

    try {
      const response = await apiService.post('/payments', paymentData);
      if (response.status === 200 || response.status === 201) {
        localStorage.setItem('bookedProperty', JSON.stringify(property));
        console.log("Payment recorded successfully!");
      }
    } catch (error) {
      console.error("Error saving payment:", error);
      toast.error("An error occurred while saving the payment.");
    }
  };

  const paymentMethods = {
    "Credit/Debit Card": [
      {
        id: "visa",
        name: "Visa",
        icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Visa_2021.svg/1200px-Visa_2021.svg.png",
        iconComponent: <CreditCard size={24} />,
      },
      {
        id: "mastercard",
        name: "Mastercard",
        icon: "https://www.pngplay.com/wp-content/uploads/12/Visa-Card-Logo-No-Background.png",
        iconComponent: <CreditCard size={24} />,
      },
      {
        id: "amex",
        name: "American Express",
        icon: "https://www.citypng.com/public/uploads/preview/hd-amex-american-express-logo-png-701751694708970jttzjjyo6e.png",
        iconComponent: <CreditCard size={24} />,
      },
    ],
    "Bank Transfer": [
      {
        id: "bank",
        name: "Bank Transfer",
        icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDnE_apx1xxwayXZulkEHC_PLDeU9MTmXz-LxwGNP5jvX49oXDvgcBO-0hgLac2D0mrnA&usqp=CAU",
        iconComponent: <Landmark size={24} />,
      },
    ],
    "Mobile Wallets": [
      {
        id: "genie",
        name: "Genie",
        icon: "https://www.genie.lk/wp-content/uploads/2021/03/genie-logo.png",
        iconComponent: <WalletCards size={24} />,
      },
      {
        id: "ezcash",
        name: "Ez Cash",
        icon: "https://yt3.googleusercontent.com/eJyvaQmKtG_F-8JC6qJLIjcfHzyIwD0O5bOnmfZP0ed2XjbCiPJfPHPqL9FGlbvw7942CBar=s900-c-k-c0x00ffffff-no-rj",
        iconComponent: <WalletCards size={24} />,
      },
    ],
  };

  const generateOrderId = () => {
    const uniqueOrderId = `ORDER-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    setOrderId(uniqueOrderId);
  };

  useEffect(() => {
    generateOrderId();
  }, []);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      setLoading(true);
      try {
        const response = await apiService.get(`/properties/${propertyId}`);
        setProperty(response.data);
      } catch (error) {
        console.error("Error fetching property details:", error);
        toast.error("Failed to load property details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (propertyId) {
      fetchPropertyDetails();
    }
  }, [propertyId]);

  const renderCardDetailsForm = () => (
    <div className="card-details-form">
      <h5 className="mb-4">Enter Card Details</h5>
      
      {/* Card Preview */}
      <div className={`card-preview mb-4 ${cardType}`}>
        <div className="card-logo">
          {cardType !== 'unknown' && (
            <img src={getCardIcon(cardType)} alt={cardType} />
          )}
        </div>
        <div className="card-number-preview">
          {cardDetails.cardNumber || '•••• •••• •••• ••••'}
        </div>
        <div className="card-details-preview">
          <div>
            <span className="label">Card Holder</span>
            <span>{cardDetails.cardHolder || 'YOUR NAME'}</span>
          </div>
          <div>
            <span className="label">Expires</span>
            <span>{cardDetails.expiryDate || '••/••'}</span>
          </div>
        </div>
      </div>
      
      {/* Test cards section */}
      <div className="test-cards-section mb-4">
        <p className="text-muted small mb-2">For testing:</p>
        <div className="d-flex flex-wrap gap-2">
          {testCards.map((card, index) => (
            <button
              key={index}
              className="btn btn-sm btn-outline-secondary"
              onClick={() => handleAutoFill(card)}
            >
              {card.type}
            </button>
          ))}
        </div>
      </div>
      
      {/* Form fields */}
      <div className="form-group">
        <label>Card Number</label>
        <div className="input-with-icon">
          <input
            type="text"
            name="cardNumber"
            value={cardDetails.cardNumber}
            onChange={handleCardDetailsChange}
            placeholder="1234 5678 9012 3456"
            maxLength={19}
          />
          {cardType !== 'unknown' && (
            <img 
              src={getCardIcon(cardType)} 
              alt={cardType} 
              className="card-type-icon"
            />
          )}
        </div>
      </div>
      
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label>Expiry Date</label>
            <input
              type="text"
              name="expiryDate"
              value={cardDetails.expiryDate}
              onChange={handleCardDetailsChange}
              placeholder="MM/YY"
              maxLength={5}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label>CVV</label>
            <input
              type="text"
              name="cvv"
              value={cardDetails.cvv}
              onChange={handleCardDetailsChange}
              placeholder="123"
              maxLength={4}
            />
          </div>
        </div>
      </div>
      
      <div className="form-group">
        <label>Card Holder Name</label>
        <input
          type="text"
          name="cardHolder"
          value={cardDetails.cardHolder}
          onChange={handleCardDetailsChange}
          placeholder="As on card"
        />
      </div>
      
      <div className="payhere-actions mt-4">
        <button 
          className="btn btn-success payhere-pay-btn"
          onClick={handleCardDetailsSubmit}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <Loader2 className="animate-spin me-2" size={18} />
              Processing...
            </>
          ) : (
            "Confirm Payment"
          )}
        </button>
      </div>
    </div>
  );

  const renderSuccessScreen = () => (
    <div className="payment-success text-center py-4">
      <div className="success-icon mb-3">
        <CheckCircle size={48} className="text-success" />
      </div>
      <h3 className="text-success mb-3">Payment Successful!</h3>
      <p className="success-message mb-4">
        Your payment of {formatCurrency(property.price)} has been processed.
      </p>
      
      <button 
        className="btn btn-link mb-3"
        onClick={() => setShowSuccessDetails(!showSuccessDetails)}
      >
        {showSuccessDetails ? 'Hide details' : 'Show payment details'}
      </button>
      
      {showSuccessDetails && (
        <div className="payment-details mb-4 p-3 bg-light rounded text-start">
          <div className="detail-item">
            <span>Transaction ID:</span>
            <strong>{orderId}</strong>
          </div>
          <div className="detail-item">
            <span>Property:</span>
            <strong>{property.title}</strong>
          </div>
          <div className="detail-item">
            <span>Location:</span>
            <strong>{property.location}</strong>
          </div>
          <div className="detail-item">
            <span>Payment Method:</span>
            <strong>
              {selectedMethod === "visa" ? "Visa" : 
               selectedMethod === "mastercard" ? "Mastercard" : 
               selectedMethod === "amex" ? "American Express" : 
               selectedMethod === "bank" ? "Bank Transfer" : 
               selectedMethod}
            </strong>
          </div>
          <div className="detail-item">
            <span>Date:</span>
            <strong>{new Date().toLocaleString()}</strong>
          </div>
        </div>
      )}
      
      <div className="d-flex justify-content-center gap-3">
        <button 
          onClick={handleClosePopUp} 
          className="btn btn-primary px-4"
        >
          Continue to Dashboard
        </button>
        <button
          onClick={() => window.print()}
          className="btn btn-outline-secondary px-4"
        >
          <Printer size={18} className="me-2" />
          Print Receipt
        </button>
      </div>
      
      <div className="mt-4 text-muted small">
        A confirmation has been sent to {user.email}
      </div>
    </div>
  );

  return (
    <div className={`container d-flex justify-content-center align-items-center min-vh-100 ${isPopupOpen ? "blur-background" : ""}`}>
      <div className="card shadow p-4 text-center w-75" id="payments-container">
        <h2 className="mb-3">Your Booking Details</h2>
        {loading ? (
          <div className="d-flex justify-content-center align-items-center py-5">
            <Loader2 className="animate-spin me-2" />
            <span>Loading property details...</span>
          </div>
        ) : property ? (
          <>
            <h3 className="text-primary">{property.title}</h3>
            <div className="d-flex justify-content-center gap-4 my-3">
              <div>
                <strong>Price:</strong> {formatCurrency(property.price)}
              </div>
              <div>
                <strong>Location:</strong> {property.location}
              </div>
            </div>
            
            <button
              className="btn btn-primary mt-3 px-4 py-2"
              onClick={handleProceedToPay}
              disabled={!isAuthenticated || !user}
            >
              {isAuthenticated && user ? "Proceed To Payment" : "Please Login to Continue"}
            </button>

            {(!isAuthenticated || !user) && (
              <div className="alert alert-warning mt-3">
                You need to be logged in to make a payment.
              </div>
            )}
          </>
        ) : (
          <div className="alert alert-danger">
            Failed to load property details. Please try again.
          </div>
        )}
      </div>

      {isPopupOpen && property && user && (
        <div className="payhere-popup-overlay">
          <div className="payhere-popup-container">
            <div className="payhere-popup">
              <div className="payhere-header">
                <div className="payhere-logo-wrapper">
                  <img
                    src="https://payherestorage.blob.core.windows.net/payhere-resources/www/images/PayHere-Logo.png"
                    alt="Payment"
                    className="payhere-logo"
                  />
                </div>
                <div className="payhere-merchant-info">
                  <div className="merchant-name">{property.title}</div>
                  <div className="order-id">Order ID: {orderId}</div>
                  <div className="amount">{formatCurrency(property.price)}</div>
                </div>
                <button className="close-btn" onClick={handleClosePopUp}>
                  &times;
                </button>
              </div>

              <div className="payhere-body">
                {paymentStep === "paymentMethod" && (
                  <>
                    <div className="payment-method-title">SELECT PAYMENT METHOD</div>
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
                              {method.iconComponent || (
                                <img src={method.icon} alt={method.name} className="payment-icon" />
                              )}
                              <span>{method.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </>
                )}

                {paymentStep === "cardDetails" && renderCardDetailsForm()}

                {paymentStep === "uploadBankImage" && (
                  <div className="upload-image-section">
                    <h5 className="mb-3">Bank Transfer Proof</h5>
                    <p className="text-muted mb-4">
                      Please upload a clear image of your bank slip or transfer confirmation
                    </p>
                    
                    <div className="file-upload-wrapper mb-4">
                      <label className="file-upload-label">
                        <input 
                          type="file" 
                          onChange={handleImageUpload} 
                          accept="image/*" 
                          className="form-control"
                        />
                        <span className="file-upload-button">Choose File</span>
                        <span className="file-upload-text">
                          {image ? "File selected" : "No file chosen"}
                        </span>
                      </label>
                    </div>
                    
                    {image && (
                      <div className="uploaded-image-container mb-4">
                        <img
                          src={image}
                          alt="Bank Transfer Proof"
                          className="uploaded-image img-fluid rounded"
                        />
                      </div>
                    )}
                    
                    {isVerifying && (
                      <div className="verification-loading text-center mb-4">
                        <Loader2 className="animate-spin me-2" />
                        <span>Verifying your bank slip...</span>
                      </div>
                    )}
                    
                    {verificationResult && (
                      <div className={`verification-result mb-4 p-3 rounded ${
                        verificationResult.passes ? "alert-success" : "alert-danger"
                      }`}>
                        <div className="d-flex align-items-center mb-2">
                          {verificationResult.passes ? (
                            <CheckCircle className="text-success me-2" />
                          ) : (
                            <AlertCircle className="text-danger me-2" />
                          )}
                          <h6 className="mb-0">
                            {verificationResult.passes ? "Verification Successful" : "Verification Failed"}
                          </h6>
                        </div>
                        <p className="mb-2">{verificationResult.message}</p>
                        <div className="verification-details">
                          <div className="verification-checks">
                            {Object.entries(verificationDetails).map(([key, value]) => (
                              <div key={key} className={`check-item ${value ? "text-success" : "text-danger"}`}>
                                {value ? "✓" : "✗"} {key.replace(/([A-Z])/g, ' $1').trim()}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <button 
                      className="btn btn-primary w-100"
                      onClick={verifyBankSlip}
                      disabled={!image || isVerifying}
                    >
                      {isVerifying ? (
                        <>
                          <Loader2 className="animate-spin me-2" size={18} />
                          Verifying...
                        </>
                      ) : (
                        "Verify & Confirm Payment"
                      )}
                    </button>
                  </div>
                )}

                {paymentStep === "paymentSuccess" && renderSuccessScreen()}

                {paymentStep === "paymentMethod" && (
                  <div className="payhere-actions mt-4">
                    <button
                      className="btn btn-success payhere-pay-btn"
                      disabled={!selectedMethod}
                      onClick={handlePayNowClick}
                    >
                      Continue to Payment
                    </button>
                  </div>
                )}
              </div>

              <div className="payhere-footer">
                <div className="secured-by">
                  <span>Secured Payment</span>
                </div>
                <div className="text-muted small">
                  All transactions are encrypted and secure
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Payments;