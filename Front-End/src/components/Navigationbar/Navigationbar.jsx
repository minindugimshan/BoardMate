import { useState } from 'react';
import { useNavigate } from "react-router-dom"; 

import { Container, Navbar, Nav } from 'react-bootstrap'
import StudentProfile from '../Profile/StudentProfile'; 
import './Navigationbar.css'
import { useLocation } from 'react-router-dom'

function Navigationbar() {
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();
  return (
    <Navbar className='Navbar' expand='lg' >
      <Container>
        <Navbar.Brand>
          <img src="/logo.jpeg" alt="logo" className='logo' />
        </Navbar.Brand> 

        <Navbar.Toggle aria-controls='collapse-navbar' />

        <Navbar.Collapse className='wholeLinks' id='collapse-navbar' >
          <nav className='links' >
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/Map">Map</Nav.Link>
            <Nav.Link href="/Chat">Chat</Nav.Link>
            <Nav.Link href='/Support'>Support</Nav.Link>
          </nav>

             {/* Profile Container */}
          <div className='profileContainer'>
            <img 
              className='profile' 
              src="https://static.vecteezy.com/system/resources/thumbnails/006/017/592/small/ui-profile-icon-vector.jpg" 
              alt="profile" 
              onClick={() => setShowProfile(!showProfile)} // Toggle profile
            />
            {showProfile && <StudentProfile />} {/* Ensure valid JSX expression */}
          </div>

      
          
        </Navbar.Collapse>


      </Container>

    </Navbar>
  )
}

export default Navigationbar