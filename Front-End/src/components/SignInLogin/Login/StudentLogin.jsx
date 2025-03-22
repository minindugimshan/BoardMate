import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentLogIn.css';

const StudentSignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    studentId: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add authentication logic here
    console.log('Student sign in:', formData);
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
        <h1>Student Login</h1>
        <form onSubmit={handleSubmit} className="signin-form">
          <div className="form-group">
            <label htmlFor="studentId">Student ID</label>
            <input
              type="text"
              id="studentId"
              value={formData.studentId}
              onChange={(e) => setFormData({...formData, studentId: e.target.value})}
              placeholder="Enter your student ID"
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
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="signin-button" onClick={() => navigate('/home')} >Login</button>
        </form>
        <div className="additional-options">
          <p>Don't have an account? <span onClick={() => navigate('/student-signin')}>Sign Up</span></p>          <p>Forgot password? <span onClick={() => navigate('/forgot-password')}>Reset</span></p>
          <p>Are you a landlord? <span onClick={() => navigate('/landlord-login')}>Landlord Login</span></p>
        </div>
      </div>
    </div>
  );
};

export default StudentSignIn;