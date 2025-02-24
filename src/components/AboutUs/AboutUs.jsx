import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-container">
      <div className="split-layout">
        {/* Left Section */}
        <div className="left-section">
          <div className="content-left">
            <h1 className="main-title">About<br />BoardMate</h1>
            
            <div className="info-box">
              <div className="info-section">
                <h2>Our Mission</h2>
                <p>
                  BoardMate was created to address the challenges that university students face in finding 
                  suitable accommodation. We understand that finding safe, comfortable, and affordable 
                  housing can be stressful, especially for students from distant areas. Our platform 
                  simplifies this process by providing a comprehensive solution that connects students 
                  with verified accommodation providers.
                </p>
              </div>

              <div className="info-section">
                <h2>Our Team</h2>
                <p>
                  BoardMate is developed by a dedicated team of students from the Informatics Institute 
                  of Technology, affiliated with the University of Westminster. Our diverse team brings 
                  together expertise in software development, user experience design, and student 
                  accommodation needs. We are committed to continuously improving our platform to better 
                  serve the student community.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="right-section">
          <div className="content-right">
            <h2 className="contact-title">Easy to contact us</h2>
            <div className="contact-container">
              <div className="contact-info">
                <div className="contact-item">
                  <Mail className="contact-icon" />
                  <div className="contact-details">
                    <h3>Email</h3>
                    <p>support@boardmate.com</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <Phone className="contact-icon" />
                  <div className="contact-details">
                    <h3>Phone</h3>
                    <p>+94 11 234 5678</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <MapPin className="contact-icon" />
                  <div className="contact-details">
                    <h3>Address</h3>
                    <p>57, Ramakrishna Road<br />Colombo 06<br />Sri Lanka</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <Clock className="contact-icon" />
                  <div className="contact-details">
                    <h3>Business Hours</h3>
                    <p>Monday - Friday: 9:00 AM - 6:00 PM<br />Saturday: 9:00 AM - 1:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;