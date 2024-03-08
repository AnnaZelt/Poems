// NavbarIn component
import React, { useEffect, useState } from 'react';
import LogoutButton from '../auth/LogoutButton';
import DeleteButton from './DeleteButton';
import { Token } from '../../types/token';
import { User } from '../../types/user';
import UpdateForm from '../form/UpdateForm';
import { fetchPoems } from '../../features/poems/poemSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';

interface NavbarInProps {
  onLogout: () => void;
  onUpdate: () => void;
  onDelete: () => void;
  token: Token;
  userId: number;
  userData: Partial<User>;
}

const NavbarIn: React.FC<NavbarInProps> = ({ onLogout, onUpdate, onDelete, token, userId, userData }) => {
  const [tokenReceived, setTokenReceived] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (token && !tokenReceived) {
      dispatch(fetchPoems());
      setTokenReceived(true);
    }
  }, [token, tokenReceived, dispatch]);

  return (
    <nav>
      <UpdateForm onUpdate={onUpdate} token={token} userId={userId} userData={userData} />
      <DeleteButton onDelete={onDelete} token={token} userId={userId} />
      <LogoutButton onLogout={onLogout} />
    </nav>
  );
};

export default NavbarIn;
