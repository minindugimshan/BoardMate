import { useNavigate } from 'react-router-dom';
import './Profile.css';
import { useEffect, useState } from 'react';
import useAuthStore from '../../store/auth-store';
import apiService from '../../services/api-service';
import { toast } from 'react-toastify';

const LandlordProfile = () => {
  const navigate = useNavigate();
  const authStore = useAuthStore();
  const user = authStore.user;
    // Initial state for landlord profile data
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

  const [isEditing, setIsEditing] = useState(false);  // Track if edit mode is active
  const [editedData, setEditedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dataInitialized, setDataInitialized] = useState(false); // Flag to prevent multiple initializations

  // Load data when component mounts
  useEffect(() => {
    if (user?.id && !loading && !dataInitialized) {
      initData();
    }
  }, [user?.id]); // Only depend on user.id, not the entire user object

  // Initialize profile data and fetch properties
  const initData = async () => {
    if (dataInitialized) return; // Prevent multiple initializations
    
    try {
      setLoading(true);
      setError(null);
      
      // Fetch fresh user data from database
      const userResponse = await apiService.get(`/auth/user/${user.id}`);
      let userData = user;
      
      if (userResponse.data.status === 'success') {
        userData = userResponse.data.user;
        // Update auth store with fresh data
        authStore.updateUser(userData);
      }
      
      // Fetch properties
      const properties = await fetchProperties();
      
      const data = {
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        email: userData.email || '',
        mobile: userData.mobile || '',
        dateOfBirth: {
          day: userData.dateOfBirthDay || "",
          month: userData.dateOfBirthMonth || "",
          year: userData.dateOfBirthYear || ""
        },
        idVerified: userData.verified || false,
        profileImage: userData.profileImage || null,
        properties: properties || []
      };
      
      setLandlordData(data);
      setEditedData(data);
      setDataInitialized(true); // Mark as initialized
    } catch (error) {
      console.error('Error initializing landlord data:', error);
      setError('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  }

  // Toggle edit mode or save edited data
  const handleEditToggle = async () => {
    if (isEditing) {
      // Validate form data before saving
      if (!editedData.firstName?.trim() || !editedData.lastName?.trim()) {
        toast.error('First name and last name are required');
        return;
      }
      
      if (!editedData.mobile?.trim()) {
        toast.error('Mobile number is required');
        return;
      }
      
      // Validate date of birth
      const { day, month, year } = editedData.dateOfBirth;
      if (!day || !month || !year) {
        toast.error('Please enter complete date of birth');
        return;
      }
      
      try {
        setLoading(true);
        // Save changes to backend
        const response = await apiService.put('/auth/update-profile', {
          id: user.id,
          firstName: editedData.firstName.trim(),
          lastName: editedData.lastName.trim(),
          mobile: editedData.mobile.trim(),
          dateOfBirthDay: editedData.dateOfBirth.day,
          dateOfBirthMonth: editedData.dateOfBirth.month,
          dateOfBirthYear: editedData.dateOfBirth.year
        });

        if (response.data.status === 'success') {
          // Save the changes to local state
          setLandlordData({...editedData});
          
          // Update auth store with new user data
          authStore.updateUser({
            ...user,
            firstName: editedData.firstName.trim(),
            lastName: editedData.lastName.trim(),
            mobile: editedData.mobile.trim(),
            dateOfBirthDay: editedData.dateOfBirth.day,
            dateOfBirthMonth: editedData.dateOfBirth.month,
            dateOfBirthYear: editedData.dateOfBirth.year
          });
          
          toast.success('Profile updated successfully!');
        } else {
          toast.error('Failed to update profile');
        }
      } catch (error) {
        console.error('Error updating profile:', error);
        toast.error('Failed to update profile. Please try again.');
      } finally {
        setLoading(false);
      }
    }
    setIsEditing(!isEditing);
  };

   // Handle input field changes
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

  // Handle profile image file selection and preview
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setEditedData({
        ...editedData,
        profileImage: URL.createObjectURL(e.target.files[0])
      });
    }
  };

  // Format DOB into a readable string
  const formatDateOfBirth = () => {
    const { day, month, year } = landlordData.dateOfBirth;
    return `${day}/${month}/${year}`;
  };

  // Fetch properties from backend using landlord ID
  const fetchProperties = async () => {
    try {
      const rs = await apiService.get(`/properties/getPropertyList?landlordId=${user.id}`);
      console.log('Properties response:', rs);
      if (rs.status === 200) {
        return rs.data;
      }
      return [];
    } catch (error) {
      console.error('Error fetching properties:', error);
      toast.error('Failed to load properties');
      return [];
    }
  }

  // Refresh data manually
  const handleRefresh = () => {
    setDataInitialized(false);
    setError(null);
    initData();
  };

  return (
    <div className="profile-container" style={{ padding: '20px' }}>
      {loading ? (
        <div className="loading-section">
          <div className="loading-spinner"></div>
          <p>Loading profile data...</p>
        </div>
      ) : error ? (
        <div className="error-section">
          <p>{error}</p>
          <button onClick={initData} className="retry-button">Retry</button>
        </div>
      ) : (
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
            <button 
              className="refresh-btn"
              onClick={handleRefresh}
              style={{
                background: 'none',
                border: '1px solid #2196F3',
                color: '#2196F3',
                borderRadius: '4px',
                padding: '0.5rem 1rem',
                cursor: 'pointer',
                marginTop: '0.5rem',
                fontSize: '0.9rem'
              }}
            >
              Refresh Data
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

            {/* <div className="profile-section">
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
                    </div>
                  </div>
                ))}
              </div>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default LandlordProfile;