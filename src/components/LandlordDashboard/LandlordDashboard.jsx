import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Building2, Users, Eye, Star, TrendingUp, Plus } from 'lucide-react';
import './LandlordDashboard.css';

const LandlordDashboard = () => {
  // Sample data - replace with actual data from your backend
  const [properties] = useState([
    {
      id: 1,
      image: "/api/placeholder/300/200",
      title: "Modern Studio Near IIT",
      location: "Colombo",
      price: "25,000 LKR",
      views: 156,
      inquiries: 12,
      rating: 4.5,
      status: "Active"
    },
    {
      id: 2,
      image: "/api/placeholder/300/200",
      title: "Shared Room in Dehiwala",
      location: "Dehiwala",
      price: "15,000 LKR",
      views: 98,
      inquiries: 8,
      rating: 4.2,
      status: "Active"
    }
  ]);

  const insights = [
    { name: 'Jan', views: 400, inquiries: 24 },
    { name: 'Feb', views: 600, inquiries: 28 },
    { name: 'Mar', views: 550, inquiries: 32 }
  ];

  const stats = [
    { title: "Total Properties", value: "5", icon: <Building2 /> },
    { title: "Total Views", value: "1.2K", icon: <Eye /> },
    { title: "Active Tenants", value: "8", icon: <Users /> },
    { title: "Avg. Rating", value: "4.5", icon: <Star /> }
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome Back!</h1>
        <button className="add-property-btn">
          <Plus size={20} />
          Add New Property
        </button>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-info">
              <h3>{stat.value}</h3>
              <p>{stat.title}</p>
            </div>
          </div>
        ))}
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
              <BarChart data={insights}>
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
    </div>
  );
};

export default LandlordDashboard;