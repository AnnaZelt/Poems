import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchUserDetail, updateUser } from '../../features/users/userSlice';
import Navbar from './Navbar';

interface UserProps {
  userId: number;
}

const User: React.FC<UserProps> = ({ userId }) => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const currentUser = useSelector((state: RootState) => state.users.currentUser);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserDetail(userId));
    }
  }, [userId, dispatch]);

  useEffect(() => {
    if (currentUser) {
      setUsername(currentUser.username);
      setEmail(currentUser.email);
    }
  }, [currentUser]);

  const handleUpdateUser = () => {
    const token = localStorage.getItem('token');
    if (currentUser) {
        dispatch(updateUser({ token: token!, userId: currentUser.id, userData: { username, email } }));    }
  };

  return (
    <div>
      {currentUser ? (
        <>
          <h2>User Details</h2>
          <p>ID: {currentUser.id}</p>
          <label>
            Username:
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <button onClick={handleUpdateUser}>Update User</button>
        </>
      ) : (
        <p>Loading user details...</p>
      )}
      <Navbar></Navbar>
    </div>
  );
};

export default User;
