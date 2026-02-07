import React, { useState } from 'react';

const RegisterPage = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '', password: '', age: '', gender: 'male'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!formData.name || !formData.password || !formData.age) {
      setError('Please complete all required fields');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nickname: formData.name, password: formData.password,
          age: parseInt(formData.age), gender: formData.gender
        }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('user_nickname', formData.name);
        localStorage.setItem('user_id', data.user_id);
        localStorage.setItem('user_age', formData.age);
        localStorage.setItem('user_gender', formData.gender);
        onNavigate('dashboard');
      } else {
        setError(data.message || 'Registration failed.');
      }
    } catch (err) {
      console.error(err);
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const labelStyle = {
    fontFamily: "'IM Fell English SC', serif", color: '#6b5a47',
    fontWeight: '600', marginBottom: '8px', textTransform: 'uppercase',
    letterSpacing: '2px', display: 'block', fontSize: '0.85em'
  };

  return (
    <div style={{ padding: '50px 20px 40px', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{
        fontSize: '2.5em', textAlign: 'center', marginBottom: '40px',
        fontFamily: "'UnifrakturMaguntia', cursive",
        color: '#c5a059', textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
        letterSpacing: '3px'
      }}>
        Identity Registry
      </h2>

      {/* Parchment Letter Container */}
      <div style={{
        background: 'linear-gradient(142deg, #c9b892, #b5a06f)',
        backgroundImage: `
          repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(101, 67, 33, 0.08) 2px, rgba(101, 67, 33, 0.08) 4px),
          repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(101, 67, 33, 0.08) 2px, rgba(101, 67, 33, 0.08) 4px),
          radial-gradient(ellipse 3px 2px at 18% 32%, rgba(101, 67, 33, 0.12), transparent 4px),
          radial-gradient(ellipse 2px 3px at 68% 72%, rgba(101, 67, 33, 0.1), transparent 3px),
          linear-gradient(142deg, #c9b892, #b5a06f)
        `,
        padding: '40px',
        border: '2px solid #6b5a47',
        borderRadius: '0',
        boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.15), 0 8px 20px rgba(0, 0, 0, 0.4)',
        position: 'relative'
      }}>
        {/* Decorative corner */}
        <div style={{
          position: 'absolute',
          top: '8px',
          left: '8px',
          width: '20px',
          height: '20px',
          border: 'solid #6b5a47',
          borderWidth: '2px 0 0 2px'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '8px',
          right: '8px',
          width: '20px',
          height: '20px',
          border: 'solid #6b5a47',
          borderWidth: '0 2px 2px 0'
        }}></div>

        {error && (
          <div style={{
            marginBottom: '20px', padding: '15px',
            background: 'linear-gradient(138deg, #8a4d4d, #6b3a3a)',
            border: '2px solid #a85555', color: '#f0e5d8',
            borderRadius: '0', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
          }}>
            {error}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          <div>
            <label style={labelStyle}>Name</label>
            <input type="text" value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter your name"
              style={{
                width: '100%', padding: '10px', fontFamily: "'Playfair Display', serif",
                background: 'rgba(255, 255, 255, 0.5)', border: '1px solid #5a4830',
                borderRadius: '0', color: '#3a3a3a', fontSize: '0.95em'
              }} />
          </div>
          <div>
            <label style={labelStyle}>Password</label>
            <input type="password" value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Create a secure password"
              style={{
                width: '100%', padding: '10px', fontFamily: "'Playfair Display', serif",
                background: 'rgba(255, 255, 255, 0.5)', border: '1px solid #5a4830',
                borderRadius: '0', color: '#3a3a3a', fontSize: '0.95em'
              }} />
          </div>
          <div>
            <label style={labelStyle}>Age</label>
            <input type="number" value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              placeholder="18" min="10" max="100"
              style={{
                width: '100%', padding: '10px', fontFamily: "'Playfair Display', serif",
                background: 'rgba(255, 255, 255, 0.5)', border: '1px solid #5a4830',
                borderRadius: '0', color: '#3a3a3a', fontSize: '0.95em'
              }} />
          </div>
          <div>
            <label style={labelStyle}>Gender</label>
            <select value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              style={{
                width: '100%', padding: '10px', fontFamily: "'Playfair Display', serif",
                background: 'rgba(255, 255, 255, 0.5)', border: '1px solid #5a4830',
                borderRadius: '0', color: '#3a3a3a', fontSize: '0.95em', cursor: 'pointer'
              }}>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* Decorative line separator */}
        <div style={{
          marginTop: '30px', marginBottom: '25px',
          height: '1px', background: 'linear-gradient(to right, transparent, #6b5a47, transparent)'
        }}></div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '15px' }}>
          <button onClick={() => onNavigate('home')} disabled={loading}
            className="btn-parchment" style={{
              flex: 1, opacity: loading ? 0.6 : 1,
              borderRadius: '0', border: 'none', padding: '14px 30px',
              backgroundColor: '#c9b892', color: '#3a3a3a',
              fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.backgroundColor = '#b5a06f';
                e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.target.style.backgroundColor = '#c9b892';
                e.target.style.boxShadow = 'none';
              }
            }}>
            Cancel
          </button>
          <button onClick={handleSubmit} disabled={loading}
            className="btn-brass" style={{
              flex: 1, opacity: loading ? 0.7 : 1,
              borderRadius: '0', border: 'none', padding: '14px 30px',
              background: 'linear-gradient(135deg, #8a6d3b, #6b5a47)', color: '#f5f0e8',
              fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.background = 'linear-gradient(135deg, #9a7d4b, #7b6a57)';
                e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.target.style.background = 'linear-gradient(135deg, #8a6d3b, #6b5a47)';
                e.target.style.boxShadow = 'none';
              }
            }}>
            {loading ? 'Creating...' : 'Create Account'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;