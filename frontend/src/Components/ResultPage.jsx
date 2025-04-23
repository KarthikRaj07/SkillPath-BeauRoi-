function ResultPage({ data }) {
    const { name, job, skills } = data;
  
    return (
      <div className="min-h-screen bg-green-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg">
          <h2 className="text-3xl font-bold mb-4 text-green-700">
            Hi {name} ,
          </h2>
          <p className="text-lg mb-4">Your goal is to become a <strong>{job}</strong>.</p>
          <p className="mb-2 font-semibold">Here's  <b>ROAD MAP</b>:</p>
          <ul className="list-disc pl-5 text-gray-700">
            {skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
    
export default ResultPage;
  