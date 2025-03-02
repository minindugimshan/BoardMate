
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import { useState } from 'react';

const StudentProfile = () => {
  const navigate = useNavigate();
  // This would typically come from your app state or API
  const [studentData, setStudentData] = useState({
    firstName: 'John',
    lastName: 'Smith',
    dateOfBirth: {
      day: '15',
      month: '03',
      year: '2000'
    },
    university: 'Informatics Institute of Technology',
    studentId: 'IIT20240001',
    email: 'john.smith@example.com',
    profileImage: null
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({...studentData});

  const handleEditToggle = () => {
    if (isEditing) {
      // Save the changes
      setStudentData({...editedData});
    }
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setEditedData({
        ...editedData,
        [parent]: {
          ...editedData[parent],
          [child]: value
        }
      });
    } else {
      setEditedData({
        ...editedData,
        [name]: value
      });
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setEditedData({
        ...editedData,
        profileImage: URL.createObjectURL(e.target.files[0])
      });
    }
  };

  const formatDateOfBirth = () => {
    const { day, month, year } = studentData.dateOfBirth;
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="profile-container">
      <header className="profile-header">
        <img 
          src="/bmlogo.png" 
          alt="Logo" 
          className="logo" 
          onClick={() => navigate('/')}
        />
        <nav className="profile-nav">
          <button onClick={() => navigate('/dashboard')}>Dashboard</button>
          <button onClick={() => navigate('/messages')}>Messages</button>
          <button onClick={() => navigate('/settings')}>Settings</button>
          <button onClick={() => navigate('/logout')}>Log Out</button>
        </nav>
      </header>

      <div className="profile-content">
        <div className="profile-sidebar">
          <div className="profile-image-container">
            {isEditing ? (
              <>
                <input
                  type="file"
                  id="profileImage"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
                <label htmlFor="profileImage" className="profile-image-edit">
                  <img 
                    src={editedData.profileImage || "/placeholder-profile.png"} 
                    alt="Profile" 
                    className="profile-image"
                  />
                  <div className="edit-overlay">Change Photo</div>
                </label>
              </>
            ) : (
              <img 
                src={studentData.profileImage || "/placeholder-profile.png"} 
                alt="Profile" 
                className="profile-image"
              />
            )}
          </div>
          <h2>{`${studentData.firstName} ${studentData.lastName}`}</h2>
          <p className="profile-type">Student</p>
          <button 
            className="edit-profile-btn"
            onClick={handleEditToggle}
          >
            {isEditing ? 'Save Profile' : 'Edit Profile'}
          </button>
        </div>

        <div className="profile-details">
          <h1>Student Profile</h1>
          
          <div className="profile-section">
            <h3>Personal Information</h3>
            <div className="profile-field">
              <span className="field-label">First Name:</span>
              {isEditing ? (
                <input
                  type="text"
                  name="firstName"
                  value={editedData.firstName}
                  onChange={handleChange}
                />
              ) : (
                <span className="field-value">{studentData.firstName}</span>
              )}
            </div>
            <div className="profile-field">
              <span className="field-label">Last Name:</span>
              {isEditing ? (
                <input
                  type="text"
                  name="lastName"
                  value={editedData.lastName}
                  onChange={handleChange}
                />
              ) : (
                <span className="field-value">{studentData.lastName}</span>
              )}
            </div>
            <div className="profile-field">
              <span className="field-label">Date of Birth:</span>
              {isEditing ? (
                <div className="dob-edit">
                  <input
                    type="text"
                    name="dateOfBirth.day"
                    placeholder="DD"
                    maxLength="2"
                    value={editedData.dateOfBirth.day}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="dateOfBirth.month"
                    placeholder="MM"
                    maxLength="2"
                    value={editedData.dateOfBirth.month}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    name="dateOfBirth.year"
                    placeholder="YYYY"
                    maxLength="4"
                    value={editedData.dateOfBirth.year}
                    onChange={handleChange}
                  />
                </div>
              ) : (
                <span className="field-value">{formatDateOfBirth()}</span>
              )}
            </div>
          </div>

          <div className="profile-section">
            <h3>University Information</h3>
            <div className="profile-field">
              <span className="field-label">University:</span>
              {isEditing ? (
                <select
                  name="university"
                  value={editedData.university}
                  onChange={handleChange}
                >
                  <option value="Informatics Institute of Technology">Informatics Institute of Technology</option>
                  <option value="University of Colombo">University of Colombo</option>
                  <option value="University of Moratuwa">University of Moratuwa</option>
                </select>
              ) : (
                <span className="field-value">{studentData.university}</span>
              )}
            </div>
            <div className="profile-field">
              <span className="field-label">Student ID:</span>
              {isEditing ? (
                <input
                  type="text"
                  name="studentId"
                  value={editedData.studentId}
                  onChange={handleChange}
                />
              ) : (
                <span className="field-value">{studentData.studentId}</span>
              )}
            </div>
          </div>

          <div className="profile-section">
            <h3>Contact Information</h3>
            <div className="profile-field">
              <span className="field-label">Email:</span>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={editedData.email}
                  onChange={handleChange}
                />
              ) : (
                <span className="field-value">{studentData.email}</span>
              )}
            </div>
          </div>

          <div className="profile-section">
            <h3>Housing Preferences</h3>
            {isEditing ? (
              <div className="profile-field">
                <textarea
                  name="housingPreferences"
                  placeholder="Describe your housing preferences (location, budget, amenities, etc.)"
                  rows="4"
                  onChange={handleChange}
                />
              </div>
            ) : (
              <p className="empty-section">No housing preferences specified yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;