import React, { useState } from 'react';
import LoginForm from '../auth/LoginForm';
import RegisterForm from '../form/RegisterForm';

interface NavbarOutProps {
  onLogin: (isSuccessful: boolean) => void;
  onRegister: (isSuccessful: boolean) => void;
  onAboutClick: () => void;
}

const NavbarOut: React.FC<NavbarOutProps> = ({ onLogin, onRegister, onAboutClick }) => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const toggleLoginForm = () => {
    setShowLoginForm((prev) => !prev);
    setShowRegisterForm(false);
  };

  const toggleRegisterForm = () => {
    setShowRegisterForm((prev) => !prev);
    setShowLoginForm(false);
  };

  return (
    <nav className='navbar-out'>
      <button onClick={toggleLoginForm}>{showLoginForm ? 'Close' : 'Login'}</button>
      <button onClick={toggleRegisterForm}>{showRegisterForm ? 'Close' : 'Register'}</button>
      {showLoginForm && <LoginForm onLogin={onLogin} />}
      {showRegisterForm && <RegisterForm onRegister={onRegister} />}
      <button onClick={onAboutClick}>About</button>
    </nav>
  );
};

export default NavbarOut;
