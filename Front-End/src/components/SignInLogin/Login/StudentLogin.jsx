// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import apiService from "../../../services/api-service";
// import useAuthStore from "../../../store/auth-store";
// import "./StudentLogin.css";

// const StudentSignIn = () => {
//   const navigate = useNavigate();
//   const authStore = useAuthStore();
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Add authentication logic here
//     console.log("Student sign in:", formData);
//     const rq = {
//       email: formData.email,
//       password: formData.password,
//     };
//     const rs = await apiService.post("/auth/login", rq);
//     if (rs.status === 200) {
//       const userData = await apiService.get("/users/getByEmail", { email: formData.email });
//       if (userData.status === 200) {
//         if (userData.data.userType !== "STUDENT") {
//           toast.error("Invalid user login");
//           return;
//         }
//         authStore.login(userData.data);
//         toast.success("Login successful");
//         navigate("/home");
//       }
//     }
//   };

//   return (
//     <div className="signin-container">
//       <img src="/bmlogo.png" alt="Home Icon" className="home-icon" onClick={() => navigate("/")} />

//       <div className="signin-content-box">
//         <h1>Student Login</h1>
//         <form onSubmit={handleSubmit} className="signin-form">
//           <div className="form-group">
//             <label htmlFor="email">Email</label>
//             <input
//               type="text"
//               id="email"
//               value={formData.email}
//               onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//               placeholder="Email (username)"
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="password">Password</label>
//             <input
//               type="password"
//               id="password"
//               value={formData.password}
//               onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//               placeholder="Enter your password"
//               required
//             />
//           </div>
//           <button type="submit" className="signin-button">
//             Login
//           </button>
//         </form>
//         <div className="additional-options">
//           <p>
//             Don't have an account? <span onClick={() => navigate("/student-signin")}>Sign Up</span>
//           </p>{" "}
//           <p>
//             {/* Forgot password? <span onClick={() => navigate("/forgot-password")}>Reset</span> */}
//           </p>
//           <p>
//             Are you a landlord? <span onClick={() => navigate("/landlord-login")}>Landlord Login</span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentSignIn;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import apiService from '../../../services/api-service';
import useAuthStore from '../../../store/auth-store';
import './StudentLogin.css';

const StudentSignIn = () => {
  const navigate = useNavigate();
  const authStore = useAuthStore();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Attempt login and get user data
      const loginResponse = await apiService.post('/auth/login', {
        email: formData.email,
        password: formData.password
      });

      // Check if login was successful and user data is returned
      if (loginResponse.data.status === 'success' && loginResponse.data.user) {
        const user = loginResponse.data.user;
        
        // Verify user type
        if (user.userType !== 'STUDENT') {
          throw new Error('Invalid user type. Please use student credentials.');
        }

        // Store user data and redirect
        authStore.login(user);
        toast.success('Login successful');
        navigate('/home'); // Navigate to student home page
      } else {
        throw new Error(loginResponse.data.error || 'Login failed');
      }

    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = error.response?.data?.error || 
                          error.response?.data?.message || 
                          error.message || 
                          'Login failed';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
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
        <h1>Student Login</h1>
        <form onSubmit={handleSubmit} className="signin-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter your email"
              className={errors.email ? 'error' : ''}
              required
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Enter your password"
              className={errors.password ? 'error' : ''}
              required
            />
            {errors.password && <div className="error-message">{errors.password}</div>}
          </div>

          <button 
            type="submit" 
            className="signin-button"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="additional-options">
          <p>
            Don&apos;t have an account?{' '}
            <span onClick={() => navigate('/student-signup')}>Sign Up</span>
          </p>
          <p>
            Forgot password?{' '}
            <span onClick={() => navigate('/forgot-password')}>Reset</span>
          </p>
          <p>
            Are you a landlord?{' '}
            <span onClick={() => navigate('/landlord-login')}>Landlord Login</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentSignIn;