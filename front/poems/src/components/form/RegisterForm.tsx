import { useDispatch } from 'react-redux';
import { register } from '../../features/auth/authSlice';
import { useState } from 'react';
import { AppDispatch } from '../../redux/store';

interface RegisterFormProps {
  onRegister: (isSuccessful: boolean) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegister }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleRegister = () => {
    dispatch(register({ username, password, email })).then((action) => {
      if (register.fulfilled.match(action)) {
        onRegister(true); // Notify the parent component that login was successful
      } else {
        onRegister(false); // Notify the parent component that login failed
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
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default RegisterForm;
