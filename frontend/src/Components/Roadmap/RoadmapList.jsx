import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function RoadmapList() {
  const navigate = useNavigate();

  const handleDSAClick = () => {
    navigate('/second');
  };
  const handleFSDClick = () => {
    navigate('/fsd');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold sm:text-5xl sm:tracking-tight lg:text-6xl">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
              Available Roadmaps
            </span>
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Choose a roadmap to start your learning journey
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* DSA Roadmap Card */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden hover:shadow-blue-200/50 transition-all duration-300 transform hover:scale-[1.02]">
            <div className="p-6">
              <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white mb-4">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Data Structures & Algorithms</h3>
              <p className="text-gray-600 mb-4">
                Master the fundamentals of DSA with our comprehensive roadmap
              </p>
              <button
                onClick={handleDSAClick}
                className="w-full inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Start Learning
              </button>
            </div>
          </div>

          {/* FSD Roadmap Card */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden hover:shadow-cyan-200/50 transition-all duration-300 transform hover:scale-[1.02]">
            <div className="p-6">
              <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white mb-4">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Full Stack Development</h3>
              <p className="text-gray-600 mb-4">
                Become a modern full stack developer with our step-by-step roadmap
              </p>
              <button
                onClick={handleFSDClick}
                className="w-full inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Start Learning
              </button>
            </div>
          </div>

          {/* Add more roadmap cards here as needed */}
        </div>
      </div>
    </div>
  );
}
