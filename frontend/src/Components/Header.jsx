import React from 'react';
import { Link } from 'react-router-dom';

function Header({ onLogout }) {
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#f4f4f4' }}>
      <h1>SkillPath</h1>
      <nav>
        <ul style={{ display: 'flex', gap: '10px', listStyle: 'none', margin: 0, padding: 0 }}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/roadmap">Roadmap</Link></li>
          <li><Link to="/chatbot">Chatbot</Link></li>
        </ul>
      </nav>
      <button onClick={onLogout} style={{ padding: '5px 10px', cursor: 'pointer' }}>
        Logout
      </button>
    </header>
  );
}

export default Header;
