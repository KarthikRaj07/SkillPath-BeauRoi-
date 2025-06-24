import React, { useCallback, useState, useMemo } from 'react';
import ReactFlow, {
  Background,
  Controls,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Link } from 'react-router-dom'; // Add this import

// Checklist tasks for each topic
const TASKS = {
  arrays: [
    { text: 'Learn array declaration in JS', id: 'arrays-1' },
    { text: 'Practice basic operations (insert/delete)', id: 'arrays-2' },
    { text: 'Solve 5 array problems on LeetCode', id: 'arrays-3' },
    { text: 'Understand 2D arrays', id: 'arrays-4' },
    { text: 'Implement reverse array function', id: 'arrays-5' },
  ],
  stacks: [
    { text: 'Understand stack (LIFO) principle', id: 'stacks-1' },
    { text: 'Implement stack in JS', id: 'stacks-2' },
    { text: 'Solve 3 stack problems', id: 'stacks-3' },
    { text: 'Learn stack applications (undo, recursion)', id: 'stacks-4' },
  ],
  graphs: [
    { text: 'Understand graph basics', id: 'graphs-1' },
    { text: 'Implement BFS and DFS', id: 'graphs-2' },
    { text: 'Solve 2 graph problems', id: 'graphs-3' },
    { text: 'Learn about adjacency list/matrix', id: 'graphs-4' },
  ],
  sorting: [
    { text: 'Understand Bubble Sort', id: 'sorting-1' },
    { text: 'Implement Merge Sort', id: 'sorting-2' },
    { text: 'Practice Quick Sort problems', id: 'sorting-3' },
    { text: 'Compare sorting algorithm complexities', id: 'sorting-4' },
  ],
  dp: [
    { text: 'Understand Dynamic Programming', id: 'dp-1' },
    { text: 'Solve Fibonacci with DP', id: 'dp-2' },
    { text: 'Practice 2 DP problems', id: 'dp-3' },
    { text: 'Learn memoization vs tabulation', id: 'dp-4' },
  ],
};

function getNodeColor(tasks, completed) {
  if (!tasks) return '#eee';
  if (completed.length === 0) return '#aaa'; // gray
  if (completed.length === tasks.length) return '#4caf50'; // green
  return '#ffd600'; // yellow
}

const initialNodes = [
  { id: 'arrays', position: { x: 0, y: 200 }, data: { label: 'Arrays' } },
  { id: 'stacks', position: { x: 300, y: 0 }, data: { label: 'Stacks' } },
  { id: 'graphs', position: { x: 600, y: 200 }, data: { label: 'Graphs' } },
  { id: 'sorting', position: { x: 300, y: 400 }, data: { label: 'Sorting' } },
  { id: 'dp', position: { x: 900, y: 200 }, data: { label: 'Dynamic Programming' } },
];

const initialEdges = [
  { id: 'e-arrays-stacks', source: 'arrays', target: 'stacks' },
  { id: 'e-stacks-graphs', source: 'stacks', target: 'graphs' },
  { id: 'e-arrays-sorting', source: 'arrays', target: 'sorting' },
  { id: 'e-sorting-dp', source: 'sorting', target: 'dp' },
  { id: 'e-graphs-dp', source: 'graphs', target: 'dp' },
];

export default function Roadmap() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [taskState, setTaskState] = useState(() => {
    const saved = localStorage.getItem('dsa-simple-task-state');
    return saved ? JSON.parse(saved) : {};
  });

  React.useEffect(() => {
    localStorage.setItem('dsa-simple-task-state', JSON.stringify(taskState));
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
    // Only update node color via state, not setNodes directly (let useMemo handle it)
  };

  const closeSidebar = () => setSelectedNode(null);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 1000, background: '#fff' }}>
      <Link
        to="/roadmap"
        style={{
          position: 'absolute',
          top: 20,
          left: 20,
          zIndex: 1010,
          padding: '10px 20px',
          background: '#1a1a1a',
          color: '#fff',
          borderRadius: '8px',
          textDecoration: 'none'
        }}
      >
        Back to Roadmap List
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
        <div style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: 350,
          height: '100vh',
          background: '#fafafa',
          boxShadow: '-2px 0 8px #0002',
          zIndex: 2000,
          padding: 24,
          overflowY: 'auto',
        }}>
          <button onClick={closeSidebar} style={{ float: 'right', fontSize: 18, background: 'none', border: 'none', cursor: 'pointer' }}>✕</button>
          <h2 style={{ marginTop: 0, color: '#d32f2f', fontWeight: 700 }}>{selectedNode.data.label}</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {(TASKS[selectedNode.id] || [
              { text: 'No tasks for this topic.', id: 'none' }
            ]).map((task) => (
              <li key={task.id} style={{ margin: '16px 0' }}>
                <label style={{ cursor: 'pointer', color: '#1976d2', fontWeight: 500, fontSize: 16 }}>
                  <input
                    type="checkbox"
                    checked={(taskState[selectedNode.id] || []).includes(task.id)}
                    onChange={() => handleTaskToggle(selectedNode.id, task.id)}
                  />
                  <span style={{ marginLeft: 8 }}>{task.text}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
