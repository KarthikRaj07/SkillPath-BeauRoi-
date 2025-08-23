import React, { useEffect, useRef, useState } from 'react';
import { Transformer } from 'markmap-lib';
import { Markmap } from 'markmap-view';

const MarkmapViewer = ({ markdown }) => {
  const svgRef = useRef(null);
  const markmapRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!markdown || !svgRef.current) return;

    try {
      console.log('Processing markdown:', markdown);
      
      // Clean up the markdown to ensure proper structure
      let cleanMarkdown = markdown.trim();
      
      // Ensure it starts with a proper heading
      if (!cleanMarkdown.startsWith('#')) {
        cleanMarkdown = '# Career Transition Roadmap\n\n' + cleanMarkdown;
      }
      
      // Remove any extra text that's not markdown
      const lines = cleanMarkdown.split('\n');
      const markdownLines = lines.filter(line => 
        line.startsWith('#') || line.startsWith('-') || line.startsWith('*') || line.trim() === ''
      );
      cleanMarkdown = markdownLines.join('\n');
      
      console.log('Cleaned markdown:', cleanMarkdown);
      
      const transformer = new Transformer();
      const { root } = transformer.transform(cleanMarkdown);
      
      console.log('Transformed root:', root);

      if (markmapRef.current) {
        markmapRef.current.setData(root);
      } else {
        markmapRef.current = Markmap.create(svgRef.current, null, root);
      }
      
      setError(null);
    } catch (err) {
      console.error('Error processing markdown:', err);
      setError(`Failed to render markmap: ${err.message}`);
    }

    return () => {
      if (markmapRef.current) {
        markmapRef.current.destroy();
        markmapRef.current = null;
      }
    };
  }, [markdown]);

  if (error) {
    return (
      <div className="w-full h-full bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-center">
        <div className="text-red-700 text-center">
          <p className="font-semibold">Markmap Rendering Error</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

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
