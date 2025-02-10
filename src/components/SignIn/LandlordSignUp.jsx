import React, { useState } from 'react';
import './LandlordSignUp.css';

const LandlordSignup = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
    mobile: '',
    email: '',
    idPhoto: null,
    firstName: '',
    lastName: '',
    dateOfBirth: {
      day: '',
      month: '',
      year: ''
    }
  });
  const [errors, setErrors] = useState({});
  const [rulesAgreed, setRulesAgreed] = useState(false);

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

  const validateStep = () => {
    const errors = {};
    
    switch (step) {
      case 1:
        if (!rulesAgreed) {
          errors.rules = 'You must agree to the rules and regulations';
        }
        break;
      case 2:
        if (formData.password.length < 4) {
          errors.password = 'Password must contain at least 4 digits';
        }
        if (formData.password !== formData.confirmPassword) {
          errors.confirmPassword = 'Passwords do not match';
        }
        break;
      case 3:
        if (!formData.mobile) errors.mobile = 'Mobile number is required';
        if (!formData.email) {
          errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          errors.email = 'Invalid email format';
        }
        if (!formData.idPhoto) errors.idPhoto = 'ID/Passport photo is required';
        break;
      case 4:
        if (!formData.firstName) errors.firstName = 'First name is required';
        if (!formData.lastName) errors.lastName = 'Last name is required';
        if (!formData.dateOfBirth.day || !formData.dateOfBirth.month || !formData.dateOfBirth.year) {
          errors.dateOfBirth = 'Complete date of birth is required';
        }
        break;
      default:
        break;
    }
    return errors;
  };

  const handleSubmit = () => {
    const currentErrors = validateStep();
    setErrors(currentErrors);
    
    if (Object.keys(currentErrors).length === 0) {
      if (step < 4) {
        setStep(step + 1);
      } else {
        console.log('Form submitted:', formData);
        // Handle final submission
      }
    }
  };

  const renderError = (error) => {
    return error ? <div className="error-message">{error}</div> : null;
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
            <h2>Create Password</h2>
            <div className="input-group">
              <input
                type="password"
                placeholder="Must contain at least 4 digits"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
              {renderError(errors.password)}
            </div>
            <div className="input-group">
              <input
                type="password"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              />
              {renderError(errors.confirmPassword)}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="form-section">
            <h2>Contact Information</h2>
            <div className="input-group">
              <input
                type="tel"
                placeholder="Please enter your mobile number"
                value={formData.mobile}
                onChange={(e) => setFormData({...formData, mobile: e.target.value})}
              />
              {renderError(errors.mobile)}
            </div>
            <div className="input-group">
              <input
                type="email"
                placeholder="Please enter your email address"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              {renderError(errors.email)}
            </div>
            <div className="input-group">
              <p>Please upload your ID or Passport photo</p>
              <input
                type="file"
                onChange={(e) => setFormData({...formData, idPhoto: e.target.files[0]})}
              />
              {renderError(errors.idPhoto)}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="form-section">
            <h2>Personal Information</h2>
            <div className="input-group">
              <input
                type="text"
                placeholder="Please enter your first name"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              />
              {renderError(errors.firstName)}
            </div>
            <div className="input-group">
              <input
                type="text"
                placeholder="Please enter your last name"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              />
              {renderError(errors.lastName)}
            </div>
            <div className="date-inputs">
              <input
                type="text"
                placeholder="DD"
                maxLength="2"
                value={formData.dateOfBirth.day}
                onChange={(e) => setFormData({
                  ...formData,
                  dateOfBirth: {...formData.dateOfBirth, day: e.target.value}
                })}
              />
              <input
                type="text"
                placeholder="MM"
                maxLength="2"
                value={formData.dateOfBirth.month}
                onChange={(e) => setFormData({
                  ...formData,
                  dateOfBirth: {...formData.dateOfBirth, month: e.target.value}
                })}
              />
              <input
                type="text"
                placeholder="YYYY"
                maxLength="4"
                value={formData.dateOfBirth.year}
                onChange={(e) => setFormData({
                  ...formData,
                  dateOfBirth: {...formData.dateOfBirth, year: e.target.value}
                })}
              />
            </div>
            {renderError(errors.dateOfBirth)}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <div className="form-content">
          {renderStep()}
        </div>
        <div className="button-group">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="back-button"
            >
              Back
            </button>
          )}
          <button
            onClick={handleSubmit}
            className="next-button"
          >
            {step === 4 ? 'Submit' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandlordSignup;