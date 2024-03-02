import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from './redux/store';
import Navbar from './components/users/Navbar';
import Poem from './components/poems/Poem';
import User from './components/users/User';
import LoginButton from './components/auth/LoginButton';
import { setToken, setUserId } from './features/auth/authSlice';

function App() {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (token && userId) {
      dispatch(setToken(token));
      dispatch(setUserId(Number(userId)));
    }
  }, [dispatch]);

  return (
    <div>
      <LoginButton />
      <Poem />
      {auth.token && <User userId={auth.userId!}></User>}
      <Navbar/>
    </div>
  );
}

export default App;
