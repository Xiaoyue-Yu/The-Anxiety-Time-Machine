import React, { useState, useRef, useEffect } from 'react';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import AnxietyPage from './components/AnxietyPage';
import DashboardPage from './components/DashboardPage';
import BrowsePage from './components/BrowsePage';
import ShareAnxietyPage from './components/ShareAnxietyPage';
import ShareMomentsPage from './components/ShareMomentsPage';
import { playClickSound, playBackgroundMusic, stopBackgroundMusic } from './utils/soundUtils';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [userData, setUserData] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [musicEnabled, setMusicEnabled] = useState(true);

  useEffect(() => {
    // Auto-play background music on mount
    playBackgroundMusic();
  }, []);

  const fullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const handleNavigation = (page) => {
    playClickSound();
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

  const handleMusicToggle = () => {
    if (musicEnabled) {
      stopBackgroundMusic();
    } else {
      playBackgroundMusic();
    }
    setMusicEnabled(!musicEnabled);
  };

  return (
    <div className="app-container">
      {/* Music Toggle Button - Top Right Corner */}
      <button
        onClick={handleMusicToggle}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: '2px solid #c5a059',
          background: 'rgba(10, 10, 10, 0.8)',
          color: '#c5a059',
          cursor: 'pointer',
          fontSize: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 12px rgba(197, 160, 89, 0.3)'
        }}
        onMouseEnter={(e) => {
          e.target.style.background = 'rgba(10, 10, 10, 0.95)';
          e.target.style.boxShadow = '0 6px 16px rgba(197, 160, 89, 0.5)';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'rgba(10, 10, 10, 0.8)';
          e.target.style.boxShadow = '0 4px 12px rgba(197, 160, 89, 0.3)';
        }}
      >
        {musicEnabled ? '🔊' : '🔇'}
      </button>

      <button
        onClick={fullScreen}
        title="Toggle Fullscreen"
        style={{
          position: 'fixed',
          top: '20px',
          right: '70px', 
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: '2px solid #c5a059',
          background: 'rgba(10, 10, 10, 0.8)',
          color: '#c5a059',
          cursor: 'pointer',
          fontSize: '22px', 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 12px rgba(197, 160, 89, 0.3)',
          outline: 'none'
        }}
        onMouseEnter={(e) => {
          e.target.style.background = 'rgba(10, 10, 10, 0.95)';
          e.target.style.boxShadow = '0 6px 16px rgba(197, 160, 89, 0.5)';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'rgba(10, 10, 10, 0.8)';
          e.target.style.boxShadow = '0 4px 12px rgba(197, 160, 89, 0.3)';
        }}
      >
        ⛶
      </button>

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