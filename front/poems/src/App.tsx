import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from './redux/store';
import NavbarIn from './components/users/NavbarIn';
import NavbarOut from './components/users/NavbarOut';
import Poem from './components/poems/Poem';
import User from './components/users/User';
import { setToken, setUserId } from './features/auth/authSlice';

function App() {
  const token = useSelector((state: RootState) => state.auth.token);
  const [isLoggedIn, setIsLoggedIn] = useState(!!token); // Initialize isLoggedIn based on the initial token state
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token')!);
    const userId = localStorage.getItem('userId');
    if (token && userId) {
      dispatch(setToken(token));
      dispatch(setUserId(Number(userId)));
      setIsLoggedIn(true); // Update isLoggedIn state when token is found
    }
  }, [dispatch]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    // Any other logic you want to perform after login
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Any other logic you want to perform after logout
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <User userId={Number(localStorage.getItem('userId'))} />
          <Poem />
          <NavbarIn onLogout={handleLogout} />
        </div>
      ) : (
        <div>
          <Poem />
          <NavbarOut onLogin={handleLogin} />
        </div>
      )}
    </div>
  );
}

export default App;
