import React from 'react';
import ReactMarkdown from 'react-markdown';

function MarkdownRenderer({ content }) {
  return <ReactMarkdown>{content}</ReactMarkdown>;
}

export default MarkdownRenderer;
