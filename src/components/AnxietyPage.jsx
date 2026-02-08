import React, { useState } from 'react';
import { playClickSound } from '../utils/soundUtils';

const AnxietyPage = ({ onNavigate }) => {
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        playClickSound();
        if (!description.trim()) { setError('Please enter your anxiety message'); return; }
        setLoading(true);
        try {
            const userId = localStorage.getItem('user_id');
            const response = await fetch('http://127.0.0.1:5000/api/post_anxiety', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: userId, description }),
            });
            const data = await response.json();
            if (response.ok) {
                alert('Your anxiety has been shared in the Temporium');
                onNavigate('browse');
            } else { setError(data.message || 'Failed to save anxiety message.'); }
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
                Share Your Anxiety
            </h2>
            <p style={{
                textAlign: 'center', color: '#8a6d3b', marginBottom: '30px',
                fontSize: '0.9em', fontStyle: 'italic', letterSpacing: '1px',
                fontFamily: "'IM Fell English SC', serif"
            }}>
                Tell us what is weighing on your mind
            </p>

            {error && <div className="error-message" style={{ marginBottom: '20px' }}>{error}</div>}

            <div style={{ marginBottom: '30px' }}>
                <label style={{
                    fontFamily: "'IM Fell English SC', serif", color: '#8a6d3b',
                    fontWeight: '600', marginBottom: '10px', textTransform: 'uppercase',
                    letterSpacing: '2px', display: 'block', fontSize: '0.85em'
                }}>
                    Description of Your Anxiety
                </label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)}
                    placeholder="Share what is troubling you. Your words will be recorded in time..."
                    rows="12" style={{
                        width: '100%', resize: 'vertical', lineHeight: '1.8',
                        fontStyle: 'italic', fontSize: '1em'
                    }} />
            </div>

            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '40px' }}>
                <button onClick={() => onNavigate('dashboard')} disabled={loading}
                    className="btn-parchment" style={{ flex: 1, opacity: loading ? 0.6 : 1 }}>
                    Back
                </button>
                <button onClick={handleSubmit} disabled={loading}
                    className="btn-brass" style={{ flex: 1, opacity: loading ? 0.7 : 1 }}>
                    {loading ? 'Saving...' : 'Save Anxiety'}
                </button>
            </div>
        </div>
    );
};

export default AnxietyPage;