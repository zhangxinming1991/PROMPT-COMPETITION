import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/check-auth')
      .then(response => {
        setUser(response.data.user);
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  const login = (email, password) => {
    return axios.post('/api/login', { email, password })
      .then(response => {
        setUser(response.data.user);
        return response.data; // 确保返回Promise
      });
  };

  const logout = () => {
    return axios.post('/api/logout')
      .then(() => {
        setUser(null);
        navigate('/login');
      });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
