import React, { useState } from 'react';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import AnxietyPage from './components/AnxietyPage';
import DashboardPage from './components/DashboardPage';
import BrowsePage from './components/BrowsePage';
import ShareAnxietyPage from './components/ShareAnxietyPage';
import ShareMomentsPage from './components/ShareMomentsPage';
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
      {/* Background decorative glow */}
      <div className="cosmic-glow"></div>
      <div className="cosmic-glow"></div>

      {/* Content area */}
      <div className="content-area">
        {/* Decorative borders */}
        <div className="ornament-top">ESTABLISHED 1892</div>
        <div className="ornament-bottom"></div>

        {/* Page content */}
        {currentPage === 'home' && <HomePage onNavigate={setCurrentPage} />}
        {currentPage === 'register' && (
          <RegisterPage
            onNavigate={setCurrentPage}
            onRegister={handleRegister}
          />
        )}
        {currentPage === 'anxiety' && (
          <AnxietyPage
            onNavigate={setCurrentPage}
          />
        )}
        {currentPage === 'login' && (
          <LoginPage
            onNavigate={setCurrentPage}
            onLogin={handleLogin}
          />
        )}
        {currentPage === 'dashboard' && <DashboardPage onNavigate={setCurrentPage} />}
        {currentPage === 'share_anxiety' && <ShareAnxietyPage onNavigate={setCurrentPage} />}
        {currentPage === 'share_moments' && <ShareMomentsPage onNavigate={setCurrentPage} />}
        {currentPage === 'browse' && <BrowsePage onNavigate={setCurrentPage} />}
      </div>
    </div>
  );
}

export default App;