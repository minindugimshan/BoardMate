import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GetStarted from './components/GetStarted/GetStarted';
import StudentLogin from './components/LogIn/StudentLogin';
import StudentSignIn from './components/SignIn/StudentSignIn';
import LandlordLogin from './components/LogIn/LandlordLogIn.jsx';
import LandlordSignup from './components/SignIn/LandlordSignUp';
import UniversitySignIn from './components/SignIn/UniversitySignIn';
import EmailPasswordSignIn from './components/SignIn/EmailPasswordSignIn';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<GetStarted />} />
          <Route path="/student-signin" element={<StudentSignIn />} />
          <Route path="/student-login" element={<StudentLogin />} />
          <Route path="/landlord-signin" element={<LandlordSignup />} />
          <Route path="/landlord-login" element={<LandlordLogin />} />
          <Route path="/university-signin" element={<UniversitySignIn />} />
          <Route path="/email-signin" element={<EmailPasswordSignIn />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;