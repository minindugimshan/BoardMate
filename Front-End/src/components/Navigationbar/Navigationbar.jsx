// import { useState } from 'react';
// import { useNavigate } from "react-router-dom";
// import { Container, Navbar, Nav } from 'react-bootstrap';
// import './Navigationbar.css';
// import { useLocation } from 'react-router-dom';

// function Navigationbar() {
//   const navigate = useNavigate();

//   return (
//     <Navbar className='Navbar' expand='lg'>
//       <Container>
//         <Navbar.Brand>
//           <img src="/logo.jpeg" alt="logo" className='logo' />
//         </Navbar.Brand>

//         <Navbar.Toggle aria-controls='collapse-navbar' />

//         <Navbar.Collapse className='wholeLinks' id='collapse-navbar'>
//           <nav className='links'>
//             <Nav.Link href="/">Home</Nav.Link>
//             <Nav.Link href="/Map">Map</Nav.Link>
//             <Nav.Link href="/Chat">Chat</Nav.Link>
//             <Nav.Link href='/Support'>Support</Nav.Link>
//           </nav>

//           {/* Profile Icon */}
//           <div className='profileContainer'>
//             <img
//               className='profile'
//               src="https://static.vecteezy.com/system/resources/thumbnails/006/017/592/small/ui-profile-icon-vector.jpg"
//               alt="profile"
//               onClick={() => navigate('/profile')} // Navigate to the profile page
//             />
//           </div>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

// export default Navigationbar;

import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Container, Navbar, Nav } from 'react-bootstrap';
import './Navigationbar.css';

function Navigationbar() {
  const navigate = useNavigate();

  return (
    <Navbar className='Navbar' expand='lg'>
      <Container>
        <Navbar.Brand>
          <img src="/logo.jpeg" alt="logo" className='logo' />
        </Navbar.Brand>

        {/* Navbar Toggle Button */}
        <Navbar.Toggle aria-controls='basic-navbar-nav' />

        {/* Navbar Collapse Content */}
        <Navbar.Collapse id='basic-navbar-nav' className='wholeLinks'>
          <Nav className='links'>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/Map">Map</Nav.Link>
            <Nav.Link href="/Chat">Chat</Nav.Link>
            <Nav.Link href='/Support'>Support</Nav.Link>
          </Nav>

          {/* Profile Icon */}
          <div className='profileContainer'>
            <img
              className='profile'
              src="https://static.vecteezy.com/system/resources/thumbnails/006/017/592/small/ui-profile-icon-vector.jpg"
              alt="profile"
              onClick={() => navigate('/profile')}
            />
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigationbar;