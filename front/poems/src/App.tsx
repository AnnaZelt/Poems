import Navbar from './components/users/Navbar';
import Poem from './components/poems/Poem';
import User from './components/users/User';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import LoginButton from './components/auth/LoginButton';

function App() {
  const auth = useSelector((state: RootState) => state.auth);

  return (
    <div>
      <LoginButton/>
      <Poem/>
      {auth.token! && <User userId={auth.userId!}></User>}
    </div>
  );
}

export default App;
