import React from "react";
import ReactMarkdown from "react-markdown";

function ResultPage({ data }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Your Career Roadmap</h2>
        <div className="text-left">
          <p className="mb-4">
            <strong>Name:</strong> {data.name}
          </p>
          <p className="mb-4">
            <strong>Current Job:</strong> {data.current_job}
          </p>
          <p className="mb-4">
            <strong>Required Job Title:</strong> {data.required_job}
          </p>
          <p>
            <strong>Skills:</strong>
          </p>
          <ul className="list-disc list-inside">
            {data.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
      </div>
      {/* Ensure roadmap is directly below the card */}
      <div className="bg-gray-100 p-4 rounded-xl prose max-w-none mt-6 w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">Roadmap:</h3>
        <ReactMarkdown>{data.roadmap}</ReactMarkdown>
      </div>
    </div>
  );
}

export default ResultPage;