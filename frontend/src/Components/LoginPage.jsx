import React, { useState } from 'react';

function LoginPage({ onLogin }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password || (isSignUp && !username)) {
      setError(isSignUp ? 'Username, email and password are required' : 'Email and password are required');
      return;
    }
    try {
      let url = isSignUp ? 'http://localhost:5000/register' : 'http://localhost:5000/login';
      let payload = isSignUp ? { username, email, password } : { email, password };
      console.log('Submitting payload:', payload);
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (!response.ok) {
        console.error('Error response:', data);
        setError(data.error || 'Something went wrong');
        return;
      }
      if (!isSignUp) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('email', data.email);
        onLogin && onLogin({ token: data.token, email: data.email });
      } else {
        setIsSignUp(false);
        setError('Registration successful! Please log in.');
        setUsername('');
        setPassword('');
        setEmail('');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFFBDE] via-[#91C8E4] to-[#4682A9] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="relative inline-block">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#6366F1] to-[#7C3AED] rounded-full blur-lg opacity-30 animate-pulse"></div>
            <div className="relative w-20 h-20 bg-gradient-to-r from-[#6366F1] to-[#7C3AED] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6366F1] to-[#7C3AED]">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </span>
          </h2>
          <p className="mt-2 text-gray-600">
            {isSignUp ? 'Sign up to start your journey' : 'Sign in to continue your learning journey'}
          </p>
        </div>

        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#6366F1] to-[#7C3AED] rounded-2xl blur-lg opacity-30"></div>
          <div className="relative bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/20">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">{error}</div>
              )}
              <div className="space-y-4">
                {isSignUp && (
                  <div className="group">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-[#6366F1] transition-colors duration-200">
                      Username
                    </label>
                    <div className="relative">
                      <input
                        id="username"
                        name="username"
                        type="text"
                        required={isSignUp}
                        className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all duration-200 hover:bg-white/70"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-[#6366F1] transition-colors duration-200">
                        👤
                      </div>
                    </div>
                  </div>
                )}
                <div className="group">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-[#6366F1] transition-colors duration-200">
                    Email address
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all duration-200 hover:bg-white/70"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-[#6366F1] transition-colors duration-200">
                      ✉️
                    </div>
                  </div>
                </div>
                <div className="group">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-[#6366F1] transition-colors duration-200">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      className="w-full px-4 py-3 bg-white/50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-transparent transition-all duration-200 hover:bg-white/70"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-[#6366F1] transition-colors duration-200">
                      🔒
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="relative w-full group"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#6366F1] to-[#7C3AED] rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-200"></div>
                  <div className="relative flex justify-center items-center py-3 px-4 bg-gradient-to-r from-[#6366F1] to-[#7C3AED] text-white font-semibold rounded-xl hover:from-[#7C3AED] hover:to-[#6366F1] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]">
                    {isSignUp ? 'Sign up' : 'Sign in'}
                    <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </button>
              </div>
              <div className="text-center">
                <button
                  type="button"
                  className="text-sm text-[#6366F1] hover:text-[#7C3AED] transition-colors duration-200"
                  onClick={() => { setIsSignUp(!isSignUp); setError(''); }}
                >
                  {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
