import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchUserDetail } from '../../features/users/userSlice';
import { Token } from '../../types/token';

interface UserProps {
  userId: number;
}


const User: React.FC<UserProps> = ({ userId }) => {
  const [loading, setLoading] = useState(true);
  const [tokenReceived, setTokenReceived] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const tokenString = localStorage.getItem('token');
  const token: Token = JSON.parse(tokenString!);

  useEffect(() => {
    if (token && !tokenReceived) {
      dispatch(fetchUserDetail(token.id));
      setTokenReceived(true);
    }
  }, [token, tokenReceived, dispatch]);

  useEffect(() => {
    if (tokenReceived) {
      setLoading(false);
    }
  }, [tokenReceived]);

  if (!token) {
    return <p>Error: Token not found</p>;
  }

  return (
    <div>
      <h2>User Details</h2>
      <p>Username: {token.username}</p>
      <p>Email: {token.email}</p>
    </div>
  );
};

export default User;
