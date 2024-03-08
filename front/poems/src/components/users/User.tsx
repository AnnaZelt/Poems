import React, { useEffect, useState } from 'react';
import {  useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import NavbarIn from './NavbarIn';
import PoemList from '../poems/PoemList';

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
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    if (tokenReceived) {
      setLoading(false);
    }
  }, [tokenReceived]);

  const handleShowNavbar = () => {
    setShowNavbar(true);
  };

  const handleUpdate = () => {
    setMessageContent('Update successful!');
    setShowMessage(true);
    setTokenChanged(false); // Set tokenChanged to trigger reload
  };

  const handleDelete = () => {
    setMessageContent('User deleted');
    setShowMessage(true);
    setTokenChanged(false); // Set tokenChanged to trigger reload
  };

  const handleLogout = () => {
    setTokenChanged(false); // Set tokenChanged to trigger reload
  };

  const handleShowPoems = () => {
    setShowPoems(true);
  };

  function handleFetchPoemDetail(): void {
    return;
  }

  function handleDeletePoem(): void {
    console.log('deleted');
    
  }

  if (!token) {
    return <p>Error: Token not found</p>;
  }

  const toggleNavbarVisibility = () => {
    setShowNavbar((prevShowNav) => !prevShowNav); // Toggle the state between true and false
  };


  return (
    <div>
      <h2>Welcome, {token.username}</h2>
      <PoemList 
      onFetchPoems={handleShowPoems} 
      onFetchPoemDetail={handleFetchPoemDetail} 
      onDeletePoem={handleDeletePoem} 
      />
      <button onClick={showNavbar ? toggleNavbarVisibility : handleShowNavbar}>
      {showNavbar ? 'Close Navbar' : 'Show Navbar'}
      </button>
      {showNavbar && (
        <NavbarIn
          onLogout={handleLogout}
          onUpdate={handleUpdate}
          onDelete={handleDelete} // Pass onDelete callback
          token={token}
          userId={Number(userId)}
          userData={{}}
        />)}
    </div>
  );
};

export default User;
