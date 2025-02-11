
// import { useState } from 'react';
// import './Home.css'
// import {TypeAnimation} from "react-type-animation"

// function Home() {

//   const [searchInput , setSearchInput] = useState({
//     university : '',
//     location : '',
//     gender : '',
//     priceRange : '',
//     roomType : '',
//   });

//   const handleChange = (e) => {
//     const {name , value} = e.target;

//     setSearchInput ( (prev) => {
//       const updated = {
//         ...prev,
//         [name] : value,
//       }
//       return updated
//     }
//   )
//   }

//   // const handleSearch = (e) => {
//   //    e.preventDefault();
//   // }
//   const handleSearch = (e) => {
//     e.preventDefault();
//     const queryParams = new URLSearchParams(searchInput);
//     navigate(`/search?${queryParams.toString()}`);
//   };
//   // Testing the home
  

//   return (
//     <div className='background'>
//       <img src="/background.jpeg" alt="background" className='homeBackground' />

//       {/* Adding TypeAnimation for the main heading */}
//       <TypeAnimation
//         sequence={[
//           "Finding Your Place, Made Easy", // Text to display
//           2000, // Wait for 2 seconds
//           "", // Clear the text
//           500, // Pause for 0.5 seconds
//           "Your Perfect Match, Just a Click Away!",
//           2000,
//           "",
//           500,
//           "Finding Your Place, Made Easy" // Type again
//         ]}
//         wrapper="h1" // Specify the wrapper (like h1)
//         className='main' // Add class for styling
//         cursor={true} // Show the typing cursor
//         repeat={Infinity} // Make the animation loop infinitely
//       />

//       <h4 className='mainsub'>
//         Let us help you discover secure, safe, comfortable, and verified accommodations near top universities and
//         <br /> bustling city hubs, stress-free and tailored for you!
//       </h4>

//       <div className='searchbar'>
//         <div className='fields'>
//           <select
//             name="university"
//             id="university"
//             value={searchInput.university}
//             onChange={handleChange}
//           >
//             <option value="" disabled hidden>University</option>
//             <option value="IIT">IIT</option>
//           </select>

//           <select 
//             name="location" 
//             id="location" 
//             value={searchInput.location} 
//             onChange={handleChange}
//           >
//             <option value="" disabled hidden>Location</option>
//             <option value="Colombo">Colombo</option>
//             <option value="Dehiwala">Dehiwala-Mount Lavinia</option>
//             <option value="Kotte">Kotte</option>
//             <option value="Moratuwa">Moratuwa</option>
//             <option value="Kesbewa">Kesbewa</option>
//             <option value="Nugegoda">Nugegoda</option>
//             <option value="Homagama">Homagama</option>
//             <option value="Kaduwela">Kaduwela</option>
//             <option value="Maharagama">Maharagama</option>
//           </select>

//           <select 
//             name="gender" 
//             id="gender"
//             value={searchInput.gender}
//             onChange={handleChange}
//           >
//             <option value=""disabled hidden>Gender</option>
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//             <option value="other">Prefer not to say</option>
//           </select>

//           <select 
//             name="priceRange"
//             id="priceRange"
//             value={searchInput.priceRange}
//             onChange={handleChange}
//             >
//               <option value="" disabled hidden>Price Range PCM</option>
//               <option value="5,000">5,000-10,000 LKR</option>
//               <option value="10,000">10,000-20,000 LKR</option>
//               <option value="20,000">20,000-30,000 LKR</option>
//               <option value="30,000">30,000-40,000 LKR</option>
//               <option value="40,000">40,000-50,000 LKR</option>
//           </select>

//           <select 
//             name="roomType" 
//             id="roomType"
//             value={searchInput.roomType}
//             onChange={handleChange}
//           >
//             <option value=""disabled hidden>Room Type</option>
//             <option value="male">Single Room</option>
//             <option value="female">Double Room</option>
//             <option value="other">Shared Room</option>
//           </select>

//           <button className='searchButton' onClick={handleSearch}> ⌕ </button>
//         </div>
//       </div> <br /><br />

//       <div className='mostviewed-props'>
//         <h2 className='mostviewed'>Most Viewed</h2>
//         <img src="https://img.freepik.com/premium-photo/home-with-blue-roof-black-roof-with-house-background_198067-832069.jpg?uid=R185375474&ga=GA1.1.1174272196.1736108309&semt=ais_hybrid_sidr" alt="" />
//       </div> <br /><br /><br />
       
     
        
//     </div> 
//   );
// }

// export default Home



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



// import { useNavigate } from 'react-router-dom';
// import { propertyData } from '../../data/propertyData';
// import './Home.css';
// import { useState } from 'react';

// const Home = () => {
//   const navigate = useNavigate();
//   const [filters, setFilters] = useState({
//     gender: '',
//     priceRange: '',
//     location: ''
//   });

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters(prev => ({ ...prev, [name]: value }));
//   };

//   const filteredProperties = propertyData.filter(property => {
//     return (
//       (filters.gender ? property.gender === filters.gender : true) &&
//       (filters.location ? property.location === filters.location : true)
//     );
//   });

//   return (
//     <div className="home-container">
//       <div className="hero-section">
//         <h1>Find Your Perfect Accommodation</h1>
//         <div className="filter-section">
//           <select 
//             name="gender" 
//             value={filters.gender} 
//             onChange={handleFilterChange}
//           >
//             <option value="">All Genders</option>
//             <option value="Boys">Boys Only</option>
//             <option value="Girls">Girls Only</option>
//           </select>

//           <select 
//             name="location" 
//             value={filters.location} 
//             onChange={handleFilterChange}
//           >
//             <option value="">All Locations</option>
//             <option value="Dehiwala">Dehiwala</option>
//             <option value="Colombo">Colombo</option>
//           </select>
//         </div>
//       </div>

//       <div className="properties-grid">
//         {filteredProperties.map(property => (
//           <div 
//             key={property.id} 
//             className="property-card"
//             onClick={() => navigate(`/property/${property.id}`)}
//           >
//             <img 
//               src={property.images[0]} 
//               alt={property.name} 
//               className="property-image" 
//             />
//             <div className="property-card-details">
//               <h3>{property.name}</h3>
//               <p>{property.location} • {property.gender}</p>
//               <div className="property-card-footer">
//                 <span className="price">
//                   LKR {property.price.toLocaleString()} / month
//                 </span>
//                 <span className="rating">
//                   ★ {property.rating}
//                 </span>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;
