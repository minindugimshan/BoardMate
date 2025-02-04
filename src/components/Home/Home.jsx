import React, { useState } from 'react'
import './Home.css'
import {TypeAnimation} from "react-type-animation"

function Home() {

  const [searchInput , setSearchInput] = useState({
    university : '',
    location : '',
    gender : '',
    priceRange : '',
    roomType : '',
  });

  const handleChange = (e) => {
    const {name , value} = e.target;

    setSearchInput ( (prev) => {
      const updated = {
        ...prev,
        [name] : value,
      }
      return updated
    }
  )
  }

  const handleSearch = (e) => {
     e.preventDefault();
  }
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
            <option value="Dehiwala">Dehiwala-Mount Lavinia</option>
            <option value="Kotte">Kotte</option>
            <option value="Moratuwa">Moratuwa</option>
            <option value="Kesbewa">Kesbewa</option>
            <option value="Nugegoda">Nugegoda</option>
            <option value="Homagama">Homagama</option>
            <option value="Kaduwela">Kaduwela</option>
            <option value="Maharagama">Maharagama</option>
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
            <option value="other">Prefer not to say</option>
          </select>

          <select 
            name="priceRange"
            id="priceRange"
            value={searchInput.priceRange}
            onChange={handleChange}
            >
              <option value="" disabled hidden>Price Range PCM</option>
              <option value="5,000">5,000-10,000 LKR</option>
              <option value="10,000">10,000-20,000 LKR</option>
              <option value="20,000">20,000-30,000 LKR</option>
              <option value="30,000">30,000-40,000 LKR</option>
              <option value="40,000">40,000-50,000 LKR</option>
          </select>

          <select 
            name="roomType" 
            id="roomType"
            value={searchInput.roomType}
            onChange={handleChange}
          >
            <option value=""disabled hidden>Room Type</option>
            <option value="male">Single Room</option>
            <option value="female">Double Room</option>
            <option value="other">Shared Room</option>
          </select>

          <button className='searchButton' onClick={handleSearch}> ⌕ </button>
        </div>
      </div> <br /><br />

      <div className='mostviewed-props'>
        <h2 className='mostviewed'>Most Viewed</h2>
        <img src="https://img.freepik.com/premium-photo/home-with-blue-roof-black-roof-with-house-background_198067-832069.jpg?uid=R185375474&ga=GA1.1.1174272196.1736108309&semt=ais_hybrid_sidr" alt="" />
      </div> <br /><br /><br />
       
     
        
    </div> 
  );
}

export default Home