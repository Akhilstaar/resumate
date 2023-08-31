import React from 'react';
import PropTypes from 'prop-types';

const UserDetailsOverlay = ({ user, onClose }) => {
  return (
    <div className="overlay">
      <div className="overlay-content">
        <button className="close-button btn btn-secondary" onClick={onClose}>
          Close
        </button>
        <h2>User Details</h2>
        <div className="user-details">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Age:</strong> {user.age}</p>
          {/* Add more user details here */}
        </div>
      </div>
    </div>
  );
};

UserDetailsOverlay.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    // Add more PropTypes for other user details
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default UserDetailsOverlay;
