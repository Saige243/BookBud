import React, { createContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import useAuth from './Auth';

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
  const { signup } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    const jwtToken = localStorage.getItem('jwtToken');

    if (jwtToken) {
      const isValidToken = verifyToken(jwtToken);

      if (isValidToken) {
        setIsAuthenticated(true);
      } else {
        logout();
      }
    }
    setIsLoading(false);
  }, [signup]);

  const login = (jwtToken) => {
    const isValidToken = verifyToken(jwtToken);

    if (isValidToken) {
      setIsAuthenticated(true);
      localStorage.setItem('jwtToken', jwtToken);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('jwtToken');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
