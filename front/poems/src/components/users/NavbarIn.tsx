// NavbarIn component
import React from 'react';
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
  token: Token;
  userId: number;
  userData: Partial<User>;
}

const NavbarIn: React.FC<NavbarInProps> = ({ onUpdate, onDelete, token, userId, userData }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logout()); // Assuming you have a logout action
  };

  return (
    <nav className="navbar-in">
      <UpdateForm onUpdate={onUpdate} token={token} userId={userId} userData={userData} />
      <DeleteButton onDelete={onDelete} token={token} userId={userId} />
      <LogoutButton onLogout={handleLogout} />
    </nav>
  );
};

export default NavbarIn;
