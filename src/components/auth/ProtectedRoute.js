import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {

  const auth = useSelector((state) => state.auth);

  if (auth) {
    return <Navigate to={'/home'} />;
  }

  return children;

};

export default ProtectedRoute;