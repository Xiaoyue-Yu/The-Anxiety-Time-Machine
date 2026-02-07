import React, { useState } from 'react';

const LoginPage = ({ onNavigate }) => {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!nickname || !password) {
      setError('Please enter your name and password.');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nickname: nickname,
          password: password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('user_nickname', nickname);
        localStorage.setItem('user_id', data.user_id);
        onNavigate('browse');
      } else {
        setError(data.message || 'Login failed. Please check your name and password.');
      }
    } catch (err) {
      console.error(err);
      setError('Unable to connect to the server.');
    }
  };

  return (
    <div style={{ padding: '50px 20px 40px 20px', maxWidth: '500px', margin: '0 auto' }}>
      <h2 style={{
        fontSize: '2.2em',
        textAlign: 'center',
        marginBottom: '10px',
        fontFamily: "'UnifrakturMaguntia', cursive",
        color: '#c5a059',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
        letterSpacing: '2px'
      }}>
        Access Archives
      </h2>

      <p style={{
        textAlign: 'center',
        color: '#8a6d3b',
        marginBottom: '30px',
        fontSize: '0.9em',
        fontStyle: 'italic',
        letterSpacing: '1px'
      }}>
        AUTHENTICATE YOUR IDENTITY
      </p>

      {error && (
        <div style={{
          marginBottom: '20px',
          padding: '15px',
          background: 'linear-gradient(138deg, #8a4d4d, #6b3a3a)',
          border: '3px solid #a85555',
          color: '#f0e5d8',
          borderRadius: '15px 10px 18px 12px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
          transform: 'rotate(-0.3deg)'
        }}>
          {error}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label style={{ fontFamily: "'Playfair Display', serif", color: '#8a6d3b', fontWeight: '600', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', fontSize: '0.9em' }}>Name</label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="Your name"
            style={{
              fontFamily: "'Playfair Display', serif",
              background: 'linear-gradient(138deg, #f5f0e8, #e8dbc1)',
              border: '3px solid #8a6d3b',
              color: '#3a3a3a',
              padding: '10px 15px',
              borderRadius: '12px 18px 10px 15px',
              width: '100%',
              transition: 'all 0.3s ease',
              boxShadow: 'inset 0 2px 5px rgba(0, 0, 0, 0.1)'
            }}
          />
        </div>

        <div>
          <label style={{ fontFamily: "'Playfair Display', serif", color: '#8a6d3b', fontWeight: '600', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', fontSize: '0.9em' }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
            style={{
              fontFamily: "'Playfair Display', serif",
              background: 'linear-gradient(138deg, #f5f0e8, #e8dbc1)',
              border: '3px solid #8a6d3b',
              color: '#3a3a3a',
              padding: '10px 15px',
              borderRadius: '15px 10px 18px 12px',
              width: '100%',
              transition: 'all 0.3s ease',
              boxShadow: 'inset 0 2px 5px rgba(0, 0, 0, 0.1)'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
          <button
            onClick={() => onNavigate('home')}
            style={{
              padding: '12px 40px',
              fontSize: '0.9em',
              fontWeight: 'bold',
              backgroundColor: '#f5f0e8',
              color: '#8a6d3b',
              border: '3px solid #8a6d3b',
              cursor: 'pointer',
              borderRadius: '18px 12px 20px 15px',
              transition: 'all 0.3s ease',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              flex: 1,
              transform: 'rotate(-0.5deg)'
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
            Return
          </button>
          <button
            onClick={handleLogin}
            style={{
              padding: '12px 40px',
              fontSize: '0.9em',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #c5a059, #a68547)',
              color: '#0f0b08',
              border: '3px solid #8a6d3b',
              cursor: 'pointer',
              borderRadius: '15px 20px 12px 18px',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              flex: 1,
              transform: 'rotate(0.5deg)'
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
            Login
          </button>
        </div>

        <div style={{ marginTop: '20px', borderTop: '2px dashed #c5a059', paddingTop: '20px', textAlign: 'center' }}>
          <span style={{ color: '#8a6d3b', fontSize: '0.9em' }}>No record yet?</span>
          <button
            onClick={() => onNavigate('register')}
            style={{
              backgroundColor: 'transparent',
              color: '#c5a059',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold',
              marginLeft: '10px',
              fontSize: '0.9em',
              textDecoration: 'underline'
            }}
            onMouseEnter={(e) => e.target.style.color = '#d4af5a'}
            onMouseLeave={(e) => e.target.style.color = '#c5a059'}
          >
            Create One
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;