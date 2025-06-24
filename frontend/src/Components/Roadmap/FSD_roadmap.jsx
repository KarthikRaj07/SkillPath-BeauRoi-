import React, { useCallback, useState, useMemo } from 'react';
import ReactFlow, {
  Background,
  Controls,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Link } from 'react-router-dom';

// Checklist tasks for each topic
const TASKS = {
  html: [
    { text: 'Learn HTML tags and structure', id: 'html-1' },
    { text: 'Build a basic web page', id: 'html-2' },
    { text: 'Understand semantic HTML', id: 'html-3' },
    { text: 'Practice forms and inputs', id: 'html-4' },
  ],
  css: [
    { text: 'Learn CSS selectors and properties', id: 'css-1' },
    { text: 'Style a web page', id: 'css-2' },
    { text: 'Responsive layouts (Flexbox/Grid)', id: 'css-3' },
    { text: 'Practice with media queries', id: 'css-4' },
  ],
  js: [
    { text: 'Understand JS syntax and variables', id: 'js-1' },
    { text: 'DOM manipulation', id: 'js-2' },
    { text: 'ES6+ features', id: 'js-3' },
    { text: 'Async programming (Promises, async/await)', id: 'js-4' },
  ],
  react: [
    { text: 'Learn React components', id: 'react-1' },
    { text: 'Props and state', id: 'react-2' },
    { text: 'React hooks', id: 'react-3' },
    { text: 'Build a simple React app', id: 'react-4' },
  ],
  node: [
    { text: 'Understand Node.js basics', id: 'node-1' },
    { text: 'Build a REST API', id: 'node-2' },
    { text: 'Express.js routing', id: 'node-3' },
    { text: 'Middleware and error handling', id: 'node-4' },
  ],
  db: [
    { text: 'Learn SQL basics', id: 'db-1' },
    { text: 'CRUD operations', id: 'db-2' },
    { text: 'NoSQL vs SQL', id: 'db-3' },
    { text: 'Connect Node.js to a database', id: 'db-4' },
  ],
  auth: [
    { text: 'Understand authentication vs authorization', id: 'auth-1' },
    { text: 'Implement JWT authentication', id: 'auth-2' },
    { text: 'OAuth basics', id: 'auth-3' },
    { text: 'Protect routes in backend/frontend', id: 'auth-4' },
  ],
  deploy: [
    { text: 'Learn about hosting options', id: 'deploy-1' },
    { text: 'Deploy a fullstack app', id: 'deploy-2' },
    { text: 'Environment variables', id: 'deploy-3' },
    { text: 'CI/CD basics', id: 'deploy-4' },
  ],
};

function getNodeColor(tasks, completed) {
  if (!tasks) return '#eee';
  if (completed.length === 0) return '#aaa'; // gray
  if (completed.length === tasks.length) return '#4caf50'; // green
  return '#ffd600'; // yellow
}

const initialNodes = [
  { id: 'html', position: { x: 0, y: 200 }, data: { label: 'HTML' } },
  { id: 'css', position: { x: 250, y: 0 }, data: { label: 'CSS' } },
  { id: 'js', position: { x: 500, y: 200 }, data: { label: 'JavaScript' } },
  { id: 'react', position: { x: 250, y: 400 }, data: { label: 'React' } },
  { id: 'node', position: { x: 800, y: 200 }, data: { label: 'Node.js & Express' } },
  { id: 'db', position: { x: 1050, y: 0 }, data: { label: 'Database' } },
  { id: 'auth', position: { x: 1050, y: 400 }, data: { label: 'Authentication' } },
  { id: 'deploy', position: { x: 1300, y: 200 }, data: { label: 'Deployment' } },
];

const initialEdges = [
  { id: 'e-html-css', source: 'html', target: 'css' },
  { id: 'e-css-js', source: 'css', target: 'js' },
  { id: 'e-js-react', source: 'js', target: 'react' },
  { id: 'e-react-node', source: 'react', target: 'node' },
  { id: 'e-node-db', source: 'node', target: 'db' },
  { id: 'e-node-auth', source: 'node', target: 'auth' },
  { id: 'e-db-deploy', source: 'db', target: 'deploy' },
  { id: 'e-auth-deploy', source: 'auth', target: 'deploy' },
];

export default function FSDRoadmap() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [taskState, setTaskState] = useState(() => {
    const saved = localStorage.getItem('fsd-roadmap-task-state');
    return saved ? JSON.parse(saved) : {};
  });

  React.useEffect(() => {
    localStorage.setItem('fsd-roadmap-task-state', JSON.stringify(taskState));
  }, [taskState]);

  // Compute node colors based on task completion
  const coloredNodes = useMemo(() =>
    nodes.map((node) => {
      const tasks = TASKS[node.id];
      const completed = (taskState[node.id] || []);
      return {
        ...node,
        style: {
          ...node.style,
          background: getNodeColor(tasks, completed),
          border: '2px solid #333',
          color: '#222',
          fontWeight: 600,
          fontSize: 16,
          minWidth: 120,
        },
      };
    }),
    [nodes, taskState]
  );

  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
  }, []);

  const handleTaskToggle = (nodeId, taskId) => {
    setTaskState((prev) => {
      const prevCompleted = prev[nodeId] || [];
      const isDone = prevCompleted.includes(taskId);
      const updated = isDone
        ? prevCompleted.filter((id) => id !== taskId)
        : [...prevCompleted, taskId];
      return { ...prev, [nodeId]: updated };
    });
  };

  const closeSidebar = () => setSelectedNode(null);

  return (
    <div className="w-screen h-screen fixed top-0 left-0 z-[1000] bg-white">
      <Link
        to="/roadmap"
        className="absolute top-5 left-5 z-[1010] px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl shadow-lg font-semibold text-base hover:from-cyan-600 hover:to-blue-700 transition-all duration-200"
      >
        ← Back to Roadmap List
      </Link>
      <ReactFlow
        nodes={coloredNodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
      {selectedNode && (
        <div className="fixed top-0 right-0 w-[350px] h-screen bg-[#fafafa] shadow-2xl z-[2000] p-6 overflow-y-auto border-l border-gray-200">
          <button onClick={closeSidebar} className="float-right text-2xl bg-none border-none cursor-pointer text-gray-400 hover:text-red-500 transition-colors duration-200">✕</button>
          <h2 className="mt-0 text-2xl font-bold text-blue-700 mb-4">{selectedNode.data.label}</h2>
          <ul className="list-none p-0">
            {(TASKS[selectedNode.id] || [
              { text: 'No tasks for this topic.', id: 'none' }
            ]).map((task) => (
              <li key={task.id} className="my-4">
                <label className="cursor-pointer text-blue-600 font-medium text-base flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={(taskState[selectedNode.id] || []).includes(task.id)}
                    onChange={() => handleTaskToggle(selectedNode.id, task.id)}
                    className="accent-blue-600 w-5 h-5 rounded focus:ring-2 focus:ring-blue-400"
                  />
                  <span>{task.text}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
