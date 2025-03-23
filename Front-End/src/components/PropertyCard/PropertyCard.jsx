import { useNavigate } from 'react-router-dom';

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/property/${property.id}`);
  };

  return (
    <div className="property-card" onClick={handleClick}>
      <img src={property.images[0]} alt={property.name} />
      <div className="property-info">
        <h3>{property.name}</h3>
        <p className="location">{property.location}</p>
        <p className="price">LKR {property.price} / month</p>
        <div className="rating">
          <span>★ {property.rating}</span>
          <span className="total-users">({property.totalUsers} users)</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;