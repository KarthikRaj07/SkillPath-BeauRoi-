import { useState } from 'react';
import ResultPage from './Components/ResultPage';
import UserInput from './Components/UserInput';
import LoginPage from './Components/LoginPage';

function App() {
  const [formData, setFormData] = useState(null);
  const [user, setUser] = useState(null); // State to store authenticated user

  return (
    <>
      <div>
        {!user ? (
          <LoginPage onLogin={setUser} />
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
