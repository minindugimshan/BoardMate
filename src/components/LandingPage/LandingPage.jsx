import React from 'react';
import { Search, MapPin, Building, DollarSign, Shield, Clock, Tag} from 'lucide-react';
import './style.css';

const LandingPage = () => {
  return (
    <div className="container">
      {/* Navigation */}
      <nav className="navbar">
        <div className="logo">
          <img src="/bmlogo.png" alt="BoardMate Logo" className="logo-image" />
        </div>
        <div className="nav-links">
          <a href="#">List your property</a>
          <a href="#">Log In</a>
          <a href="#">Sign Up</a>
          <a href="#">Support</a>
          <a href="#">About Us</a>
          <button className="nav-button">Find A Place</button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero">
        <div className="hero-content">
          <h1>Finding Your Place <br />Made Easy</h1>
          <p>Discover and book safe, verified student accommodations near top universities and cities across Sri Lanka</p>
          <button className="cta-button">Get Started</button>

          {/* Feature Icons Section */}
          <div className="feature-icons">
            <div className="feature-item">
              <Shield size={24} />
              <span>Verified Properties</span>
            </div>
            <div className="feature-item">
              <Clock size={24} />
              <span>24x7 Assistance</span>
            </div>
            <div className="feature-item">
              <Tag size={24} />
              <span>Secure Payments</span>
            </div>
          </div>

          {/* Search Section */}
          <div className="search-container">
            <div className="search-box">
              <div className="search-input">
                <div className="search-input-group">
                  <label className="search-input-label">University</label>
                  <select defaultValue="">
                    <option value="" disabled>Select an University</option>
                    <option value="IIT">Informatics Institute of Technology</option>
                  </select>
                </div>
              </div>
              <div className="search-input">
                <div className="search-input-group">
                  <label className="search-input-label">Location</label>
                  <select defaultValue="">
                    <option value="" disabled>Enter city or area</option>
                    <option value="Bambalapitiya">Bambalapitiya</option>
                    <option value="Wallewatta">Wallewatta</option>
                    <option value="Galle">Galle</option>
                  </select>
                </div>
              </div>
              <div className="search-input">
                <div className="search-input-group">
                  <label className="search-input-label">Gender</label>
                  <select defaultValue="">
                    <option value="" disabled>Please specify</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>
              <div className="search-input">
                <div className="search-input-group">
                  <label className="search-input-label">Room Type</label>
                  <select defaultValue="">
                    <option value="" disabled>Select type</option>
                    <option value="single">Single Room</option>
                    <option value="shared">Shared Room</option>
                    <option value="apartment">Apartment</option>
                  </select>
                </div>
              </div>
              <div className="search-input">
                <div className="search-input-group">
                  <label className="search-input-label">Price Range</label>
                  <select defaultValue="">
                    <option value="" disabled>Set your budget</option>
                    <option value="0-10000">Rs. 0 - 10,000</option>
                    <option value="10000-20000">Rs. 10,000 - 20,000</option>
                    <option value="20000-30000">Rs. 20,000 - 30,000</option>
                    <option value="30000+">Rs. 30,000+</option>
                  </select>
                </div>
              </div>
              <button className="search-button">
                <Search size={18} />
                Search Now
              </button>
            </div>
          </div>
        </div>
        
        <div className="hero-image">
          <img src="./herofinal2.png" alt="Modern house" />
        </div>
      </div>
    </div>
  );
};

// Properties data
const properties = [
  {
    location: "Banana Island, Lagos",
    price: "₦100,000,000",
    specs: "4 Bed • 10x10 m • 1600 m",
    image: "/api/placeholder/400/300"
  },
  {
    location: "Parkview Estate, Lagos",
    price: "₦200,000,000",
    specs: "5 Bed • 10x10 m • 1600 m",
    image: "/api/placeholder/400/300"
  },
  {
    location: "Eko Atlantic, Lagos",
    price: "₦500,000,000",
    specs: "3 Bed • 10x10 m • 1600 m",
    image: "/api/placeholder/400/300"
  }
];

export default LandingPage;