import React from 'react'
import { Link } from 'react-router-dom';
import { FaCodeBranch, FaRobot } from 'react-icons/fa';

const RoadmapList = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-100 flex flex-col items-center py-16 px-4">
      <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600 mb-10 drop-shadow-lg tracking-tight text-center">
        Roadmap List
      </h1>
      <ul className="flex flex-col gap-6 w-full max-w-lg items-center">
        <li className="w-full">
          <Link
            to="/dsa"
            className="flex items-center justify-center gap-3 w-full py-4 px-8 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-xl font-semibold shadow-lg hover:from-teal-600 hover:to-cyan-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2"
          >
            <FaCodeBranch className="text-2xl" />
            DSA Roadmap
          </Link>
        </li>
        <li className="w-full">
          <Link
            to="/ml"
            className="flex items-center justify-center gap-3 w-full py-4 px-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xl font-semibold shadow-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            <FaRobot className="text-2xl" />
            ML Roadmap
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default RoadmapList