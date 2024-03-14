import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import { AppDispatch } from '../../redux/store';

interface LogoutButtonProps {
  onLogout: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = async () => {
    dispatch(logout());
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpirationTime');
  }

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
