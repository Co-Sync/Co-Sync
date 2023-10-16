import React from 'react';
import { Navigate, useLocation } from 'react-router';
/*
  This component is used to protect routes from being accessed by unauthenticated users.
  It checks for authentication and redirects to the login page if the user is not authenticated. -Marco
*/
const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const isAuth = localStorage.getItem('isAuth');
  if (!isAuth) {
    return <Navigate to='/login' replace state={{ from: location }} />;
  }
  return (
    <>
      {children}
    </>
  );
};

export default ProtectedRoute