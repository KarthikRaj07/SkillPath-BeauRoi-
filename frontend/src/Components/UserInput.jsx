import React, { useState } from 'react';
import { generateRoadmap } from "./DeepSeekClient";

function UserInput({ onSubmit }) {
  const [name, setName] = useState("");
  const [currentJob, setCurrentJob] = useState("");
  const [skills, setSkills] = useState("");
  const [requiredJob, setRequiredJob] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const roadmap = await generateRoadmap(
        name,
        currentJob,
        skills.split(",").map((skill) => skill.trim()),
        requiredJob
      );
      const result = {
        name,
        current_job: currentJob,
        skills: skills.split(",").map((skill) => skill.trim()),
        required_job: requiredJob,
        roadmap,
      };
      onSubmit(result);
    } catch (error) {
      console.error("Failed to generate roadmap:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f4faff] via-white to-[#e5f1fc] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center space-y-4">
          <div className="relative inline-block">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#6366F1] to-[#7C3AED] rounded-full blur-lg opacity-30 animate-pulse"></div>
            <h1 className="relative text-5xl font-extrabold tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6366F1] to-[#7C3AED]">
                SkillPath
              </span>
              <span className="text-gray-800"> AI Assistant</span>
            </h1>
          </div>
          <p className="text-xl text-gray-600">
            Your personal career development companion
          </p>
        </div>

        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#6366F1] to-[#7C3AED] rounded-2xl blur-lg opacity-30"></div>
          <form onSubmit={handleSubmit} className="relative bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/20">
            <div className="space-y-6">
              <div className="group">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-[#6366F1] transition-colors duration-200">
                  Your Name
                </label>
                <div className="relative">
                  <input
                    id="name"
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all duration-200 hover:bg-white/70"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-[#6366F1] transition-colors duration-200">
                    👤
                  </div>
                </div>
              </div>

              <div className="group">
                <label htmlFor="currentJob" className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-[#6366F1] transition-colors duration-200">
                  Current Job
                </label>
                <div className="relative">
                  <input
                    id="currentJob"
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all duration-200 hover:bg-white/70"
                    placeholder="Full Stack Developer"
                    value={currentJob}
                    onChange={(e) => setCurrentJob(e.target.value)}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-[#6366F1] transition-colors duration-200">
                    💼
                  </div>
                </div>
              </div>

              <div className="group">
                <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-[#6366F1] transition-colors duration-200">
                  Skills
                </label>
                <div className="relative">
                  <input
                    id="skills"
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all duration-200 hover:bg-white/70"
                    placeholder="React, Node.js, Python (comma-separated)"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-[#6366F1] transition-colors duration-200">
                    🛠️
                  </div>
                </div>
              </div>

              <div className="group">
                <label htmlFor="requiredJob" className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-[#6366F1] transition-colors duration-200">
                  Target Job Title
                </label>
                <div className="relative">
                  <input
                    id="requiredJob"
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all duration-200 hover:bg-white/70"
                    placeholder="Senior Software Engineer"
                    value={requiredJob}
                    onChange={(e) => setRequiredJob(e.target.value)}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-[#6366F1] transition-colors duration-200">
                    🎯
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button
                type="submit"
                disabled={isLoading}
                className="relative w-full group"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-[#6366F1] to-[#7C3AED] rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-200"></div>
                <div className="relative flex justify-center items-center py-3 px-4 bg-gradient-to-r from-[#6366F1] to-[#7C3AED] text-white font-semibold rounded-xl hover:from-[#7C3AED] hover:to-[#6366F1] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed">
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating...
                    </span>
                  ) : (
                    <>
                      Generate Roadmap
                      <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserInput;