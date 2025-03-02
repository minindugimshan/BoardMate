import { Link } from 'react-router-dom';
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
          <Link to="/" className="nav-link">Home</Link>
          
<Link to="/student-profile" className="nav-link">Student Profile</Link>
<Link to="/landlord-profile" className="nav-link">Landlord Profile</Link>
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