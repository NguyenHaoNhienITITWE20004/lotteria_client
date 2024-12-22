/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { ModalTypes } from '../../constant/modal';
import { openModal } from '../../redux/slice/modal';
import useAuth from '../../hook/useAuth';
import { message } from 'antd';

const ProtectedRoute = ({ children, requireAdmin }) => {
  const { isAdmin, isLogin } = useAuth();
  console.log(isLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);

  if (!isLogin) {
    return <Navigate to='/' state={{ openModal: true }} />;
  }
  if (!isAdmin) {
    return <Navigate to='/' />;
  }

  return children;
};

export default ProtectedRoute;
