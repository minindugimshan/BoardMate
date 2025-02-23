import React from 'react';
import { MapPin } from 'lucide-react';
import './PopularHomes.css';

const PopularHomes = () => {
    console.log('PopularHomes rendering');
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

  return (
    <div className="popular-homes">
      <div className="popular-homes-container">
        {/* Header */}
        <div className="popular-homes-header">
          <div>
            <h2>Our Popular Homes</h2>
          </div>
          <button className="explore-button">
            Explore All
            <span className="arrow">→</span>
          </button>
        </div>

        {/* Property Grid */}
        <div className="property-grid">
          {properties.map((property, index) => (
            <div key={index} className="property-card">
              {/* Image Container */}
              <div className="property-image-container">
                <img
                  src={property.image}
                  alt={property.location}
                  className="property-image"
                />
              </div>

              {/* Content */}
              <div className="property-content">
                {/* Location */}
                <div className="property-location">
                  <MapPin size={16} />
                  <span>{property.location}</span>
                </div>

                {/* Specs */}
                <div className="property-specs">{property.specs}</div>

                {/* Price and Button */}
                <div className="property-footer">
                  <span className="property-price">{property.price}</span>
                  <button className="book-button">Book Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularHomes;