import React from 'react';
import { playClickSound } from '../utils/soundUtils';

const DashboardPage = ({ onNavigate }) => {
    const userName = localStorage.getItem('user_nickname') || 'Friend';

    return (
        <div style={{
            width: '100%', textAlign: 'center', marginTop: '40px',
            minHeight: '80vh', display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center'
        }}>
            <div style={{ maxWidth: '750px', margin: '0 auto', padding: '0 20px' }}>

                {/* Welcome */}
                <div style={{ marginBottom: '40px' }}>
                    <h2 style={{
                        fontSize: '2.5em', color: '#8a6d3b', marginBottom: '12px',
                        fontFamily: "'UnifrakturMaguntia', cursive",
                        letterSpacing: '3px', textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
                    }}>
                        Welcome, {userName}
                    </h2>
                    <p style={{
                        fontSize: '1em', color: '#8a6d3b', fontStyle: 'italic',
                        letterSpacing: '1px', fontFamily: "'IM Fell English SC', serif"
                    }}>
                        What would you like to do today?
                    </p>
                </div>

                {/* Decorative line */}
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    gap: '15px', margin: '30px 0'
                }}>
                    <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, #c5a059)' }} />
                    <span style={{ color: '#c5a059', fontFamily: "'UnifrakturMaguntia', cursive" }}>✦</span>
                    <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, #c5a059)' }} />
                </div>

                {/* Action circles */}
                <div style={{
                    display: 'flex', flexDirection: 'row', gap: '35px',
                    justifyContent: 'center', marginTop: '40px', flexWrap: 'wrap'
                }}>
                    {/* Share Anxiety */}
                    <button onClick={() => { playClickSound(); onNavigate('anxiety'); }} className="dashboard-circle" style={{
                        background: 'linear-gradient(135deg, #c5a059, #a68547)', color: '#0f0b08',
                        boxShadow: '0 8px 25px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.3)'
                    }}>
                        <div className="icon">💭</div>
                        <div className="label">Share My Anxiety</div>
                    </button>

                    {/* Share Happy Moments */}
                    <button onClick={() => { playClickSound(); onNavigate('share_moments'); }} className="dashboard-circle" style={{
                        background: 'linear-gradient(135deg, #f5f0e8, #e8dbc1)', color: '#8a6d3b',
                        boxShadow: '0 8px 25px rgba(0,0,0,0.2)'
                    }}>
                        <div className="icon">✨</div>
                        <div className="label">Share Happy Moment</div>
                    </button>

                    {/* Browse Temporium */}
                    <button onClick={() => { playClickSound(); onNavigate('browse'); }} className="dashboard-circle" style={{
                        background: 'linear-gradient(135deg, #3d2b1f, #2c1e14)', color: '#c5a059',
                        border: '5px solid #c5a059',
                        boxShadow: '0 8px 25px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)'
                    }}>
                        <div className="icon">🕰</div>
                        <div className="label">Browse Temporium</div>
                    </button>
                </div>

                {/* Logout */}
                <div style={{ marginTop: '50px' }}>
                    <button
                        onClick={() => {
                            playClickSound();
                            localStorage.removeItem('user_nickname');
                            localStorage.removeItem('user_id');
                            localStorage.removeItem('user_age');
                            localStorage.removeItem('user_gender');
                            onNavigate('home');
                        }}
                        style={{
                            padding: '12px 40px', fontSize: '0.85em', fontWeight: 'bold',
                            backgroundColor: '#c9b892', color: '#3a3a3a',
                            border: 'none', cursor: 'pointer',
                            borderRadius: '0', transition: '0.3s ease',
                            textTransform: 'uppercase', letterSpacing: '2px',
                            fontFamily: "'IM Fell English SC', serif"
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#b5a06f';
                            e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = '#c9b892';
                            e.target.style.boxShadow = 'none';
                        }}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;