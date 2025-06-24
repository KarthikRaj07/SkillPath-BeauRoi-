import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RoadmapList from './RoadmapList';
import

function App() {
  return (


    <Router>
      <Routes>
        <Route path="/" element={<RoadmapList />} />
       
      </Routes>
    </Router>
  );
}

export default App;
