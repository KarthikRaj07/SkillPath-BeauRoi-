/**
 * Converts plain text into a structured markdown format for markmap
 * @param {string} text - The plain text to convert
 * @returns {string} - Formatted markdown string
 */
export function convertToMarkdown(text) {
  if (!text) return '';
  
  // Split the text into sections
  const sections = text.split(/\n[0-9]+\.\s/).filter(Boolean);
  
  // Start with the main title
  let markdown = '# Career Transition Roadmap\n\n';
  
  sections.forEach((section, index) => {
    // Split by colon to get heading and content
    const colonIndex = section.indexOf(':');
    
    if (colonIndex !== -1) {
      const heading = section.substring(0, colonIndex).trim();
      const content = section.substring(colonIndex + 1).trim();
      
      // Add as level 2 heading
      markdown += `## ${heading}\n`;
      
      // Split content into bullet points
      const lines = content.split('\n').filter(line => line.trim());
      lines.forEach(line => {
        const cleanLine = line.replace(/^[-*]\s*/, '').trim();
        if (cleanLine) {
          markdown += `- ${cleanLine}\n`;
        }
      });
      
      markdown += '\n';
    } else {
      // If no colon, treat as a section
      markdown += `## Section ${index + 1}\n`;
      const lines = section.split('\n').filter(line => line.trim());
      lines.forEach(line => {
        const cleanLine = line.replace(/^[-*]\s*/, '').trim();
        if (cleanLine) {
          markdown += `- ${cleanLine}\n`;
        }
      });
      markdown += '\n';
    }
  });
  
  return markdown;
}
