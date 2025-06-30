import { useState } from 'react';
import './LandlordSignUp.css';
import apiService from '../../../services/api-service';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const LandlordSignup = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
    mobile: '',
    email: '',
    idPhoto: null,
    idVerificationStatus: 'pending',
    firstName: '',
    lastName: '',
    dateOfBirth: {
      day: '',
      month: '',
      year: ''
    },
    verificationCode: '',
  });
  const [isEmailVerified, setIsEmailVerified] = useState(false); // Added this line
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [rulesAgreed, setRulesAgreed] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [emailVerificationSent, setEmailVerificationSent] = useState(false);

  
  const rules = [
    {
      title: "1. List Accurate Details",
      description: "Provide honest and clear details about the room, including size, amenities, and any rules."
    },
    {
      title: "2. Upload Clear Photos",
      description: "Use high-quality, friendly photos that show the room and common areas accurately."
    },
    {
      title: "3. Set Fair and Transparent Prices",
      description: "List the rental price and any fees upfront to help students budget effectively."
    },
    {
      title: "4. Mention House Rules",
      description: "Clearly share any house rules, such as quiet hours, guest policies, or cleaning expectations."
    },
    {
      title: "5. Keep Availability Updated",
      description: "Regularly update the listing to reflect the current availability of the room."
    },
    {
      title: "6. Describe the Location Clearly",
      description: "Share information about nearby facilities like public transport, stores, or universities."
    },
    {
      title: "7. Be Responsive",
      description: "Respond promptly to inquiries from students to create a positive rental experience."
    },
    {
      title: "8. Avoid Misleading Information",
      description: "Ensure all details in your ad are truthful to avoid misunderstandings."
    },
    {
      title: "9. Contact Support for Any Issues",
      description: "If you have questions or need help with your listing, feel free to reach out to our support team."
    }
  ];

  const renderError = (error) => {
    if (!error) return null;
    return <div className="error-message">{typeof error === 'string' ? error : error.message || 'An error occurred'}</div>;
  };

  const renderIdVerificationStatus = () => {
    switch (formData.idVerificationStatus) {
      case 'verified':
        return <div className="verification-success">ID verified successfully!</div>;
      case 'rejected':
        return <div className="verification-error">ID verification failed. Please try another document.</div>;
      case 'error':
        return <div className="verification-error">Error processing document. Please try again.</div>;
      case 'pending':
      default:
        return isVerifying ? 
          <div className="verification-pending">Verifying your document...</div> :
          null;
    }
  };

  const validateStep = () => {
    const errors = {};
    
    switch (step) {
      case 1:
        if (!rulesAgreed) {
          errors.rules = 'You must agree to the rules and regulations';
        }
        break;
      case 2:
        if (!formData.firstName) errors.firstName = 'First name is required';
        if (!formData.lastName) errors.lastName = 'Last name is required';
        if (!formData.dateOfBirth.day || !formData.dateOfBirth.month || !formData.dateOfBirth.year) {
          errors.dateOfBirth = 'Complete date of birth is required';
        }
        if (!formData.mobile) errors.mobile = 'Phone number is required';
        break;
      case 3:
        if (!formData.email) {
          errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          errors.email = 'Invalid email format';
        }
        break;
      case 4:
        if (!formData.idPhoto) errors.idPhoto = 'ID/Passport photo is required';
        if (formData.idVerificationStatus !== 'verified') errors.idVerification = 'ID must be verified';
        break;
      case 5:
        if (formData.password.length < 4) {
          errors.password = 'Password must contain at least 4 digits';
        }
        if (formData.password !== formData.confirmPassword) {
          errors.confirmPassword = 'Passwords do not match';
        }
        break;
      default:
        break;
    }
    return errors;
  };

  const handleIdUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFormData({ ...formData, idPhoto: file, idVerificationStatus: 'pending' });
    setIsVerifying(true);
    setTimeout(() => {
      setFormData(prevFormData => ({
        ...prevFormData,
        idVerificationStatus: 'verified',
      }));
      setIsVerifying(false);
    }, 2000);
  };

  const sendEmailVerificationCode = async () => {
    setErrors({});
    if (!formData.email) {
      setErrors({ email: 'Email is required for verification' });
      return;
    }
    setIsVerifying(true);
    try {
      await apiService.post('/verify/send-code', { email: formData.email });
      toast.success('Verification code sent to your email');
      setEmailVerificationSent(true);
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Error sending verification code';
      setErrors({ verificationSend: errorMsg });
      toast.error(errorMsg);
    } finally {
      setIsVerifying(false);
    }
  };

  const verifyEmailCode = async (e) => {
    e.preventDefault();
    setIsVerifying(true);
    try {
      await apiService.post('/verify/check-code', { 
        email: formData.email, 
        code: formData.verificationCode 
      });
      toast.success('Email verified!');
      setIsEmailVerified(true); // Now this will work
      setStep(4);
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Invalid verification code';
      setErrors({ verificationCode: errorMsg });
      toast.error(errorMsg);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentErrors = validateStep();
    setErrors(currentErrors);
    if (Object.keys(currentErrors).length > 0) return;
    if (step < 5) {
      setStep(step + 1);
    } else {
      await submitFormData();
    }
  };

  const submitFormData = async () => {
    const userData = {
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
      mobile: formData.mobile,
      dateOfBirthDay: formData.dateOfBirth.day,
      dateOfBirthMonth: formData.dateOfBirth.month,
      dateOfBirthYear: formData.dateOfBirth.year
    };
    
    setIsVerifying(true);
    try {
      const response = await apiService.post('/auth/register/landlord', userData);
      if (response.status === 200) {
        toast.success('Registration successful!');
        navigate('/landlord-login');
      } else {
        const errorMsg = response.data?.message || 'Registration failed';
        setErrors({ submission: errorMsg });
        toast.error(errorMsg);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Error submitting form';
      setErrors({ submission: errorMsg });
      toast.error(errorMsg);
    } finally {
      setIsVerifying(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="form-section">
            <h2>Rules and Regulations</h2>
            <div className="rules-container">
              {rules.map((rule, index) => (
                <div key={index} className="rule-item">
                  <h3>{rule.title}</h3>
                  <p>{rule.description}</p>
                </div>
              ))}
            </div>
            <div className="checkbox-container">
              <input
                type="checkbox"
                checked={rulesAgreed}
                onChange={(e) => setRulesAgreed(e.target.checked)}
              />
              <span>Agree to Rules and Regulations</span>
            </div>
            {renderError(errors.rules)}
          </div>
        );

      case 2:
        return (
          <div className="form-section">
            <h2>Personal Information</h2>
            <div className="input-group">
              <input
                type="text"
                placeholder="First name"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
              {renderError(errors.firstName)}
            </div>
            <div className="input-group">
              <input
                type="text"
                placeholder="Last name"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />
              {renderError(errors.lastName)}
            </div>
            <div className="input-group">
              <label>Date of Birth</label>
              <div className="date-inputs">
                <input
                  type="number"
                  placeholder="DD"
                  value={formData.dateOfBirth.day}
                  onChange={(e) => setFormData({
                    ...formData,
                    dateOfBirth: { ...formData.dateOfBirth, day: e.target.value }
                  })}
                  min={1}
                  max={31}
                />
                <input
                  type="number"
                  placeholder="MM"
                  value={formData.dateOfBirth.month}
                  onChange={(e) => setFormData({
                    ...formData,
                    dateOfBirth: { ...formData.dateOfBirth, month: e.target.value }
                  })}
                  min={1}
                  max={12}
                />
                <input
                  type="number"
                  placeholder="YYYY"
                  value={formData.dateOfBirth.year}
                  onChange={(e) => setFormData({
                    ...formData,
                    dateOfBirth: { ...formData.dateOfBirth, year: e.target.value }
                  })}
                  min={1900}
                  max={2005}
                />
              </div>
              {renderError(errors.dateOfBirth)}
            </div>
            <div className="input-group">
              <input
                type="tel"
                placeholder="Phone number"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
              />
              {renderError(errors.mobile)}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="form-section">
            <h2>Email Verification</h2>
            <div className="input-group">
              <input
                type="email"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={isEmailVerified}
              />
              {renderError(errors.email)}
            </div>
            {!isEmailVerified && (
              <>
                <button
                  onClick={sendEmailVerificationCode}
                  className="verification-button"
                  disabled={isVerifying || emailVerificationSent}
                >
                  {isVerifying ? 'Sending...' : 'Send Verification Code'}
                </button>
                {renderError(errors.verificationSend)}
                {emailVerificationSent && (
                  <div className="verification-code-group" style={{ display: 'flex', alignItems: 'center', marginTop: 12 }}>
                    <input
                      type="text"
                      placeholder="Verification code"
                      value={formData.verificationCode}
                      onChange={e => setFormData({ ...formData, verificationCode: e.target.value })}
                      className="code-input"
                    />
                    <button
                      onClick={verifyEmailCode}
                      className="verification-button"
                      disabled={isVerifying}
                      style={{ marginRight: 0 }}
                    >
                      Verify
                    </button>
                    <button
                      onClick={sendEmailVerificationCode}
                      className="resend-button"
                      disabled={isVerifying}
                      type="button"
                    >
                      Resend Code
                    </button>
                    {renderError(errors.verificationCode)}
                  </div>
                )}
              </>
            )}
            {isEmailVerified && (
              <div className="verification-success">Email verified successfully!</div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="form-section">
            <h2>ID Verification</h2>
            <div className="input-group">
              <label>Upload ID/Passport</label>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={handleIdUpload}
              />
              {renderIdVerificationStatus()}
              {renderError(errors.idPhoto)}
              {renderError(errors.idVerification)}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="form-section">
            <h2>Create Password</h2>
            <div className="input-group">
              <input
                type="password"
                placeholder="Password (min 4 characters)"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              {renderError(errors.password)}
            </div>
            <div className="input-group">
              <input
                type="password"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
              {renderError(errors.confirmPassword)}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <div className="progress-tracker">
          {[1, 2, 3, 4, 5].map((stepNumber) => (
            <div 
              key={stepNumber} 
              className={`progress-step ${step >= stepNumber ? 'active' : ''}`}
            >
              {stepNumber}
            </div>
          ))}
        </div>
        
        <div className="form-content">
          {renderStep()}
        </div>
        
        <div className="button-group">
          {step > 1 && step !== 3 && (
            <button
              onClick={() => setStep(step - 1)}
              className="back-button"
              disabled={isVerifying}
            >
              Back
            </button>
          )}
          
          {step !== 3 && (
            <button
              onClick={handleSubmit}
              className="next-button"
              disabled={isVerifying || (step === 3 && !isEmailVerified)}
            >
              {step < 5 ? 'Continue' : 'Submit'}
            </button>
          )}
        </div>
        
        {errors.submission && (
          <div className="submission-error">
            {renderError(errors.submission)}
          </div>
        )}
      </div>
    </div>
  );
};

export default LandlordSignup;