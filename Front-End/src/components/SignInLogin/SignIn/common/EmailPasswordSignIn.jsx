// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const EmailPasswordSignIn = ({ handleSubmitData }) => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     confirmPassword: ''
//   });
//   const [errors, setErrors] = useState({});

//   const validateForm = () => {
//     const newErrors = {};
    
//     // Email validation
//     if (!formData.email.includes('@')) {
//       newErrors.email = 'Please enter a valid email address';
//     }

//     // Password validation
//     if (formData.password.length < 4) {
//       newErrors.password = 'Password must contain at least 4 digits';
//     }

//     // Confirm password validation
//     if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = 'Passwords do not match';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       await handleSubmitData(formData);
//     }
//   };

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [id]: value
//     }));
//   };

//   return (
//     <div className="signin-container">
//       <img 
//         src="/bmlogo.png" 
//         alt="Home Icon" 
//         className="home-icon" 
//         onClick={() => navigate('/')}
//       />

//       <div className="signin-content-box">
//         <h1>Sign in</h1>
//         <form className="signin-form" onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="email">Email Address</label>
//             <input
//               type="email"
//               id="email"
//               placeholder="Please enter your email address"
//               value={formData.email}
//               onChange={handleChange}
//               className={errors.email ? 'error' : ''}
//               required
//             />
//             {errors.email && <div className="error-message">{errors.email}</div>}
//           </div>

//           <div className="form-group">
//             <label htmlFor="password">Create password</label>
//             <input
//               type="password"
//               id="password"
//               placeholder="Must contain at least 4 digits"
//               value={formData.password}
//               onChange={handleChange}
//               className={errors.password ? 'error' : ''}
//               required
//             />
//             {errors.password && <div className="error-message">{errors.password}</div>}
//           </div>

//           <div className="form-group">
//             <label htmlFor="confirmPassword">Confirm password</label>
//             <input
//               type="password"
//               id="confirmPassword"
//               placeholder="Confirm your password"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               className={errors.confirmPassword ? 'error' : ''}
//               required
//             />
//             {errors.confirmPassword && (
//               <div className="error-message">{errors.confirmPassword}</div>
//             )}
//           </div>

//           <button type="submit" className="signin-button">Continue</button>
//         </form>

//         <div className="additional-options">
//           <p>Already have an account? <span onClick={() => navigate('/student-login')}>Log in</span></p>
//         </div>
//       </div>
//     </div>
//   );
// };



import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import apiService from "../../../../services/api-service";

const EmailPasswordSignIn = ({ handleSubmitData }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 4) {
      newErrors.password = 'Password must contain at least 4 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Call the registration API directly
      const response = await apiService.post('/auth/register', {
        email: formData.email,
        password: formData.password,
        // Include other required fields with default values if needed
        firstName: '',
        lastName: '',
        mobile: '',
        dateOfBirthDay: '01',
        dateOfBirthMonth: '01',
        dateOfBirthYear: '2000',
        university: '',
        universityId: ''
      });

      if (response.data) {
        toast.success('Registration successful! Please check your email for verification.');
        navigate('/student-login');
      }
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = error.response?.data?.message || 
                         error.message || 
                         'Registration failed. Please try again.';
      toast.error(errorMessage);
      
      // Set specific field errors if available
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    // Clear error when user types
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: '' }));
    }
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
        <h1>Sign in</h1>
        <form className="signin-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Please enter your email address"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
              required
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Create password</label>
            <input
              type="password"
              id="password"
              placeholder="Must contain at least 4 characters"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'error' : ''}
              required
            />
            {errors.password && <div className="error-message">{errors.password}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? 'error' : ''}
              required
            />
            {errors.confirmPassword && (
              <div className="error-message">{errors.confirmPassword}</div>
            )}
          </div>

          <button 
            type="submit" 
            className="signin-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Registering...' : 'Continue'}
          </button>
        </form>

        <div className="additional-options">
          <p>Already have an account? <span onClick={() => navigate('/student-login')}>Log in</span></p>
        </div>
      </div>
    </div>
  );
};

export default EmailPasswordSignIn;