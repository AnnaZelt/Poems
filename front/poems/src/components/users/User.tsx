import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { deleteUser, fetchUserDetail, updateUser } from '../../features/users/userSlice';
import { Token } from '../../types/token';
import { fetchPoems } from '../../features/poems/poemSlice';

interface UserProps {
  userId: number;
}

const User: React.FC<UserProps> = ({ userId }) => {
  const [loading, setLoading] = useState(true);
  const [tokenReceived, setTokenReceived] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    if (token && !tokenReceived) {
      dispatch(fetchUserDetail(userId));
      setTokenReceived(true);
    }
  }, [token, userId, tokenReceived, dispatch]);

  useEffect(() => {
    if (token && !tokenReceived) {
      dispatch(updateUser({ token: token, userId: userId, userData: {} }));
      setTokenReceived(true);
    }
  }, [token, userId, tokenReceived, dispatch]);

  useEffect(() => {
    if (token && !tokenReceived) {
      dispatch(deleteUser({ token: token, userId: userId }));
      setTokenReceived(true);
    }
  }, [token, userId, tokenReceived, dispatch]);

  useEffect(() => {
    if (token && !tokenReceived) {
      dispatch(fetchPoems());
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
