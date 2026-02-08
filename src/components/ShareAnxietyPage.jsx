import React, { useState } from 'react';
import { playClickSound } from '../utils/soundUtils';

const ShareAnxietyPage = ({ onNavigate }) => {
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        playClickSound();
        if (!description.trim()) {
            setError('Please enter your anxiety message');
            return;
        }

        setLoading(true);
        try {
            const userId = localStorage.getItem('user_id');

            const response = await fetch('http://127.0.0.1:5000/api/post_anxiety', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: userId,
                    description: description
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Your anxiety has been shared in the Temporium');
                onNavigate('browse');
            } else {
                setError(data.message || 'Failed to save anxiety message.');
            }

        } catch (err) {
            console.error(err);
            setError('Connection error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '50px 20px 40px 20px', maxWidth: '700px', margin: '0 auto' }}>
            <h2 style={{
                fontSize: '2.2em',
                textAlign: 'center',
                marginBottom: '10px',
                fontFamily: "'UnifrakturMaguntia', cursive",
                color: '#c5a059',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                letterSpacing: '2px'
            }}>
                Share Your Anxiety
            </h2>

            <p style={{
                textAlign: 'center',
                color: '#8a6d3b',
                marginBottom: '30px',
                fontSize: '0.9em',
                fontStyle: 'italic',
                letterSpacing: '1px'
            }}>
                Tell us what is weighing on your mind
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

            <div style={{ marginBottom: '30px' }}>
                <label style={{ fontFamily: "'Playfair Display', serif", color: '#c5a059', fontWeight: '600', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', fontSize: '0.95em' }}>
                    Description of Your Anxiety
                </label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Share what is troubling you. Your words will be recorded in time..."
                    rows="12"
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
                    onClick={() => { playClickSound(); onNavigate('dashboard'); }}
                    disabled={loading}
                    style={{
                        padding: '12px 40px',
                        fontSize: '0.9em',
                        fontWeight: 'bold',
                        backgroundColor: '#c9b892',
                        color: '#3a3a3a',
                        border: 'none',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        borderRadius: '0',
                        transition: 'all 0.3s ease',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        flex: 1,
                        transform: 'none',
                        opacity: loading ? 0.6 : 1
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
                    }}
                >
                    Back
                </button>
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    style={{
                        padding: '12px 40px',
                        fontSize: '0.9em',
                        fontWeight: 'bold',
                        background: loading ? '#6b5a47' : 'linear-gradient(135deg, #8a6d3b, #6b5a47)',
                        color: '#f5f0e8',
                        border: 'none',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        borderRadius: '0',
                        transition: 'all 0.3s ease',
                        boxShadow: 'none',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        flex: 1,
                        transform: 'none',
                        opacity: loading ? 0.7 : 1
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
                    }}
                >
                    {loading ? 'Sharing...' : 'Share Anxiety'}
                </button>
            </div>
        </div>
    );
};

export default ShareAnxietyPage;
