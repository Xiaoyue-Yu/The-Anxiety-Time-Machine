import React, { useState, useEffect } from 'react';
import { User, Heart, BookOpen, Briefcase } from 'lucide-react';
import { mockData } from '../data/mockData';

function SteampunkClock({ age = 25, onAgeChange }) {
  const [isDragging, setIsDragging] = useState(false);

  const handleClockClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    
    let angle = Math.atan2(clickY - centerY, clickX - centerX) * 180 / Math.PI + 90;
    if (angle < 0) angle += 360;
    
    // Convert angle to age (0° = 10, 360° = 100)
    const newAge = Math.min(100, Math.max(10, Math.round(10 + (angle / 360) * 90)));
    if (onAgeChange) onAgeChange(newAge);
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const clock = document.querySelector('.age-selector-clock');
      if (clock) {
        const rect = clock.getBoundingClientRect();
        handleClockClick({ currentTarget: clock, clientX: e.clientX, clientY: e.clientY, target: clock });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // Generate age markers (10, 20, 30, ... 100)
  const ageMarkers = Array.from({ length: 10 }, (_, i) => 10 + i * 10);
  
  // Convert age to degrees (10 = 0°, 100 = 360°)
  const ageDegrees = ((age - 10) / 90) * 360;

  return (
    <div 
      className="age-selector-clock"
      onClick={handleClockClick}
      onMouseDown={handleMouseDown}
      style={{ 
        cursor: isDragging ? 'grabbing' : 'grab', 
        userSelect: 'none',
        width: '250px',
        height: '250px',
        border: '5px solid #5a4a3a',
        borderRadius: '50%',
        background: 'radial-gradient(circle at 30% 30%, #f5f0e8, #e8dbc1)',
        boxShadow: 'inset 0 0 25px rgba(0, 0, 0, 0.3), 0 15px 40px rgba(0, 0, 0, 0.6), 0 0 0 12px #0f0b08, 0 0 0 15px #8a6d3b',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        margin: '0 auto'
      }}
    >
      {/* 年龄刻度标记 */}
      {ageMarkers.map((ageMarker, index) => {
        const angle = (index * 36 - 90) * Math.PI / 180;
        const radius = 35;
        const x = 50 + radius * Math.cos(angle);
        const y = 50 + radius * Math.sin(angle);
        return (
          <div
            key={ageMarker}
            style={{
              position: 'absolute',
              left: `${x}%`,
              top: `${y}%`,
              transform: 'translate(-50%, -50%)',
              fontSize: '12px',
              fontWeight: 'bold',
              color: Math.abs(age - ageMarker) < 8 ? '#c5a059' : '#5a5a5a',
              fontFamily: "'Playfair Display', serif",
              width: '25px',
              textAlign: 'center',
              transition: 'color 0.3s ease'
            }}
          >
            {ageMarker}
          </div>
        );
      })}

      {/* 年龄指针 */}
      <div 
        style={{
          position: 'absolute',
          width: '4px',
          height: '60px',
          bottom: '50%',
          left: '50%',
          marginLeft: '-2px',
          background: 'linear-gradient(to top, #c5a059, #8a6d3b)',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4), 0 0 10px rgba(197, 160, 89, 0.6)',
          transition: 'transform 0.2s ease',
          transformOrigin: 'bottom center',
          transform: `rotate(${ageDegrees}deg)`,
          borderRadius: '10px'
        }}
      ></div>
      
      {/* 中心圆点 */}
      <div 
        style={{
          position: 'absolute',
          width: '45px',
          height: '45px',
          background: '#c5a059',
          borderRadius: '50%',
          zIndex: 5,
          boxShadow: '0 0 15px rgba(197, 160, 89, 0.9)',
          border: '2px solid #8a6d3b',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#0f0b08',
          fontFamily: "'Playfair Display', serif"
        }}
      >
        {age}
      </div>
    </div>
  );
}

