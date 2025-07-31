import React, { useState, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import { jsPDF } from "jspdf";

function ResultPage({ data }) {
  const points = data.roadmap.split(/\n[0-9]+\.\s/).filter(Boolean);
const filtered = useMemo(() => points.slice(1), [points]); // Remove the first point

  const [openIndexes, setOpenIndexes] = useState({});
  const [isVisual, setIsVisual] = useState(false);
const VisualRoadmapBox = ({ point, index, isOpen, toggleBox }) => {
  const lines = point.trim().split("\n");
  const titleLine = lines[0].trim();
  const titleMatch = titleLine.match(/\*\*(.*?)\*\*/);
  const title = titleMatch ? titleMatch[1] : titleLine;

  const descLines = [...lines];
  if (titleMatch) descLines.shift(); // remove title from description
  const description = descLines.join("\n").trim();

  // The description corresponds to the point with the matching heading (title)
  // The toggleBox is called with index, which matches the point index in the roadmap array
  // So the description shown is always the one matching the clicked heading

  return (
    <div key={index} className="w-full">
      <div
        onClick={() => toggleBox(index)}
        className="bg-blue-50 p-4 rounded-xl border border-blue-200 shadow-sm cursor-pointer transition-all hover:shadow-md"
      >
        <h3 className="font-semibold text-lg text-center">{title}</h3>
      </div>

      {/* Show description only when node is clicked */}
      {isOpen && description && (
        <div className="mt-2 ml-4 p-4 bg-blue-50 rounded-lg border border-blue-200 text-sm text-gray-700 shadow-inner">
          <ReactMarkdown>{description}</ReactMarkdown>
        </div>
      )}

      {/* Arrow between cards */}
      <div className="flex justify-center my-4">
        <span className="text-3xl text-blue-400 animate-bounce">↓</span>
      </div>
    </div>
  );
};


  const toggleBox = (index) => {
    setOpenIndexes((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const token = localStorage.getItem("token");
  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-100">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
          <h2 className="text-2xl font-bold text-red-700 mb-4">Not Authenticated</h2>
          <p className="text-gray-800">Please log in to view your roadmap.</p>
        </div>
      </div>
    );
  }

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("Career Roadmap", 20, 20);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Name: ${data.name}`, 20, 40);
    doc.text(`Current Position: ${data.current_job}`, 20, 50);
    doc.text(`Target Position: ${data.required_job}`, 20, 60);
    doc.text("Current Skills:", 20, 70);
    const skillsText = data.skills.join(", ");
    const splitSkills = doc.splitTextToSize(skillsText, 170);
    doc.text(splitSkills, 20, 80);
    let yPosition = 90;
    if (data.userPrompt && data.userPrompt.trim()) {
      doc.text("Additional Requirements:", 20, yPosition);
      yPosition += 10;
      const promptLines = doc.splitTextToSize(data.userPrompt, 170);
      doc.text(promptLines, 20, yPosition);
      yPosition += promptLines.length * 7 + 10;
    }
    doc.setFont("helvetica", "bold");
    doc.text("Personalized Roadmap:", 20, yPosition);
    doc.setFont("helvetica", "normal");
    yPosition += 10;
    const roadmapLines = doc.splitTextToSize(data.roadmap, 170);
    roadmapLines.forEach((line) => {
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
      doc.text(line, 20, yPosition);
      yPosition += 7;
    });
    doc.save(`career-roadmap-${data.name.toLowerCase().replace(/\s+/g, "-")}.pdf`);
  };

const renderVisualRoadmap = () => {
  return (
    <div className="flex flex-col items-center space-y-4">
      {filtered.map((point, i) => {
        const originalIndex = i + 1; // match index to original points array
        return (
          <VisualRoadmapBox
            key={i}
            point={point}
            index={originalIndex}
            isOpen={openIndexes[originalIndex]}
            toggleBox={toggleBox}
          />
        );
      })}
    </div>
  );
};


  return (
    <div className="min-h-screen bg-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* User Information Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-blue-900">Your Career Roadmap</h2>
              <button
                onClick={handleDownload}
                className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                <span>Download PDF</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-blue-700">Name</h3>
                  <p className="mt-1 text-lg text-blue-900">{data.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-blue-700">Current Job</h3>
                  <p className="mt-1 text-lg text-blue-900">{data.current_job}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-blue-700">Target Job Title</h3>
                  <p className="mt-1 text-lg text-blue-900">{data.required_job}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-blue-700">Current Skills</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {data.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-200 text-blue-900"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Requirements */}
            {data.userPrompt && data.userPrompt.trim() && (
              <div className="mt-6 pt-6 border-t border-blue-100">
                <h3 className="text-sm font-medium text-blue-700 mb-2">Additional Requirements</h3>
                <p className="text-lg text-blue-900 bg-blue-50 p-4 rounded-lg border border-blue-200">
                  {data.userPrompt}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Roadmap Section with Toggle */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-blue-900">Your Personalized Roadmap</h3>
              <label className="flex items-center space-x-2 cursor-pointer">
                <span className="text-sm text-blue-800 font-medium">Visual View</span>
                <input
                  type="checkbox"
                  className="toggle toggle-sm bg-blue-300"
                  checked={isVisual}
                  onChange={() => setIsVisual(!isVisual)}
                />
              </label>
            </div>
            <div className="prose max-w-none text-blue-900">
              {isVisual ? renderVisualRoadmap() : <ReactMarkdown>{data.roadmap}</ReactMarkdown>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultPage;
