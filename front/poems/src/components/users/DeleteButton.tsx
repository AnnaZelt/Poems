import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { deleteUser } from '../../features/users/userSlice';
import { Token } from '../../types/token';

interface DeleteUserProps {
  token: Token;
  userId: number;
  onDelete: () => void;
}

const DeleteButton: React.FC<DeleteUserProps> = ({ token, userId, onDelete }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDeleteUser = () => {
    if (window.confirm('Are you sure you want to delete your account?')) {
    dispatch(deleteUser({ token, userId })).then(() => {
      onDelete();
    });
  };
}

  return <button onClick={handleDeleteUser}>Delete User</button>;
};

export default DeleteButton;
