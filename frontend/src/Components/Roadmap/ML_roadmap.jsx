import React from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
import './ML_Roadmap.css';

const ML_Roadmap = () => {
  return (
    <div className="ml-roadmap-container">
      <h2>Machine Learning Roadmap</h2>
      <div className="ml-roadmap-tree">
        <Tree
          lineWidth={'2px'}
          lineColor={'#1976d2'}
          lineBorderRadius={'10px'}
          label={<div className="ml-node root">Machine Learning Roadmap</div>}
        >
          <TreeNode label={<div className="ml-node">Math Foundations</div>}>
            <TreeNode label={<div className="ml-node">Linear Algebra</div>} />
            <TreeNode label={<div className="ml-node">Statistics</div>} />
          </TreeNode>
          <TreeNode label={<div className="ml-node">Programming</div>}>
            <TreeNode label={<div className="ml-node">Python</div>} />
          </TreeNode>
          <TreeNode label={<div className="ml-node">Data Preprocessing</div>} />
          <TreeNode label={<div className="ml-node">Supervised Learning</div>}>
            <TreeNode label={<div className="ml-node">Regression</div>} />
            <TreeNode label={<div className="ml-node">Classification</div>} />
          </TreeNode>
          <TreeNode label={<div className="ml-node">Unsupervised Learning</div>} />
          <TreeNode label={<div className="ml-node">Model Deployment</div>} />
          <TreeNode label={<div className="ml-node">Deep Learning</div>} />
        </Tree>
      </div>
    </div>
  );
};

export default ML_Roadmap;