import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './redux/store';
import NavbarOut from './components/users/NavbarOut';
import Poem from './components/poems/Poem';
import User from './components/users/User';
import { logout, setError, setIsLoggedIn } from './features/auth/authSlice';
import './styles/styles.scss';
import NavbarIn from './components/users/NavbarIn';

function App() {
  const [showMessage, setShowMessage] = useState(false);
  const [messageContent, setMessageContent] = useState('');
  const [tokenExpirationTime, setTokenExpirationTime] = useState<number | null>(null); // State for token expiration countdown
  const dispatch = useDispatch<AppDispatch>();
  const tokenString = localStorage.getItem('token');
  const token = tokenString ? JSON.parse(tokenString) : null;
  const userIdString: string | null = token?.id || null;
  const userId: number | null = userIdString ? parseInt(userIdString, 10) : null;
  const [tokenNotNull, setTokenChanged] = useState(false); // State to track token changes

  useEffect(() => {
    if (token) {
      const expiration = Number(localStorage.getItem('tokenExpirationTime'));
      const currentTime = Date.now();
      const timeLeft = expiration - currentTime;

      if (timeLeft > 0) {
        setTokenExpirationTime(timeLeft);

        const interval = setInterval(() => {
          const current = Date.now();
          const remaining = expiration - current;
          setTokenExpirationTime(remaining > 0 ? remaining : 0);
        }, 1000);

        return () => clearInterval(interval); // Clear interval on component unmount
      } else {
        dispatch(setError('Token has expired'));
        dispatch(setIsLoggedIn(false));
        dispatch(logout());
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpirationTime')
      }
    }
  }, [token, dispatch]);

  const handleLogin = (isSuccessful: boolean) => {
    if (isSuccessful) {
      dispatch(setIsLoggedIn(true));
      setTokenChanged(true);
    } else {
      setMessageContent('Incorrect username or password');
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    }
  };

  const handleRegister = () => {
    setMessageContent('Registration successful!');
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

  const handleUpdate = () => {
    setMessageContent('Updated details');
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
    setTokenChanged(false);
  };

  const handleDelete = () => {
    setMessageContent('User deleted');
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
    setTokenChanged(false);
  };

  const handleLogout = () => {
    setTokenChanged(false)
  };

  return (
    <div>
      <header className="header">
        {token ? (
          <NavbarIn
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            onLogout={handleLogout}
            token={token}
            userId={Number(userId)}
            userData={{}}
          />
        ) : (
          <NavbarOut
            onLogin={handleLogin}
            onRegister={handleRegister}
          />
        )}
      </header>
      <div className="container mt-6">
        {token ? (
          <div>
            <User userId={Number(userId)} />
            <Poem />
          </div>
        ) : (
          <div>
            <Poem />
          </div>
        )}
        {showMessage && (
          <div className="alert alert-success" role="alert">
            {messageContent}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
