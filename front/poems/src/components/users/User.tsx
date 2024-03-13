import React, { useEffect, useState } from 'react';
import {  useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import NavbarIn from './NavbarIn';
import PoemList from '../poems/PoemList';
import { Token } from '../../types/token';

interface UserProps {
  userId: number;
}

const User: React.FC<UserProps> = ({ userId }) => {
  const [showMessage, setShowMessage] = useState(false);
  const [messageContent, setMessageContent] = useState('');
  const [tokenNotNull, setTokenChanged] = useState(false); // State to track token changes
  const [loading, setLoading] = useState(true);
  const [tokenReceived, setTokenReceived] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false); // State to control navbar visibility
  const [showPoems, setShowPoems] = useState(true); // State to control navbar visibility
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
    console.log('deleted');
    
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
