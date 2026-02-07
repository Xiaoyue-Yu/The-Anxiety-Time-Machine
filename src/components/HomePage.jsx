import React from 'react';

const HomePage = ({ onNavigate }) => {
  return (
    <div style={{ 
      width: '100%',
      textAlign: 'center',
      marginTop: '50px'
    }}>
      {/* 中心内容区 */}
      <div style={{
        maxWidth: '700px',
        margin: '0 auto'
      }}>
        {/* 副标题 */}
        <div style={{
          marginBottom: '50px'
        }}>
          <h2 style={{
            fontSize: '2.2em',
            color: '#c5a059',
            marginBottom: '15px',
            fontFamily: "'UnifrakturMaguntia', cursive",
            letterSpacing: '2px',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
          }}>
            The Anxiety Temporium
          </h2>
          <p style={{
            fontSize: '1em',
            color: '#8a6d3b',
            fontStyle: 'italic',
            marginBottom: '10px',
            letterSpacing: '1px'
          }}>
            A Sanctuary for Temporal Confessions
          </p>
          <p style={{
            fontSize: '0.9em',
            color: '#d4c4a8',
            letterSpacing: '1px',
            lineHeight: '1.6'
          }}>
            Within these hallowed chambers, time itself becomes witness to your deepest solicitudes.<br />
            The great temporal dial awaits your story.
          </p>
        </div>

        {/* 装饰线 */}
        <div style={{
          height: '1px',
          background: 'linear-gradient(to right, transparent, #c5a059, transparent)',
          margin: '30px 0'
        }}></div>

        {/* 按钮组 */}
        <div style={{ 
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          marginTop: '40px'
        }}>
          <button
            onClick={() => onNavigate('register')}
            style={{
              padding: '12px 40px',
              fontSize: '0.9em',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #c5a059, #a68547)',
              color: '#0f0b08',
              border: '3px solid #8a6d3b',
              cursor: 'pointer',
              borderRadius: '18px 12px 20px 15px',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              width: '100%',
              transform: 'rotate(-0.5deg)'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'linear-gradient(135deg, #d4af5a, #c5a059)';
              e.target.style.boxShadow = '0 6px 20px rgba(197, 160, 89, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.5)';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'linear-gradient(135deg, #c5a059, #a68547)';
              e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            New Soul: Sign the Registry
          </button>
          
          <button
            onClick={() => onNavigate('login')}
            style={{
              padding: '12px 40px',
              fontSize: '0.9em',
              fontWeight: 'bold',
              backgroundColor: '#f5f0e8',
              color: '#8a6d3b',
              border: '3px solid #8a6d3b',
              cursor: 'pointer',
              borderRadius: '15px 20px 12px 18px',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              width: '100%',
              transform: 'rotate(0.3deg)'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#e8dbc1';
              e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#f5f0e8';
              e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            Returning Soul: Access Records
          </button>

          <button
            onClick={() => onNavigate('browse')}
            style={{
              padding: '12px 40px',
              fontSize: '0.85em',
              color: '#8a6d3b',
              background: 'transparent',
              border: '3px dashed #8a6d3b',
              cursor: 'pointer',
              borderRadius: '20px 15px 18px 12px',
              transition: 'all 0.3s ease',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              width: '100%',
              transform: 'rotate(-0.3deg)'
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = '#c5a059';
              e.target.style.color = '#c5a059';
              e.target.style.backgroundColor = 'rgba(197, 160, 89, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = '#8a6d3b';
              e.target.style.color = '#8a6d3b';
              e.target.style.backgroundColor = 'transparent';
            }}
          >
            The Archive: Browse Souls
          </button>
        </div>

        {/* 底部装饰文本 */}
        <div style={{
          marginTop: '60px',
          fontSize: '0.8em',
          color: '#5a5a5a',
          letterSpacing: '2px',
          textTransform: 'uppercase'
        }}>
          Where Time Meets Truth
        </div>
      </div>
    </div>
  );
};

export default HomePage;