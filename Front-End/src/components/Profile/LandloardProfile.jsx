
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import { useEffect, useState } from 'react';
import useAuthStore from '../../store/auth-store';
import { use } from 'react';
import apiService from '../../services/api-service';

const LandlordProfile = () => {
  const navigate = useNavigate();
  const authStore = useAuthStore();
  const user = authStore.user;
  // This would typically come from your app state or API
  const [landlordData, setLandlordData] = useState({
    firstName: undefined,
    lastName: undefined,
    dateOfBirth: {
      day: undefined,
      month: undefined,
      year: undefined
    },
    mobile: undefined,
    email: undefined,
    idVerified: true,
    profileImage: null,
    properties: []
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(null);

  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    const properties = await fetchProperties();
    if (properties){
      const data = {
        ...landlordData,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        mobile: user.mobile,
        dateOfBirth: {
          day: user.dateOfBirthDay || "",
          month: user.dateOfBirthMonth || "",
          year: user.dateOfBirthYear || ""
        },
        properties: properties
      }
      setLandlordData(data);
      setEditedData(data);
    }
  }

  const handleEditToggle = () => {
    if (isEditing) {
      // Save the changes
      setLandlordData({...editedData});

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
    const { day, month, year } = landlordData.dateOfBirth;
    return `${day}/${month}/${year}`;
  };

  const fetchProperties = async () => {
    const rs = await apiService.get('/properties/getPropertyList', { landlordId: user.id });
    console.log(rs);
    if (rs.status === 200) {
      return rs.data;
    }
  }

  return (
    <div className="profile-container" style={{ padding: '20px' }}>
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
                src={landlordData.profileImage || "/placeholder-profile.png"} 
                alt="Profile" 
                className="profile-image"
              />
            )}
          </div>
          <h2>{`${landlordData.firstName} ${landlordData.lastName}`}</h2>
          <p className="profile-type">Landlord</p>
          <div className="verification-badge">
            {landlordData.idVerified ? (
              <span className="verified">✓ ID Verified</span>
            ) : (
              <span className="not-verified">ID Not Verified</span>
            )}
          </div>
          <button 
            className="edit-profile-btn"
            onClick={handleEditToggle}
          >
            {isEditing ? 'Save Profile' : 'Edit Profile'}
          </button>
        </div>

        <div className="profile-details">
          <h1>Landlord Profile</h1>
          
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
                <span className="field-value">{landlordData.firstName}</span>
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
                <span className="field-value">{landlordData.lastName}</span>
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
            <h3>Contact Information</h3>
            <div className="profile-field">
              <span className="field-label">Mobile:</span>
              {isEditing ? (
                <input
                  type="tel"
                  name="mobile"
                  value={editedData.mobile}
                  onChange={handleChange}
                />
              ) : (
                <span className="field-value">{landlordData.mobile}</span>
              )}
            </div>
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
                <span className="field-value">{landlordData.email}</span>
              )}
            </div>
          </div>

          <div className="profile-section">
            <h3>Properties Listed ({landlordData.properties.length})</h3>
            <div className="properties-list">
              {landlordData.properties.map(property => (
                <div key={property.id} className="property-card">
                  <h4>{property.title}</h4>
                  <p className="property-location">{property.location}</p>
                  <p className="property-price">LKR {property.price.toLocaleString()} per month</p>
                  <div className="property-status">
                    <span className={property.isActive ? "active" : "inactive"}>
                      {property.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <div className="property-actions">
                    <button onClick={() => navigate(`/properties/${property.id}`)}>
                      View
                    </button>
                    {/* <button onClick={() => navigate(`/properties/${property.id}/edit`)}>
                      Edit
                    </button> */}
                  </div>
                </div>
              ))}
              {/* <div className="add-property">
                <button onClick={() => navigate('/properties/new')}>
                  + Add New Property
                </button>
              </div> */}
            </div>
          </div>

          <div className="profile-section">
            <h3>About Me</h3>
            {isEditing ? (
              <div className="profile-field">
                <textarea
                  name="aboutMe"
                  placeholder="Tell potential renters about yourself"
                  rows="4"
                  onChange={handleChange}
                  defaultValue={landlordData.aboutMe || ''}
                />
              </div>
            ) : (
              <p className="empty-section">
                {landlordData.aboutMe || 'No information provided yet.'}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandlordProfile;