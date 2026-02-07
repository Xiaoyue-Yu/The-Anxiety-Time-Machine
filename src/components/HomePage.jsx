import React from 'react';

const HomePage = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Anxiety Time Machine</h1>
          <p className="text-gray-600">See what people of different ages are anxious about...</p>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={() => onNavigate('register')}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 rounded-lg transition duration-200 shadow-md"
          >
            Register New User
          </button>
          
          <button
            onClick={() => onNavigate('login')}
            className="w-full bg-white hover:bg-gray-50 text-purple-600 font-semibold py-4 rounded-lg border-2 border-purple-600 transition duration-200"
          >
            Already Have an Account
          </button>
        </div>
        
        <div className="mt-6 text-center">
          <button
            onClick={() => onNavigate('browse')}
            className="text-gray-500 hover:text-gray-700 text-sm underline"
          >
            Just Browse
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;