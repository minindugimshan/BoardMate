import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignIn2.css';

const StudentSignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    surname: '',
    dob: { day: '', month: '', year: '' }
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add form validation here if needed
    // Navigate to university sign-in page
    navigate('/university-signin');
  };

  return (
    <div className="signin-container">
      <img 
        src="/bmlogo.png" 
        alt="Home Icon" 
        className="home-icon" 
        onClick={() => navigate('/')}
      />

      <div className="signin-content-box">
        <h1>Student Sign up</h1>
        <form className="signin-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              placeholder="Please enter your first name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="surname">Surname</label>
            <input
              type="text"
              id="surname"
              placeholder="Please enter your last name"
              value={formData.surname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group dob-group">
            <label>Date of birth</label>
            <div className="dob-fields">
              <input 
                type="text" 
                placeholder="DD" 
                maxLength="2"
                onChange={(e) => setFormData({...formData, dob: {...formData.dob, day: e.target.value}})}
                required
              />
              <input 
                type="text" 
                placeholder="MM" 
                maxLength="2"
                onChange={(e) => setFormData({...formData, dob: {...formData.dob, month: e.target.value}})}
                required
              />
              <input 
                type="text" 
                placeholder="YYYY" 
                maxLength="4"
                onChange={(e) => setFormData({...formData, dob: {...formData.dob, year: e.target.value}})}
                required
              />
            </div>
          </div>
          <button type="submit" className="signin-button">Continue</button>
        </form>
        <div className="additional-options">
          <p>Already have an account? <span onClick={() => navigate('/student-login')}>Log in</span></p>
        </div>
      </div>
    </div>
  );
};

export default StudentSignIn;