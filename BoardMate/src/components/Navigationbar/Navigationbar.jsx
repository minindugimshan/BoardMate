import React from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import './Navigationbar.css'
import { useLocation } from 'react-router-dom'

function Navigationbar() {
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

          <div className='profileContainer'>
            <img className='profile' src="https://static.vecteezy.com/system/resources/thumbnails/006/017/592/small/ui-profile-icon-vector.jpg" alt="profile" />
          </div>
          
        </Navbar.Collapse>


      </Container>

    </Navbar>
  )
}

export default Navigationbar