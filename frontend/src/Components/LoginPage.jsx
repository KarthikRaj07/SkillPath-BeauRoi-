import React from 'react';

function LoginPage({ onLogin, buttonClass }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <button
        onClick={() => onLogin({ username: 'user' })} // Example login logic
        className={buttonClass}
      >
        Login
      </button>
    </div>
  );
}

export default LoginPage;
