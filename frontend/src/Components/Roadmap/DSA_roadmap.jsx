import React, { useState } from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
import './DSA_Roadmap.css';

// Placeholder data for node descriptions and problems
const NODE_DATA = {
  'Arrays & Strings': {
    description: 'Learn about arrays and strings, their operations, and manipulation techniques.',
    problems: [
      'Reverse an array',
      'Check for palindrome string',
      'Find duplicate in array'
    ]
  },
  'Array Basics': {
    description: 'Basic operations on arrays such as insertion, deletion, and traversal.',
    problems: [
      'Insert element at position',
      'Delete element from array'
    ]
  },
  'String Manipulation': {
    description: 'Manipulate strings using various algorithms.',
    problems: [
      'Reverse a string',
      'Count vowels in a string'
    ]
  },
  'Linked Lists': {
    description: 'Understand singly and doubly linked lists and their operations.',
    problems: [
      'Reverse a linked list',
      'Detect loop in linked list'
    ]
  },
  'Singly Linked List': {
    description: 'Implement and manipulate singly linked lists.',
    problems: [
      'Find middle of linked list',
      'Remove duplicates from linked list'
    ]
  },
  'Stacks & Queues': {
    description: 'Learn about stack and queue data structures and their applications.',
    problems: [
      'Implement stack using array',
      'Implement queue using linked list'
    ]
  },
  'Trees': {
    description: 'Explore tree data structures, including binary trees and BSTs.',
    problems: [
      'Level order traversal',
      'Check if tree is balanced'
    ]
  },
  'Binary Trees': {
    description: 'Work with binary trees and their traversals.',
    problems: [
      'Inorder traversal',
      'Postorder traversal'
    ]
  },
  'BSTs': {
    description: 'Binary Search Trees and their operations.',
    problems: [
      'Insert in BST',
      'Find minimum in BST'
    ]
  },
  'Graphs': {
    description: 'Graph data structures and traversal algorithms.',
    problems: [
      'BFS traversal',
      'DFS traversal'
    ]
  },
  'BFS/DFS': {
    description: 'Breadth-First and Depth-First Search algorithms.',
    problems: [
      'Implement BFS',
      'Implement DFS'
    ]
  },
  'Dynamic Programming': {
    description: 'Introduction to dynamic programming and problem solving.',
    problems: [
      'Fibonacci sequence',
      '0/1 Knapsack problem'
    ]
  }
};

const DSA_Roadmap = () => {
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
    'dsa-node' + (selectedNode === label ? ' selected' : '');

  return (
    <div className="dsa-roadmap-container with-sidebar">
      <h2>DSA Roadmap</h2>
      <div className="dsa-roadmap-tree">
        <Tree
          lineWidth={'2px'}
          lineColor={'#6a1b9a'}
          lineBorderRadius={'10px'}
          label={<div className={getNodeClass('DSA Roadmap')}>DSA Roadmap</div>}
        >
          <TreeNode label={<div className={getNodeClass('Arrays & Strings')} onClick={() => handleNodeClick('Arrays & Strings')}>Arrays & Strings</div>}>
            <TreeNode label={<div className={getNodeClass('Array Basics')} onClick={() => handleNodeClick('Array Basics')}>Array Basics</div>} />
            <TreeNode label={<div className={getNodeClass('String Manipulation')} onClick={() => handleNodeClick('String Manipulation')}>String Manipulation</div>} />
          </TreeNode>
          <TreeNode label={<div className={getNodeClass('Linked Lists')} onClick={() => handleNodeClick('Linked Lists')}>Linked Lists</div>}>
            <TreeNode label={<div className={getNodeClass('Singly Linked List')} onClick={() => handleNodeClick('Singly Linked List')}>Singly Linked List</div>} />
          </TreeNode>
          <TreeNode label={<div className={getNodeClass('Stacks & Queues')} onClick={() => handleNodeClick('Stacks & Queues')}>Stacks & Queues</div>} />
          <TreeNode label={<div className={getNodeClass('Trees')} onClick={() => handleNodeClick('Trees')}>Trees</div>}>
            <TreeNode label={<div className={getNodeClass('Binary Trees')} onClick={() => handleNodeClick('Binary Trees')}>Binary Trees</div>} />
            <TreeNode label={<div className={getNodeClass('BSTs')} onClick={() => handleNodeClick('BSTs')}>BSTs</div>} />
          </TreeNode>
          <TreeNode label={<div className={getNodeClass('Graphs')} onClick={() => handleNodeClick('Graphs')}>Graphs</div>}>
            <TreeNode label={<div className={getNodeClass('BFS/DFS')} onClick={() => handleNodeClick('BFS/DFS')}>BFS/DFS</div>} />
          </TreeNode>
          <TreeNode label={<div className={getNodeClass('Dynamic Programming')} onClick={() => handleNodeClick('Dynamic Programming')}>Dynamic Programming</div>} />
        </Tree>
      </div>
      {renderSidebar()}
    </div>
  );
};

export default DSA_Roadmap;