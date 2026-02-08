import React, { useState } from 'react';
import { playClickSound } from '../utils/soundUtils';

const ShareMomentsPage = ({ onNavigate }) => {
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        playClickSound();
        if (!description.trim()) { setError('Please enter your happy moment'); return; }
        setLoading(true);
        try {
            alert('Your happy moment has been shared in the Temporium');
            onNavigate('dashboard');
        } catch (err) {
            console.error(err);
            setError('Connection error. Please try again.');
        } finally { setLoading(false); }
    };

    return (
        <div style={{ padding: '50px 20px 40px', maxWidth: '700px', margin: '0 auto' }}>
            <h2 style={{
                fontSize: '2.5em', textAlign: 'center', marginBottom: '10px',
                fontFamily: "'UnifrakturMaguntia', cursive",
                color: '#8a6d3b', textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                letterSpacing: '3px'
            }}>
                Share a Happy Moment
            </h2>
            <p style={{
                textAlign: 'center', color: '#8a6d3b', marginBottom: '30px',
                fontSize: '0.9em', fontStyle: 'italic', letterSpacing: '1px',
                fontFamily: "'IM Fell English SC', serif"
            }}>
                Tell us about something that made you happy
            </p>

            {error && <div className="error-message" style={{ marginBottom: '20px' }}>{error}</div>}

            <div style={{ marginBottom: '30px' }}>
                <label style={{
                    fontFamily: "'IM Fell English SC', serif", color: '#8a6d3b',
                    fontWeight: '600', marginBottom: '10px', textTransform: 'uppercase',
                    letterSpacing: '2px', display: 'block', fontSize: '0.85em'
                }}>
                    Your Happy Moment
                </label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)}
                    placeholder="Share a moment that brought you joy or peace..."
                    rows="12" style={{
                        width: '100%', resize: 'vertical', lineHeight: '1.8',
                        fontStyle: 'italic', fontSize: '1em'
                    }} />
            </div>

            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '40px' }}>
                <button onClick={() => { playClickSound(); onNavigate('dashboard'); }} disabled={loading}
                    className="btn-parchment" style={{ flex: 1, opacity: loading ? 0.6 : 1 }}>
                    Back
                </button>
                <button onClick={handleSubmit} disabled={loading}
                    className="btn-brass" style={{ flex: 1, opacity: loading ? 0.7 : 1 }}>
                    {loading ? 'Sharing...' : 'Share Moment'}
                </button>
            </div>
        </div>
    );
};

export default ShareMomentsPage;