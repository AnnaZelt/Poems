import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from './redux/store';
import NavbarIn from './components/users/NavbarIn';
import NavbarOut from './components/users/NavbarOut';
import Poem from './components/poems/Poem';
import User from './components/users/User';
import { setToken, setUserId } from './features/auth/authSlice';
import PoemList from './components/poems/PoemList';

function App() {
  const token = useSelector((state: RootState) => state.auth.token);
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);
  const [showMessage, setShowMessage] = useState(false);
  const [messageContent, setMessageContent] = useState('');
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

  const handleRegister = () => {
    setIsLoggedIn(false);
    setMessageContent('Registration successful!');
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 2000); // Hide the message after 5 seconds
  };

  function handleFetchPoems(): void {
    return;
  }
  
  function handleFetchPoemDetail(): void {
    return;
  }

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <User userId={Number(localStorage.getItem('userId'))} />
          <Poem />
          <NavbarIn onLogout={handleLogout} />
          <PoemList 
          onFetchPoems={handleFetchPoems}
          onFetchPoemDetail={handleFetchPoemDetail}
          />
        </div>
      ) : (
        <div>
                {showMessage && (
        <div>
          <p>{messageContent}</p>
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
