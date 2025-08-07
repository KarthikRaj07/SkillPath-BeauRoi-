import React, { useEffect, useRef } from 'react';
import { Transformer } from 'markmap-lib';
import { Markmap } from 'markmap-view';

const MarkmapViewer = ({ markdown }) => {
  const svgRef = useRef(null);
  const markmapRef = useRef(null);

  useEffect(() => {
    if (!markdown || !svgRef.current) return;

    const transformer = new Transformer();
    const { root } = transformer.transform(markdown);

    if (markmapRef.current) {
      markmapRef.current.setData(root);
    } else {
      markmapRef.current = Markmap.create(svgRef.current, null, root);
    }

    return () => {
      if (markmapRef.current) {
        markmapRef.current.destroy();
        markmapRef.current = null;
      }
    };
  }, [markdown]);

  return (
    <div className="w-full h-full bg-white rounded-lg shadow-lg p-2">
      <svg 
        ref={svgRef} 
        className="w-full h-full"
        style={{ minHeight: '600px' }}
      />
    </div>
  );
};

export default MarkmapViewer;
