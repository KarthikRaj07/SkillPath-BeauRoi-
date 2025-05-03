import { useState } from 'react';
import ResultPage from './Components/ResultPage';
import UserInput from './Components/UserInput';
import LoginPage from './Components/LoginPage';
import Header from './Components/Header'; // Import the Header component

function App() {
  const [formData, setFormData] = useState(null);
  const [user, setUser] = useState(null); // State to store authenticated user

  const handleLogout = () => {
    setUser(null); // Clear the user state on logout
    setFormData(null); // Optionally clear form data
  };

  return (
    <>
      {user && <Header onLogout={handleLogout} />} {/* Show Header if user is logged in */}
      <div>
        {!user ? (
          <LoginPage onLogin={setUser} buttonClass="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-600 transition duration-300" />
        ) : formData ? (
          <ResultPage data={formData} />
        ) : (
          <UserInput onSubmit={setFormData} />
        )}
      </div>
    </>
  );
}

export default App;
