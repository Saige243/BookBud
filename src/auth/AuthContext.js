import React, { createContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import useAuth from './useAuth';


export const AuthContext = createContext();

const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = (jwtToken) => {
  try {
    jwtDecode(jwtToken, JWT_SECRET);
    return true;
  } catch (error) {
    return false;
  }
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const { login, signup, signout } = useAuth();

  useEffect(() => {
    console.log('RUNNING!')
    setIsLoading(true)
    const jwtToken = localStorage.getItem('jwtToken');

    if (jwtToken) {
      const isValidToken = verifyToken(jwtToken);

      if (isValidToken) {
        setIsAuthenticated(true);
      } else {
        signout();
      }
    }
    setIsLoading(false);
  }, [login, signup, signout, isAuthenticated]);



  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
