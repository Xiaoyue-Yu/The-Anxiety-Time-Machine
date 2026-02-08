import React, { useState, useEffect, useRef, useCallback } from 'react';
import { User, Heart } from 'lucide-react';
import { playClickSound } from '../utils/soundUtils';

/* =============================================
   STEAMPUNK CLOCK COMPONENT
   - Brass frame with triple ring border
   - Roman numeral-style age markers
   - Victorian ornate hand with glow
   - Drag interaction
   ============================================= */
function SteampunkClock({ age = 25, onAgeChange }) {
  const clockRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const getAgeRange = (v) => Math.floor(v / 10) * 10;
  const getRangeDisplay = (s) => s < 10 ? '0-9' : s >= 100 ? '90-99' : `${s}-${s + 9}`;

  const calcFromEvent = useCallback((cx, cy) => {
    if (!clockRef.current) return;
    const r = clockRef.current.getBoundingClientRect();
    const mx = r.width / 2, my = r.height / 2;
    let a = Math.atan2(cy - (r.top + my), cx - (r.left + mx)) * 180 / Math.PI + 90;
    if (a < 0) a += 360;
    const v = Math.min(99, Math.max(0, Math.round((a / 360) * 99)));
    const rng = getAgeRange(v);
    if (onAgeChange) onAgeChange(rng + 5);
  }, [onAgeChange]);

  const onDown = (e) => { setIsDragging(true); calcFromEvent(e.clientX, e.clientY); };

  useEffect(() => {
    const onMove = (e) => { if (isDragging) calcFromEvent(e.clientX, e.clientY); };
    const onUp = () => setIsDragging(false);
    if (isDragging) {
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
      document.addEventListener('touchmove', (e) => onMove(e.touches[0]));
      document.addEventListener('touchend', onUp);
    }
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
  }, [isDragging, calcFromEvent]);

  const markers = [
    { range: 0, label: '0' }, { range: 10, label: '10' },
    { range: 20, label: '20' }, { range: 30, label: '30' },
    { range: 40, label: '40' }, { range: 50, label: '50' },
    { range: 60, label: '60' }, { range: 70, label: '70' },
    { range: 80, label: '80' }, { range: 90, label: '90' }
  ];

  const currentRange = getAgeRange(age);
  const deg = ((age - 0) / 99) * 360;

  // Tick marks for the clock face
  const ticks = [];
  for (let i = 0; i < 60; i++) {
    const isMajor = i % 5 === 0;
    ticks.push(
      <div key={`tick-${i}`} style={{
        position: 'absolute', left: '50%', top: '8px',
        width: isMajor ? '2px' : '1px',
        height: isMajor ? '14px' : '8px',
        background: isMajor ? 'rgba(44,30,20,0.5)' : 'rgba(44,30,20,0.2)',
        transformOrigin: `50% ${140 - 8}px`,
        transform: `translateX(-50%) rotate(${i * 6}deg)`
      }} />
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Outer brass triple-ring frame */}
      <div style={{
        position: 'relative', width: '300px', height: '300px',
        borderRadius: '50%',
        background: 'linear-gradient(145deg, #8a6d3b, #c5a059, #8a6d3b)',
        padding: '10px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.7), inset 0 2px 4px rgba(255,255,255,0.3)'
      }}>
        {/* Dark ring */}
        <div style={{
          width: '100%', height: '100%', borderRadius: '50%',
          background: '#0f0b08', padding: '4px'
        }}>
          {/* Inner brass ring */}
          <div style={{
            width: '100%', height: '100%', borderRadius: '50%',
            background: 'linear-gradient(145deg, #8a6d3b, #c5a059)', padding: '3px'
          }}>
            {/* Clock face */}
            <div ref={clockRef}
              onMouseDown={onDown}
              onTouchStart={(e) => { setIsDragging(true); calcFromEvent(e.touches[0].clientX, e.touches[0].clientY); }}
              style={{
                width: '100%', height: '100%', borderRadius: '50%',
                background: 'radial-gradient(circle at 35% 35%, #f8f3e8, #e8dbc1, #d4c4a8)',
                position: 'relative', cursor: isDragging ? 'grabbing' : 'grab',
                userSelect: 'none', overflow: 'hidden',
                boxShadow: 'inset 0 0 30px rgba(0,0,0,0.2)'
              }}>

              {/* Subtle texture overlay */}
              <div style={{
                position: 'absolute', inset: 0, borderRadius: '50%', opacity: 0.06,
                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(44,30,20,0.1) 2px, rgba(44,30,20,0.1) 4px)'
              }} />

              {/* Tick marks */}
              {ticks}

              {/* Age range markers */}
              {markers.map((m, i) => {
                const angle = (i * 36 - 90) * Math.PI / 180;
                const radius = 35;
                const x = 50 + radius * Math.cos(angle);
                const y = 50 + radius * Math.sin(angle);
                const isNear = Math.abs(currentRange - m.range) < 15;
                return (
                  <div key={m.label} style={{
                    position: 'absolute', left: `${x}%`, top: `${y}%`,
                    transform: 'translate(-50%, -50%)',
                    fontSize: isNear ? '14px' : '11px',
                    fontWeight: isNear ? 'bold' : '600',
                    color: isNear ? '#c5a059' : '#5a5a5a',
                    fontFamily: "'Playfair Display', serif",
                    width: '35px', textAlign: 'center',
                    transition: 'all 0.3s ease',
                    textShadow: isNear ? '0 0 8px rgba(197,160,89,0.5)' : 'none'
                  }}>
                    {m.label}
                  </div>
                );
              })}

              {/* Clock hand */}
              <div style={{
                position: 'absolute', width: '4px', height: '80px',
                bottom: '50%', left: '50%', marginLeft: '-2px',
                background: 'linear-gradient(to top, #c5a059, #3d2b1f, #1a0f08)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.5), 0 0 12px rgba(197,160,89,0.4)',
                transformOrigin: 'bottom center',
                transform: `rotate(${deg}deg)`,
                transition: isDragging ? 'none' : 'transform 0.2s ease',
                borderRadius: '10px', zIndex: 3
              }}>
                {/* Hand ornament circle */}
                <div style={{
                  position: 'absolute', top: '15px', left: '50%',
                  transform: 'translateX(-50%)',
                  width: '10px', height: '10px', borderRadius: '50%',
                  border: '1.5px solid #1a0f08', background: 'transparent'
                }} />
              </div>

              {/* Center hub - outer */}
              <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '20px', height: '20px', borderRadius: '50%',
                background: '#3d2b1f', border: '2px solid #c5a059',
                boxShadow: '0 0 15px rgba(197,160,89,0.8)',
                zIndex: 4
              }}>
                {/* Center hub - inner jewel */}
                <div style={{
                  position: 'absolute', top: '50%', left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '6px', height: '6px', borderRadius: '50%',
                  background: '#c5a059'
                }} />
              </div>

              {/* Digital readout */}
              <div style={{
                position: 'absolute', top: '62%', left: 0, right: 0,
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                pointerEvents: 'none', zIndex: 5
              }}>
                <span style={{
                  fontSize: '28px', fontWeight: 'bold', color: '#1a0f08',
                  fontFamily: "'IM Fell English SC', serif",
                  letterSpacing: '-1px'
                }}>
                  {getRangeDisplay(currentRange)}
                </span>
                <span style={{
                  fontSize: '8px', textTransform: 'uppercase',
                  letterSpacing: '3px', color: 'rgba(44,30,20,0.4)',
                  fontWeight: 'bold', fontFamily: "'IM Fell English SC', serif"
                }}>
                  Years
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtitle */}
      <p style={{
        marginTop: '16px', fontSize: '0.8em', color: '#8a6d3b',
        fontStyle: 'italic', fontFamily: "'IM Fell English SC', serif",
        letterSpacing: '2px', opacity: 0.7
      }}>
        Turn the dial to traverse temporal epochs
      </p>
    </div>
  );
}

