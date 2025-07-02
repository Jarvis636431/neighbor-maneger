import React from 'react';
import { Navigate } from 'react-router-dom';

// 受保护的路由组件
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;