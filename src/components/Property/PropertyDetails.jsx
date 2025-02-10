// import React from 'react';
// import { useParams } from 'react-router-dom';
// import { propertyData } from '../../data/propertyData';

// const PropertyDetails = () => {
//   const { id } = useParams();
//   const property = propertyData.find(p => p.id === parseInt(id));

//   if (!property) {
//     return <div>Property not found</div>;
//   }

//   return (
//     <div className="container mt-4">
//       <div className="row">
//         <div className="col-md-8">
//           <div className="property-images">
//             {/* Image carousel component */}
//           </div>
//         </div>
//         <div className="col-md-4">
//           <div className="property-info">
//             <h1>{property.name}</h1>
//             <p className="location">{property.location}</p>
//             <h2>LKR {property.price} / month</h2>
            
//             <div className="amenities">
//               <h3>Amenities</h3>
//               <ul>
//                 {property.amenities.map(amenity => (
//                   <li key={amenity}>{amenity}</li>
//                 ))}
//               </ul>
//             </div>

//             <div className="features">
//               <h3>Features</h3>
//               <p>Bedrooms: {property.features.bedrooms}</p>
//               <p>Bathrooms: {property.features.bathrooms}</p>
//               {property.features.hasKitchen && <p>Kitchen Available</p>}
//             </div>

//             <div className="contact">
//               <h3>Contact</h3>
//               <p>Phone: {property.contact.phone}</p>
//               <p>Email: {property.contact.email}</p>
//             </div>

//             <button className="btn btn-primary mt-3">
//               Book Virtual Tour
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PropertyDetails;

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { propertyData } from '../../data/propertyData';
import './PropertyDetails.css';

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = propertyData.find(p => p.id === parseInt(id));

  if (!property) {
    return <div>Property not found</div>;
  }

  const [currentImage, setCurrentImage] = React.useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  return (
    <div className="property-details-container">
      <div className="property-details-content">
        <div className="property-gallery">
          <img 
            src={property.images[currentImage]} 
            alt={property.name} 
            className="main-image"
          />
          <button className="gallery-nav prev" onClick={prevImage}>❮</button>
          <button className="gallery-nav next" onClick={nextImage}>❯</button>
        </div>

        <div className="property-info-details">
          <h1>{property.name}</h1>
          <p className="location">{property.location}</p>
          <div className="rating-info">
            <span className="stars">★ {property.rating}</span>
            <span className="users">({property.totalUsers} users)</span>
          </div>

          <div className="price-section">
            <h2>LKR {property.price} / month</h2>
          </div>

          <div className="amenities-section">
            <h3>Amenities</h3>
            <div className="amenities-grid">
              {property.amenities.map(amenity => (
                <div key={amenity} className="amenity-item">
                  <span className="amenity-icon">✓</span>
                  {amenity}
                </div>
              ))}
            </div>
          </div>

          <div className="description-section">
            <h3>Description</h3>
            <p>{property.description}</p>
          </div>

          <div className="action-buttons">
            <button className="book-tour-btn">Book Virtual Tour</button>
            <button className="contact-btn">Contact Owner</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;