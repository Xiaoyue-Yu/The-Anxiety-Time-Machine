import React, { useState } from 'react';
import { BookOpen, Briefcase, Heart, Users, User, Home, MessageCircle, Brain, DollarSign } from 'lucide-react';

const RegisterPage = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    nickname: '',
    password: '',
    age: '',
    gender: 'male',
    tag: [],
    description: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!formData.nickname || !formData.password || !formData.age || !formData.description) {
      setError('Please fill in all fields (including password)');
      return;
    }

    if (formData.tag.length === 0) {
      setError('Please select at least one anxiety type');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          age: parseInt(formData.age)
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful! Please log in.");
        onNavigate('login');
      } else {
        setError(data.message || 'Registration failed.');
      }

    } catch (err) {
      console.error(err);
      setError('Unable to connect to the server.');
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
        Record Your Confession
      </h2>

      <p style={{
        textAlign: 'center',
        color: '#8a6d3b',
        marginBottom: '30px',
        fontSize: '0.9em',
        fontStyle: 'italic',
        letterSpacing: '1px'
      }}>
        PERSPECTIVE: UNKNOWN ARCHIVER
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
          <label style={{ fontFamily: "'Playfair Display', serif", color: '#8a6d3b', fontWeight: '600', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', fontSize: '0.9em' }}>Name</label>
          <input
            type="text"
            value={formData.nickname}
            onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
            placeholder="Your name"
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
          <label style={{ fontFamily: "'Playfair Display', serif", color: '#8a6d3b', fontWeight: '600', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', fontSize: '0.9em' }}>Password</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="Set password"
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
          Category of Concern <span style={{ fontSize: '0.8em', color: '#8a6d3b' }}>(Select up to 3)</span>
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
          {['Academic', 'Career', 'Relationship', 'Life', 'Friendship', 'Family', 'Self-Identity', 'Health', 'Social Skills', 'Mental Health', 'Money'].map((anxiety) => {
            const icons = {
              'Academic': <BookOpen className="w-4 h-4 mr-2" />,
              'Career': <Briefcase className="w-4 h-4 mr-2" />,
              'Relationship': <Heart className="w-4 h-4 mr-2" />,
              'Life': <Home className="w-4 h-4 mr-2" />,
              'Friendship': <Users className="w-4 h-4 mr-2" />,
              'Family': <Home className="w-4 h-4 mr-2" />,
              'Self-Identity': <User className="w-4 h-4 mr-2" />,
              'Health': <Heart className="w-4 h-4 mr-2" />,
              'Social Skills': <MessageCircle className="w-4 h-4 mr-2" />,
              'Mental Health': <Brain className="w-4 h-4 mr-2" />,
              'Money': <DollarSign className="w-4 h-4 mr-2" />
            };

            return (
              <label key={anxiety} style={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px',
                borderRadius: '2px',
                border: `2px solid ${formData.tag.includes(anxiety) ? '#c5a059' : '#b8956a'}`,
                backgroundColor: formData.tag.includes(anxiety) ? 'rgba(197, 160, 89, 0.25)' : 'transparent',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                color: formData.tag.includes(anxiety) ? '#8a6d3b' : '#5a5a5a',
                fontSize: '0.85em'
              }}>
                <input
                  type="checkbox"
                  value={anxiety}
                  checked={formData.tag.includes(anxiety)}
                  onChange={(e) => {
                    const value = e.target.value;
                    const newTags = formData.tag.includes(value)
                      ? formData.tag.filter(t => t !== value)
                      : formData.tag.length < 3
                        ? [...formData.tag, value]
                        : formData.tag;
                    setFormData({ ...formData, tag: newTags });
                  }}
                  style={{ marginRight: '6px', width: '14px', height: '14px', cursor: 'pointer' }}
                />
                {icons[anxiety]}
                <span>{anxiety}</span>
              </label>
            );
          })}
        </div>
        {formData.tag.length === 3 && (
          <p style={{ marginTop: '12px', fontSize: '0.85em', color: '#8a6d3b', fontStyle: 'italic' }}>
            Maximum entries recorded
          </p>
        )}
      </div>

      <div style={{ marginBottom: '30px' }}>
        <label style={{ fontFamily: "'Playfair Display', serif", color: '#c5a059', fontWeight: '600', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', fontSize: '0.95em' }}>Your Confession</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Let the archive hear your words..."
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
          Submit Confession
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;