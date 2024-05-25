import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // 添加 loading 状态
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${config.BASE_URL}/api/check-auth`, { withCredentials: true })
      .then(response => {
        setUser(response.data.user);
        setLoading(false); // 请求完成后设置 loading 为 false
      })
      .catch(() => {
        setUser(null);
        setLoading(false); // 请求完成后设置 loading 为 false
      });
  }, []);

  const login = (username, password) => {
    return axios.post(`${config.BASE_URL}/api/login`, { username, password }, { withCredentials: true })
      .then(response => {
        setUser(response.data.user);
      });
  };

  const logout = () => {
    return axios.post(`${config.BASE_URL}/api/logout`, {}, { withCredentials: true })
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
