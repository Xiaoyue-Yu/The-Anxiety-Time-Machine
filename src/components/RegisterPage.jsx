import React, { useState } from 'react';
import { BookOpen, Briefcase } from 'lucide-react';

const RegisterPage = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    nickname: '',
    password: '',
    age: '',
    gender: 'male',
    tag: 'Academic',
    description: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!formData.nickname || !formData.password || !formData.age || !formData.description) {
      setError('Please fill in all fields (including password)');
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Share Your Anxiety</h2>

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Nickname</label>
              <input
                type="text"
                value={formData.nickname}
                onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Your name"
              />
            </div>

            {/* Add a password input field */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Set a password"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Age</label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">Gender</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Type of Anxiety</label>
            <div className="flex gap-4">
              <label className={`flex-1 flex items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition duration-200 ${formData.tag === 'Academic' ? 'border-purple-600 bg-purple-50 text-purple-700' : 'border-gray-200 hover:border-purple-200'}`}>
                <input
                  type="radio"
                  name="tag"
                  value="Academic"
                  checked={formData.tag === 'Academic'}
                  onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                  className="mr-2"
                />
                <BookOpen className="w-5 h-5 mr-1" />
                <span>Academic</span>
              </label>
              <label className={`flex-1 flex items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition duration-200 ${formData.tag === 'Career' ? 'border-purple-600 bg-purple-50 text-purple-700' : 'border-gray-200 hover:border-purple-200'}`}>
                <input
                  type="radio"
                  name="tag"
                  value="Career"
                  checked={formData.tag === 'Career'}
                  onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                  className="mr-2"
                />
                <Briefcase className="w-5 h-5 mr-1" />
                <span>Career</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Tell Us Your Anxiety</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Share your thoughts here, it's safe..."
              rows="6"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => onNavigate('home')}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-lg transition duration-200"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition duration-200 shadow-md"
            >
              Register & Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;