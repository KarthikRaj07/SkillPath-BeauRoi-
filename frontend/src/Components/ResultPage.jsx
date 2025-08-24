import { useState, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import { jsPDF } from "jspdf";
import MarkmapViewer from "../components/MarkmapViewer";



function ResultPage({ data }) {
  const points = data.roadmap.split(/\n[0-9]+\.\s/).filter(Boolean);
const filtered = useMemo(() => points.slice(1), [points]); // Remove the first point

  const [openIndexes, setOpenIndexes] = useState({});
  const [isVisual, setIsVisual] = useState(false);
  const [viewMode, setViewMode] = useState("text"); // 'text', 'markmap'
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
  const nodeStyle = "bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-lg font-semibold p-6 rounded-xl border border-blue-400 shadow-lg cursor-pointer hover:from-blue-600 hover:to-indigo-600 hover:shadow-xl transition-all duration-300 transform hover:scale-105";
  const descriptionStyle = "mt-4 ml-6 p-6 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl border border-slate-200 text-base text-slate-800 shadow-inner";

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
      <div className="flex justify-center my-6">
        <span className="text-4xl text-blue-500 animate-bounce drop-shadow-lg">↓</span>
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8 text-slate-800">
      <div className={`${viewMode === "markmap" ? "max-w-full" : "max-w-5xl"} mx-auto space-y-8`}>
        {/* User Information Section */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Your Career Roadmap
            </h2>
            <button
              onClick={handleDownload}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center space-x-3 shadow-lg hover:shadow-xl"
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
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
              <h3 className="text-sm font-semibold mb-2 text-blue-700 uppercase tracking-wide">Name</h3>
              <p className="text-xl font-semibold text-slate-800">{data.name}</p>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
              <h3 className="text-sm font-semibold mb-3 text-blue-700 uppercase tracking-wide">Current Job</h3>
              <p className="text-xl font-semibold text-slate-800">{data.current_job}</p>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
              <h3 className="text-sm font-semibold mb-2 text-blue-700 uppercase tracking-wide">Target Job Title</h3>
              <p className="text-xl font-semibold text-slate-800">{data.required_job}</p>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
              <h3 className="text-sm font-semibold mb-2 text-blue-700 uppercase tracking-wide">Current Skills</h3>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
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
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
            <h3 className="text-lg font-semibold text-blue-700 mb-4 uppercase tracking-wide">Additional Requirements</h3>
            <p className="text-lg text-slate-800 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100 leading-relaxed">
              {data.userPrompt}
            </p>
          </div>
        )}

        {/* Roadmap Section with Toggle */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
          <div className="mb-8 flex justify-between items-center">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Your Personalized Roadmap</h3>
            <div className="flex space-x-8 items-center">
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="radio"
                  name="viewMode"
                  value="text"
                  checked={viewMode === "text"}
                  onChange={() => setViewMode("text")}
                  className="radio radio-lg radio-primary"
                />
                <span className="text-base font-semibold text-slate-700 group-hover:text-blue-600 transition-colors">Text View</span>
              </label>

              <label className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="radio"
                  name="viewMode"
                  value="markmap"
                  checked={viewMode === "markmap"}
                  onChange={() => setViewMode("markmap")}
                  className="radio radio-lg radio-primary"
                />
                <span className="text-base font-semibold text-slate-700 group-hover:text-blue-600 transition-colors">Markmap View</span>
              </label>
            </div>
          </div>
          <div className="">
            {viewMode === "text" && (
              <div className="prose max-w-none">
                <div className="bg-gradient-to-r from-slate-50 via-blue-50 to-indigo-50 p-10 rounded-2xl border border-slate-200 shadow-inner">
                  <div className="space-y-6 text-slate-800">
                    {data.roadmap
                      .replace(/#{1,6}\s+/g, '')
                      .replace(/\*\*(.*?)\*\*/g, '$1')
                      .replace(/\*(.*?)\*/g, '$1')
                      .replace(/`(.*?)`/g, '$1')
                      .replace(/^`markdown\s*$/gm, '')
                      .trim()
                      .split('\n')
                      .map((line, index) => {
                        const trimmedLine = line.trim();
                        if (!trimmedLine) return null;
                        
                        // Main title (was # heading)
                        if (trimmedLine.includes('Career Transition Roadmap')) {
                          return (
                            <h1 key={index} className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent border-b-2 border-blue-200 pb-4">
                              {trimmedLine}
                            </h1>
                          );
                        }
                        
                        // Main categories (was ## heading)
                        if (trimmedLine.match(/^[A-Z][A-Za-z\s&]+$/)) {
                          return (
                            <h2 key={index} className="text-2xl font-bold text-blue-700 mt-8 mb-4">
                              {trimmedLine}
                            </h2>
                          );
                        }
                        
                        // Subcategories (was ### heading)
                        if (trimmedLine.match(/^[A-Z][a-z\s]+$/)) {
                          return (
                            <h3 key={index} className="text-xl font-semibold text-indigo-600 mt-6 mb-3 ml-6">
                              {trimmedLine}
                            </h3>
                          );
                        }
                        
                        // Individual skills (was - list item)
                        if (trimmedLine.startsWith('-')) {
                          return (
                            <div key={index} className="ml-12 mb-2">
                              <span className="text-base text-slate-700">{trimmedLine.substring(1).trim()}</span>
                            </div>
                          );
                        }
                        
                        // Regular text
                        return (
                          <p key={index} className="text-base text-slate-600 ml-6 mb-2">
                            {trimmedLine}
                          </p>
                        );
                      })}
                  </div>
                </div>
              </div>
            )}
            {viewMode === "markmap" && <div className="w-full"><MarkmapViewer markdown={data.roadmap} /></div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultPage;
