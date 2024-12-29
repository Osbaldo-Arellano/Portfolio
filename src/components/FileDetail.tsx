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
        <div style={{ margin: '0', padding: '0' }}>
          {/* Banner */}
          <div
            style={{
              textAlign: 'center',
              backgroundColor: '#1e1e2f',
              margin: '0',
              padding: '0', // Ensure no padding around the banner
              width: '100%', // Ensure the container spans the full width
            }}
          >
            <img
              src="https://raw.githubusercontent.com/Osbaldo-Arellano/pictures/refs/heads/main/github-header-image(9).png"
              alt="Banner"
              style={{
                width: '100%', // Make the image take up the full width
                height: 'auto', // Maintain aspect ratio
                display: 'block', // Remove any inline gap caused by `img` tags
              }}
            />
          </div>

          {/* Markdown Content */}
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
                      customStyle={{
                        margin: '0',
                        padding: '1rem',
                        borderRadius: '4px',
                        backgroundColor: '#1e1e2f',
                      }}
                      {...props}
                    >
                      {String(children).trim()}
                    </SyntaxHighlighter>
                  ) : (
                    <code
                      className="bg-gray-800 text-green-300 px-1 rounded"
                      style={{
                        margin: '0',
                        display: 'block',
                      }}
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },
              }}
            >
              {fileNode.content as string}
            </ReactMarkdown>
          </div>
        </div>
      );
    }

    if (fileNode.type === FileType.TYPESCRIPT || fileNode.type === FileType.JAVASCRIPT) {
      return (
        <SyntaxHighlighter language="typescript" style={dracula} customStyle={{ margin: '0' }}>
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
