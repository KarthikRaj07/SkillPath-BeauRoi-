import React from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
import './DSA_Roadmap.css';

const DSA_Roadmap = () => {
  return (
    <div className="dsa-roadmap-container">
      <h2>DSA Roadmap</h2>
      <div className="dsa-roadmap-tree">
        <Tree
          lineWidth={'2px'}
          lineColor={'#6a1b9a'}
          lineBorderRadius={'10px'}
          label={<div className="dsa-node root">DSA Roadmap</div>}
        >
          <TreeNode label={<div className="dsa-node">Arrays & Strings</div>}>
            <TreeNode label={<div className="dsa-node">Array Basics</div>} />
            <TreeNode label={<div className="dsa-node">String Manipulation</div>} />
          </TreeNode>
          <TreeNode label={<div className="dsa-node">Linked Lists</div>}>
            <TreeNode label={<div className="dsa-node">Singly Linked List</div>} />
          </TreeNode>
          <TreeNode label={<div className="dsa-node">Stacks & Queues</div>} />
          <TreeNode label={<div className="dsa-node">Trees</div>}>
            <TreeNode label={<div className="dsa-node">Binary Trees</div>} />
            <TreeNode label={<div className="dsa-node">BSTs</div>} />
          </TreeNode>
          <TreeNode label={<div className="dsa-node">Graphs</div>}>
            <TreeNode label={<div className="dsa-node">BFS/DFS</div>} />
          </TreeNode>
          <TreeNode label={<div className="dsa-node">Dynamic Programming</div>} />
        </Tree>
      </div>
    </div>
  );
};

export default DSA_Roadmap;