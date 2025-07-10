import React, { useState } from 'react';

function UserInput({ onSubmit }) {
  const [name, setName] = useState("");
  const [currentJob, setCurrentJob] = useState("");
  const [skills, setSkills] = useState("");
  const [requiredJob, setRequiredJob] = useState("");
  const [userPrompt, setUserPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const skillsArr = skills.split(",").map((skill) => skill.trim());
      const token = localStorage.getItem('token');
      console.log('Token:', token); // Debug log
      const payload = {
        name,
        current_job: currentJob,
        skills: skillsArr,
        required_job: requiredJob,
        userPrompt: userPrompt
      };
      console.log('Submit payload:', payload); // Debug log
      // 1. Save user input
      const submitRes = await fetch('http://localhost:5000/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      console.log('Submit response status:', submitRes.status); // Debug log
      const submitData = await submitRes.json();
      console.log('Submit response data:', submitData); // Debug log
      if (!submitRes.ok) throw new Error(submitData.error || 'Failed to save input');
      // 2. Generate roadmap
      const prompt = `I am currently working as a ${currentJob}, and I have experience in ${skillsArr.join(", ")}. I aim to transition into a role as a ${requiredJob}. ${userPrompt}. Generate detailed roadmap to help me achieve this career goal by Skill development recommendations.`;
      const chatRes = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ prompt })
      });
      const chatData = await chatRes.json();
      if (!chatRes.ok) throw new Error(chatData.error || 'Failed to generate roadmap');
      // 3. Save roadmap
      const roadmapRes = await fetch('http://localhost:5000/roadmap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ input_id: submitData.input_id, roadmap: chatData.response })
      });
      if (!roadmapRes.ok) {
        const roadmapErr = await roadmapRes.json();
        throw new Error(roadmapErr.error || 'Failed to save roadmap');
      }
      const result = {
        name,
        current_job: currentJob,
        skills: skillsArr,
        required_job: requiredJob,
        userPrompt: userPrompt,
        roadmap: chatData.response,
      };
      onSubmit(result);
    } catch (error) {
      setError(error.message);
      console.error("Failed to generate/save roadmap:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-blue-900">
            Your Career Roadmap
          </h2>
          <p className="mt-2 text-blue-700">
            Fill in your details to generate a personalized career path
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6 bg-white p-8 rounded-2xl shadow-2xl">
          {error && <div className="p-3 bg-red-100 border border-red-300 rounded-xl text-red-700 text-sm">{error}</div>}
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-blue-900">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                required
                className="mt-1 block w-full px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-900 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="currentJob" className="block text-sm font-medium text-blue-900">
                Current Job
              </label>
              <input
                id="currentJob"
                type="text"
                required
                className="mt-1 block w-full px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-900 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                placeholder="Full Stack Developer"
                value={currentJob}
                onChange={(e) => setCurrentJob(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="skills" className="block text-sm font-medium text-blue-900">
                Skills
              </label>
              <input
                id="skills"
                type="text"
                required
                className="mt-1 block w-full px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-900 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                placeholder="React, Node.js, Python (comma-separated)"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="requiredJob" className="block text-sm font-medium text-blue-900">
                Target Job Title
              </label>
              <input
                id="requiredJob"
                type="text"
                required
                className="mt-1 block w-full px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-900 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                placeholder="Senior Software Engineer"
                value={requiredJob}
                onChange={(e) => setRequiredJob(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="userPrompt" className="block text-sm font-medium text-blue-900">
                Additional Requirements (Optional)
              </label>
              <textarea
                id="userPrompt"
                rows="3"
                className="mt-1 block w-full px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-900 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none"
                placeholder="Any specific requirements, preferences, or additional context for your career transition..."
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </span>
              ) : (
                'Generate Roadmap'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserInput;