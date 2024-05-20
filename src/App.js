import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Submit from './components/Submit';
import Results from './components/Results';
import Ranking from './components/Ranking';
import Register from './components/Register';
import Login from './components/Login';
import { AuthProvider } from './context/AuthContext';
import './App.css';  // 引入CSS文件

function App() {
  return (
    <Router>
      <AuthProvider> {/* 使用 AuthProvider 包裹 Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/submit/:id" element={<Submit />} />
          <Route path="/results/:id" element={<Results />} />
          <Route path="/rankings/:problemId" element={<Ranking />} /> {/* 更新路由路径 */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;