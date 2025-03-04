import React, { useState } from 'react'
import './Map.css'

function Map() {

    const [formInput, setFormInput] = useState({
        location : '',
        roomType : '',
        monthlyBudget : 5000,
        bedrooms : '',
        bathrooms : '',
        amenities : [],
    });

    const locations = [
        {value : 'Colombo' , label: 'Colombo'},
        {value : 'Dehiwala-Mount Lavinia' , label: 'Dehiwala-Mount Lavinia'},
        {value : 'Kotte' , label: 'Kotte'},
        {value : 'Moratuwa' , label: 'Moratuwa'},
        {value : 'Kesbewa' , label: 'Kesbewa'},
        {value : 'Nugegoda' , label: 'Nugegoda'},
        {value : 'Homagama' , label: 'Homagama'},
        {value : 'Kaduwela' , label: 'Kaduwela'},
        {value : 'Maharagama' , label: 'Maharagama'},

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

  return (
    <div className='mapBackground'>
        <div className='container-form-map'>
            <form action="" className='mapForm'>
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
                        min='5000'
                        max='50000'
                        step='2000'
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

                <button className='filters-button'>Apply Filters</button>

            </form>

            <div class="mapouter">
                <div class="gmap_canvas">
                    <iframe 
                        className="gmap_iframe" 
                        frameborder="0" 
                        scrolling="no" 
                        marginheight="0" marginwidth="0" 
                        src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=colombo district&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
                    </iframe>
                </div>
            </div>

        </div> 

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
                    Kotte
                </h2>
                <h2>
                    <span className='fa'>&#xf3c5;</span>
                    Nugegoda
                </h2>
                <h2>
                    <span className='fa'>&#xf3c5;</span>
                    Moratuwa
                </h2>
                <h2>
                    <span className='fa'>&#xf3c5;</span>
                    Kesbewa
                </h2>
                <h2>
                    <span className='fa'>&#xf3c5;</span>
                    Homagama
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
                    Kotte
                </h2>
                <h2>
                    <span className='fa'>&#xf3c5;</span>
                    Nugegoda
                </h2>
                <h2>
                    <span className='fa'>&#xf3c5;</span>
                    Moratuwa
                </h2>
                <h2>
                    <span className='fa'>&#xf3c5;</span>
                    Kesbewa
                </h2>
                <h2>
                    <span className='fa'>&#xf3c5;</span>
                    Homagama
                </h2>
                
            </div>

            </div>
            
        </div> <br /><br /><br /><br />

    </div>
  )
}

export default Map

