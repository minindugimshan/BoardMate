import { Eye, Plus, Star, TrendingUp, Users } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import apiService from '../../services/api-service';
import './LandlordDashboard.css';
import NewProperty from './NewProperty/NewProperty';

const LandlordDashboard = () => {
  const [showNewPropertyForm, setShowNewPropertyForm] = useState(false);
  const [properties, setProperties] = useState([]); // State to store properties from the backend

  // Fetch properties from the backend when the component loads
  useEffect(() => {
    fetchProperties();
  }, []);

  // Function to fetch properties from the backend
  const fetchProperties = async () => {
    try {
      const response = await apiService.get('http://localhost:8080/api/properties');
      if (response.status !== 200) {
        throw new Error('Failed to fetch properties');
      }
      const data = await response.data;
      setProperties(data); // Update the state with fetched properties
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  // Function to add a new property to the backend
  const handleAddProperty = async (newProperty) => {
    try {
      const response = await apiService.post('/properties', newProperty);
      if (response.status !== 200) {
        throw new Error('Failed to add property');
      }
      const data = await response.data
      setProperties([...properties, data]); // Add the new property to the state
      setShowNewPropertyForm(false); // Close the form
    } catch (error) {
      console.error('Error adding property:', error);
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
                 {/* {stats.map((stat, index) => (
           <div key={index} className="stat-card">
            <div className="stat-icon">{stat.icon}</div>
             <div className="stat-info">
              <h3>{stat.value}</h3>
               <p>{stat.title}</p>
             </div>
          </div>
       ))} */}
        
      </div>

      <div className="dashboard-content">
        <div className="properties-section">
          <div className="section-header">
            <h2>Your Properties</h2>
            <TrendingUp />
          </div>
          <div className="properties-grid">
            {properties.map(property => (
              <div key={property.id} className="property-card">
                <img src={property.image} alt={property.title} />
                <div className="property-info">
                  <h3>{property.title}</h3>
                  <p className="location">{property.location}</p>
                  <p className="price">{property.price} PCM</p>
                  <div className="property-stats">
                    <span><Eye size={16} /> {property.views}</span>
                    <span><Users size={16} /> {property.inquiries}</span>
                    <span><Star size={16} /> {property.rating}</span>
                  </div>
                  <div className="status-badge">{property.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="insights-section">
          <div className="section-header">
            <h2>Performance Insights</h2>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={[]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
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
    </div>
  );
};

export default LandlordDashboard;