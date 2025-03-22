// components/SignIn/LandlordSignIn.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandlordLogin.css';

const LandlordSignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add authentication logic here
    console.log('Landlord sign in:', formData);
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
        <h1>Log In</h1>
        <form onSubmit={handleSubmit} className="signin-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>
          <button type="submit" className="signin-button">Sign In</button>
        </form>
        <div className="additional-options">
          <p>Don't have an account? <span onClick={() => navigate('/landlord-signin')}>Sign Up</span></p>
          <p>Forgot password? <span onClick={() => navigate('/forgot-password')}>Reset</span></p>
        </div>
      </div>
    </div>
  );
};

export default LandlordSignIn;