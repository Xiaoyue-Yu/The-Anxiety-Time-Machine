import React, { useState } from 'react';

const LoginPage = ({ onNavigate }) => {
  const [pseudonym, setPseudonym] = useState('');
  const [cipher, setCipher] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!pseudonym || !cipher) {
      setError('Your pseudonym and cipher must be provided to access the archives.');
      return;
    }
    try {
      const response = await fetch('http://127.0.0.1:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nickname: pseudonym, password: cipher }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('user_nickname', pseudonym);
        localStorage.setItem('user_id', data.user_id);
        onNavigate('dashboard');
      } else {
        setError(data.message || 'The cipher doth not align with our records.');
      }
    } catch (err) {
      console.error(err);
      setError('The temporal connection hath failed. Please endeavour anew.');
    }
  };

  return (
    <div style={{ padding: '50px 20px 40px', maxWidth: '500px', margin: '0 auto' }}>
      <h2 style={{
        fontSize: '2.5em', textAlign: 'center', marginBottom: '10px',
        fontFamily: "'UnifrakturMaguntia', cursive",
        color: '#8a6d3b', textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
        letterSpacing: '3px'
      }}>
        Returning Soul
      </h2>

      <p style={{
        textAlign: 'center', color: '#8a6d3b', marginBottom: '30px',
        fontSize: '0.9em', fontStyle: 'italic', letterSpacing: '1px',
        fontFamily: "'IM Fell English SC', serif",
        textTransform: 'uppercase'
      }}>
        Verify Thy Credentials
      </p>

      {error && <div className="error-message" style={{ marginBottom: '20px' }}>{error}</div>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label style={{
            fontFamily: "'IM Fell English SC', serif", color: '#8a6d3b',
            fontWeight: '600', marginBottom: '8px', textTransform: 'uppercase',
            letterSpacing: '2px', display: 'block', fontSize: '0.85em'
          }}>Pseudonym</label>
          <input type="text" value={pseudonym} onChange={(e) => setPseudonym(e.target.value)}
            placeholder="Your secret name" style={{ width: '100%' }} />
        </div>

        <div>
          <label style={{
            fontFamily: "'IM Fell English SC', serif", color: '#8a6d3b',
            fontWeight: '600', marginBottom: '8px', textTransform: 'uppercase',
            letterSpacing: '2px', display: 'block', fontSize: '0.85em'
          }}>Cipher</label>
          <input type="password" value={cipher} onChange={(e) => setCipher(e.target.value)}
            placeholder="Your secret cipher" style={{ width: '100%' }} />
        </div>

        <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
          <button onClick={() => onNavigate('home')} className="btn-parchment" style={{ flex: 1 }}>
            Return
          </button>
          <button onClick={handleLogin} className="btn-brass" style={{ flex: 1 }}>
            Seal Entry
          </button>
        </div>

        <div style={{
          marginTop: '20px', borderTop: '2px dashed #c5a059',
          paddingTop: '20px', textAlign: 'center'
        }}>
          <span style={{
            color: '#8a6d3b', fontSize: '0.9em',
            fontFamily: "'IM Fell English SC', serif"
          }}>
            A newcomer to the Temporium?
          </span>
          <button onClick={() => onNavigate('register')} style={{
            backgroundColor: 'transparent', color: '#c5a059',
            border: 'none', cursor: 'pointer', fontWeight: 'bold',
            marginLeft: '10px', fontSize: '0.9em', textDecoration: 'underline',
            fontFamily: "'IM Fell English SC', serif"
          }}>
            Commence Thy Registration
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;