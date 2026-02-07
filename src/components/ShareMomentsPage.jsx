import React, { useState } from 'react';

const ShareMomentsPage = ({ onNavigate }) => {
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!description.trim()) {
            setError('Please enter your happy moment');
            return;
        }

        setLoading(true);
        try {
            // TODO: Add API endpoint for saving happy moments
            alert('Your happy moment has been shared in the Temporium');
            onNavigate('dashboard');

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
                Share a Happy Moment
            </h2>

            <p style={{
                textAlign: 'center',
                color: '#8a6d3b',
                marginBottom: '30px',
                fontSize: '0.9em',
                fontStyle: 'italic',
                letterSpacing: '1px'
            }}>
                Tell us about something that made you happy
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
                    Your Happy Moment
                </label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Share a moment that brought you joy or peace..."
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
                    onClick={() => onNavigate('dashboard')}
                    disabled={loading}
                    style={{
                        padding: '12px 40px',
                        fontSize: '0.9em',
                        fontWeight: 'bold',
                        backgroundColor: '#f5f0e8',
                        color: '#8a6d3b',
                        border: '3px solid #8a6d3b',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        borderRadius: '18px 12px 20px 15px',
                        transition: 'all 0.3s ease',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        flex: 1,
                        transform: 'rotate(-0.5deg)',
                        opacity: loading ? 0.6 : 1
                    }}
                    onMouseEnter={(e) => {
                        if (!loading) {
                            e.target.style.backgroundColor = '#e8dbc1';
                            e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
                            e.target.style.transform = 'translateY(-2px)';
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (!loading) {
                            e.target.style.backgroundColor = '#f5f0e8';
                            e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
                            e.target.style.transform = 'translateY(0)';
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
                        background: loading ? '#b8956a' : 'linear-gradient(135deg, #c5a059, #a68547)',
                        color: '#0f0b08',
                        border: '3px solid #8a6d3b',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        borderRadius: '15px 20px 12px 18px',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        flex: 1,
                        transform: 'rotate(0.5deg)',
                        opacity: loading ? 0.7 : 1
                    }}
                    onMouseEnter={(e) => {
                        if (!loading) {
                            e.target.style.background = 'linear-gradient(135deg, #d4af5a, #c5a059)';
                            e.target.style.boxShadow = '0 6px 20px rgba(197, 160, 89, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.5)';
                            e.target.style.transform = 'translateY(-2px)';
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (!loading) {
                            e.target.style.background = 'linear-gradient(135deg, #c5a059, #a68547)';
                            e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
                            e.target.style.transform = 'translateY(0)';
                        }
                    }}
                >
                    {loading ? 'Sharing...' : 'Share Moment'}
                </button>
            </div>
        </div>
    );
};

export default ShareMomentsPage;
