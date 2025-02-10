import { useParams } from 'react-router-dom';
import { Bed, Bath, Phone, MapPin, Star } from 'lucide-react';
import { propertyData } from '../../data/propertyData';
import { useState } from 'react';
import './PropertyDetails.css';

const PropertyDetails = () => {
  // Use useParams hook to get the ID from the URL
  const { id } = useParams();
  
  // Convert ID to number and find the property
  const propertyId = parseInt(id);
  const property = propertyData.find(p => p.id === propertyId);
  
  // Image carousel state
  const [currentImage, setCurrentImage] = useState(0);

  if (!property) return <div>Property Not Found</div>;

  return (
    <div className="property-details-container">
      <div className="property-image-section">
        <div className="image-carousel">
          <img 
            src={property.images[currentImage]} 
            alt={property.name} 
            className="main-property-image" 
          />
          {property.images.length > 1 && (
            <div className="image-thumbnails">
              {property.images.map((img, index) => (
                <img 
                  key={index} 
                  src={img} 
                  alt={`Thumbnail ${index + 1}`} 
                  className={`thumbnail ${currentImage === index ? 'active' : ''}`}
                  onClick={() => setCurrentImage(index)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="property-info-section">
        <div className="property-header">
          <h1>{property.name}</h1>
          <div className="property-rating">
            <Star className="star-icon" />
            <span>{property.rating} ({property.totalUsers} users)</span>
          </div>
        </div>
        <div className="property-key-details">
          <div className="detail-item">
            <MapPin />
            <span>{property.address}</span>
          </div>
          <div className="detail-item">
            <Phone />
            <span>{property.contactNumber}</span>
          </div>
        </div>
        <div className="property-pricing">
          <h2>LKR {property.price.toLocaleString()} / month</h2>
          <div className="availability">
            <Bed />
            <span>{property.availableBeds} beds available out of {property.totalBeds}</span>
          </div>
        </div>
        <div className="property-features">
          <h3>Facilities</h3>
          <div className="facilities-grid">
            {property.facilities.map((facility, index) => (
              <div key={index} className="facility-item">
                {facility}
              </div>
            ))}
          </div>
        </div>
        <div className="property-description">
          <h3>Description</h3>
          <p>{property.description}</p>
        </div>
        <div className="action-buttons">
          <button className="contact-btn">Contact Owner</button>
          <button className="book-btn">Book Now</button>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;

