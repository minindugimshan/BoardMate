import { useParams } from 'react-router-dom';
import { Bed, Phone, MapPin, Star, ChevronLeft, ChevronRight, Calendar, Home, Droplet, Wifi } from 'lucide-react';
import { propertyData } from '../../data/propertyData';
import { useState } from 'react';
import './PropertyDetails.css';

const PropertyDetails = () => {
  const { id } = useParams();
  const propertyId = parseInt(id);
  const property = propertyData.find(p => p.id === propertyId);
  const [currentImage, setCurrentImage] = useState(0);

  const nextSlide = () => {
    if (!property.images || property.images.length === 0) return;
    setCurrentImage(current => 
      current === (property.images.length - 1) ? 0 : current + 1
    );
  };

  const prevSlide = () => {
    if (!property.images || property.images.length === 0) return;
    setCurrentImage(current => 
      current === 0 ? (property.images.length - 1) : current - 1
    );
  };

  if (!property) return <div className="container mt-5">Property Not Found</div>;

  // Helper function to get amenity icons
  const getAmenityIcon = (facility) => {
    const facilityLower = facility.toLowerCase();
    if (facilityLower.includes('bed')) return <Bed size={24} />;
    if (facilityLower.includes('water')) return <Droplet size={24} />;
    if (facilityLower.includes('wifi') || facilityLower.includes('internet')) return <Wifi size={24} />;
    return <Home size={24} />;
  };

  return (
    <div className="property-details-container">
      <div className="property-info-section">
        <div className="property-header">
          <h1>{property.name}</h1>
          <div className="property-location">
            <MapPin size={20} />
            <span>{property.address}</span>
          </div>
          <div className="property-type-price">
            <span className="property-type">{property.type}</span>
            <span className="property-price">LKR {property.price.toLocaleString()}</span>
          </div>
        </div>

        <div className="property-quick-info">
          <div className="info-item">
            <Bed size={24} />
            <span>{property.totalBeds} beds</span>
          </div>
          <div className="info-item">
            <Home size={24} />
            <span>{property.totalRooms} rooms</span>
          </div>
          <div className="info-item">
            <Phone size={24} />
            <span>{property.contactNumber}</span>
          </div>
        </div>

        <div className="booking-section">
          <button className="book-tour-btn">
            <Calendar size={20} />
            Book a virtual tour
          </button>
          <div className="rating-container">
            <Star className="star" size={20} />
            <span>{property.rating}</span>
          </div>
        </div>

        <div className="property-description">
          <h2>Description</h2>
          <p>{property.description || "No description available."}</p>
        </div>

        <div className="property-facilities">
          <h2>Facilities</h2>
          {property.facilities && property.facilities.length > 0 ? (
            <ul>
              {property.facilities.map((facility, index) => (
                <li key={index}>{facility}</li>
              ))}
            </ul>
          ) : (
            <p>No facility information available</p>
          )}
        </div>

        <div className="property-university">
          <h2>Nearest University</h2>
          <p>{property.university}</p>
        </div>

        {property.map && (
          <div className="property-map">
            <h2>Location</h2>
            <iframe 
              src={property.map} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Property Location"
            ></iframe>
          </div>
        )}
      </div>

      <div className="property-image-section">
        {property.images && property.images.length > 0 ? (
          <div className="image-slider">
            <img 
              src={property.images[currentImage]} 
              alt={`${property.name} - image ${currentImage + 1}`} 
              className="main-image"
            />
            <button className="slider-button prev" onClick={prevSlide}>
              <ChevronLeft size={24} />
            </button>
            <button className="slider-button next" onClick={nextSlide}>
              <ChevronRight size={24} />
            </button>
            <div className="image-counter">
              {currentImage + 1} / {property.images.length}
            </div>
          </div>
        ) : (
          <div className="no-image">No images available</div>
        )}
      </div>
    </div>
  );
};

export default PropertyDetails;