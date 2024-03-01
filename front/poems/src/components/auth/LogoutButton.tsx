import { apiService } from '../../api/apiService';

const LogoutButton = () => {
  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      await apiService.logout(token);
      localStorage.removeItem('token');
      window.location.href = '/login'; // or any other page
    }
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
