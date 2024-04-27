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
  const [showAbout, setShowAbout] = useState(false);
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

  const handleRegister = (isSuccessful: boolean) => {
    if (isSuccessful) {
    setMessageContent('Registration successful!');
    setTokenChanged(true);
  } else {
    setMessageContent('Something went wrong');
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };
}

  const handleUpdate = (isSuccessful: boolean) => {
    if (isSuccessful) {
    setMessageContent('Details updated');
    setTokenChanged(true);
  } else {
    setMessageContent('Something went wrong');
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
    setTokenChanged(false);
  };
}

  const handleDelete = (isSuccessful: boolean) => {
    if (isSuccessful) {
    setMessageContent('User removed');
    setTokenChanged(true);
    } else {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
    setTokenChanged(false);
  };
};

  const handleLogout = () => {
    setTokenChanged(false)
  };

  const handleAboutClick = () => {
    setTokenChanged(false)
    setShowAbout((prev) => !prev);
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
            onAboutClick={handleAboutClick}
          />
        ) : (
          <NavbarOut
            onLogin={handleLogin}
            onRegister={handleRegister}
            onAboutClick={handleAboutClick}
          />
        )}
      </header>
      <div className="container mt-6">
      {showAbout ? (
        <div className="about-button">
          Thank you for trying out my AI poems project!<br/>
          This project was written using React Redux serving as the frontend and Python's Django as the backend.<br/>
          ChatGPT 2.0's 'GPT2LMHeadModel' was used for as the AI model for poem generation.<br/><br/>

          Note: As this is a hobby project, the server response wait times might take a little while, please be patient.
        </div>
        ) : (
          <div>
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
        )}
      </div>
    </div>
  );
  
}

export default App;
