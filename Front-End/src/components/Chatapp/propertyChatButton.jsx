import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PropertyChatButton = ({ propertyId, landlordId, studentId }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const startChat = async () => {
    if (!studentId) {
      navigate('/login?redirect=property/' + propertyId);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:8080/api/chats/start', {
        studentId,
        landlordId,
        propertyId
      });
      
      // Navigate to the chat
      navigate(`/chats/${response.data.id}`);
    } catch (error) {
      console.error('Error starting chat:', error);
      alert('Failed to start conversation. Please try again.');
      setLoading(false);
    }
  };

  return (
    <button 
      className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      onClick={startChat}
      disabled={loading}
    >
      {loading ? 'Loading...' : 'Message Landlord'}
    </button>
  );
};

export default PropertyChatButton;