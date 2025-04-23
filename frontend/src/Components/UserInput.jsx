import React from 'react'

import { useState } from "react";

function UserInput({ onSubmit }) {
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [skills, setSkills] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, job, skills: skills.split(",").map(skill => skill.trim()) });
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
          placeholder="Job Role (e.g. Full Stack Developer)"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          value={job}
          onChange={(e) => setJob(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Skills (comma-separated)"
          className="w-full p-2 mb-6 border border-gray-300 rounded"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
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

