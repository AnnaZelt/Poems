// front/poems/src/components/LogoutButton.tsx
import React from 'react';

const LogoutButton = () => {
  const handleLogout = () => {
    // Remove the JWT token from local storage
    localStorage.removeItem('token');
    // Redirect the user to the login page
    window.location.href = '/login'; // or any other page
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
