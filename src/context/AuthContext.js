import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // 添加 loading 状态
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/check-auth')
      .then(response => {
        setUser(response.data.user);
        setLoading(false); // 请求完成后设置 loading 为 false
      })
      .catch(() => {
        setUser(null);
        setLoading(false); // 请求完成后设置 loading 为 false
      });
  }, []);

  const login = (email, password) => {
    return axios.post('/api/login', { email, password })
      .then(response => {
        setUser(response.data.user);
        return response.data;
      });
  };

  const logout = () => {
    return axios.post('/api/logout')
      .then(() => {
        setUser(null);
        navigate('/login');
      });
  };

  if (loading) {
    return <p>Loading...</p>; // 或者显示一个加载指示器
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
