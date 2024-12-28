import React from 'react';
import { TreeItem } from '../types/FileTree';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';

type FileDetailMobileProps = {
  fileNode: TreeItem | null;
  onClose: () => void;
};

function FileDetailMobile({ fileNode, onClose }: FileDetailMobileProps) {
  if (!fileNode) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        <p>Select a file to view its details.</p>
      </div>
    );
  }

  const isFolder = fileNode.isFolder;
  const contentAvailable = fileNode.content;

  return (
    <div
      className="w-full h-full bg-gray-900 text-gray-200 border border-gray-700 shadow-xl
      flex flex-col p-6 transform scale-100 hover:scale-105 transition-transform duration-300"
    >
      {/* Header */}
      <div className="flex justify-between items-center border-b border-gray-700 pb-3">
        <h2
          className={`text-lg font-bold uppercase ${
            isFolder ? 'text-blue-400' : contentAvailable ? 'text-green-400' : 'text-red-400'
          }`}
        >
          {isFolder ? '📂' : contentAvailable ? '📄' : '❌'} {fileNode.name}
        </h2>
        <button
          onClick={onClose}
          className="bg-red-500 text-white px-4 py-1 uppercase font-bold text-xs hover:bg-red-600 transition-all"
        >
          X
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 mt-4 overflow-auto bg-gray-800 border border-gray-700 rounded p-4">
        {isFolder && (
          <p className="text-blue-400 italic">This is a folder. No content available.</p>
        )}
        {!isFolder && !contentAvailable && (
          <p className="text-red-400 italic">No content available for this file.</p>
        )}
          {!isFolder && contentAvailable && typeof fileNode.content === 'string' ? (
            <SyntaxHighlighter language="javascript" style={dracula}>
              {fileNode.content}
            </SyntaxHighlighter>
          ) : (
            // Render JSX if `fileNode.content` is a React component
            typeof fileNode.content === 'function' && fileNode.content()
          )}
      </div>

      {/* Footer */}
      <div className="mt-4 text-xs text-gray-400 text-center uppercase tracking-wide">
        {isFolder
          ? '📁 Navigate to a file to view its contents.'
          : contentAvailable
          ? '📝 Viewing file content.'
          : '🚫 No content found.'}
      </div>
    </div>
  );
}

export default FileDetailMobile;
