import { useEffect } from 'react';
import { useUserContext } from '../hooks/contextHooks';
import { useNavigate } from 'react-router';

const Logout = () => {
  const { handleLogout } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        await handleLogout();
        navigate('/'); // Redirect to home after logout
      } catch (e) {
        console.error('Logout error:', e.message);
      }
    };

    logout();
  }, [handleLogout, navigate]);

  return <p>Logging out...</p>;
};

export default Logout;
