import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Header from './Components/Header';
import { HomePage } from './Components/HomePage';
import RoadmapList from './Components/Roadmap/RoadmapList';
import { Home } from './Components/Home';
import DSA_Roadmap from './Components/Roadmap/DSA_roadmap';
import FSD_roadmap from './Components/Roadmap/FSD_roadmap';
import OllamaDeepseekChat from './Components/OllamaDeepseekChat';
import MLRoadmap from './Components/Roadmap/ML_roadmap';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    // You can log error info here if needed
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 32, color: 'red' }}>
          <h2>Something went wrong.</h2>
          <pre>{this.state.error && this.state.error.toString()}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

function AppRoutes({ user, setUser }) {
  const navigate = useNavigate();

  const handleAuthSuccess = (user) => {
    setUser(user);
    navigate("/"); // Go to homepage after login/signup
  };

  const handleLogout = () => {
    setUser(null);
    console.log('Logged out');
  };

  if (!user) {
    return <Home onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <>
      <Header onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/roadmap" element={<RoadmapList />} />
        <Route path="/chatbot" element={<OllamaDeepseekChat />} />
        <Route path="/second" element={<DSA_Roadmap />} />
        <Route path="/fsd" element={<FSD_roadmap />} />
        <Route path="/ml" element={<MLRoadmap />} />
      </Routes>
    </>
  );
}

function App() {
  const [user, setUser] = React.useState(null);

  return (
    <ErrorBoundary>
      <Router>
        <AppRoutes user={user} setUser={setUser} />
      </Router>
    </ErrorBoundary>
  );
}

export default App;