import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import apiService from "../../../../services/api-service";

const EmailPasswordSignIn = ({ handleSubmitData, email }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
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
        email: email, // Use the verified email passed as prop
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
        toast.success('Registration successful!');
        navigate('/student-login');
      }
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = error.response?.data?.message || 
                         error.message || 
                         'Registration failed. Please try again.';
      toast.error(errorMessage);
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
        onClick={() => navigate('/')} />
      <div className="signin-content-box">
        <h1>Set Password</h1>
        <form className="signin-form" onSubmit={handleSubmit}>
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