import React, { useState } from 'react';
import { mockData } from '../data/mockData';

const LoginPage = ({ onNavigate, onLogin }) => {
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!nickname) {
      setError('Please enter your nickname');
      return;
    }
    
    // Simple validation: check if user exists in mock data
    const user = mockData.find(item => item.nickname === nickname);
    
    if (user) {
      onLogin(user);
      onNavigate('browse');
    } else {
      setError('User does not exist, please register first');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Login</h2>
        
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        
        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Nickname</label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Enter your nickname"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
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
              onClick={handleLogin}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition duration-200 shadow-md"
            >
              Login
            </button>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <span className="text-gray-600">Don't have an account?</span>
          <button
            onClick={() => onNavigate('register')}
            className="text-purple-600 hover:text-purple-700 font-semibold ml-2"
          >
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;