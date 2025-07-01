import { Eye, Plus, Star, TrendingUp, Users } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import apiService from '../../services/api-service';
import useAuthStore from '../../store/auth-store';
import './LandlordDashboard.css';
import NewProperty from './NewProperty/NewProperty';
import { toast } from 'react-toastify';
import { getImage } from '../../utils/image-resolver';

const LandlordDashboard = () => {
  const authStore = useAuthStore();
  const user = authStore.user;
  const [showNewPropertyForm, setShowNewPropertyForm] = useState(false);
  const [properties, setProperties] = useState([]); // State to store properties from the backend
  const [loading, setLoading] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showStudentDetails, setShowStudentDetails] = useState(false);
  const [studentDetails, setStudentDetails] = useState(null);
  const [loadingStudentDetails, setLoadingStudentDetails] = useState(false);

  // Fetch properties from the backend when the component loads
  useEffect(() => {
    if (user?.id) {
      fetchProperties();
    }
  }, [user?.id]);

  // Function to fetch properties from the backend
  const fetchProperties = async () => {
    try {
      setLoading(true);
      // Fetch only properties belonging to the current landlord
      const response = await apiService.get(`/properties/getPropertyList?landlordId=${user.id}`);
      if (response.status !== 200) {
        throw new Error('Failed to fetch properties');
      }
      const data = response.data;
      setProperties(data); // Update the state with fetched properties
    } catch (error) {
      console.error('Error fetching properties:', error);
      toast.error('Failed to load your properties');
    } finally {
      setLoading(false);
    }
  };

  // Function to upload images and return their filenames
  const uploadImages = async (images) => {
    console.log('Upload images function called with:', images);
    
    if (!images || images.length === 0) {
      toast.warn('No images to upload');
      return [];
    }
    
    try {
      const formData = new FormData();
      
      const imageArray = images instanceof FileList ? Array.from(images) : 
                         Array.isArray(images) ? images : [images];
    
      imageArray.forEach((image, index) => {
        if (image instanceof File) {
          console.log(`Processing image ${index}:`, image.name, 'Size:', image.size);
          formData.append('files', image);
        } else {
          toast.error("Invalid image type. Please upload valid images.");
          console.error('Invalid image type:', image);
        }
      });

      // Using the new postMultipart method instead of custom post config
      const response = await apiService.postMultipart('http://localhost:8080/api/properties/upload-images', formData);
      
      if (response.status !== 200) {
        throw new Error('Failed to upload images');
      }
      
      toast.success('Images uploaded successfully');
      return response.data.imageReferences; // Return array of uploaded image filenames
    } catch (error) {
      console.error('Error uploading images:', error);
      throw error;
    }
  };

  // Function to add a new property to the backend
  const handleAddProperty = async (newProperty) => {
    if (!newProperty) {
      return; // Early return if there's no property
    }
    
    try {
      let uploadedImageNames = [];
      if (newProperty.images && newProperty.images.length > 0) {
        console.log('Images found in new property:', newProperty.images);
        uploadedImageNames = await uploadImages(newProperty.images);
      }

      const propertyToCreate = { ...newProperty };
      delete propertyToCreate.images; // Remove images from property object
      
      const response = await apiService.post('/properties', propertyToCreate);
      if (response.status !== 200) {
        throw new Error('Failed to add property');
      }
      
      const createdProperty = response.data;
      
      if (uploadedImageNames.length > 0) {
        const imageResponse = await apiService.post(
          `http://localhost:8080/api/properties/${createdProperty.id}/add-images`, 
          { imageReferences: uploadedImageNames }
        );
        
        if (imageResponse.status !== 200) {
          console.warn('Property created but failed to link images');
        } else {
          // Update property with images
          createdProperty.image = `http://localhost:8080/api/properties/images/${uploadedImageNames[0]}`; 
          // Use first image as main display image
        }
      }
      
      await fetchProperties()
      setShowNewPropertyForm(false); // Close the form
    } catch (error) {
      console.error('Error adding property:', error);
    }
  };

  // Function to fetch student details for a booked property
  const handlePropertyClick = async (property) => {
    if (!property.studentId) {
      toast.info('This property is not booked by any student yet.');
      return;
    }
    
    try {
      setLoadingStudentDetails(true);
      setSelectedProperty(property);
      
      const response = await apiService.get(`/properties/${property.id}/student-details`);
      if (response.status === 200) {
        setStudentDetails(response.data);
        setShowStudentDetails(true);
      }
    } catch (error) {
      console.error('Error fetching student details:', error);
      toast.error('Failed to load student details');
    } finally {
      setLoadingStudentDetails(false);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1>Welcome Back!</h1>
          <p>Manage your properties and track their performance all in one place</p>
        </div>
        <button
          className="add-property-btn"
          onClick={() => setShowNewPropertyForm(true)}
        >
          <Plus size={20} />
          Add New Property
        </button>
      </div>

      <div className="stats-grid">
        {/* Stats can be added here later */}
      </div>

      <div className="dashboard-content">
        <div className="w-full">
          <div className="section-header">
            <h2>Your Properties ({properties.length})</h2>
            <TrendingUp />
          </div>
          <div className="properties-grid">
            {loading ? (
              <div className="loading-message">
                <p>Loading your properties...</p>
              </div>
            ) : properties.length === 0 ? (
              <div className="empty-state">
                <p>You haven't added any properties yet.</p>
                <button 
                  className="add-first-property-btn"
                  onClick={() => setShowNewPropertyForm(true)}
                >
                  <Plus size={20} />
                  Add Your First Property
                </button>
              </div>
            ) : (
              properties.map(property => (
                <div 
                  key={property.id} 
                  className="property-card"
                  onClick={() => handlePropertyClick(property)}
                  style={{ cursor: 'pointer' }}
                >
                  <img src={getImage(property)} alt={property.title} style={{margin: 0}}/>
                  <div className="property-info">
                    <h3>{property.title}</h3>
                    <p className="location">{property.location}</p>
                    <p className="price">{property.price} LKR</p>
                    <div className="property-stats">
                      <span><Eye size={16} /> {property.views || 0}</span>
                      <span><Users size={16} /> {property.inquiries || 0}</span>
                      <span><Star size={16} /> {property.rating || 0}</span>
                    </div>
                    <div className="status-badge">
                      {property.studentId ? 'Booked' : 'Available'}
                    </div>
                    {property.studentId && (
                      <div style={{ color: '#4CAF50', fontSize: '0.9rem', marginTop: '5px' }}>
                        👤 Click to view student details
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="insights-section">
          <div className="section-header">
            <h2>Performance Insights</h2>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={properties}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="title" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="views" fill="#8884d8" name="Views" />
                <Bar dataKey="inquiries" fill="#82ca9d" name="Inquiries" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {showNewPropertyForm && (
        <NewProperty
          onClose={() => setShowNewPropertyForm(false)}
          onSubmit={handleAddProperty}
        />
      )}

      {/* Student Details Modal */}
      {showStudentDetails && studentDetails && (
        <div className="modal-overlay" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div className="modal-content" style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            maxWidth: '500px',
            width: '90%',
            maxHeight: '80vh',
            overflow: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2>Student Details</h2>
              <button 
                onClick={() => setShowStudentDetails(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#666'
                }}
              >
                ×
              </button>
            </div>
            
            {loadingStudentDetails ? (
              <p>Loading student details...</p>
            ) : (
              <div>
                <div style={{ marginBottom: '15px' }}>
                  <strong>Property:</strong> {selectedProperty?.title}
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <strong>Name:</strong> {studentDetails.firstName} {studentDetails.lastName}
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <strong>Email:</strong> {studentDetails.email}
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <strong>Mobile:</strong> {studentDetails.mobile}
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <strong>University:</strong> {studentDetails.university}
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <strong>Student ID:</strong> {studentDetails.studentId}
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <strong>Date of Birth:</strong> {studentDetails.dateOfBirthDay}/{studentDetails.dateOfBirthMonth}/{studentDetails.dateOfBirthYear}
                </div>
                {studentDetails.profileImage && (
                  <div style={{ marginBottom: '15px' }}>
                    <strong>Profile Image:</strong>
                    <img 
                      src={studentDetails.profileImage} 
                      alt="Student Profile" 
                      style={{ 
                        width: '100px', 
                        height: '100px', 
                        borderRadius: '50%', 
                        objectFit: 'cover',
                        marginLeft: '10px'
                      }}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LandlordDashboard;