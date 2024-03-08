// UpdateForm component
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { updateUser } from '../../features/users/userSlice';
import { Token } from '../../types/token';
import { User } from '../../types/user';
import { logout } from '../../features/auth/authSlice';

interface UpdateFormProps {
  token: Token;
  userId: number;
  userData: Partial<User>;
  onUpdate: () => void;
}

const UpdateForm: React.FC<UpdateFormProps> = ({ token, userId, userData, onUpdate }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [username, setUsername] = useState(userData.username || '');
  const [email, setEmail] = useState(userData.email || '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'email') {
      setEmail(value);
    }
  };

  const handleUpdateUser = () => {
    dispatch(updateUser({ token, userId, userData: { username, email } }))
      .then(() => {
        dispatch(logout());
      })
      .catch((error) => {
        console.error('Failed to update user:', error);
      });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Username"
        name="username"
        value={username}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Email"
        name="email"
        value={email}
        onChange={handleChange}
      />
      <button onClick={handleUpdateUser}>Update User</button>
    </div>
  );
};

export default UpdateForm;
