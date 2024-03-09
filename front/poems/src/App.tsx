import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from './redux/store';
import NavbarOut from './components/users/NavbarOut';
import Poem from './components/poems/Poem';
import User from './components/users/User';
import { AuthState, setError, setIsLoggedIn } from './features/auth/authSlice';
import './styles/styles.scss';

function App() {
  const [showMessage, setShowMessage] = useState(false);
  const [messageContent, setMessageContent] = useState('');
  const [tokenExpirationTime, setTokenExpirationTime] = useState<number | null>(null); // State for token expiration countdown
  const dispatch = useDispatch<AppDispatch>();
  const tokenString = localStorage.getItem('token');
  const token = tokenString ? JSON.parse(tokenString) : null;
  const userIdString: string | null = token?.id || null;
  const userId: number | null = userIdString ? parseInt(userIdString, 10) : null;
  const isLoggedIn = useSelector((state: { auth: AuthState }) => state.auth.isLoggedIn);
  const [showNavbar, setShowNavbar] = useState(false);

  const toggleNavbarVisibility = () => {
    setShowNavbar((prevShowNavbar) => !prevShowNavbar);
  };

  useEffect(() => {
    if (token) {
      const expiration = Number(localStorage.getItem('tokenExpirationTime'));
      const currentTime = Date.now();
      const timeLeft = expiration - currentTime;

      if (timeLeft > 0) {
        setTokenExpirationTime(timeLeft);

        const interval = setInterval(() => {
          setTokenExpirationTime((prevTime) => {
            if (prevTime && prevTime > 0) {
              return prevTime - 1000;
            } else {
              clearInterval(interval);
              return null;
            }
          });
        }, 1000);
      } else {
        // Token has expired, logout the user
        dispatch(setError('Token has expired'));
        dispatch(setIsLoggedIn(false));
      }
    }
  }, [token, dispatch]);

  const handleLogin = () => {
    // Handle login logic here
    // For example, set isLoggedIn to true after successful login
    dispatch(setIsLoggedIn(true));    
    // setTokenChanged(true);
  };

  const handleRegister = () => {
    setMessageContent('Registration successful!');
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 2000); // Hide the message after 5 seconds
  };

  return (
    <div className="container mt-4">
      <style>
        
      </style>
      {token ? (
        <div>
          <User userId={Number(userId)} />
          <Poem />
        </div>
      ) : (
        <div>
          {showMessage && (
            <div className="alert alert-success" role="alert">
              {messageContent}
            </div>
          )}
          <Poem />
          <NavbarOut
            onLogin={handleLogin}
            onRegister={handleRegister}
          />
        </div>
      )}
    </div>
  );
}

export default App;
