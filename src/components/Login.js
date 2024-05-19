import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // 添加状态变量来存储错误消息
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(''); // 清除之前的错误消息
    login(email, password)
      .then(() => {
        navigate('/'); // 登录成功后导航到主页
      })
      .catch(error => {
        setError(error.response ? error.response.data.message : error.message); // 设置错误消息
      });
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* 显示错误消息 */}
      <p>If you don't have an account, please <Link to="/register">register here</Link>.</p>
    </div>
  );
}

export default Login;
