import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ onLogout }) => {
    return (
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 shadow-sm">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-8">
                        <Link to="/" className="group flex items-center space-x-3">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-200">
                                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div>
                                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 group-hover:from-blue-700 group-hover:to-cyan-600 transition-all duration-200">
                                    SkillPath
                                </span>
                                <p className="text-sm text-gray-600">Your Learning Journey</p>
                            </div>
                        </Link>
                        <div className="hidden md:flex space-x-8">
                            <Link 
                                to="/" 
                                className="text-gray-600 hover:text-blue-600 transition-colors duration-200 relative group"
                            >
                                Home
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 group-hover:w-full transition-all duration-200"></span>
                            </Link>
                            <Link 
                                to="/roadmap" 
                                className="text-gray-600 hover:text-blue-600 transition-colors duration-200 relative group"
                            >
                                Roadmaps
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 group-hover:w-full transition-all duration-200"></span>
                            </Link>
                            <Link 
                                to="/chatbot" 
                                className="text-gray-600 hover:text-blue-600 transition-colors duration-200 relative group"
                            >
                                Chatbot
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 group-hover:w-full transition-all duration-200"></span>
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={onLogout}
                            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] flex items-center space-x-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
