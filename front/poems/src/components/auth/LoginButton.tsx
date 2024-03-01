import React, { useState } from 'react';
import { apiService } from '../../api/apiService';

const LoginButton = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await apiService.login(username, password);
      // Assuming the login response contains a token
      const token = response.token;
      // Store the token in localStorage or a more secure storage method
      localStorage.setItem('token', token);
      // Reload the page to reflect the logged-in state
      window.location.reload();
    } catch (error) {
      console.error('Login failed:', error);
    }
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
      <button onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default LoginButton;
