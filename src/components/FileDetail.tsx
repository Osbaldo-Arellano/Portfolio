import React, { Suspense, lazy } from "react";
import { TreeItem, FileType } from "../types/FileTree";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "github-markdown-css";

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
        <div className="flex flex-col h-full">
          <div
            className="flex-1 overflow-y-auto p-4 markdown-body bg-gray-800 text-gray-300 sm:p-3 md:p-5 lg:p-6 hide-scrollbar"
            style={{ borderRadius: "4px" }}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({ inline, className, children, ...props }: any) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={dracula}
                      language={match[1]}
                      PreTag="div"
                      customStyle={{
                        margin: "0",
                        padding: "1rem",
                        borderRadius: "4px",
                        backgroundColor: "#1e1e2f",
                        border: "none",
                      }}
                      {...props}
                    >
                      {String(children).trim()}
                    </SyntaxHighlighter>
                  ) : (
                    <code
                      className="bg-gray-800 text-green-300 px-1 rounded"
                      style={{
                        margin: "0",
                        padding: "0.2rem 0.4rem",
                        borderRadius: "4px",
                        backgroundColor: "transparent",
                        display: inline ? "inline" : "block",
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

    if (fileNode.type === FileType.TYPESCRIPT) {
      // Dynamically import the component
      const DynamicComponent = lazy(() => import(`../${fileNode.filePath}`));

      return (
        <Suspense fallback={<div></div>}>
          <DynamicComponent />
        </Suspense>
      );
    }
    

    if (typeof fileNode.content === "string") {
      return (
        <pre
          className="whitespace-pre-wrap text-gray-300"
          style={{
            marginRight: "16px",
            marginBottom: "16px",
          }}
        >
          {fileNode.content}
        </pre>
      );
    }

    return <p className="italic text-gray-400">No content available or unsupported file type.</p>;
  };

  return (
    <div
      className="w-full h-full bg-gray-900 text-gray-300 border border-gray-700 shadow-lg flex flex-col"
      style={{ maxHeight: "100vh" }}
    >
      <div
        className="flex-1 overflow-y-auto hover-scroll"
        style={{
          padding: "1rem",
        }}
      >
        {renderContent()}
      </div>

      <div
        className="bg-gray-800 text-gray-400 text-center py-2 border-t border-gray-700"
        style={{ flexShrink: 0 }}
      >
        {fileNode.isFolder
          ? "📁 Navigate to a file to view its contents."
          : fileNode.content
          ? "👀 READ ONLY"
          : "🚫 No content found."}
      </div>
    </div>
  );
}

export default FileDetail;
