import React from 'react';
import LogoutButton from '../auth/LogoutButton';
import LoginForm from '../auth/LoginForm';

interface NavbarOutProps {
  onLogin: () => void;
}

const NavbarOut: React.FC<NavbarOutProps> = ({ onLogin }) => {
  return (
    <nav>
      <LoginForm onLogin={onLogin} />
    </nav>
  );
};

export default NavbarOut;
