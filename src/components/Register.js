import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // 导入 Link
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from '../config'; // 引入配置文件
function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(`${config.BASE_URL}/api/register`, { username, email, password }, {withCredentials: true})
      .then(response => {
        toast.success('Registration successful!', {
          autoClose: 2000, // 设置提示框停留时间为2秒
          hideProgressBar: false, // 显示进度条
          progressClassName: 'faster-progress' // 自定义进度条样式
        });
      })
      .catch(error => {
        toast.error('There was an error registering!', {
          autoClose: 2000, // 设置提示框停留时间为2秒
          hideProgressBar: false, // 显示进度条
          progressClassName: 'faster-progress' // 自定义进度条样式
        });
        console.error('There was an error registering!', error);
      });
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Register</button>
      </form>
      <ToastContainer /> {/* 添加 ToastContainer 组件以显示提示框 */}
      <p>Already have an account? <Link to="/login">Login here</Link>.</p> {/* 添加返回登录页面的链接 */}
    </div>
  );
}

export default Register;
