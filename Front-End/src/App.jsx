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
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import LandlordDashboard from "./components/LandlordDashboard/LandlordDashboard.jsx";
import Loader from "./components/Loader/Loader.jsx";
import LandlordProfile from "./components/Profile/LandloardProfile.jsx";
import useAuthStore from "./store/auth-store.js";

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

  return (
    <>
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
          <Route element={<ProtectedRoute><GeneralLayout /></ProtectedRoute>}>
            {/* Common routes for all authenticated users */}
            <Route path="/property/:id" element={<PropertyDetails />} />
            <Route path="/chats" element={<ChatPage />} />
            <Route path="/chats/:chatId" element={<ChatPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/terms" element={<TC />} />

            {/* Student-only routes */}
            <Route element={<ProtectedRoute allowedRoles={['STUDENT']} />}>
              <Route path="/home" element={<Home />} />
              <Route path="/map" element={<Map />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/property/:id/payments" element={<Payments />} />
              <Route path="/profile" element={<StudentProfile />} />
            </Route>

            {/* Landlord-only routes */}
            <Route element={<ProtectedRoute allowedRoles={['LANDLORD']} />}>
              <Route path="/landlord-dashboard" element={<LandlordDashboard />} />
              <Route path="/profile" element={<LandlordProfile />} />
            </Route>
          </Route>

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      )}

      {authStore.user?.userType !== "LANDLORD" && <ChatBot />}
      <Loader />
      <ToastContainer />
    </>
  );
}

export default App;