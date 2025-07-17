import React from 'react'
import { Link } from 'react-router-dom';

const RoadmapList = () => {
  return (
    <div>
      <h2>Roadmap List</h2>
      <ul>
        <li><Link to="/dsa">DSA Roadmap</Link></li>
        <li><Link to="/ml">ML Roadmap</Link></li>
      </ul>
    </div>
  )
}

export default RoadmapList