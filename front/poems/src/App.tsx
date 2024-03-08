// App component
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './redux/store';
import NavbarOut from './components/users/NavbarOut';
import Poem from './components/poems/Poem';
import User from './components/users/User';
import { setError} from './features/auth/authSlice';
import './styles/styles.scss';

function App() {
  const [showMessage, setShowMessage] = useState(false);
  const [messageContent, setMessageContent] = useState('');
  const [tokenNotNull, setTokenChanged] = useState(false); // State to track token changes
  const [tokenExpirationTime, setTokenExpirationTime] = useState<number | null>(null); // State for token expiration countdown
  const dispatch = useDispatch<AppDispatch>();
  const tokenString = localStorage.getItem('token');
  const token = tokenString ? JSON.parse(tokenString) : null;
  const userIdString: string | null = token?.id || null;
  const userId: number | null = userIdString ? parseInt(userIdString, 10) : null;

  <p>{tokenExpirationTime !== null ? `Token expires in ${Math.floor(tokenExpirationTime / 1000)} seconds` : ''}</p>

  useEffect(() => {
    if (token) {
      setTokenChanged(true);
    }
  }, [tokenNotNull]);

  const startTokenTimer = () => {
    if (token && tokenExpirationTime === null) {
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
      }
    }
  };

  const handleLogin = () => {
    startTokenTimer();
    setTokenChanged(true);
    if (!token){
      dispatch(setError('Token is missing'));
    }
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
