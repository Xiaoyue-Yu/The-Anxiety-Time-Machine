import React from 'react';

const DashboardPage = ({ onNavigate }) => {
    const userName = localStorage.getItem('user_nickname') || 'Friend';

    return (
        <div style={{
            width: '100%',
            textAlign: 'center',
            marginTop: '60px',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <div style={{
                maxWidth: '700px',
                margin: '0 auto',
                padding: '0 20px'
            }}>
                {/* Welcome message */}
                <div style={{ marginBottom: '50px' }}>
                    <h2 style={{
                        fontSize: '2.2em',
                        color: '#c5a059',
                        marginBottom: '15px',
                        fontFamily: "'UnifrakturMaguntia', cursive",
                        letterSpacing: '2px',
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
                    }}>
                        Welcome, {userName}
                    </h2>
                    <p style={{
                        fontSize: '1em',
                        color: '#8a6d3b',
                        fontStyle: 'italic',
                        marginBottom: '10px',
                        letterSpacing: '1px'
                    }}>
                        What would you like to do today?
                    </p>
                </div>

                {/* Decorative line */}
                <div style={{
                    height: '1px',
                    background: 'linear-gradient(to right, transparent, #c5a059, transparent)',
                    margin: '30px 0'
                }}></div>

                {/* Circular buttons */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '40px',
                    justifyContent: 'center',
                    marginTop: '50px',
                    flexWrap: 'wrap'
                }}>
                    {/* Share Anxiety Button */}
                    <button
                        onClick={() => onNavigate('anxiety')}
                        style={{
                            width: '200px',
                            height: '200px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #c5a059, #a68547)',
                            color: '#0f0b08',
                            border: '5px solid #8a6d3b',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                            padding: '20px',
                            textAlign: 'center'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.background = 'linear-gradient(135deg, #d4af5a, #c5a059)';
                            e.target.style.boxShadow = '0 6px 20px rgba(197, 160, 89, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.5)';
                            e.target.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = 'linear-gradient(135deg, #c5a059, #a68547)';
                            e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
                            e.target.style.transform = 'scale(1)';
                        }}
                    >
                        <div style={{
                            fontSize: '3em',
                            marginBottom: '10px'
                        }}>
                            💭
                        </div>
                        <div style={{
                            fontSize: '1.1em',
                            fontWeight: 'bold',
                            fontFamily: "'Playfair Display', serif",
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                        }}>
                            Share My Anxiety
                        </div>
                    </button>

                    {/* Share Happy Moments Button */}
                    <button
                        onClick={() => onNavigate('share_moments')}
                        style={{
                            width: '200px',
                            height: '200px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #f5f0e8, #e8dbc1)',
                            color: '#8a6d3b',
                            border: '5px solid #8a6d3b',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                            padding: '20px',
                            textAlign: 'center'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#e8dbc1';
                            e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
                            e.target.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = '#f5f0e8';
                            e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
                            e.target.style.transform = 'scale(1)';
                        }}
                    >
                        <div style={{
                            fontSize: '3em',
                            marginBottom: '10px'
                        }}>
                            ✨
                        </div>
                        <div style={{
                            fontSize: '1.1em',
                            fontWeight: 'bold',
                            fontFamily: "'Playfair Display', serif",
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                        }}>
                            Share Happy Moment
                        </div>
                    </button>

                    {/* Browse Temporium Button */}
                    <button
                        onClick={() => onNavigate('browse')}
                        style={{
                            width: '200px',
                            height: '200px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #4a5568, #2d3748)',
                            color: '#c5a059',
                            border: '5px solid #c5a059',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                            padding: '20px',
                            textAlign: 'center'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.background = 'linear-gradient(135deg, #5a6578, #3d4758)';
                            e.target.style.boxShadow = '0 6px 20px rgba(197, 160, 89, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
                            e.target.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = 'linear-gradient(135deg, #4a5568, #2d3748)';
                            e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
                            e.target.style.transform = 'scale(1)';
                        }}
                    >
                        <div style={{
                            fontSize: '3em',
                            marginBottom: '10px'
                        }}>
                            🕐
                        </div>
                        <div style={{
                            fontSize: '1.1em',
                            fontWeight: 'bold',
                            fontFamily: "'Playfair Display', serif",
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                        }}>
                            Browse Temporium
                        </div>
                    </button>
                </div>

                {/* Logout button */}
                <div style={{ marginTop: '60px' }}>
                    <button
                        onClick={() => {
                            localStorage.removeItem('user_nickname');
                            localStorage.removeItem('user_id');
                            localStorage.removeItem('user_age');
                            localStorage.removeItem('user_gender');
                            onNavigate('home');
                        }}
                        style={{
                            padding: '12px 40px',
                            fontSize: '0.9em',
                            fontWeight: 'bold',
                            backgroundColor: '#f5f0e8',
                            color: '#8a6d3b',
                            border: '3px dashed #c5a059',
                            cursor: 'pointer',
                            borderRadius: '20px',
                            transition: 'all 0.3s ease',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            fontFamily: "'Playfair Display', serif"
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.borderColor = '#8a6d3b';
                            e.target.style.color = '#c5a059';
                            e.target.style.backgroundColor = 'rgba(197, 160, 89, 0.05)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.borderColor = '#c5a059';
                            e.target.style.color = '#8a6d3b';
                            e.target.style.backgroundColor = '#f5f0e8';
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
