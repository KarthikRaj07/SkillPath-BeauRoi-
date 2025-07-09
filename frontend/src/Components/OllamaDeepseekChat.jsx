import { useState, useRef, useEffect } from 'react';

const QUICK_REPLIES = [
  "How can I transition to a new career?",
  "What skills should I learn for tech jobs?",
  "Help me prepare for interviews",
  "How do I build my professional network?",
  "What's the best way to update my resume?"
];

function OllamaDeepseekChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    await sendMessage(input);
  };

  const sendMessage = async (messageText) => {
    setError(null);
    setMessages(prev => [...prev, { text: messageText, sender: 'user' }]);
    setInput('');
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required. Please log in.');
      }

      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ prompt: messageText })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || errorData.msg || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setMessages(prev => [...prev, { text: data.response, sender: 'ai' }]);
    } catch (error) {
      setError(error.message);
      setMessages(prev => [...prev, { text: 'Sorry, there was an error processing your request.', sender: 'ai' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col bg-blue-100">
      {/* Sticky Header */}
      <header className="sticky top-0 z-10 flex items-center gap-3 px-6 py-4 bg-white border-b border-blue-100 shadow-sm">
        <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg">
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div>
          <h1 className="text-xl font-extrabold text-blue-900 tracking-tight">SkillPath AI Assistant</h1>
          <p className="text-xs text-blue-700 font-medium">Powered by Mistral - Your Career Development Partner</p>
        </div>
      </header>
      {/* Error */}
      {error && (
        <div className="px-6 py-2 text-red-700 bg-red-100 border-b border-red-300 text-sm">{error}</div>
      )}
      {/* Chat Messages */}
      <main className="flex-1 overflow-y-auto px-2 sm:px-0 py-4 flex flex-col gap-2">
        <div className="max-w-2xl w-full mx-auto flex flex-col gap-3">
          {messages.length === 0 && (
            <div className="text-center text-blue-400 mt-16">
              <div className="mb-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
              </div>
              <p className="text-lg font-semibold text-blue-600 mb-2">Welcome to SkillPath AI!</p>
              <p className="text-sm text-blue-500 mb-4">I'm here to help you with your career development journey.</p>
              <div className="text-xs text-blue-400 space-y-1 mb-6">
                <p>💼 Ask about career transitions</p>
                <p>📚 Get skill development advice</p>
                <p>🎯 Plan your professional goals</p>
                <p>💡 Get interview tips and strategies</p>
              </div>
              
              {/* Quick Reply Buttons */}
              <div className="flex flex-wrap justify-center gap-2">
                {QUICK_REPLIES.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => sendMessage(reply)}
                    className="px-3 py-2 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors duration-200 border border-blue-200"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>
          )}
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`px-5 py-3 rounded-2xl max-w-[75%] whitespace-pre-line break-words shadow-md text-base font-medium transition-all duration-200 ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white self-end border border-blue-200'
                    : 'bg-white text-blue-900 self-start border border-blue-100'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="px-5 py-3 rounded-2xl bg-white text-blue-900 border border-blue-100 shadow-md">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                  <span className="text-sm text-blue-600">SkillPath AI is thinking...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>
      {/* Input Bar */}
      <form onSubmit={handleSubmit} className="sticky bottom-0 z-10 w-full bg-white border-t border-blue-100 flex items-center gap-3 px-4 py-4">
        <div className="max-w-2xl w-full mx-auto flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-5 py-3 rounded-2xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 text-blue-900 placeholder-blue-400 shadow-sm font-medium"
            disabled={loading}
            autoFocus
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-6 py-3 bg-blue-600 text-white font-bold rounded-2xl shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default OllamaDeepseekChat; 