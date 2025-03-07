import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Home.css'
import {TypeAnimation} from "react-type-animation"
import { propertyData } from '../../data/propertyData';

function Home() {
  const navigate = useNavigate();
  const [searchInput , setSearchInput] = useState({
    university : '',
    location : '',
    gender : '',
    priceRange : '',
    roomType : '',
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
  }

  const handlePropertyClick = (propertyId) => {
    navigate(`/property/${propertyId}`);
  };


  // Testing the home

  return (
    <div className='background'>
      <img src="/background.jpeg" alt="background" className='homeBackground' />

      {/* Adding TypeAnimation for the main heading */}
      <TypeAnimation
        sequence={[
          "Finding Your Place, Made Easy", // Text to display
          2000, // Wait for 2 seconds
          "", // Clear the text
          500, // Pause for 0.5 seconds
          "Your Perfect Match, Just a Click Away!",
          2000,
          "",
          500,
          "Finding Your Place, Made Easy" // Type again
        ]}
        wrapper="h1" // Specify the wrapper (like h1)
        className='main' // Add class for styling
        cursor={true} // Show the typing cursor
        repeat={Infinity} // Make the animation loop infinitely
      />

      <h4 className='mainsub'>
        Let us help you discover secure, safe, comfortable, and verified accommodations near top universities and
        <br /> bustling city hubs, stress-free and tailored for you!
      </h4>

      <div className='searchbar'>
        <div className='fields'>
          <select
            name="university"
            id="university"
            value={searchInput.university}
            onChange={handleChange}
          >
            <option value="" disabled hidden>University</option>
            <option value="IIT">IIT</option>
          </select>

          <select 
            name="location" 
            id="location" 
            value={searchInput.location} 
            onChange={handleChange}
          >
            <option value="" disabled hidden>Location</option>
            <option value="Colombo">Colombo</option>
            <option value="Dehiwala">Dehiwala</option>
            <option value="Nugegoda">Nugegoda</option>
            <option value="Boralesgamuwa">Boralesgamuwa</option>   
            <option value="Mount Lavinia">Mount Lavinia</option>
            <option value="Kirulapana">Kirulapana</option>
            <option value="Colombo 06">Colombo 06</option>
            <option value="Colombo 05">Colombo 05</option>
            <option value="Colombo 04">Colombo 04</option>
            <option value="Wellawatte">Wellawatte</option>
            <option value="Bambalapitiya">Bambalapitiya</option>
            <option value="Kollupitiya">Kollupitiya</option>
            <option value="Rathmalana">Rathmalana</option>
            <option value="Pepiliyana">Pepiliyana</option>
            <option value="Zoyzapura">Zoyzapura</option>
            <option value="Katubedda">Katubedda</option>
            <option value="Kalubowila">Kalubowila</option>
            <option value="Wijerama">Wijerama</option>
          </select>

          <select 
            name="gender" 
            id="gender"
            value={searchInput.gender}
            onChange={handleChange}
          >
            <option value=""disabled hidden>Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <select 
            name="priceRange"
            id="priceRange"
            value={searchInput.priceRange}
            onChange={handleChange}
            >
              <option value="" disabled hidden>Price Range PCM</option>
              <option value="5,000">9,000-14,000 LKR</option>
              <option value="10,000">14,000-19,000 LKR</option>
              <option value="20,000">19,000-24,000 LKR</option>
              <option value="30,000">24,000-29,000 LKR</option>
              <option value="40,000">29,000-34,000 LKR</option>
              <option value="40,000">34,000-39,000 LKR</option>
              <option value="40,000">39,000-44,000 LKR</option>
              <option value="40,000">44,000-50,000 LKR</option>
          </select>

          <select 
            name="roomType" 
            id="roomType"
            value={searchInput.roomType}
            onChange={handleChange}
          >
            <option value=""disabled hidden>Room/House Type</option>
            <option value="shared">Shared House</option>
            <option value="male">Single Room</option>
            <option value="female">Double Room</option>
            <option value="other">Shared Room</option>
          </select>

          <button className='searchButton' onClick={handleSearch}> ⌕ </button>
        </div>
      </div> <br /><br />

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
        
      </div> <br /><br /><br />
       
        
    </div> 
  );
}

export default Home