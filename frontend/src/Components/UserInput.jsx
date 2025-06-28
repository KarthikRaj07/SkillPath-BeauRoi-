import React, { useState } from 'react';

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
      const skillsArr = skills.split(",").map((skill) => skill.trim());
      const prompt = `I am currently working as a ${currentJob}, with hands-on experience in ${skillsArr.join(", ")}. I want to transition into a role as a ${requiredJob}.
\nPlease provide a detailed, actionable roadmap customized to my background that includes:\n1. *Upskilling:* What specific technical and soft skills should I focus on? Recommend relevant courses, certifications, or projects.\n2. *Portfolio Building:* What kind of projects should I add to my portfolio to attract recruiters for ${requiredJob} roles?\n3. *Networking:* What strategies or communities should I engage in to connect with professionals and recruiters in the ${requiredJob} domain?\n4. *Job Search:* Tips on how to optimize my resume and LinkedIn for this transition, and platforms where I should apply.\n\nPlease tailor this roadmap to someone coming from a ${currentJob} background and already proficient in ${skillsArr.join(", ")}. Be concise, but strategic and realistic.`;
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const result = {
        name,
        current_job: currentJob,
        skills: skillsArr,
        required_job: requiredJob,
        roadmap: data.response,
      };
      onSubmit(result);
    } catch (error) {
      console.error("Failed to generate roadmap:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFFBDE] via-[#91C8E4] to-[#4682A9] py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white animate-slide-down">
            Your Career Roadmap
          </h2>
          <p className="mt-2 text-primary-bright/80">
            Fill in your details to generate a personalized career path
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6 bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl animate-slide-up">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                required
                className="mt-1 block w-full px-4 py-3 bg-white/5 border border-primary-light/30 rounded-lg text-white placeholder-primary-bright/50 focus:outline-none focus:ring-2 focus:ring-primary-bright focus:border-transparent transition-all duration-200"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="currentJob" className="block text-sm font-medium text-white">
                Current Job
              </label>
              <input
                id="currentJob"
                type="text"
                required
                className="mt-1 block w-full px-4 py-3 bg-white/5 border border-primary-light/30 rounded-lg text-white placeholder-primary-bright/50 focus:outline-none focus:ring-2 focus:ring-primary-bright focus:border-transparent transition-all duration-200"
                placeholder="Full Stack Developer"
                value={currentJob}
                onChange={(e) => setCurrentJob(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="skills" className="block text-sm font-medium text-white">
                Skills
              </label>
              <input
                id="skills"
                type="text"
                required
                className="mt-1 block w-full px-4 py-3 bg-white/5 border border-primary-light/30 rounded-lg text-white placeholder-primary-bright/50 focus:outline-none focus:ring-2 focus:ring-primary-bright focus:border-transparent transition-all duration-200"
                placeholder="React, Node.js, Python (comma-separated)"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="requiredJob" className="block text-sm font-medium text-white">
                Target Job Title
              </label>
              <input
                id="requiredJob"
                type="text"
                required
                className="mt-1 block w-full px-4 py-3 bg-white/5 border border-primary-light/30 rounded-lg text-white placeholder-primary-bright/50 focus:outline-none focus:ring-2 focus:ring-primary-bright focus:border-transparent transition-all duration-200"
                placeholder="Senior Software Engineer"
                value={requiredJob}
                onChange={(e) => setRequiredJob(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 bg-primary-bright text-primary font-bold rounded-lg hover:bg-primary-bright/90 focus:outline-none focus:ring-2 focus:ring-primary-bright focus:ring-offset-2 focus:ring-offset-primary transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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