import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import './App.css';
import LandlordDashboard from './components/LandlordDashboard/LandlordDashboard.jsx';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="nav-brand">
            <img src="/bmlogo.png" alt="BoardMate" className="nav-logo" />
          </div>

          <button className="mobile-menu-btn" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <Link to="/" className="nav-link">Dashboard</Link>
            <Link to="/chat" className="nav-link">Chat</Link>
            <Link to="/support" className="nav-link">Support</Link>
          </div>

          <div className="profile-container">
            <img 
              className="profile" 
              src="/api/placeholder/40/40"
              alt="Profile" 
            />
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<LandlordDashboard />} />
            <Route path="/login" element={<div>Login Page</div>} />
            <Route path="/signup" element={<div>Sign Up Page</div>} />
          </Routes>
        </main>

        <footer className="footer">
          <div className="footer-content">
            <div className="footer-section">
              <h3>About RoomMate</h3>
              <p>Finding your perfect accommodation made simple and secure.</p>
            </div>
            <div className="footer-section">
              <h3>Quick Links</h3>
              <Link to="/">Dashboard</Link>
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
            <div className="footer-section">
              <h3>Contact Us</h3>
              <p>Email: support@roommate.com</p>
              <p>Phone: +94 11 234 5678</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 RoomMate. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;