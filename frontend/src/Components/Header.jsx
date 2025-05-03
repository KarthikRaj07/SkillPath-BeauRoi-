
import React from 'react';

function Header({ onLogout }) {
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#f4f4f4' }}>
      <h1>Skill Recommendation</h1>
      <button onClick={onLogout} style={{ padding: '5px 10px', cursor: 'pointer' }}>
        Logout
      </button>
    </header>
  );
}

export default Header;
