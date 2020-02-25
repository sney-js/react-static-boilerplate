import React from "react";
import * as Markdown from "react-markdown";

export const MarkdownRenderer = ({ html }) => {
    return <Markdown source={html} escapeHtml={true} />;
};

export default MarkdownRenderer;
