import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './redux/store';
import NavbarIn from './components/users/NavbarIn';
import NavbarOut from './components/users/NavbarOut';
import Poem from './components/poems/Poem';
import User from './components/users/User';
import { setError} from './features/auth/authSlice';
import PoemList from './components/poems/PoemList';
import './styles/styles.scss';

function App() {
  const [showMessage, setShowMessage] = useState(false);
  const [messageContent, setMessageContent] = useState('');
  const [tokenNotNull, setTokenChanged] = useState(false); // State to track token changes
  const dispatch = useDispatch<AppDispatch>();
  const token = JSON.parse(localStorage.getItem('token')!);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (token) {
      setTokenChanged(true);
        }
  }, [tokenNotNull]);

  const handleLogin = () => {
      setTokenChanged(true);
      if (!token){
      dispatch(setError('Token is missing'));
    }
  };

  const handleLogout = () => {
    setTokenChanged(false); // Set tokenChanged to trigger reload
  };

  const handleRegister = () => {
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
    <div className="container mt-4">
      {token ? (
        <div>
          <User userId={Number(userId)} />
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
