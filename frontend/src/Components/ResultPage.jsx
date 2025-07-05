import React from "react";
import ReactMarkdown from "react-markdown";
import { jsPDF } from "jspdf";

function ResultPage({ data }) {
  // Check for JWT
  const token = localStorage.getItem('token');
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
    // Create a new PDF document
    const doc = new jsPDF();
    
    // Set font styles
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    
    // Add title
    doc.text("Career Roadmap", 20, 20);
    
    // Add user information
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Name: ${data.name}`, 20, 40);
    doc.text(`Current Position: ${data.current_job}`, 20, 50);
    doc.text(`Target Position: ${data.required_job}`, 20, 60);
    
    // Add skills
    doc.text("Current Skills:", 20, 70);
    const skillsText = data.skills.join(", ");
    const splitSkills = doc.splitTextToSize(skillsText, 170);
    doc.text(splitSkills, 20, 80);
    
    // Add roadmap
    doc.setFont("helvetica", "bold");
    doc.text("Personalized Roadmap:", 20, 100);
    doc.setFont("helvetica", "normal");
    
    // Split the roadmap text into lines that fit the page width
    const roadmapLines = doc.splitTextToSize(data.roadmap, 170);
    
    // Add each line of the roadmap
    let yPosition = 110;
    roadmapLines.forEach((line) => {
      if (yPosition > 270) {
        // Add a new page if we're running out of space
        doc.addPage();
        yPosition = 20;
      }
      doc.text(line, 20, yPosition);
      yPosition += 7;
    });
    
    // Save the PDF
    doc.save(`career-roadmap-${data.name.toLowerCase().replace(/\s+/g, '-')}.pdf`);
  };

  return (
    <div className="min-h-screen bg-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* User Information Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-blue-900">
                Your Career Roadmap
              </h2>
              <button
                onClick={handleDownload}
                className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
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
          </div>
        </div>

        {/* Roadmap Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-8">
            <h3 className="text-2xl font-bold text-blue-900 mb-6">Your Personalized Roadmap</h3>
            <div className="prose max-w-none text-blue-900">
              <ReactMarkdown>{data.roadmap}</ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultPage;