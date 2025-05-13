import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import { HomePage } from './Components/HomePage';
import { Roadmap } from './Components/Roadmap';
import { Chatbot } from './Components/Chatbot';

function App() {
  const handleLogout = () => {
    console.log('Logged out');
  };

  return (
    <Router>
      <Header onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
    </Router>
  );
}

export default App;