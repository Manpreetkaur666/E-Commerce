import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, redirect, Route } from 'react-router-dom';

const ProtectedRoute = ( { isAdmin, children } ) => {

    const {isAuthenticated, user } = useSelector((state) => state.user);

  if(isAuthenticated === false){
    return <Navigate to = "/login" />
  }
  if(isAdmin === true && user.role !== "admin"){
    return <Navigate to = "/login" />
  }
  return children
  // return isAuthenticated ? children : <Navigate to = "/login" />
}

export default ProtectedRoute