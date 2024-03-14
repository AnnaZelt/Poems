import React, { useEffect, useState } from 'react';
import {  useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import PoemList from '../poems/PoemList';
import { Token } from '../../types/token';

interface UserProps {
  userId: number;
}

const User: React.FC<UserProps> = ({ userId }) => {
  const [loading, setLoading] = useState(true);
  const [tokenReceived, setTokenReceived] = useState(false);
  const [showPoems, setShowPoems] = useState(true);
  const token: Token | null = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    if (tokenReceived) {
      setLoading(false);
    }
  }, [tokenReceived]);

  const handleShowPoems = () => {
    setShowPoems(true);
  };

  function handleFetchPoemDetail(): void {
    return;
  }

  function handleDeletePoem(): void {
    return;
  }

  return (
    <div className='user'>
      <h3>Welcome, {token?.username}</h3>
      <PoemList 
      onFetchPoems={handleShowPoems} 
      onFetchPoemDetail={handleFetchPoemDetail} 
      onDeletePoem={handleDeletePoem} 
      />
    </div>
  );
};

export default User;
