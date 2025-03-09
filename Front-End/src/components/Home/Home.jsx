import { useNavigate } from 'react-router-dom';
import { TypeAnimation } from "react-type-animation";
import { propertyData } from '../../data/propertyData';
import './Home.css';
import { useState } from 'react';

function Home() {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState({
    university: '',
    location: '',
    gender: '',
    priceRange: '',
    roomType: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchInput(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams(searchInput);
    navigate(`/search?${queryParams.toString()}`);
  };

  const handlePropertyClick = (propertyId) => {
    navigate(`/property/${propertyId}`);
  };

  return (
    <div className='background'>
      <img src="/background.jpeg" alt="background" className='homeBackground' />

      <TypeAnimation
        sequence={[
          "Finding Your Place, Made Easy",
          2000,
          "",
          500,
          "Your Perfect Match, Just a Click Away!",
          2000,
          "",
          500,
          "Finding Your Place, Made Easy"
        ]}
        wrapper="h1"
        className='main'
        cursor={true}
        repeat={Infinity}
      />

      <h4 className='mainsub'>
        Let us help you discover secure, safe, comfortable, and verified accommodations near top universities and
        <br /> bustling city hubs, stress-free and tailored for you!
      </h4>

      <div className='searchbar'>
        <div className='fields'>
          <select
            name="university"
            value={searchInput.university}
            onChange={handleChange}
          >
            <option value="" disabled hidden>University</option>
            <option value="IIT">IIT</option>
          </select>

          <select 
            name="location" 
            value={searchInput.location} 
            onChange={handleChange}
          >
            <option value="" disabled hidden>Location</option>
            <option value="Colombo">Colombo</option>
            <option value="Dehiwala">Dehiwala-Mount Lavinia</option>
            <option value="Nugegoda">Nugegoda</option>
            {/* Add other locations */}
          </select>

          {/* Other select inputs remain the same */}

          <button className='searchButton' onClick={handleSearch}>⌕</button>
        </div>
      </div>

      <div className='mostviewed-props'>
        <h2 className='mostviewed'>Most Viewed</h2>
        <div className='property-grid'>
          {propertyData.map(property => (
            <div 
              key={property.id} 
              className='property-card'
              onClick={() => handlePropertyClick(property.id)}
            >
              <img src={property.images[0]} alt={property.name} />
              <div className='property-info'>
                <h3>{property.name}</h3>
                <p className='location'>{property.location}</p>
                <p className='price'>LKR {property.price} / month</p>
                <div className='rating'>
                  <span>★ {property.rating}</span>
                  <span className='total-users'>({property.totalUsers} users)</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;