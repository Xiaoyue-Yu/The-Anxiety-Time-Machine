import React, { useState } from 'react';
import { ANXIETY_TYPES } from '../data/mockData';

const RegisterPage = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    pseudonym: '',
    cipher: '',
    age: '',
    gender: 'male',
    tags: [],
    confession: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!formData.pseudonym || !formData.cipher || !formData.age || !formData.confession) {
      setError('All fields must be completed to sign the registry.');
      return;
    }

    if (formData.tags.length === 0) {
      setError('Thou must select at least one solicitude to record.');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nickname: formData.pseudonym,
          password: formData.cipher,
          age: parseInt(formData.age),
          gender: formData.gender,
          tag: formData.tags,
          description: formData.confession
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Thy confession hath been sealed within the Temporium archives.");
        onNavigate('login');
      } else {
        setError(data.message || 'The registry hath rejected thy inscription.');
      }

    } catch (err) {
      console.error(err);
      setError('Alas, the temporal connection hath failed. Please endeavour anew.');
    }
  };
  return (
    <div style={{ padding: '50px 20px 40px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <h2 style={{
        fontSize: '2.2em',
        textAlign: 'center',
        marginBottom: '10px',
        fontFamily: "'UnifrakturMaguntia', cursive",
        color: '#c5a059',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
        letterSpacing: '2px'
      }}>
        New Soul: Sign the Registry
      </h2>

      <p style={{
        textAlign: 'center',
        color: '#8a6d3b',
        marginBottom: '30px',
        fontSize: '0.9em',
        fontStyle: 'italic',
        letterSpacing: '1px'
      }}>
        LET THY IDENTITY BE RECORDED
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

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '30px' }}>
        <div>
          <label style={{ fontFamily: "'Playfair Display', serif", color: '#8a6d3b', fontWeight: '600', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', fontSize: '0.9em' }}>Pseudonym</label>
          <input
            type="text"
            value={formData.pseudonym}
            onChange={(e) => setFormData({ ...formData, pseudonym: e.target.value })}
            placeholder="Your secret name"
            style={{
              fontFamily: "'Playfair Display', serif",
              background: 'linear-gradient(135deg, #f5f0e8, #e8dbc1)',
              border: '2px solid #8a6d3b',
              color: '#3a3a3a',
              padding: '10px 15px',
              borderRadius: '2px',
              width: '100%',
              transition: 'all 0.3s ease',
              boxShadow: 'inset 0 2px 5px rgba(0, 0, 0, 0.1)'
            }}
          />
        </div>

        <div>
          <label style={{ fontFamily: "'Playfair Display', serif", color: '#8a6d3b', fontWeight: '600', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', fontSize: '0.9em' }}>Cipher</label>
          <input
            type="password"
            value={formData.cipher}
            onChange={(e) => setFormData({ ...formData, cipher: e.target.value })}
            placeholder="Create a secret cipher"
            style={{
              fontFamily: "'Playfair Display', serif",
              background: 'linear-gradient(135deg, #f5f0e8, #e8dbc1)',
              border: '2px solid #8a6d3b',
              color: '#3a3a3a',
              padding: '10px 15px',
              borderRadius: '2px',
              width: '100%',
              transition: 'all 0.3s ease',
              boxShadow: 'inset 0 2px 5px rgba(0, 0, 0, 0.1)'
            }}
          />
        </div>

        <div>
          <label style={{ fontFamily: "'Playfair Display', serif", color: '#8a6d3b', fontWeight: '600', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', fontSize: '0.9em' }}>Age</label>
          <input
            type="number"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            placeholder="18"
            min="10"
            max="100"
            style={{
              fontFamily: "'Playfair Display', serif",
              background: 'linear-gradient(135deg, #f5f0e8, #e8dbc1)',
              border: '2px solid #8a6d3b',
              color: '#3a3a3a',
              padding: '10px 15px',
              borderRadius: '2px',
              width: '100%',
              transition: 'all 0.3s ease',
              boxShadow: 'inset 0 2px 5px rgba(0, 0, 0, 0.1)'
            }}
          />
        </div>

        <div>
          <label style={{ fontFamily: "'Playfair Display', serif", color: '#8a6d3b', fontWeight: '600', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', fontSize: '0.9em' }}>Gender</label>
          <select
            value={formData.gender}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            style={{
              fontFamily: "'Playfair Display', serif",
              background: 'linear-gradient(135deg, #f5f0e8, #e8dbc1)',
              border: '2px solid #8a6d3b',
              color: '#3a3a3a',
              padding: '10px 15px',
              borderRadius: '2px',
              width: '100%',
              transition: 'all 0.3s ease',
              boxShadow: 'inset 0 2px 5px rgba(0, 0, 0, 0.1)',
              cursor: 'pointer'
            }}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <label style={{ fontFamily: "'Playfair Display', serif", color: '#c5a059', fontWeight: '600', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', fontSize: '1em' }}>
          Solicitudes Afflicting Thy Soul <span style={{ fontSize: '0.8em', color: '#8a6d3b' }}>(Select thy concerns)</span>
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
          {ANXIETY_TYPES.map((anxiety) => {
            return (
              <label key={anxiety.id} style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                padding: '15px',
                borderRadius: '2px',
                border: `2px solid ${formData.tags.includes(anxiety.label) ? '#c5a059' : '#b8956a'}`,
                backgroundColor: formData.tags.includes(anxiety.label) ? 'rgba(197, 160, 89, 0.25)' : 'transparent',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                color: formData.tags.includes(anxiety.label) ? '#8a6d3b' : '#5a5a5a',
                fontSize: '0.85em',
                textAlign: 'center'
              }}>
                <input
                  type="checkbox"
                  value={anxiety.label}
                  checked={formData.tags.includes(anxiety.label)}
                  onChange={(e) => {
                    const value = e.target.value;
                    const newTags = formData.tags.includes(value)
                      ? formData.tags.filter(t => t !== value)
                      : [...formData.tags, value];
                    setFormData({ ...formData, tags: newTags });
                  }}
                  style={{ marginBottom: '8px', width: '16px', height: '16px', cursor: 'pointer' }}
                />
                <span style={{ fontWeight: '600', fontSize: '0.9em' }}>{anxiety.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <label style={{ fontFamily: "'Playfair Display', serif", color: '#c5a059', fontWeight: '600', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', fontSize: '0.95em' }}>Thy Confession</label>
        <textarea
          value={formData.confession}
          onChange={(e) => setFormData({ ...formData, confession: e.target.value })}
          placeholder="Unburden thy solicitudes within these temporal archives. Let thy words be witnessed by time itself..."
          rows="10"
          style={{
            fontFamily: "'Playfair Display', serif",
            background: 'linear-gradient(135deg, #f5f0e8, #e8dbc1)',
            border: '2px solid #8a6d3b',
            color: '#3a3a3a',
            padding: '15px',
            borderRadius: '2px',
            width: '100%',
            transition: 'all 0.3s ease',
            boxShadow: 'inset 0 2px 5px rgba(0, 0, 0, 0.1)',
            resize: 'vertical',
            lineHeight: '1.6'
          }}
        />
      </div>

      <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '40px' }}>
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
          onClick={handleSubmit}
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
          Seal Entry
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;