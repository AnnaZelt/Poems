import { useDispatch } from 'react-redux';
import { login } from '../../features/auth/authSlice';
import { useState } from 'react';
import { AppDispatch } from '../../redux/store';

interface LoginFormProps {
  onLogin: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginClick, setLoginClick] = useState<Boolean>(false)

  const handleLogin = () => {
    dispatch(login({ username, password })).then(() => {
      setLoginClick(true);
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
    </div>
  );
};

export default LoginForm;
