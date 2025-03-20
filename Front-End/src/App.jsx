import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import PopularHomes from './components/LandingPage/PopularHomes/PopularHomes.jsx';
import WhatWeDO from './components/LandingPage/WeDo/WhatWeDo.jsx';
import AboutUs from './components/LandingPage/AboutUs/AboutUs.jsx';
import Footer from './components/LandingPage/Footer/Footer.jsx';
import HowItWorksSection from './components/LandingPage/HowItWorks/HowItWorks.jsx';

// Import the GetStarted component
import GetStarted from './components/SignInLogin/GetStarted/GetStarted.jsx';

// Import login/signin components
import StudentLogin from './components/SignInLogin/Login/StudentLogin.jsx';
import StudentSignIn from './components/SignInLogin/SignIn/StudentSignIn';
import LandlordLogin from './components/SignInLogin/LogIn/LandlordLogIn.jsx';
import LandlordSignup from './components/SignInLogin/SignIn/LandlordSignUp';
import UniversitySignIn from './components/SignInLogin/SignIn/UniversitySignIn';
import EmailPasswordSignIn from './components/SignInLogin/SignIn/EmailPasswordSignIn';

import Home from './components/Home/Home';
import Navigationbar from './components/Navigationbar/Navigationbar';
import Map from './components/Map/Map';
import About from './components/About/About';
import PropertyDetails from './components/Property/PropertyDetails';
import SearchResults from './components/Property/SearchResults';
import StudentProfile from './components/Profile/StudentProfile';
import Payments from './components/Payments/Payments';
import PaymentSuccess from './components/Payments/PaymentSuccess';
import PaymentCancel from './components/Payments/PaymentCancel';
import TC from './components/T&C/TC';
import { Import } from 'lucide-react';

function LandingPageFlow() {
  const navigate = useNavigate();

  return (
    <div className="app">
      <LandingPage onGetStarted={() => navigate('/get-started')} />
      <PopularHomes />
      <WhatWeDO />
      <HowItWorksSection />
      <AboutUs />
      <Footer />
    </div>
  );
}

function App() {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  return (
    <>
      {isLandingPage ? (
        <LandingPageFlow />
      ) : (
        <>
         
          <Routes>
            {/* Authentication routes */}
            <Route path="/get-started" element={<GetStarted />} />
            <Route path="/student-signin" element={<StudentSignIn />} />
            <Route path="/student-login" element={<StudentLogin />} />
            <Route path="/landlord-signin" element={<LandlordSignup />} />
            <Route path="/landlord-login" element={<LandlordLogin />} />
            <Route path="/university-signin" element={<UniversitySignIn />} />
            <Route path="/email-signin" element={<EmailPasswordSignIn />} />
            
            {/* Main app routes */}
            <Route path='/home' element={<Home />} />
            <Route path='/Map' element={<Map />} />
            <Route path='/about' element={<About />} />
            <Route path='/TC' element={<TC />} />
            <Route path='/property/:id' element={<PropertyDetails />} />
            <Route path='/search' element={<SearchResults />} />
            <Route path='/profile' element={<StudentProfile />} />
            <Route path='/property/:id/payments' element={<Payments />} />
            <Route path='/payment-success' element={<PaymentSuccess />} />
            <Route path='/payment-cancel' element={<PaymentCancel />} />
          </Routes>
          <Footer />
        </>
      )}
    </>
  );
}

export default App;