/* =============================================
   BROWSE PAGE COMPONENT
   ============================================= */
const BrowsePage = ({ onNavigate }) => {
  const [age, setAge] = useState(25);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [anxieties, setAnxieties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/get_all_cards')
      .then(res => { if (!res.ok) throw new Error("Failed"); return res.json(); })
      .then(data => { setAnxieties(data); setLoading(false); })
      .catch(err => { console.error("Error:", err); setLoading(false); });
  }, []);

  const filteredAnxieties = anxieties.filter(item => {
    const r = Math.floor(age / 10) * 10;
    return item.age >= r && item.age < r + 10;
  });

  const cur = filteredAnxieties[currentIndex] || null;

  const handleAgeChange = (v) => { setAge(v); setCurrentIndex(0); };
  const handleNext = () => { playClickSound(); setCurrentIndex(i => i < filteredAnxieties.length - 1 ? i + 1 : 0); };
  const handlePrev = () => { playClickSound(); setCurrentIndex(i => i > 0 ? i - 1 : filteredAnxieties.length - 1); };

  return (
    <div style={{ padding: '60px 20px 40px', maxWidth: '850px', margin: '0 auto' }}>

      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '35px' }}>
        <h1 style={{
          fontSize: '2.5em', fontFamily: "'UnifrakturMaguntia', cursive",
          color: '#8a6d3b', marginBottom: '10px',
          textShadow: '2px 2px 4px rgba(0,0,0,0.2)', letterSpacing: '3px'
        }}>
          The Archive: Temporal Pathways
        </h1>
        <p style={{
          color: '#8a6d3b', fontSize: '0.95em', fontStyle: 'italic',
          letterSpacing: '1px', fontFamily: "'IM Fell English SC', serif", opacity: 0.7
        }}>
          Journey through the confessions of souls across time
        </p>
        <div style={{
          height: '1px', margin: '20px auto', maxWidth: '300px',
          background: 'linear-gradient(to right, transparent, #c5a059, transparent)'
        }} />
      </div>

      {/* Clock Section */}
      <div style={{
        background: 'transparent',
        padding: '35px', marginBottom: '30px',
        border: 'none',
        borderRadius: '0',
        boxShadow: 'none',
        transform: 'none'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <span style={{
            color: '#8a6d3b', fontWeight: '600', fontSize: '0.9em',
            textTransform: 'uppercase', letterSpacing: '3px',
            fontFamily: "'IM Fell English SC', serif"
          }}>
            ✦ Turn the Temporal Dial ✦
          </span>
        </div>
        <SteampunkClock age={age} onAgeChange={handleAgeChange} />
      </div>

      {/* Content */}
      {loading ? (
        <div className="loading-text">Connecting to the Archives...</div>
      ) : cur ? (
        <div className="anxiety-card" style={{ marginBottom: '25px' }}>
          {/* Header */}
          <div className="anxiety-card-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div className="avatar-circle">
                <User style={{ width: '26px', height: '26px', color: '#0f0b08' }} />
              </div>
              <div>
                <h3 style={{
                  fontWeight: 'bold', color: '#0f0b08', fontSize: '1.1em',
                  fontFamily: "'Playfair Display', serif", marginBottom: '3px'
                }}>
                  {cur.nickname}
                </h3>
                <p style={{ fontSize: '0.85em', color: '#8a6d3b', fontFamily: "'IM Fell English SC', serif" }}>
                  {cur.age} years · {cur.gender === 'M' ? 'Male' : cur.gender === 'F' ? 'Female' : 'Other'}
                </p>
              </div>
            </div>
            <span style={{
              fontSize: '0.75em', color: '#c5a059',
              fontFamily: "'IM Fell English SC', serif",
              textTransform: 'uppercase', letterSpacing: '2px'
            }}>
              Record #{currentIndex + 1}
            </span>
          </div>

          {/* Body */}
          <div style={{ marginBottom: '20px' }}>
            <p style={{
              color: '#3a3a3a', lineHeight: '1.8', fontSize: '1em',
              fontFamily: "'Playfair Display', serif", fontStyle: 'italic'
            }}>
              "{cur.content || cur.description}"
            </p>
          </div>

          {/* Navigation */}
          <div style={{
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', marginTop: '20px',
            paddingTop: '15px', borderTop: '1px solid rgba(197,160,89,0.3)'
          }}>
            <button onClick={handlePrev} className="btn-parchment" style={{ padding: '10px 24px', fontSize: '0.85em' }}>
              ← Previous
            </button>
            <div style={{
              fontSize: '0.85em', color: '#8a6d3b', fontWeight: '600',
              fontFamily: "'IM Fell English SC', serif"
            }}>
              {currentIndex + 1} / {filteredAnxieties.length}
            </div>
            <button onClick={handleNext} className="btn-brass" style={{ padding: '10px 24px', fontSize: '0.85em' }}>
              Next →
            </button>
          </div>
        </div>
      ) : (
        <div className="empty-state">
          <div style={{
            width: '60px', height: '60px', background: 'linear-gradient(135deg, #c5a059, #a68547)',
            borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 20px', border: '2px solid #8a6d3b'
          }}>
            <Heart style={{ width: '32px', height: '32px', color: '#f5f0e8' }} />
          </div>
          <h3 style={{
            fontSize: '1.1em', fontWeight: 'bold', color: '#0f0b08',
            marginBottom: '10px', fontFamily: "'Playfair Display', serif"
          }}>
            No records found in this epoch
          </h3>
          <p style={{ color: '#8a6d3b', fontSize: '0.9em', fontFamily: "'IM Fell English SC', serif" }}>
            Try adjusting the temporal dial to another age range
          </p>
        </div>
      )}

      {/* Bottom Buttons */}
      <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
        <button onClick={() => { playClickSound(); onNavigate('dashboard'); }} className="btn-parchment" style={{ flex: 1 }}>
          Return Home
        </button>
        <button onClick={() => { playClickSound(); onNavigate('anxiety'); }} className="btn-brass" style={{ flex: 1 }}>
          Share Your Story
        </button>
      </div>
    </div>
  );
};

export default BrowsePage;