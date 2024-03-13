import React, { useState } from 'react';
import LoginForm from '../auth/LoginForm';
import RegisterForm from '../form/RegisterForm';

interface NavbarOutProps {
  onLogin: () => void;
  onRegister: () => void;
}

const NavbarOut: React.FC<NavbarOutProps> = ({ onLogin, onRegister }) => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const toggleLoginForm = () => {
    setShowLoginForm((prev) => !prev);
    setShowRegisterForm(false); // Close the register form
  };

  const toggleRegisterForm = () => {
    setShowRegisterForm((prev) => !prev);
    setShowLoginForm(false); // Close the login form
  };

  return (
    <nav className='navbar-out'>
      <button onClick={toggleLoginForm}>{showLoginForm ? 'Close' : 'Login'}</button>
      <button onClick={toggleRegisterForm}>{showRegisterForm ? 'Close' : 'Register'}</button>
      {showLoginForm && <LoginForm onLogin={onLogin} />}
      {showRegisterForm && <RegisterForm onRegister={onRegister} />}
    </nav>
  );
};

export default NavbarOut;
