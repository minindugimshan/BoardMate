import { useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { propertyData } from "../../data/propertyData";
import "./Home.css";
import { useState } from "react";
import { Search } from "lucide-react";
import "../LandingPage/style.css";

function Home() {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState({
    university: "",
    location: "",
    gender: "",
    priceRange: "",
    roomType: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchInput((prev) => ({
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
    <div>
      <div className="background">
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
            "Finding Your Place, Made Easy",
          ]}
          wrapper="h1"
          className="main"
          cursor={true}
          repeat={Infinity}
        />

        <h4 className="mainsub">
          Let us help you discover secure, safe, comfortable, and verified accommodations near top universities and
          <br /> bustling city hubs, stress-free and tailored for you!
        </h4>

        {/* <div className='searchbar'>
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
              <option value="50,000">34,000-39,000 LKR</option>
              <option value="60,000">39,000-44,000 LKR</option>
              <option value="70,000">44,000-50,000 LKR</option>
          </select>

          <select 
            name="roomType" 
            id="roomType"
            value={searchInput.roomType}
            onChange={handleChange}
          >
            <option value=""disabled hidden>Room/House Type</option>
            <option value="male">Single Room</option>
            <option value="female">Double Room</option>
            <option value="other">Shared Room</option>
            <option value="shared">Annex</option>
          </select>

          <button className='searchButton' onClick={handleSearch}>⌕</button>
        </div>
      </div> */}

        {/* Search Section */}
        <div id="find-place" className="search-container">
          <div className="search-box">
            <div className="search-input">
              <div className="search-input-group">
                <label className="search-input-label">University</label>
                <select defaultValue="">
                  <option value="" disabled>
                    Select an University
                  </option>
                  <option value="IIT">Informatics Institute of Technology</option>
                </select>
              </div>
            </div>
            <div className="search-input">
              <div className="search-input-group">
                <label className="search-input-label">Location</label>
                <select defaultValue="">
                  <option value="" disabled>
                    Enter city or area
                  </option>
                  <option value="Bambalapitiya">Bambalapitiya</option>
                  <option value="Wallewatta">Wallewatta</option>
                  <option value="Galle">Galle</option>
                </select>
              </div>
            </div>
            <div className="search-input">
              <div className="search-input-group">
                <label className="search-input-label">Gender</label>
                <select defaultValue="">
                  <option value="" disabled>
                    Please specify
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
            <div className="search-input">
              <div className="search-input-group">
                <label className="search-input-label">Room Type</label>
                <select defaultValue="">
                  <option value="" disabled>
                    Select type
                  </option>
                  <option value="single">Single Room</option>
                  <option value="shared">Shared Room</option>
                  <option value="apartment">Apartment</option>
                </select>
              </div>
            </div>
            <div className="search-input">
              <div className="search-input-group">
                <label className="search-input-label">Price Range</label>
                <select defaultValue="">
                  <option value="" disabled>
                    Set your budget
                  </option>
                  <option value="0-10000">Rs. 0 - 10,000</option>
                  <option value="10000-20000">Rs. 10,000 - 20,000</option>
                  <option value="20000-30000">Rs. 20,000 - 30,000</option>
                  <option value="30000+">Rs. 30,000+</option>
                </select>
              </div>
            </div>
            <button className="search-button">
              <Search size={18} />
              Search Now
            </button>
          </div>
        </div>
      </div>

      <div className="mostviewed-props">
        <h2 className="mostviewed">Most Viewed</h2>
        <div className="property-grid">
          {propertyData.map((property) => (
            <div key={property.id} className="property-card" onClick={() => handlePropertyClick(property.id)}>
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
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;