import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchUserDetail } from '../../features/users/userSlice';
import Navbar from './Navbar';

interface UserProps {
  userId: number;
}

interface Token {
  refresh: string;
  access: string;
  id: number;
  username: string;
  email: string;
}

const User: React.FC<UserProps> = ({ userId }) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch<AppDispatch>();

  const tokenString = localStorage.getItem('token');
  const token: Token = JSON.parse(tokenString!);

  // useEffect(() => {
  //   if (token) {
  //     dispatch(fetchUserDetail(token.id));
  //   }
  // }, [token, dispatch]);

  useEffect(() => {
    if (token) {
      setLoading(false);
    }
  }, [token]);

  if (!token) {
    return <p>Error: Token not found</p>;
  }

  return (
    <div>
      <h2>User Details</h2>
      <p>Username: {token.username}</p>
      <p>Email: {token.email}</p>
      <Navbar />
    </div>
  );
};

export default User;
