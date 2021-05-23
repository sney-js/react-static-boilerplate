import React from 'react';
import Markdown from 'react-markdown';

export const MarkdownRenderer = ({ html }) => {
  return <Markdown children={html} />;
};

export default MarkdownRenderer;
