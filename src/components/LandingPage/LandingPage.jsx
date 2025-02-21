// LandingPage.jsx
import React from 'react';
import { Search, MapPin, Building, DollarSign } from 'lucide-react';
import './style.css';

const LandingPage = () => {
  return (
    <div className="container">
      {/* Navigation */}
      <nav className="navbar">
        <div className="logo">
        <img src="/bmlogo.png" alt="BoardMate Logo" className="logo-image" />
        <span className="logo-text">BoardMate</span>
        </div>
        <div className="nav-links">
          <a href="#">List your property</a>
          <a href="#">Register</a>
          <a href="#">Sign Up</a>
          <a href="#">Support</a>
          <button className="nav-button">Find A Place</button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero">
        <div className="hero-content">
          <h1>Finding Your Place <br />Made Easy</h1>
          <p>Want to find a home? We are ready to help you find one that suits your lifestyle and needs</p>
          <button className="cta-button">Get Started</button>

          <div className="stats">
            <div className="stat-item">
              <div className="stat-number">1200+</div>
              <div className="stat-label">Listed Properties</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">4500+</div>
              <div className="stat-label">Happy Customers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100+</div>
              <div className="stat-label">Awards</div>
            </div>
          </div>
        </div>
        
        <div className="hero-image">
          <img src="./herofinal2.png" alt="Modern house" />
        </div>
      </div>

      {/* Search Section */}
      <div className="search-container">
        <div className="search-box">
          <div className="search-input">
            <MapPin size={20} />
            <input type="text" placeholder="Location" />
          </div>
          <div className="search-input">
            <Building size={20} />
            <input type="text" placeholder="Property Type" />
          </div>
          <div className="search-input">
            <DollarSign size={20} />
            <input type="text" placeholder="Budget" />
          </div>
          <button className="search-button">Search Now</button>
        </div>
      </div>

      {/* Popular Homes Section */}
      <div className="popular-section">
        <div className="section-header">
          <div>
            <span className="section-label">POPULAR</span>
            <h2>Our Popular Homes</h2>
          </div>
          <button className="explore-button">
            Explore All
            <svg className="arrow-icon" viewBox="0 0 24 24">
              <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

        <div className="property-grid">
          {properties.map((property, index) => (
            <div key={index} className="property-card">
              <img src={property.image} alt={property.location} />
              <div className="property-info">
                <div className="location">
                  <MapPin size={16} />
                  <span>{property.location}</span>
                </div>
                <div className="specs">{property.specs}</div>
                <div className="price-row">
                  <span className="price">{property.price}</span>
                  <button className="book-button">Book Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="testimonial">
        <div className="testimonial-content">
          <div className="founder">
            <h3>Kevin Durant</h3>
            <p>Founder, La Maison</p>
          </div>
          <div className="quote">
            <p>"Our business is built off of close relationships and we are glad that we are able to share our positive real estate experiences with ur clients."</p>
          </div>
        </div>
        
        <div className="partners">
          {['EQUINIX', 'DIGITAL REALTY', 'EQUINIX', 'DIGITAL REALTY'].map((partner, index) => (
            <div key={index} className="partner">{partner}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

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