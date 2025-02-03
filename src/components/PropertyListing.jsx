import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsChevronLeft, BsChevronRight, BsHouseDoor, BsMap, BsChat, BsPerson } from 'react-icons/bs';
// import './PropertyListing.css';


const PropertyListing = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Placeholder images array - replace with actual images later
  const images = [
    'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/1500459/pexels-photo-1500459.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="position-relative vh-100">
      {/* Navigation */}
      <nav className="position-absolute top-0 w-100 p-3 z-3">
        <div className="d-flex justify-content-between align-items-center">
          <Link to="/" className="text-white">
            <BsHouseDoor size={24} />
          </Link>
          <div className="d-flex gap-3">
            <Link to="/map" className="text-white">
              <BsMap size={24} />
            </Link>
            <Link to="/chat" className="text-white">
              <BsChat size={24} />
            </Link>
            <Link to="/profile" className="text-white">
              <BsPerson size={24} />
            </Link>
          </div>
        </div>
      </nav>

      {/* Image Carousel */}
      <div className="position-relative w-100 h-100">
        <img
          src={images[currentImageIndex]}
          alt="Property"
          className="w-100 h-100 object-fit-cover"
        />
        
        {/* Image Navigation Buttons */}
        <button
          className="position-absolute top-50 start-0 translate-middle-y btn btn-light ms-2 rounded-circle"
          onClick={prevImage}
        >
          <BsChevronLeft />
        </button>
        <button
          className="position-absolute top-50 end-0 translate-middle-y btn btn-light me-2 rounded-circle"
          onClick={nextImage}
        >
          <BsChevronRight />
        </button>

        {/* Property Info Overlay */}
        <div className="position-absolute bottom-0 start-0 w-100 bg-dark bg-opacity-75 text-white p-4">
          <h1 className="fs-2 mb-2">Dehiwala</h1>
          <p className="mb-2">Single room</p>
          <h2 className="fs-4 mb-3">LKR 10,000 / month</h2>
          
          <div className="d-flex gap-4 mb-3">
            <div className="text-center">
              <i className="bi bi-bed"></i>
              <p className="small mb-0">1 bedroom</p>
            </div>
            <div className="text-center">
              <i className="bi bi-water"></i>
              <p className="small mb-0">1 bathroom</p>
            </div>
            <div className="text-center">
              <i className="bi bi-kitchen"></i>
              <p className="small mb-0">Kitchen</p>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <button className="btn btn-outline-light">
              Book a virtual tour
            </button>
            <div className="d-flex align-items-center gap-2">
              <span className="star">★</span>
              <span>4.8</span>
            </div>
          </div>

          {/* Profile Pictures */}
          <div className="d-flex mt-3">
            <div className="rounded-circle overflow-hidden" style={{width: '40px', height: '40px', marginRight: '-10px'}}>
              <img src="/profile1.jpg" alt="Profile 1" className="w-100 h-100 object-fit-cover" />
            </div>
            <div className="rounded-circle overflow-hidden" style={{width: '40px', height: '40px'}}>
              <img src="/profile2.jpg" alt="Profile 2" className="w-100 h-100 object-fit-cover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyListing;