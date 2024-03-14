import { useDispatch } from 'react-redux';
import { login } from '../../features/auth/authSlice';
import { useState } from 'react';
import { AppDispatch } from '../../redux/store';

interface LoginFormProps {
  onLogin: (isSuccessful: boolean) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [messageContent, setMessageContent] = useState('');

  const handleLogin = () => {
    dispatch(login({ username, password })).then((action) => {
      if (login.fulfilled.match(action)) {
        onLogin(true); // Notify the parent component that login was successful
      } else {
        onLogin(false); // Notify the parent component that login failed
      }
    });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {showMessage && (
        <div className="alert alert-danger" role="alert">
          {messageContent}
        </div>
      )}
    </div>
  );
};

export default LoginForm;
