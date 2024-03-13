// NavbarIn component
import React, { useState } from 'react';
import LogoutButton from '../auth/LogoutButton';
import DeleteButton from './DeleteButton';
import { Token } from '../../types/token';
import { User } from '../../types/user';
import UpdateForm from '../form/UpdateForm';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { logout } from '../../features/auth/authSlice';

interface NavbarInProps {
  onUpdate: () => void;
  onDelete: () => void;
  onLogout: () => void;
  token: Token;
  userId: number;
  userData: Partial<User>;
}

const NavbarIn: React.FC<NavbarInProps> = ({ onUpdate, onDelete, onLogout, token, userId, userData }) => {
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const toggleuUpdateForm = () => {
    setShowUpdateForm((prev) => !prev);
  };

  return (
    <nav className="navbar-in">
      <button onClick={toggleuUpdateForm}>{showUpdateForm ? 'Close' : 'Update details '}</button>
      {showUpdateForm && <UpdateForm onUpdate={onUpdate} token={token} userId={userId} userData={userData} />}
      <DeleteButton onDelete={onDelete} token={token} userId={userId} />
      <LogoutButton onLogout={onLogout} />
    </nav>
  );
};

export default NavbarIn;
