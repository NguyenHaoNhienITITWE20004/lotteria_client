import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../../hook/useAuth';
import { message } from 'antd';

const ProtectedRoute = ({ children, requireAdmin }) => {
  const { isAdmin, isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    message.warning('Bạn cần đăng nhập để truy cập.');
    return <Navigate to='/' state={{ openModal: true }} replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to='/404' replace />;
  }

  return children;
};

export default ProtectedRoute;
