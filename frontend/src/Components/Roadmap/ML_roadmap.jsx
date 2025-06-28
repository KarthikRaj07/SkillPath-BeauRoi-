import React, { useCallback, useState, useMemo } from 'react';
import ReactFlow, {
    Background,
    Controls,
    useNodesState,
    useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';

// Checklist tasks for each topic
const TASKS = {
    python: [
        { text: 'Install Python and Jupyter', id: 'python-1' },
        { text: 'Learn Python basics', id: 'python-2' },
        { text: 'Practice with NumPy', id: 'python-3' },
        { text: 'Explore Pandas for data analysis', id: 'python-4' },
    ],
    math: [
        { text: 'Understand Linear Algebra basics', id: 'math-1' },
        { text: 'Learn Probability & Statistics', id: 'math-2' },
        { text: 'Practice Calculus for ML', id: 'math-3' },
    ],
    data: [
        { text: 'Collect and clean data', id: 'data-1' },
        { text: 'Visualize data with Matplotlib/Seaborn', id: 'data-2' },
        { text: 'Feature engineering basics', id: 'data-3' },
    ],
    ml: [
        { text: 'Understand supervised vs unsupervised learning', id: 'ml-1' },
        { text: 'Train a linear regression model', id: 'ml-2' },
        { text: 'Evaluate model performance', id: 'ml-3' },
        { text: 'Practice classification (e.g., logistic regression)', id: 'ml-4' },
    ],
    dl: [
        { text: 'Learn basics of neural networks', id: 'dl-1' },
        { text: 'Build a simple neural net with Keras/TensorFlow', id: 'dl-2' },
        { text: 'Understand CNNs and RNNs', id: 'dl-3' },
        { text: 'Train a deep learning model', id: 'dl-4' },
    ],
    deploy: [
        { text: 'Save and export ML models', id: 'deploy-1' },
        { text: 'Create a simple API for inference', id: 'deploy-2' },
        { text: 'Deploy model to cloud or web', id: 'deploy-3' },
    ],
};

function getNodeColor(tasks, completed) {
    if (!tasks) return '#eee';
    if (completed.length === 0) return '#aaa'; // gray
    if (completed.length === tasks.length) return '#4caf50'; // green
    return '#ffd600'; // yellow
}

const initialNodes = [
    { id: 'python', position: { x: 0, y: 200 }, data: { label: 'Python & Tools' } },
    { id: 'math', position: { x: 300, y: 0 }, data: { label: 'Math for ML' } },
    { id: 'data', position: { x: 600, y: 200 }, data: { label: 'Data Handling' } },
    { id: 'ml', position: { x: 300, y: 400 }, data: { label: 'Machine Learning' } },
    { id: 'dl', position: { x: 900, y: 200 }, data: { label: 'Deep Learning' } },
    { id: 'deploy', position: { x: 1200, y: 200 }, data: { label: 'Deployment' } },
];

const initialEdges = [
    { id: 'e-python-math', source: 'python', target: 'math' },
    { id: 'e-math-data', source: 'math', target: 'data' },
    { id: 'e-data-ml', source: 'data', target: 'ml' },
    { id: 'e-ml-dl', source: 'ml', target: 'dl' },
    { id: 'e-dl-deploy', source: 'dl', target: 'deploy' },
];

export default function MLRoadmap() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [selectedNode, setSelectedNode] = useState(null);
    const [taskState, setTaskState] = useState(() => {
        const saved = localStorage.getItem('ml-roadmap-task-state');
        return saved ? JSON.parse(saved) : {};
    });

    React.useEffect(() => {
        localStorage.setItem('ml-roadmap-task-state', JSON.stringify(taskState));
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
        <div style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 1000, background: '#fff' }}>
            <a href="/roadmap" style={{ position: 'absolute', top: 20, left: 20, zIndex: 1010, padding: '10px 20px', background: '#1a1a1a', color: '#fff', borderRadius: '8px', textDecoration: 'none' }}>Back to Roadmap List</a>

            
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
