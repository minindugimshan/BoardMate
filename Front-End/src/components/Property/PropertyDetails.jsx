import { useParams } from 'react-router-dom';
import { Bed, Phone, MapPin, Star, ChevronLeft, ChevronRight, Calendar, Home, Droplet, Wifi, Key } from 'lucide-react';
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

  // Function to create a Google Calendar event URL
  const createGoogleCalendarEvent = () => {
    if (!property) return '';
    
    // Format dates for Google Calendar
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Set default start time to tomorrow at 10:00 AM
    const startTime = new Date(tomorrow);
    startTime.setHours(10, 0, 0, 0);
    
    // End time is 30 minutes after start time
    const endTime = new Date(startTime);
    endTime.setMinutes(endTime.getMinutes() + 30);
    
    // Format dates for Google Calendar URL
    const formatDate = (date) => {
      return date.toISOString().replace(/-|:|\.\d+/g, '');
    };
    
    const startTimeFormatted = formatDate(startTime);
    const endTimeFormatted = formatDate(endTime);
    
    // Create event details
    const eventTitle = `Property Tour: ${property.name}`;
    const eventLocation = property.address;
    const eventDetails = `Tour of ${property.type} property.\n\nProperty details:\n- ${property.totalBeds} beds\n- ${property.totalRooms} rooms\n- Contact: ${property.contactNumber}`;
    
    // Construct Google Calendar URL
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${startTimeFormatted}/${endTimeFormatted}&details=${encodeURIComponent(eventDetails)}&location=${encodeURIComponent(eventLocation)}&sprop=&sprop=name:`;
    
    return googleCalendarUrl;
  };

  // Function to handle booking property
  const handleBookProperty = () => {
    // This function would typically navigate to a booking form or payment page
    alert(`Initiating booking process for ${property.name}. You will be redirected to the payment page.`);
    // Placeholder for actual booking functionality
    // In a real application, you might use:
    // navigate('/booking-form', { state: { propertyId: property.id } });
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

       
          <a 
            href={createGoogleCalendarEvent()} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="book-tour-btn"
          >
            <Calendar size={20} />
            Book a tour
          </a>

          <div className="booking-section">
          <button 
            className="book-property-btn"
            onClick={handleBookProperty}
          >
            <Key size={20} />
            Book Property
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