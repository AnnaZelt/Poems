// NavbarIn component
import React, { useState } from 'react';
import LogoutButton from '../auth/LogoutButton';
import DeleteButton from './DeleteButton';
import { Token } from '../../types/token';
import { User } from '../../types/user';
import UpdateForm from '../form/UpdateForm';


interface NavbarInProps {
  onUpdate: (isSuccessful: boolean) => void;
  onDelete: (isSuccessful: boolean) => void;
  onLogout: () => void;
  onAboutClick: () => void;
  token: Token;
  userId: number;
  userData: Partial<User>;
}

const NavbarIn: React.FC<NavbarInProps> = ({ onUpdate, onDelete, onLogout, onAboutClick, token, userId, userData }) => {
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
      <button onClick={onAboutClick}>About</button>
    </nav>
  );
};

export default NavbarIn;
