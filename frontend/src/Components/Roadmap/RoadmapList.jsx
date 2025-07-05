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
    <div className="min-h-screen bg-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold sm:text-5xl sm:tracking-tight lg:text-6xl text-blue-900">
            Available Roadmaps
          </h1>
          <p className="mt-4 text-xl text-blue-700">
            Choose a roadmap to start your learning journey
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* DSA Roadmap Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-blue-200/50 transition-all duration-300 transform hover:scale-[1.02]">
            <div className="p-6">
              <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-blue-600 text-white mb-4">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-blue-900 mb-2">Data Structures & Algorithms</h3>
              <p className="text-blue-700 mb-4">
                Master the fundamentals of DSA with our comprehensive roadmap
              </p>
              <button
                onClick={handleDSAClick}
                className="w-full inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Start Learning
              </button>
            </div>
          </div>

          {/* FSD Roadmap Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-cyan-200/50 transition-all duration-300 transform hover:scale-[1.02]">
            <div className="p-6">
              <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-cyan-600 text-white mb-4">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-blue-900 mb-2">Full Stack Development</h3>
              <p className="text-blue-700 mb-4">
                Become a modern full stack developer with our step-by-step roadmap
              </p>
              <button
                onClick={handleFSDClick}
                className="w-full inline-flex items-center justify-center px-4 py-2 bg-cyan-600 text-white font-semibold rounded-xl hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Start Learning
              </button>
            </div>
          </div>

          {/* ML Roadmap Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-green-200/50 transition-all duration-300 transform hover:scale-[1.02]">
            <div className="p-6">
              <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-green-500 text-white mb-4">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h4l2 4" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-blue-900 mb-2">Machine Learning Roadmap</h3>
              <p className="text-blue-700 mb-4">
                Step into ML with a practical, project-based roadmap
              </p>
              <button
                onClick={() => navigate('/ml')}
                className="w-full inline-flex items-center justify-center px-4 py-2 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
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
