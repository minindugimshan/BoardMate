import React from 'react'
import './About.css'

function About() {
  return (
    <div className='about-background'>
        <h1>About Us</h1>
        <div className='about-content'>
        
            <div className='about-text'>
                
                <p>
                    Finding a home away from home has never been easier! <br /> <br />
                    <strong>BoardMate</strong> connects students with the perfect stay - safe, 
                    affordable, and hassle-free!" <br />
                </p>
            </div>

            {/* <img className='about-img' src="https://img.freepik.com/free-photo/young-friends-hostel_52683-121734.jpg?t=st=1738409876~exp=1738413476~hmac=227e53e5922b0f60f42a626954f62ef22da51b0ded01c781b5ee261cea67c344&w=900" alt="" /> */}
            <img className='about-img' src="https://www.goshen.edu/wp-content/uploads/sites/7/2018/06/GC.Fall_.2017.860-web.jpg" alt="" />
        </div>

        <h1>Our Mission</h1>
        <p className='mission-p'>
            <strong>BoardMate</strong> is a long-term accommodation booking platform for students. 
            We help university students in Sri Lanka, <br /> find and book full-time accommodations near their universities, <br />
            without the hassle of negotiation, non-standardized and cumbersome paperwork, 
            and broken payment process.
        </p> <br /><br />

        <div className='about-boxes'>
            <div className='about-search'>
                <img className='search-icon' src="https://img.icons8.com/ios_filled/512/FFFFFF/search.png" alt="" /> <br /><br />
                <h2>Easy Search</h2> <br />
                <p>
                    Search from a wide-selection of accommodations <br /> 
                    that fit your preferences.
                </p>

            </div>

            <div className='negotiation'>
                <img className='search-icon' src="https://www.freeiconspng.com/thumbs/handshake-icon/handshake-icon-23.png" alt="" />
                <br /><br /> <h2>No Negotiation</h2> <br />
                <p>
                    See rent upfront. No need to negotiate. <br /> 
                    Save your time and effort.
                </p>

            </div>

            <div className='paper'>
                <img className='paper-icon' src="https://static.vecteezy.com/system/resources/previews/009/663/149/non_2x/thunder-icon-transparent-free-png.png" alt="" />
                <br /><br />  <h2>Hassle - Free Paperwork</h2> <br />
                <p>
                    Forget irritating paperwork. Complete your <br /> 
                    booking seamlessly.
                </p>

            </div>

        </div>
        
        <br /><br /><br /> br
    </div>
  )
}

export default About