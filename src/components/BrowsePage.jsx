import React, { useState } from 'react';
import { User, Heart, BookOpen, Briefcase } from 'lucide-react';
import { mockData } from '../data/mockData';

const BrowsePage = ({ onNavigate }) => {
  const [age, setAge] = useState(25);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter anxieties by age (±3 years range)
  const filteredAnxieties = mockData.filter(item => 
    Math.abs(item.age - age) <= 3
  );

  const currentAnxiety = filteredAnxieties[currentIndex] || null;

  const handleAgeChange = (e) => {
    const newAge = parseInt(e.target.value);
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Anxiety Time Machine</h1>
          <p className="text-gray-600">See what people of different ages are anxious about...</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-600 font-semibold">Select Age Range:</span>
            <span className="text-3xl font-bold text-purple-600">{age} years old</span>
          </div>
          
          <input
            type="range"
            min="10"
            max="100"
            step="5"
            value={age}
            onChange={handleAgeChange}
            className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
          />
          
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>10</span>
            <span>30</span>
            <span>50</span>
            <span>70</span>
            <span>100</span>
          </div>
        </div>

        {currentAnxiety ? (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="flex items-center justify-between mb-6 pb-4 border-b">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{currentAnxiety.nickname}</h3>
                  <p className="text-sm text-gray-500">
                    {currentAnxiety.age} years old · {
                      currentAnxiety.gender === 'male' ? 'Male' : 
                      currentAnxiety.gender === 'female' ? 'Female' : 'Other'
                    }
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-full">
                {currentAnxiety.tag === 'Academic' ? 
                  <BookOpen className="w-4 h-4 text-purple-600" /> : 
                  <Briefcase className="w-4 h-4 text-purple-600" />
                }
                <span className="text-sm font-semibold text-purple-600">{currentAnxiety.tag}</span>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-gray-700 leading-relaxed text-lg">
                {currentAnxiety.description}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={handlePrev}
                className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition duration-200"
              >
                Previous
              </button>
              
              <div className="text-sm text-gray-500">
                {currentIndex + 1} / {filteredAnxieties.length}
              </div>
              
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition duration-200"
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No anxieties for this age range</h3>
            <p className="text-gray-600">Try a different age range~</p>
          </div>
        )}

        <div className="flex gap-4">
          <button
            onClick={() => onNavigate('home')}
            className="flex-1 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-lg border-2 border-gray-300 transition duration-200"
          >
            Back to Home
          </button>
          <button
            onClick={() => onNavigate('register')}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition duration-200 shadow-md"
          >
            Share My Anxiety
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrowsePage;