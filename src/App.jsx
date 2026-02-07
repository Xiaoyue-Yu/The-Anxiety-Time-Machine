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
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleNavigation = (page) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(page);
      setIsTransitioning(false);
    }, 300);
  };

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
      {/* Background decorative glows */}
      <div className="cosmic-glow"></div>
      <div className="cosmic-glow"></div>

      {/* Parchment content area */}
      <div className="content-area" style={{ opacity: isTransitioning ? 0 : 1, transition: 'opacity 0.3s ease' }}>
        {/* Ornamental gold borders */}
        <div className="ornament-top">
          ✦ Established 2026 ✦
        </div>
        <div className="ornament-bottom"></div>

        {/* Page content */}
        {currentPage === 'home' && <HomePage onNavigate={handleNavigation} />}
        {currentPage === 'register' && (
          <RegisterPage onNavigate={handleNavigation} onRegister={handleRegister} />
        )}
        {currentPage === 'anxiety' && (
          <AnxietyPage onNavigate={handleNavigation} />
        )}
        {currentPage === 'login' && (
          <LoginPage onNavigate={handleNavigation} onLogin={handleLogin} />
        )}
        {currentPage === 'dashboard' && <DashboardPage onNavigate={handleNavigation} />}
        {currentPage === 'share_anxiety' && <ShareAnxietyPage onNavigate={handleNavigation} />}
        {currentPage === 'share_moments' && <ShareMomentsPage onNavigate={handleNavigation} />}
        {currentPage === 'browse' && <BrowsePage onNavigate={handleNavigation} />}
      </div>
    </div>
  );
}

export default App;