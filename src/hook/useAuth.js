import { useSelector } from 'react-redux';

function useAuth() {
  const { currentUser, isLoggedIn } = useSelector((state) => state.auth);
  const isAdmin = currentUser?.role === 'owner';

  return { currentUser, isLoggedIn, isAdmin };
}

export default useAuth;
