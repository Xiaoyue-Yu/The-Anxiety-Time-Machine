import React, { useState } from 'react';
import { playClickSound } from '../utils/soundUtils';

const TAG_CATEGORIES = ["Career", "Family", "Love", "Health", "Self", "Money", "Future", "Life"];

const ShareMomentsPage = ({ onNavigate }) => {
    const [description, setDescription] = useState('');
    const [selectedTag, setSelectedTag] = useState('Life'); 
    const [swapResult, setSwapResult] = useState(null); 

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        playClickSound();
        let userId = localStorage.getItem('user_id');
        if (!userId) userId = "0"; 

        if (!description.trim()) { 
            setError('Please enter your happy moment'); 
            return; 
        }

        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://127.0.0.1:5000/api/pleasure/swap', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: userId,
                    content: description,
                    tag: selectedTag
                })
            });

            const data = await response.json();

            if (response.ok) {
                setSwapResult(data);
            } else {
                setError(data.message || 'The stars failed to align. Please try again.');
            }

        } catch (err) {
            console.error(err);
            setError('Connection severed by time distortion. Check your network.');
        } finally { 
            setLoading(false); 
        }
    };

    const handleReset = () => {
        setSwapResult(null);
        setDescription('');
        setSelectedTag('Life');
        setError('');
    };

    if (swapResult) {
        return (
            <div style={{ padding: '50px 20px', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
                <h2 style={{
                    fontFamily: "'UnifrakturMaguntia', cursive",
                    color: '#c5a059',
                    fontSize: '2.5em',
                    marginBottom: '10px',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
                }}>
                    ✨ Destiny Intertwined ✨
                </h2>
                
                <p style={{ color: '#8a6d3b', fontStyle: 'italic', marginBottom: '30px', fontFamily: "'IM Fell English SC', serif" }}>
                    You shared a light from the <strong>{swapResult.final_tag}</strong> nebula...<br/>
                    and the universe echoed back.
                </p>

                <div style={{
                    background: 'linear-gradient(135deg, #f5f0e8, #e8dbc1)',
                    border: '4px double #8a6d3b',
                    padding: '30px',
                    borderRadius: '15px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                    marginBottom: '30px',
                    transform: 'rotate(-0.5deg)',
                    position: 'relative'
                }}>
                    <div style={{ 
                        fontSize: '1.2em', 
                        fontFamily: "'Playfair Display', serif", 
                        color: '#3a3a3a', 
                        lineHeight: '1.6',
                        marginBottom: '20px',
                        fontStyle: 'italic'
                    }}>
                        "{swapResult.match_found ? swapResult.data.content : swapResult.message}"
                    </div>

                    {swapResult.match_found && (
                        <div style={{ 
                            borderTop: '1px dashed #8a6d3b', 
                            paddingTop: '15px',
                            color: '#8a6d3b',
                            fontSize: '0.9em',
                            fontFamily: "'IM Fell English SC', serif",
                            textAlign: 'right'
                        }}>
                            — From <strong>{swapResult.data.nickname}</strong> 
                            {swapResult.data.age ? `, Age ${swapResult.data.age}` : ''}
                        </div>
                    )}
                </div>

                <div style={{ fontSize: '0.8em', color: '#b8956a', marginBottom: '30px', fontFamily: "'Playfair Display', serif" }}>
                    (Method: {swapResult.used_method === 'AI' ? '🔮 Gemini Oracle' : '🏷️ Manual Tagging'})
                </div>

                <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '30px' }}>
                    <button 
                        onClick={handleReset}
                        className="btn-parchment"
                        style={{ padding: '12px 30px', flex: 1 }}
                    >
                        Share Another
                    </button>
                    <button 
                        onClick={() => onNavigate('dashboard')}
                        className="btn-brass"
                        style={{ padding: '12px 30px', flex: 1 }}
                    >
                        Return to Dashboard
                    </button>
                </div>
            </div>
        );
    }

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

            <div style={{ marginBottom: '25px' }}>
                <label style={{ 
                    fontFamily: "'IM Fell English SC', serif", color: '#8a6d3b', 
                    fontWeight: '600', marginBottom: '10px', textTransform: 'uppercase', 
                    letterSpacing: '2px', display: 'block', fontSize: '0.85em' 
                }}>
                    Choose a Realm (Tag)
                </label>
                <select
                    value={selectedTag}
                    onChange={(e) => setSelectedTag(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '12px',
                        fontFamily: "'Playfair Display', serif",
                        background: '#f5f0e8',
                        border: '2px solid #8a6d3b', 
                        color: '#3a3a3a',
                        borderRadius: '4px',
                        fontSize: '1em',
                        cursor: 'pointer',
                        boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.1)'
                    }}
                >
                    {TAG_CATEGORIES.map(tag => (
                        <option key={tag} value={tag}>{tag}</option>
                    ))}
                </select>
                <p style={{ fontSize: '0.8em', color: '#8a6d3b', marginTop: '8px', fontStyle: 'italic', fontFamily: "'Playfair Display', serif" }}>
                    * The Gemini Oracle will also try to sense your intent automatically.
                </p>
            </div>

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
                    {loading ? 'Consulting Stars...' : 'Swap & Illuminate'}
                </button>
            </div>
        </div>
    );
};

export default ShareMomentsPage;