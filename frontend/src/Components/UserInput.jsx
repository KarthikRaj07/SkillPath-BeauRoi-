import React from 'react'

import { useState } from "react";
import { generateRoadmap } from "./DeepSeekClient";

function UserInput({ onSubmit }) {
  const [name, setName] = useState("");
  const [currentJob, setCurrentJob] = useState("");
  const [skills, setSkills] = useState("");
  const [requiredJob, setRequiredJob] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Your Career Roadmap</h2>

        <input
          type="text"
          placeholder="Your Name"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Current Job (e.g. Full Stack Developer)"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          value={currentJob}
          onChange={(e) => setCurrentJob(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Skills (comma-separated)"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Required Job Title"
          className="w-full p-2 mb-6 border border-gray-300 rounded"
          value={requiredJob}
          onChange={(e) => setRequiredJob(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Generate Roadmap
        </button>
      </form>
    </div>
  );
}

export default UserInput;