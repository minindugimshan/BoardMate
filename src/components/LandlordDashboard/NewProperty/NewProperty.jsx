import React, { useState } from 'react';
import { X, Upload, Building, MapPin, DollarSign, Home, Users, BedDouble, Bath, SquareCode, Map, Link } from 'lucide-react';
import './NewProperty.css';
import GoogleMapComponent from './GoogleMapComponent.jsx'; // Import the new component

const NewProperty = ({ onClose, onSubmit }) => {
  const [propertyData, setPropertyData] = useState({
    title: '',
    location: '',
    mapLink: '',
    coordinates: null, // New field to store lat/lng
    price: '',
    type: 'Apartment',
    bedrooms: 1,
    bathrooms: 1,
    area: '',
    description: '',
    amenities: [],
    images: []
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [showMapModal, setShowMapModal] = useState(false);

  const propertyTypes = ['Apartment', 'House', 'Room', 'Annex', 'Villa', 'Commercial'];
  const amenitiesList = ['WiFi', 'AC', 'Parking', 'Furnished', 'Security', 'Hot Water', 'Kitchen', 'Balcony', 'Garden'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropertyData(prev => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setPropertyData(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
  };

  const handleAmenityChange = (amenity) => {
    setPropertyData(prev => {
      const newAmenities = prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity];
      
      return { ...prev, amenities: newAmenities };
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    // Create URL for preview
    if (files.length > 0) {
      const url = URL.createObjectURL(files[0]);
      setImagePreview(url);
    }
    
    // In a real app, you'd upload these to a server
    // For this demo we'll just store the file objects
    setPropertyData(prev => ({
      ...prev,
      images: files
    }));
  };

  const handleOpenMap = () => {
    setShowMapModal(true);
  };

  const handleCloseMap = () => {
    setShowMapModal(false);
  };

  const handleSetLocation = (locationData) => {
    // Using the data from Google Maps
    setPropertyData(prev => ({
      ...prev,
      location: locationData.address || 'Selected from map',
      coordinates: {
        lat: locationData.lat,
        lng: locationData.lng
      }
    }));
    setShowMapModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(propertyData);
  };

  // Generate a Google Maps link based on coordinates
  const generateGoogleMapsLink = () => {
    if (propertyData.coordinates) {
      const { lat, lng } = propertyData.coordinates;
      return `https://www.google.com/maps?q=${lat},${lng}`;
    }
    return '';
  };

  // Automatically update the mapLink when coordinates change
  React.useEffect(() => {
    if (propertyData.coordinates && !propertyData.mapLink) {
      const mapLink = generateGoogleMapsLink();
      setPropertyData(prev => ({ ...prev, mapLink }));
    }
  }, [propertyData.coordinates]);

  return (
    <div className="new-property-overlay">
      <div className="new-property-modal">
        <div className="modal-header">
          <h2>Add New Property</h2>
          <button className="close-button" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="property-form">
          <div className="form-grid">
            <div className="form-column">
              <div className="form-group">
                <label htmlFor="title">
                  <Building size={18} />
                  Property Title*
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={propertyData.title}
                  onChange={handleChange}
                  placeholder="e.g. Modern Studio Near IIT"
                  required
                />
              </div>

              <div className="form-group location-group">
                <label htmlFor="location">
                  <MapPin size={18} />
                  Location*
                </label>
                <div className="location-input-group">
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={propertyData.location}
                    onChange={handleChange}
                    placeholder="e.g. Colombo, Kandy"
                    required
                  />
                  <button 
                    type="button" 
                    className="map-button"
                    onClick={handleOpenMap}
                  >
                    <Map size={18} />
                    Set on Map
                  </button>
                </div>
                
                <div className="map-link-container">
                  <label htmlFor="mapLink" className="map-link-label">
                    <Link size={16} />
                    Google Maps Link (Optional)
                  </label>
                  <input
                    type="text"
                    id="mapLink"
                    name="mapLink"
                    value={propertyData.mapLink}
                    onChange={handleChange}
                    placeholder="Paste Google Maps link here"
                  />
                </div>
                
                {propertyData.coordinates && (
                  <div className="map-pin-indicator">
                    <MapPin size={16} />
                    Location pinned on map
                  </div>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="price">
                    <DollarSign size={18} />
                    Monthly Rent (LKR)*
                  </label>
                  <input
                    type="text"
                    id="price"
                    name="price"
                    value={propertyData.price}
                    onChange={handleChange}
                    placeholder="25,000"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="type">
                    <Home size={18} />
                    Property Type
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={propertyData.type}
                    onChange={handleChange}
                  >
                    {propertyTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="bedrooms">
                    <BedDouble size={18} />
                    Bedrooms
                  </label>
                  <input
                    type="number"
                    id="bedrooms"
                    name="bedrooms"
                    value={propertyData.bedrooms}
                    onChange={handleNumberChange}
                    min="0"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="bathrooms">
                    <Bath size={18} />
                    Bathrooms
                  </label>
                  <input
                    type="number"
                    id="bathrooms"
                    name="bathrooms"
                    value={propertyData.bathrooms}
                    onChange={handleNumberChange}
                    min="0"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="area">
                    <SquareCode size={18} />
                    Area (sqft)
                  </label>
                  <input
                    type="text"
                    id="area"
                    name="area"
                    value={propertyData.area}
                    onChange={handleChange}
                    placeholder="900"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={propertyData.description}
                  onChange={handleChange}
                  placeholder="Describe your property..."
                  rows="4"
                ></textarea>
              </div>
            </div>

            <div className="form-column">
              <div className="form-group">
                <label>
                  <Upload size={18} />
                  Upload Images
                </label>
                <div className="image-upload-container">
                  <input
                    type="file"
                    id="images"
                    name="images"
                    onChange={handleImageChange}
                    accept="image/*"
                    multiple
                    className="file-input"
                  />
                  <label htmlFor="images" className="upload-label">
                    <div className="upload-icon">
                      <Upload size={24} />
                      <span>Select Files</span>
                    </div>
                  </label>
                  {imagePreview && (
                    <div className="image-preview">
                      <img src={imagePreview} alt="Preview" />
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label>
                  <Users size={18} />
                  Amenities
                </label>
                <div className="amenities-grid">
                  {amenitiesList.map(amenity => (
                    <div
                      key={amenity}
                      className={`amenity-chip ${propertyData.amenities.includes(amenity) ? 'selected' : ''}`}
                      onClick={() => handleAmenityChange(amenity)}
                    >
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="submit-btn">Add Property</button>
          </div>
        </form>
      </div>

      {showMapModal && (
        <div className="map-modal-overlay">
          <div className="map-modal">
            <div className="modal-header">
              <h3>Select Location on Map</h3>
              <button className="close-button" onClick={handleCloseMap}>
                <X size={20} />
              </button>
            </div>
            
            <div className="map-container">
              {/* Actual Google Maps component */}
              <GoogleMapComponent 
                onSelectLocation={handleSetLocation}
                initialLocation={propertyData.coordinates}
              />
            </div>
            
            <div className="map-modal-footer">
              <button type="button" className="cancel-btn" onClick={handleCloseMap}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewProperty;