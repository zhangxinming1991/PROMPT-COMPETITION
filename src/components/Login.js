import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import '../Login.css'; // 引入自定义的CSS文件

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    // 在组件挂载时将滚动条设置为最右侧和最下侧
    window.scrollTo({ left: document.body.scrollWidth, top: document.body.scrollHeight, behavior: 'smooth' });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');
    login(username, password)
      .then(() => {
        navigate('/');
      })
      .catch(error => {
        setError(error.response ? error.response.data.message : error.message);
      });
  };

  return (
    <div className="login-container" style={{ backgroundImage: "url('/login_2.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="login-box">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Login</button>
        </form>
        {error && <p className="error-message">{error}</p>}
        <p>If you don't have an account, please <Link to="/register">register here</Link>.</p>
      </div>
    </div>
  );
}

export default Login;
