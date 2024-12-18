import { useSelector } from 'react-redux';

function useAuth() {
  const { currentUser, isLogin } = useSelector((state) => state.auth);
  const isAdmin = currentUser?.role === 'owner';

  return { currentUser, isLogin, isAdmin };
}

export default useAuth;
