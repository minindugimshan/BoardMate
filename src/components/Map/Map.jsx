import React, { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import { propertyData } from '../../data/propertyData';
import './Map.css'

// Marker icon
const markerIcon = new L.icon({
    iconUrl: "/marker.png",
    iconSize: [30,30],
    iconAnchor: [12,41],
    popupAnchor: [1,-34],
});

// const extractLatLng = (mapUrl) => {
//     if (!mapUrl || typeof mapUrl !== "string") {
//         console.error("Invalid map URL:", mapUrl);
//         return null;
//     }

//     // Corrected regex to extract both latitude (3d) and longitude (2d)
//     const regex = /!2d([-+]?\d*\.\d+)!3d([-+]?\d*\.\d+)/;
//     const match = mapUrl.match(regex);

//     if (match) {
//         const extracted = { lat: parseFloat(match[2]), lng: parseFloat(match[1]) };
//         console.log("Extracted coordinates:", extracted); // Debugging line
//         return extracted;
//         // return { lat: parseFloat(match[2]), lng: parseFloat(match[1]) }; // Order: lat, lng
//     }

//     console.error("Coordinates not found in URL:", mapUrl);
//     return null;
// };



// const extractLatLng = (mapUrl) => {
//     if (!mapUrl || typeof mapUrl !== "string") {
//         console.error("Invalid map URL:", mapUrl);
//         return null;
//     }

//     // First try the standard pattern
//     let regex = /!2d([-+]?\d*\.\d+)!3d([-+]?\d*\.\d+)/;
//     let match = mapUrl.match(regex);

//     // If the first pattern doesn't match, try another structure
//     if (!match) {
//         regex = /!3d([-+]?\d*\.\d+)!2d([-+]?\d*\.\d+)/;
//         match = mapUrl.match(regex);
//     }

//     if (match) {
//         console.log("Extracted coordinates:", { lat: parseFloat(match[2]), lng: parseFloat(match[1]) });
//         return { lat: parseFloat(match[2]), lng: parseFloat(match[1]) }; 
//     }

//     console.error("Coordinates not found in URL:", mapUrl);
//     return null;
// };

const extractLatLng = (mapUrl) => {
    if (!mapUrl || typeof mapUrl !== "string") {
        console.error("Invalid map URL:", mapUrl);
        return null;
    }

    // Match standard coordinates (!2d and !3d)
    let regex = /!2d([-+]?\d*\.\d+)!3d([-+]?\d*\.\d+)/;
    let match = mapUrl.match(regex);

    // If no match, check for encoded format (!2z)
    if (!match) {
        regex = /!2z([^!]+)/;
        match = mapUrl.match(regex);

        if (match) {
            const decoded = match[1].replace(/N|E/g, "").split(" ");
            if (decoded.length === 2) {
                return { lat: parseFloat(decoded[0]), lng: parseFloat(decoded[1]) };
            }
        }
    }

    if (match) {
        return { lat: parseFloat(match[2]), lng: parseFloat(match[1]) }; // lat, lng
    }

    console.error("Coordinates not found in URL:", mapUrl);
    return null;
};



function Map() {

    const [filteredProperties , setFilteredProperties] = useState(propertyData);

    const [formInput, setFormInput] = useState({
        location : '',
        roomType : '',
        monthlyBudget : 9000,
        bedrooms : '',
        bathrooms : '',
        amenities : [],
    });


    const locations = [
        {value : 'Colombo' , label: 'Colombo'},
        {value : 'Dehiwala' , label: 'Dehiwala'},
        {value : 'Nugegoda' , label: 'Nugegoda'},
        {value : 'Boralesgamuwa' , label: 'Boralesgamuwa'},
        {value : 'Mount Lavinia' , label: 'Mount Lavinia'},
        {value : 'Kirulapana' , label : 'Kirulapana'},
        {value : 'Colombo 06' , label : 'Colombo 06'},
        {value : 'Colombo 05' , label : 'Colombo 05'},
        {value : 'Colombo 04' , label : 'Colombo 04'},
        {value : 'Wellawatte' , label : 'Wellawatte'},
        // {value : 'Mt. Lavinia' , label : 'Mt. Lavinia'},
        {value : 'Bambalapitiya' , label : 'Bambalapitiya'},
        {value : 'Kollupitiya' , label : 'Kollupitiya'},
        {value : 'Rathmalana' , label : 'Rathmalana'},
        {value : 'Pepiliyana' , label : 'Pepiliyana'},
        {value : 'Zoyzapura' , label : 'Zoyzapura'},
        {value : 'Katubedda' , label : 'Katubedda'},
        {value : 'Kalubowila' , label : 'Kalubowila'},
        {value : 'Wijerama' , label : 'Wijerama'},

    ];


    const roomTypes = [
        {value: 'single' , label:'Single Room'},
        {value : 'double' , label: 'Double Room'},
        {value: 'share' , label: 'Shared Room'}
    ];

    const handleChange = (field, value) => {
        setFormInput ( (prev) => {
            const updated = {
                ...prev,
            [field] : value,
            }
            return updated
        }
        )
    }

    const handleRoomTypeClick = (field, value) => {
        setFormInput( (prev) => {
            const updated = {
                ...prev,
                [field] : value,
            }
            return updated
            
        })

    };

    const handleAmenitiesChange = (e, amenitiesList) =>{
        const isChecked = e.target.checked;
        setFormInput( (prev) => {
            const updatedAmenities = isChecked ? [...prev.amenities, amenitiesList] : prev.amenities.filter(item => item !== amenitiesList);

            return{
                ...prev,
                amenities: updatedAmenities,
            }
        })
    };

    const handleFilter = (event) =>{
        event.preventDefault();

        const results = propertyData.filter((property) => {
            return(
                (!formInput.location ||
                property.location.toLowerCase().includes(formInput.location.toLowerCase())) &&
                (property.price <= Number(formInput.monthlyBudget))
            );
        }
    );
    setFilteredProperties(results)
    }
    // const handleFilter = (event) =>{
    //     event.preventDefault();

        

    //     const results = propertyData.filter((property) => {
    //         return(
    //             (formInput.location ? property.location.toLowerCase() === formInput.location.toLowerCase() : true) &&
    //             (property.price <= Number(formInput.monthlyBudget))
    //         );
    //     }
    // );
    // setFilteredProperties(results)
    // }

  return (
    <div className='mapBackground'>
        <div className='container-form-map'>
            <form action="" className='mapForm' onSubmit={handleFilter}>
                <label htmlFor="location" className='locLabel'>Location</label> <br />
                <select 
                    name="location" 
                    value={formInput.location}
                    onChange = { (event) => {
                        handleChange("location", event.target.value);
                    }}
                >         
                    <option value="" disabled hidden>Select Location</option>

                    {locations.map((loc) => (
                        <option key={loc.value} value={loc.value}>
                            {loc.label}
                        </option>
                    ))}
                    

                </select> <br /><br />

                <label htmlFor="roomType" className='locLabel'>Room Type </label> <br />
                <div>
                    {roomTypes.map( (room) => {
                        return(
                            <button
                            className='roomButton'
                            key={room.value}
                            type='button'
                            onClick={ () => handleRoomTypeClick('roomType',room.value) }
                            style={{
                                backgroundColor: formInput.roomType === room.value ? 'white' : '',
                                color: formInput.roomType === room.value ? 'black' : '',
                                margin: '5px',
                              }}
                            >
                                {room.label}

                        </button>
                        )   
                    })}
                    
                </div> <br />

                <label htmlFor="monthlyBudget" className='locLabel'>Monthly Budget</label> <br />
                <div className='monthly-budget-filter'>
                    <input 
                        type="range" 
                        className='budget'
                        min='9000'
                        max='50000'
                        step='1000'
                        value={formInput.monthlyBudget}
                        onChange={ (e) => handleChange("monthlyBudget", e.target.value) }
                    />
                    <span>{formInput.monthlyBudget} LKR</span>
                </div> <br />

                <label htmlFor="roomProperties" className='locLabel' >Room Properties</label> <br />
                <label htmlFor="bedrooms" className='locLabel1' >No of bedrooms</label> <br />
                <div>
                    {[1,2,3,4].map((bedroomCount) => {
                        console.log("Bedroom count: ", bedroomCount)
                        return(
                            <button
                                key={bedroomCount}
                                className='bed-bath-button'
                                type='button'
                                onClick={() => {
                                    console.log("Bedroom clicked:" , bedroomCount);
                                    handleRoomTypeClick('bedrooms', bedroomCount)}
                                }
                                style={{
                                    backgroundColor: formInput.bedrooms === bedroomCount ? ' white' : '',
                                    color: formInput.bedrooms === bedroomCount ? 'black' : '',
                                    margin: '5px',
                                }}
                                >
                                    {bedroomCount}

                            </button>
                        )
                    }

                    )}
                </div> <br />

                <label htmlFor="bathrooms" className='locLabel1' >No of bathrooms</label> <br />
                <div>
                    {[1,2,3,4].map((bathroomCount) => {
                        
                        return(
                            <button
                                key={bathroomCount}
                                className='bed-bath-button'
                                type='button'
                                onClick={() => {
                                    handleRoomTypeClick('bathrooms', bathroomCount)}
                                }
                                style={{
                                    backgroundColor: formInput.bathrooms === bathroomCount ? 'white' : '',
                                    color: formInput.bathrooms === bathroomCount ? 'black' : '',
                                    margin: '5px',

                                }}
                                >
                                    {bathroomCount}

                            </button>
                        )
                    }

                    )}
                </div> <br />

                <label htmlFor="amenities" className='locLabel'>Amenities</label> <br />
                <div className='amenitiesContainer'>
                    {["Furniture", "Wi-Fi", "Kitchen", "Parking Space","Fridge","Study Desk"].map((amenitiesList) => {
                        return(
                            <div className='amenities-item'>

                                <label htmlFor={amenitiesList}className='amenititesLabel'>{amenitiesList}</label>   

                                <input 
                                type="checkbox"
                                id={amenitiesList}
                                name='amenities'
                                value={formInput.amenities}
                                checked={formInput.amenities.includes(amenitiesList)}
                                onChange={(e) => handleAmenitiesChange(e, amenitiesList)}
                                
                            />
                            </div>
                            
                        )
    
                    }

                    )}
                </div> <br /><br />

                <button className='filters-button' type="submit">Apply Filters</button>

            </form>

            <MapContainer center={[6.9271, 79.8612]} zoom={12} style={{ height: "500px", width: "100%" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                {/* Render properties dynamically */}
                {filteredProperties.map((property) => {
                const coordinates = extractLatLng(property.map);
                if (!coordinates) return null;
                return (
                    <Marker key={property.id} position={[coordinates.lat, coordinates.lng]} icon={markerIcon}>
                        
                            <Popup>
                                <b>{property.name}</b> <br /> <br />
                                Type : {property.type} <br />
                                Location : {property.location} <br />
                                Price: {property.price} LKR <br />
                            </Popup>
                        
                
                    </Marker>
                    ) ;
                })}
            </MapContainer> 
        </div> 

        <h4 className='marker-heading'>
                <img src="/marker.png" alt="marker" className='marker' />
                 - IIT Verified Accommodation
        </h4>
        <br /><br /><br />

        <div className='location-slider'>
            <h1>We've got you covered in various locations!</h1> <br /><br />
            <div className='slide-wrapper'>
            <div className='locations'>
                
                <h2>
                    <span className='fa'>&#xf3c5;</span>
                    Colombo
                </h2>
                <h2>
                    <span className='fa'>&#xf3c5;</span>
                    Dehiwala
                </h2>
                <h2>
                    <span className='fa'>&#xf3c5;</span>
                    Nugegoda
                </h2>
                <h2>
                    <span className='fa'>&#xf3c5;</span>
                    Boralesgamuwa
                </h2>
                <h2>
                    <span className='fa'>&#xf3c5;</span>
                    Mount Lavinia
                </h2>
                <h2>
                    <span className='fa'>&#xf3c5;</span>
                    Katubedda
                </h2>
                <h2>
                    <span className='fa'>&#xf3c5;</span>
                    Kirulapana
                </h2>
                <h2>
                    <span className='fa'>&#xf3c5;</span>
                    Wellawatte
                </h2>
                <h2>
                    <span className='fa'>&#xf3c5;</span>
                    Bambalapitiya
                </h2>
                <h2>
                    <span className='fa'>&#xf3c5;</span>
                    Kollupitiya
                </h2>
                <h2>
                    <span className='fa'>&#xf3c5;</span>
                    Rathmalana
                </h2>
                <h2>
                    <span className='fa'>&#xf3c5;</span>
                    Pepiliyana
                </h2>
                <h2>
                    <span className='fa'>&#xf3c5;</span>
                    Zoyzapura
                </h2>
                <h2>
                    <span className='fa'>&#xf3c5;</span>
                    Kalubowila
                </h2>
                <h2>
                    <span className='fa'>&#xf3c5;</span>
                    Wijerama
                </h2>
                
            </div>

            <div className='locations'>
                
            <h2>
                    <span className='fa'>&#xf3c5;</span>
                    Colombo
                </h2>
                <h2>
                    <span className='fa'>&#xf3c5;</span>
                    Dehiwala
                </h2>
                <h2>
                    <span className='fa'>&#xf3c5;</span>
                    Nugegoda
                </h2>
                <h2>
                    <span className='fa'>&#xf3c5;</span>
                    Boralesgamuwa
                </h2>
                <h2>
                    <span className='fa'>&#xf3c5;</span>
                    Mount Lavinia
                </h2>
                <h2>
                    <span className='fa'>&#xf3c5;</span>
                    Katubedda
                </h2>
                <h2>
                    <span className='fa'>&#xf3c5;</span>
                    Kirulapana
                </h2>
                <h2>
                    <span className='fa'>&#xf3c5;</span>
                    Wellawatte
                </h2>
                <h2>
                    <span className='fa'>&#xf3c5;</span>
                    Bambalapitiya
                </h2>
                <h2>
                    <span className='fa'>&#xf3c5;</span>
                    Kollupitiya
                </h2>
                <h2>
                    <span className='fa'>&#xf3c5;</span>
                    Rathmalana
                </h2>
                <h2>
                    <span className='fa'>&#xf3c5;</span>
                    Pepiliyana
                </h2>
                <h2>
                    <span className='fa'>&#xf3c5;</span>
                    Zoyzapura
                </h2>
                <h2>
                    <span className='fa'>&#xf3c5;</span>
                    Kalubowila
                </h2>
                <h2>
                    <span className='fa'>&#xf3c5;</span>
                    Wijerama
                </h2>
                
            </div>

            </div>
            
        </div> <br /><br /><br /><br />

    </div>
  )
}

export default Map

