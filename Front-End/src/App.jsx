import React, { useEffect } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import AboutUs from "./components/LandingPage/AboutUs/AboutUs.jsx";
import Footer from "./components/LandingPage/Footer/Footer.jsx";
import HowItWorksSection from "./components/LandingPage/HowItWorks/HowItWorks.jsx";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import PopularHomes from "./components/LandingPage/PopularHomes/PopularHomes.jsx";
import WhatWeDO from "./components/LandingPage/WeDo/WhatWeDo.jsx";
import GetStarted from "./components/SignInLogin/GetStarted/GetStarted.jsx";
import LandlordLogin from "./components/SignInLogin/Login/LandlordLogin.jsx";
import StudentLogin from "./components/SignInLogin/Login/StudentLogin.jsx";
import LandlordSignup from "./components/SignInLogin/SignIn/LandlordSignUp";
import StudentSignIn from "./components/SignInLogin/SignIn/student/StudentSignIn.jsx";
import About from "./components/About/About";
import ChatPage from "./components/Chatapp/ChatPage.jsx";
import ChatBot from "./components/ChatBot/ChatBot.jsx";
import Home from "./components/Home/Home";
import Map from "./components/Map/Map";
import Payments from "./components/Payments/Payments";
import StudentProfile from "./components/Profile/StudentProfile";
import PropertyDetails from "./components/Property/PropertyDetails";
import SearchResults from "./components/Property/SearchResults";
import Support from "./components/Support/Support.jsx";
import TC from "./components/T&C/TC";
import { GeneralLayout } from "./layout/GenralLayout.jsx";
import { ToastContainer } from "react-toastify";
import LandlordDashboard from "./components/LandlordDashboard/LandlordDashboard.jsx";
import Loader from "./components/Loader/Loader.jsx";
import LandlordProfile from "./components/Profile/LandloardProfile.jsx";
import useAuthStore from "./store/auth-store.js";
import PropTypes from 'prop-types';
import AOS from 'aos';
import 'aos/dist/aos.css';


// Protected route component
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, user } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/get-started" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.userType)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

// PropTypes for ProtectedRoute
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string)
};

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h2>Something went wrong.</h2>
          <p>Please refresh the page and try again.</p>
          <button onClick={() => window.location.reload()}>
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// PropTypes for ErrorBoundary
ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired
};

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLandingPage = location.pathname === "/";
  const authStore = useAuthStore();

  // Redirect authenticated users from auth pages to their dashboard
  useEffect(() => {
    const authPages = ['/student-login', '/landlord-login', '/get-started'];
    if (authStore.isAuthenticated && authPages.includes(location.pathname)) {
      if (authStore.user?.userType === 'STUDENT') {
        navigate('/home');
      } else if (authStore.user?.userType === 'LANDLORD') {
        navigate('/landlord-dashboard');
      }
    }
  }, [location.pathname, authStore, navigate]);

  useEffect(() => {
    AOS.init({ once: true, duration: 900, offset: 80 });
  }, []);

  return (
    <ErrorBoundary>
      {isLandingPage ? (
        <div className="app">
          <LandingPage onGetStarted={() => navigate("/get-started")} />
          <PopularHomes />
          <WhatWeDO />
          <HowItWorksSection />
          <AboutUs />
          <Footer />
        </div>
      ) : (
        <Routes>
          {/* Public routes */}
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/student-signin" element={<StudentSignIn />} />
          <Route path="/student-login" element={<StudentLogin />} />
          <Route path="/landlord-signin" element={<LandlordSignup />} />
          <Route path="/landlord-login" element={<LandlordLogin />} />
          <Route path="/unauthorized" element={<div>Unauthorized access</div>} />
          <Route path="/support" element={<Support />} />

          {/* Protected routes with layout */}
          <Route element={<GeneralLayout />}>
            {/* Common routes for all authenticated users */}
            <Route path="/property/:id" element={
              <ProtectedRoute>
                <PropertyDetails />
              </ProtectedRoute>
            } />
            <Route path="/chats" element={
              <ProtectedRoute>
                <ChatPage />
              </ProtectedRoute>
            } />
            <Route path="/chats/:chatId" element={
              <ProtectedRoute>
                <ChatPage />
              </ProtectedRoute>
            } />
            <Route path="/about" element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            } />
            <Route path="/terms" element={
              <ProtectedRoute>
                <TC />
              </ProtectedRoute>
            } />

            {/* Student-only routes */}
            <Route path="/home" element={
              <ProtectedRoute allowedRoles={['STUDENT']}>
                <Home />
              </ProtectedRoute>
            } />
            <Route path="/map" element={
              <ProtectedRoute allowedRoles={['STUDENT']}>
                <Map />
              </ProtectedRoute>
            } />
            <Route path="/search" element={
              <ProtectedRoute allowedRoles={['STUDENT']}>
                <SearchResults />
              </ProtectedRoute>
            } />
            <Route path="/property/:id/payments" element={
              <ProtectedRoute allowedRoles={['STUDENT']}>
                <Payments />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute allowedRoles={['STUDENT']}>
                <StudentProfile />
              </ProtectedRoute>
            } />

            {/* Landlord-only routes */}
            <Route path="/landlord-dashboard" element={
              <ProtectedRoute allowedRoles={['LANDLORD']}>
                <LandlordDashboard />
              </ProtectedRoute>
            } />
            <Route path="/landlord-profile" element={
              <ProtectedRoute allowedRoles={['LANDLORD']}>
                <LandlordProfile />
              </ProtectedRoute>
            } />
          </Route>

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      )}

      {authStore.user?.userType !== "LANDLORD" && <ChatBot />}
      <Loader />
      <ToastContainer />
    </ErrorBoundary>
  );
}

export default App;