import React from 'react';
import LogoutButton from '../auth/LogoutButton';

interface NavbarInProps {
  onLogout: () => void;
}

const NavbarIn: React.FC<NavbarInProps> = ({ onLogout }) => {
  return (
    <nav>
      <LogoutButton onLogout={onLogout} />
    </nav>
  );
};

export default NavbarIn;
