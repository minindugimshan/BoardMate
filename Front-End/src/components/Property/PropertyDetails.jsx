import { useNavigate, useParams } from 'react-router-dom';
import { Bed, Phone, MapPin, Star, ChevronLeft, ChevronRight, Calendar, Home, Droplet, Wifi, Key, Bath } from 'lucide-react';
import { propertyData } from '../../data/propertyData';
import { useState, useEffect } from 'react';
import './PropertyDetails.css';
import ReviewForm from '../Review&Rating/ReviewForm'; // Import the ReviewForm component
import ReviewList from '../Review&Rating/ReviewList'; // Import the ReviewList component
import PropertyChatButton from '../Chatapp/PropertyChatButton';
import useAuthStore from '../../store/use-auth-store';

const PropertyDetails = () => {
  const { id } = useParams();
  const propertyId = parseInt(id);
  const property = propertyData.find(p => p.id === propertyId);
  const [currentImage, setCurrentImage] = useState(0);
  const [reviews, setReviews] = useState([]); // State to store reviews
  const navigate = useNavigate();
  const authStore = useAuthStore();
  const user = authStore.user;

  // Fetch reviews from the backend 
  useEffect(() => {
    const fetchReviewsAndRating = async () => {
      try {
        // Fetch reviews
        const reviewsResponse = await fetch(`http://localhost:8080/api/properties/${propertyId}/reviews`);
        if (!reviewsResponse.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const reviewsData = await reviewsResponse.json();
        setReviews(reviewsData);

        // Fetch average rating
        const ratingResponse = await fetch(`http://localhost:8080/api/properties/${propertyId}/reviews/average-rating`);
        if (!ratingResponse.ok) {
          throw new Error('Failed to fetch average rating');
        }
        const averageRating = await ratingResponse.json();
        setAverageRating(averageRating); // Set the average rating
      } catch (error) {
        console.error('Error fetching reviews or rating:', error);
      }
    };

    fetchReviewsAndRating();
  }, [propertyId]);

  if (!property) return <div className="container mt-5">Property Not Found</div>;

  const nextSlide = () => {
    if (!property.images || property.images.length === 0) return;
    setCurrentImage(current => (current === property.images.length - 1 ? 0 : current + 1));
  };

  const prevSlide = () => {
    if (!property.images || property.images.length === 0) return;
    setCurrentImage(current => (current === 0 ? property.images.length - 1 : current - 1));
  };

  const createGoogleCalendarEvent = () => {

    // Format dates for Google Calendar
    const today = new Date();
    const tomorrow = new Date(today);

    // Set default start time to tomorrow at 10:00 AM
    tomorrow.setDate(tomorrow.getDate() + 1);
    const startTime = new Date(tomorrow);
    startTime.setHours(10, 0, 0, 0);

     // End time is 30 minutes after start time
    const endTime = new Date(startTime);
    endTime.setMinutes(endTime.getMinutes() + 30);

    // Format dates for Google Calendar URL
    const formatDate = date => date.toISOString().replace(/-|:|\.\d+/g, '');
    const startTimeFormatted = formatDate(startTime);
    const endTimeFormatted = formatDate(endTime);

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`Property Tour: ${property.name}`)}&dates=${startTimeFormatted}/${endTimeFormatted}&details=${encodeURIComponent(`Tour of ${property.type} property.\n\nProperty details:\n- ${property.totalBeds} beds\n- ${property.totalRooms} rooms\n- ${property.totalBathrooms} bathrooms\n- Contact: ${property.contactNumber}`)}&location=${encodeURIComponent(property.address)}`;
  };

  const handleBookProperty = () => {
    navigate(`/property/${id}/payments`);
  };

  // Handle review submission
  const handleReviewSubmit = async (review) => {
    try {
      const response = await fetch(`http://localhost:8080/api/properties/${propertyId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...review,
          user: 'Anonymous', // Replace with actual user name if available
          date: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit review');
      }

      const newReview = await response.json();
      setReviews([...reviews, newReview]); // Add the new review to the list

      // Re-fetch the average rating after submitting a new review
      const ratingResponse = await fetch(`http://localhost:8080/api/properties/${propertyId}/reviews/average-rating`);
      if (!ratingResponse.ok) {
        throw new Error('Failed to fetch updated average rating');
      }
      const updatedAverageRating = await ratingResponse.json();
      setAverageRating(updatedAverageRating); // Update the average rating
    } catch (error) {
      console.error('Error submitting review:', error);
    }
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
          <div className="info-item"><Bed size={24} /><span>{property.totalBeds} beds</span></div>
          <div className="info-item"><Home size={24} /><span>{property.totalRooms} rooms</span></div>
          <div className="info-item"><Bath size={24} /><span>{property.totalBathrooms} bathrooms</span></div> 
          <div className="info-item"><Phone size={24} /><span>{property.contactNumber}</span></div>
        </div>

        {user && user.userType != "LANDLORD" && <div className="booking-section">
          <a href={createGoogleCalendarEvent()} target="_blank" rel="noopener noreferrer" className="book-tour-btn">
            <Calendar size={20} /> Book a tour
          </a>
          <button className="book-now" onClick={handleBookProperty}><Key size={20} /> Book Now</button>
          <PropertyChatButton 
                  propertyId={property.id}
                  landlordId={2}
                  studentId={user.id}
                />
        </div>}

        <div className="rating-container">
          <Star className="star" size={20} />
          {/* <span>{averageRating.toFixed(1)}</span> Display average rating  */}
        </div>


        <div className="property-description">
          <h2>Description</h2>
          <p>{property.description || "No description available."}</p>
        </div>

        <div className="property-facilities">
          <h2>Facilities</h2>
          {property.facilities?.length > 0 ? <ul>{property.facilities.map((facility, index) => <li key={index}>{facility}</li>)}</ul> : <p>No facility information available</p>}
        </div>

        <div className="property-university">
          <h2>Nearest University</h2>
          <p>{property.university}</p>
        </div>

        {property.map && (
          <div className="property-map">
            <h2>Location</h2>
            <iframe src={property.map} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Property Location"></iframe>
          </div>
        )}

        {/* Review and Rating Section */}
        <div className="review-section">
          <h2>Reviews</h2>
         {user && user.userType != "LANDLORD" && <ReviewForm onSubmit={handleReviewSubmit} />}
          <ReviewList reviews={reviews} />
        </div>
      </div>

      <div className="property-image-section">
        {property.images?.length > 0 ? (
          <div className="image-slider">
            <img src={property.images[currentImage]} alt={`${property.name} - image ${currentImage + 1}`} className="main-image" />
            <button className="slider-button prev" onClick={prevSlide}><ChevronLeft size={24} /></button>
            <button className="slider-button next" onClick={nextSlide}><ChevronRight size={24} /></button>
            <div className="image-counter">{currentImage + 1} / {property.images.length}</div>
          </div>
        ) : (
          <div className="no-image">No images available</div>
        )}
      </div>
    </div>
  );
};

export default PropertyDetails;