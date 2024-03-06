import React from 'react';
import LoginForm from '../auth/LoginForm';
import RegisterForm from '../form/RegisterForm';

interface NavbarOutProps {
  onLogin: () => void;
  onRegister: () => void;
}

const NavbarOut: React.FC<NavbarOutProps> = ({ onLogin, onRegister }) => {
  return (
    <nav>
      <LoginForm onLogin={onLogin} />
      <br/>
      <RegisterForm onRegister={onRegister} />
    </nav>
  );
};

export default NavbarOut;
