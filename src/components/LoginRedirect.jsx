import React from 'react';
import { Navigate } from 'react-router-dom';

// 登录重定向组件
const LoginRedirect = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  return isLoggedIn ? <Navigate to="/" replace /> : children;
};

export default LoginRedirect;