import React, { useState } from 'react';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import BrowsePage from './components/BrowsePage';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [userData, setUserData] = useState(null);

  const handleRegister = (data) => {
    setUserData(data);
    console.log('Registration data:', data);
  };

  const handleLogin = (data) => {
    setUserData(data);
    console.log('Login user:', data);
  };

  return (
    <div className="app-container">
      {/* 背景装饰光晕 */}
      <div className="cosmic-glow"></div>
      <div className="cosmic-glow"></div>

      {/* 内容区域 */}
      <div className="content-area">
        {/* 装饰边框 */}
        <div className="ornament-top">ESTABLISHED 1892</div>
        <div className="ornament-bottom"></div>

        {/* 页面内容 */}
        {currentPage === 'home' && <HomePage onNavigate={setCurrentPage} />}
        {currentPage === 'register' && (
          <RegisterPage 
            onNavigate={setCurrentPage} 
            onRegister={handleRegister}
          />
        )}
        {currentPage === 'login' && (
          <LoginPage 
            onNavigate={setCurrentPage} 
            onLogin={handleLogin}
          />
        )}
        {currentPage === 'browse' && <BrowsePage onNavigate={setCurrentPage} />}
      </div>
    </div>
  );
}

export default App;