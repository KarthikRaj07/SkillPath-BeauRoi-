import { useState, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import { jsPDF } from "jspdf";
import MarkmapViewer from "../components/MarkmapViewer";
import { convertToMarkdown } from "../utils/convertToMarkdown";


function ResultPage({ data }) {
  const points = data.roadmap.split(/\n[0-9]+\.\s/).filter(Boolean);
const filtered = useMemo(() => points.slice(1), [points]); // Remove the first point

  const [openIndexes, setOpenIndexes] = useState({});
  const [isVisual, setIsVisual] = useState(false);
  const [viewMode, setViewMode] = useState("text"); // 'text', 'visual', 'markmap'
const VisualRoadmapBox = ({ point, index, isOpen, toggleBox }) => {
  const lines = point.trim().split("\n");
  const titleLine = lines[0].trim();
  const titleMatch = titleLine.match(/\*\*(.*?)\*\*/);
  const title = titleMatch ? titleMatch[1] : titleLine;

  const descLines = [...lines];
  if (titleMatch) descLines.shift(); // remove title from description
  const description = descLines.join("\n").trim();

  // Custom styles for visual roadmap nodes and description
  // Revert node font size to initial, keep styling for description text
  const nodeStyle = "bg-blue-100 text-blue-900 text-lg font-semibold p-6 rounded-xl border border-blue-300 shadow-md cursor-pointer hover:bg-blue-200 transition-all";
  const descriptionStyle = "mt-3 ml-6 p-5 bg-blue-50 rounded-lg border border-blue-200 text-base text-blue-800 shadow-inner";

  return (
    <div key={index} className="w-full">
      <div
        onClick={() => toggleBox(index)}
        className={nodeStyle}
      >
        <h3 className="text-center">{title}</h3>
      </div>

      {/* Show description only when node is clicked */}
      {isOpen && description && (
        <div className={descriptionStyle}>
          <ReactMarkdown>{description}</ReactMarkdown>
        </div>
      )}

      {/* Arrow between cards */}
      <div className="flex justify-center my-4">
        <span className="text-3xl text-blue-500 animate-bounce">↓</span>
      </div>
    </div>
  );
};


  const toggleBox = (index) => {
    // Fix toggle to allow only one open at a time
    setOpenIndexes((prev) => {
      const newState = {};
      if (!prev[index]) {
        newState[index] = true;
      }
      return newState;
    });
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
    <div className="min-h-screen bg-blue-50 py-12 px-4 sm:px-6 lg:px-8 text-blue-900">
      <div className={`${viewMode === "markmap" ? "max-w-full" : "max-w-4xl"} mx-auto space-y-6`}>
        {/* User Information Section */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-extrabold">Your Career Roadmap</h2>
            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 transform hover:scale-105 active:scale-95 flex items-center space-x-2"
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-semibold mb-1">Name</h3>
              <p className="text-lg font-medium">{data.name}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-1">Current Job</h3>
              <p className="text-lg font-medium">{data.current_job}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-1">Target Job Title</h3>
              <p className="text-lg font-medium">{data.required_job}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-1">Current Skills</h3>
              <div className="flex flex-wrap gap-2">
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

        {/* Roadmap Section with Toggle */}
        <div>
          <div className="mb-6 flex justify-between items-center">
            <h3 className="text-2xl font-extrabold">Your Personalized Roadmap</h3>
            <div className="flex space-x-6 items-center">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="viewMode"
                  value="text"
                  checked={viewMode === "text"}
                  onChange={() => setViewMode("text")}
                  className="radio radio-sm radio-primary"
                />
                <span className="text-sm font-semibold">Text View</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="viewMode"
                  value="visual"
                  checked={viewMode === "visual"}
                  onChange={() => setViewMode("visual")}
                  className="radio radio-sm radio-primary"
                />
                <span className="text-sm font-semibold">Visual View</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="viewMode"
                  value="markmap"
                  checked={viewMode === "markmap"}
                  onChange={() => setViewMode("markmap")}
                  className="radio radio-sm radio-primary"
                />
                <span className="text-sm font-semibold">Markmap View</span>
              </label>
            </div>
          </div>
          <div className="">
            {viewMode === "text" && <div className="prose max-w-none"><ReactMarkdown>{data.roadmap}</ReactMarkdown></div>}
            {viewMode === "visual" && renderVisualRoadmap()}
            {viewMode === "markmap" && <div className="w-full"><MarkmapViewer markdown={convertToMarkdown(data.roadmap)} /></div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultPage;
