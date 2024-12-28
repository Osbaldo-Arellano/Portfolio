import React from 'react';
import { TreeItem, FileType } from '../types/FileTree';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import 'github-markdown-css';

type FileDetailProps = {
  fileNode: TreeItem | null;
  onClose: () => void;
};

function FileDetail({ fileNode, onClose }: FileDetailProps) {
  if (!fileNode) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        <p>Select a file to view its details.</p>
      </div>
    );
  }

  const renderContent = () => {
    if (fileNode.type === FileType.MARKDOWN) {
      return (
        <div className="markdown-body p-4">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ inline, className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={dracula}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).trim()}
                  </SyntaxHighlighter>
                ) : (
                  <code className="bg-gray-800 text-green-300 px-1 rounded" {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {fileNode.content as string}
          </ReactMarkdown>
        </div>
      );
    }

    if (fileNode.type === FileType.TYPESCRIPT || fileNode.type === FileType.JAVASCRIPT) {
      return (
        <SyntaxHighlighter language="typescript" style={dracula}>
          {fileNode.content as string}
        </SyntaxHighlighter>
      );
    }

    if (typeof fileNode.content === 'string') {
      return <pre className="whitespace-pre-wrap text-gray-300">{fileNode.content}</pre>;
    }

    return <p className="italic text-gray-400">No content available or unsupported file type.</p>;
  };

  return (
    <div className="w-full h-full bg-gray-900 text-gray-300 border border-gray-700 shadow-lg flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between bg-gray-800 text-gray-200 h-10 px-4 border-b border-gray-700">
        <h2
          className={`text-base font-semibold tracking-wide uppercase ${
            fileNode.isFolder ? 'text-blue-400' : fileNode.content ? 'text-green-400' : 'text-red-400'
          }`}
        >
          {fileNode.isFolder ? '📂' : fileNode.content ? '📄' : '❌'} {fileNode.name}
        </h2>
        <button
          onClick={onClose}
          className="bg-red-600 text-white text-sm font-bold px-3 py-1 uppercase tracking-wider hover:bg-red-700 transition duration-300"
        >
          Close
        </button>
      </div>

      {/* Content */}
      <div
        className={`flex-1 ${
          !fileNode.content
            ? 'flex items-center justify-center text-sm text-gray-400 italic'
            : 'bg-gray-800 p-4 overflow-auto border-t border-gray-700'
        }`}
      >
        {renderContent()}
      </div>

      {/* Footer */}
      <div className="bg-gray-800 text-gray-400 text-center py-2 border-t border-gray-700">
        {fileNode.isFolder
          ? '📁 Navigate to a file to view its contents.'
          : fileNode.content
          ? '📝 Viewing file content.'
          : '🚫 No content found.'}
      </div>
    </div>
  );
}

export default FileDetail;
