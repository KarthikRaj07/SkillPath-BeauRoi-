import React, { useState } from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
import './ML_Roadmap.css';

// Placeholder data for node descriptions and problems
const NODE_DATA = {
  'Math Foundations': {
    description: 'Covers the essential math for ML: linear algebra, statistics, and probability.',
    problems: [
      'Matrix multiplication',
      'Probability basics',
      'Mean/Variance calculation'
    ]
  },
  'Linear Algebra': {
    description: 'Vectors, matrices, and operations used in ML algorithms.',
    problems: [
      'Dot product',
      'Matrix inversion'
    ]
  },
  'Statistics': {
    description: 'Statistical concepts for data analysis and ML.',
    problems: [
      'Normal distribution',
      'Hypothesis testing'
    ]
  },
  'Programming': {
    description: 'Programming skills, especially in Python, for implementing ML models.',
    problems: [
      'Write a function in Python',
      'List comprehensions'
    ]
  },
  'Python': {
    description: 'Python language basics and libraries for ML.',
    problems: [
      'Numpy array operations',
      'Pandas DataFrame basics'
    ]
  },
  'Data Preprocessing': {
    description: 'Cleaning and preparing data for ML models.',
    problems: [
      'Handle missing values',
      'Feature scaling'
    ]
  },
  'Supervised Learning': {
    description: 'Learning with labeled data: regression and classification.',
    problems: [
      'Linear regression',
      'Logistic regression'
    ]
  },
  'Regression': {
    description: 'Predicting continuous values.',
    problems: [
      'Implement linear regression',
      'Mean squared error calculation'
    ]
  },
  'Classification': {
    description: 'Predicting categorical values.',
    problems: [
      'Implement logistic regression',
      'Confusion matrix'
    ]
  },
  'Unsupervised Learning': {
    description: 'Learning from unlabeled data: clustering, dimensionality reduction.',
    problems: [
      'K-means clustering',
      'PCA basics'
    ]
  },
  'Model Deployment': {
    description: 'Deploying ML models to production.',
    problems: [
      'Save model with pickle',
      'Serve model with Flask'
    ]
  },
  'Deep Learning': {
    description: 'Neural networks and deep learning architectures.',
    problems: [
      'Build a simple neural network',
      'Backpropagation basics'
    ]
  }
};

const ML_Roadmap = () => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [checkedProblems, setCheckedProblems] = useState({});

  const handleNodeClick = (label) => {
    setSelectedNode(label);
  };

  const handleCheckboxChange = (problem) => {
    setCheckedProblems((prev) => ({
      ...prev,
      [problem]: !prev[problem]
    }));
  };

  const renderSidebar = () => {
    if (!selectedNode || !NODE_DATA[selectedNode]) return null;
    const { description, problems } = NODE_DATA[selectedNode];
    return (
      <div className="sidebar">
        <button className="close-btn" onClick={() => setSelectedNode(null)}>×</button>
        <h3>{selectedNode}</h3>
        <p>{description}</p>
        <h4>Problems</h4>
        <ul>
          {problems.map((problem) => (
            <li key={problem}>
              <label>
                <input
                  type="checkbox"
                  checked={!!checkedProblems[problem]}
                  onChange={() => handleCheckboxChange(problem)}
                />
                {problem}
              </label>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  // Helper to highlight selected node
  const getNodeClass = (label) =>
    'ml-node' + (selectedNode === label ? ' selected' : '');

  return (
    <div className="ml-roadmap-container with-sidebar">
      <h2>Machine Learning Roadmap</h2>
      <div className="ml-roadmap-tree">
        <Tree
          lineWidth={'2px'}
          lineColor={'#1976d2'}
          lineBorderRadius={'10px'}
          label={<div className={getNodeClass('Machine Learning Roadmap')}>Machine Learning Roadmap</div>}
        >
          <TreeNode label={<div className={getNodeClass('Math Foundations')} onClick={() => handleNodeClick('Math Foundations')}>Math Foundations</div>}>
            <TreeNode label={<div className={getNodeClass('Linear Algebra')} onClick={() => handleNodeClick('Linear Algebra')}>Linear Algebra</div>} />
            <TreeNode label={<div className={getNodeClass('Statistics')} onClick={() => handleNodeClick('Statistics')}>Statistics</div>} />
          </TreeNode>
          <TreeNode label={<div className={getNodeClass('Programming')} onClick={() => handleNodeClick('Programming')}>Programming</div>}>
            <TreeNode label={<div className={getNodeClass('Python')} onClick={() => handleNodeClick('Python')}>Python</div>} />
          </TreeNode>
          <TreeNode label={<div className={getNodeClass('Data Preprocessing')} onClick={() => handleNodeClick('Data Preprocessing')}>Data Preprocessing</div>} />
          <TreeNode label={<div className={getNodeClass('Supervised Learning')} onClick={() => handleNodeClick('Supervised Learning')}>Supervised Learning</div>}>
            <TreeNode label={<div className={getNodeClass('Regression')} onClick={() => handleNodeClick('Regression')}>Regression</div>} />
            <TreeNode label={<div className={getNodeClass('Classification')} onClick={() => handleNodeClick('Classification')}>Classification</div>} />
          </TreeNode>
          <TreeNode label={<div className={getNodeClass('Unsupervised Learning')} onClick={() => handleNodeClick('Unsupervised Learning')}>Unsupervised Learning</div>} />
          <TreeNode label={<div className={getNodeClass('Model Deployment')} onClick={() => handleNodeClick('Model Deployment')}>Model Deployment</div>} />
          <TreeNode label={<div className={getNodeClass('Deep Learning')} onClick={() => handleNodeClick('Deep Learning')}>Deep Learning</div>} />
        </Tree>
      </div>
      {renderSidebar()}
    </div>
  );
};

export default ML_Roadmap;