const BrowsePage = ({ onNavigate, selectedAge, onAgeChange }) => {
  const [age, setAge] = useState(25);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter anxieties by age (±3 years range)
  const filteredAnxieties = mockData.filter(item => 
    Math.abs(item.age - age) <= 3
  );

  const currentAnxiety = filteredAnxieties[currentIndex] || null;

  const handleAgeChange = (newAge) => {
    setAge(newAge);
    setCurrentIndex(0);
  };

  const handleNext = () => {
    if (currentIndex < filteredAnxieties.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(filteredAnxieties.length - 1);
    }
  };

  return (
    <div style={{ padding: '80px 20px 40px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{
          fontSize: '2.2em',
          fontFamily: "'UnifrakturMaguntia', cursive",
          color: '#c5a059',
          marginBottom: '10px',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
          letterSpacing: '2px'
        }}>
          Browse Archives
        </h1>
        <p style={{
          color: '#8a6d3b',
          fontSize: '0.95em',
          fontStyle: 'italic',
          letterSpacing: '1px'
        }}>
          Explore temporal records across the ages
        </p>
      </div>

      {/* 时钟年龄选择器 */}
      <div style={{
        background: 'linear-gradient(138deg, #f5f0e8, #e8dbc1)',
        padding: '30px',
        marginBottom: '20px',
        border: '3px solid #8a6d3b',
        borderRadius: '20px 15px 25px 18px',
        boxShadow: 'inset 0 2px 5px rgba(0, 0, 0, 0.1), 0 4px 15px rgba(0, 0, 0, 0.2)',
        transform: 'rotate(-0.2deg)'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '25px'
        }}>
          <span style={{
            color: '#8a6d3b',
            fontWeight: '600',
            fontSize: '1em',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            fontFamily: "'Playfair Display', serif"
          }}>
            Select Age
          </span>
        </div>
        
        <SteampunkClock age={age} onAgeChange={handleAgeChange} />

        <div style={{
          textAlign: 'center',
          marginTop: '20px',
          fontSize: '0.85em',
          color: '#8a6d3b',
          fontStyle: 'italic'
        }}>
          Click or drag the dial to select age
        </div>
      </div>

      {currentAnxiety ? (
        <div style={{
          background: 'linear-gradient(142deg, #f5f0e8, #e8dbc1)',
          padding: '25px',
          marginBottom: '20px',
          border: '3px solid #8a6d3b',
          borderRadius: '18px 22px 15px 20px',
          boxShadow: 'inset 0 2px 5px rgba(0, 0, 0, 0.1), 0 4px 15px rgba(0, 0, 0, 0.2)',
          transform: 'rotate(0.3deg)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '20px',
            paddingBottom: '15px',
            borderBottom: '2px dashed #c5a059'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{
                width: '50px',
                height: '50px',
                background: 'linear-gradient(135deg, #c5a059, #a68547)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #8a6d3b',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
              }}>
                <User style={{ width: '26px', height: '26px', color: '#0f0b08' }} />
              </div>
              <div>
                <h3 style={{
                  fontWeight: 'bold',
                  color: '#0f0b08',
                  fontSize: '1.1em',
                  fontFamily: "'Playfair Display', serif",
                  marginBottom: '3px'
                }}>
                  {currentAnxiety.nickname}
                </h3>
                <p style={{
                  fontSize: '0.85em',
                  color: '#8a6d3b'
                }}>
                  {currentAnxiety.age} years · {
                    currentAnxiety.gender === 'male' ? 'Male' : 
                    currentAnxiety.gender === 'female' ? 'Female' : 'Other'
                  }
                </p>
              </div>
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'linear-gradient(135deg, #c5a059, #a68547)',
              padding: '8px 15px',
              borderRadius: '20px',
              border: '1px solid #8a6d3b'
            }}>
              {currentAnxiety.tag === 'Academic' ? 
                <BookOpen style={{ width: '16px', height: '16px', color: '#0f0b08' }} /> : 
                <Briefcase style={{ width: '16px', height: '16px', color: '#0f0b08' }} />
              }
              <span style={{
                fontSize: '0.85em',
                fontWeight: 'bold',
                color: '#0f0b08',
                fontFamily: "'Playfair Display', serif"
              }}>
                {currentAnxiety.tag}
              </span>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <p style={{
              color: '#3a3a3a',
              lineHeight: '1.6',
              fontSize: '0.95em',
              fontFamily: "'Playfair Display', serif"
            }}>
              {currentAnxiety.description}
            </p>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '20px'
          }}>
            <button
              onClick={handlePrev}
              style={{
                padding: '10px 20px',
                background: '#f5f0e8',
                color: '#8a6d3b',
                border: '3px solid #8a6d3b',
                cursor: 'pointer',
                borderRadius: '12px 18px 10px 15px',
                fontWeight: 'bold',
                fontSize: '0.85em',
                transition: 'all 0.3s ease',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                transform: 'rotate(-0.5deg)'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#e8dbc1';
                e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#f5f0e8';
                e.target.style.boxShadow = 'none';
              }}
            >
              Previous
            </button>
            
            <div style={{
              fontSize: '0.85em',
              color: '#8a6d3b',
              fontWeight: '600'
            }}>
              {currentIndex + 1} / {filteredAnxieties.length}
            </div>
            
            <button
              onClick={handleNext}
              style={{
                padding: '10px 20px',
                background: 'linear-gradient(135deg, #c5a059, #a68547)',
                color: '#0f0b08',
                border: '3px solid #8a6d3b',
                cursor: 'pointer',
                borderRadius: '15px 10px 18px 12px',
                fontWeight: 'bold',
                fontSize: '0.85em',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                transform: 'rotate(0.5deg)'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'linear-gradient(135deg, #d4af5a, #c5a059)';
                e.target.style.boxShadow = '0 6px 20px rgba(197, 160, 89, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'linear-gradient(135deg, #c5a059, #a68547)';
                e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
              }}
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <div style={{
          background: 'linear-gradient(135deg, #f5f0e8, #e8dbc1)',
          padding: '40px',
          textAlign: 'center',
          border: '2px solid #8a6d3b',
          borderRadius: '2px',
          boxShadow: 'inset 0 2px 5px rgba(0, 0, 0, 0.1), 0 4px 15px rgba(0, 0, 0, 0.2)'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            background: '#c5a059',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            border: '2px solid #8a6d3b'
          }}>
            <Heart style={{ width: '32px', height: '32px', color: '#f5f0e8' }} />
          </div>
          <h3 style={{
            fontSize: '1.1em',
            fontWeight: 'bold',
            color: '#0f0b08',
            marginBottom: '10px',
            fontFamily: "'Playfair Display', serif"
          }}>
            No records found
          </h3>
          <p style={{ color: '#8a6d3b', fontSize: '0.9em' }}>
            Try adjusting the age range
          </p>
        </div>
      )}

      <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
        <button
          onClick={() => onNavigate('home')}
          style={{
            flex: 1,
            padding: '12px 20px',
            background: '#f5f0e8',
            color: '#8a6d3b',
            border: '3px dashed #c5a059',
            cursor: 'pointer',
            borderRadius: '18px 12px 20px 15px',
            fontWeight: 'bold',
            fontSize: '0.9em',
            transition: 'all 0.3s ease',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            fontFamily: "'Playfair Display', serif",
            transform: 'rotate(-0.4deg)'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#e8dbc1';
            e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#f5f0e8';
            e.target.style.boxShadow = 'none';
          }}
        >
          Return Home
        </button>
        <button
          onClick={() => onNavigate('register')}
          style={{
            flex: 1,
            padding: '12px 20px',
            background: 'linear-gradient(135deg, #c5a059, #a68547)',
            color: '#0f0b08',
            border: '3px solid #8a6d3b',
            cursor: 'pointer',
            borderRadius: '15px 20px 12px 18px',
            fontWeight: 'bold',
            fontSize: '0.9em',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            fontFamily: "'Playfair Display', serif",
            transform: 'rotate(0.4deg)'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'linear-gradient(135deg, #d4af5a, #c5a059)';
            e.target.style.boxShadow = '0 6px 20px rgba(197, 160, 89, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'linear-gradient(135deg, #c5a059, #a68547)';
            e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
          }}
        >
          Share Your Story
        </button>
      </div>
    </div>
  );
};

export default BrowsePage;