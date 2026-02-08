import React from 'react';
import { playClickSound } from '../utils/soundUtils';

const HomePage = ({ onNavigate }) => {
  return (
    <div style={{
      width: '100%', textAlign: 'center',
      marginTop: '50px', minHeight: '80vh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px' }}>

        {/* Title */}
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{
            fontSize: '3.8em', color: '#8a6d3b',
            marginBottom: '15px',
            fontFamily: "'UnifrakturMaguntia', cursive",
            letterSpacing: '3px',
            textShadow: '2px 2px 6px rgba(0,0,0,0.2)'
          }}>
            The Anxiety Time Machine
          </h2>
          <p style={{
            fontSize: '1.05em', color: '#8a6d3b',
            fontStyle: 'italic', marginBottom: '12px',
            letterSpacing: '1px',
            fontFamily: "'IM Fell English SC', serif"
          }}>
            A Sanctuary for Temporal Confessions
          </p>
          <p style={{
            fontSize: '0.9em', color: '#5a4a3a',
            letterSpacing: '1px', lineHeight: '1.8',
            fontFamily: "'Playfair Display', serif", maxWidth: '500px',
            margin: '0 auto'
          }}>
            Within these hallowed chambers, time itself becomes witness
            to your deepest solicitudes.<br />
            The great temporal dial awaits your story.
          </p>
        </div>

        {/* Decorative ornament */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: '15px', margin: '35px 0'
        }}>
          <div style={{
            flex: 1, height: '1px',
            background: 'linear-gradient(to right, transparent, #c5a059)'
          }} />
          <span style={{
            color: '#c5a059', fontSize: '1.2em', fontFamily: "'UnifrakturMaguntia', cursive"
          }}>✦</span>
          <div style={{
            flex: 1, height: '1px',
            background: 'linear-gradient(to left, transparent, #c5a059)'
          }} />
        </div>

        {/* Buttons */}
        <div style={{
          display: 'flex', flexDirection: 'column',
          gap: '20px', marginTop: '30px'
        }}>
          <button
            onClick={() => { playClickSound(); onNavigate('register'); }}
            className="btn-brass"
            style={{ width: '100%', padding: '16px 40px', fontSize: '1em' }}
          >
            New Soul Registry
          </button>

          <button
            onClick={() => { playClickSound(); onNavigate('login'); }}
            className="btn-parchment"
            style={{ width: '100%', padding: '16px 40px', fontSize: '1em' }}
          >
            Returning Soul Access
          </button>
        </div>

        {/* Footer text */}
        <div style={{
          marginTop: '60px', fontSize: '0.75em', color: '#8a6d3b',
          letterSpacing: '3px', textTransform: 'uppercase',
          fontFamily: "'IM Fell English SC', serif", opacity: 0.5
        }}>
          ✦ Where Time Meets Truth ✦
        </div>
      </div>
    </div>
  );
};

export default HomePage;