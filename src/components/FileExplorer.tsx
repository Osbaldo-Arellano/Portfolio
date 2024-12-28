import React, { useState } from 'react';
import { TreeItem } from '../types/FileTree'; // Updated to use TreeItem
import {
  ChevronRightIcon,
  ChevronDownIcon,
  FolderIcon,
  FolderOpenIcon,
  DocumentIcon,
} from '@heroicons/react/24/outline';

interface FileExplorerProps {
  nodes: TreeItem[]; // Use TreeItem here
}

const FileExplorer: React.FC<FileExplorerProps> = ({ nodes }) => {
  return (
    <div className="bg-white border border-gray-300 rounded shadow p-4 w-full max-w-md text-sm">
      {/* Optional Explorer Header */}
      <div className="mb-2 pb-2 border-b border-gray-200 font-bold text-gray-700">
        File Explorer
      </div>

      {/* Render Tree Nodes */}
      <div className="space-y-1">
        {nodes.map((node, index) => (
          <TreeNodeItem key={index} node={node} level={0} />
        ))}
      </div>
    </div>
  );
};

export default FileExplorer;

/** 
 * Individual Tree Node Component
 * - Uses recursion for nested folders
 * - Displays icons for open/closed folders and files
 */
const TreeNodeItem: React.FC<{ node: TreeItem; level: number }> = ({ node, level }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Handle toggling folder open/closed
  const toggleFolder = (event: React.MouseEvent) => {
    event.stopPropagation(); // prevents link clicks from toggling
    setIsOpen((prev) => !prev);
  };

  if (node.isFolder && node.children) {
    // Folder
    return (
      <div className="select-none">
        {/* Folder Row */}
        <div
          className="flex items-center cursor-pointer py-1 pl-2 hover:bg-gray-100 rounded group"
          style={{ paddingLeft: 8 + level * 16 }}
          onClick={toggleFolder}
        >
          {/* Arrow icon */}
          {isOpen ? (
            <ChevronDownIcon className="h-4 w-4 mr-1 text-gray-600 group-hover:text-gray-800" />
          ) : (
            <ChevronRightIcon className="h-4 w-4 mr-1 text-gray-600 group-hover:text-gray-800" />
          )}

          {/* Folder icon */}
          {isOpen ? (
            <FolderOpenIcon className="h-4 w-4 mr-2 text-yellow-500" />
          ) : (
            <FolderIcon className="h-4 w-4 mr-2 text-yellow-500" />
          )}

          <span className="text-gray-800 group-hover:text-gray-900 font-medium">
            {node.name}
          </span>
        </div>

        {/* If folder is open, render children */}
        {isOpen && (
          <div className="border-l border-gray-200">
            {node.children.map((child, idx) => (
              <TreeNodeItem key={idx} node={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  } else {
    // File
    return (
      <div
        className="flex items-center py-1 pl-2 hover:bg-gray-100 rounded"
        style={{ paddingLeft: 8 + level * 16 }}
      >
        {/* Indentation placeholder for file (no arrow) */}
        <div className="mr-1 w-4 h-4" />
        <DocumentIcon className="h-4 w-4 mr-2 text-blue-500" />

        <a
          href={node.filePath ?? '#'}
          target={node.filePath?.startsWith('http') ? '_blank' : '_self'}
          rel="noopener noreferrer"
          className="text-gray-800 hover:text-gray-900 truncate"
          onClick={(e) => e.stopPropagation()} // prevent folder toggle if link is clicked
        >
          {node.name}
        </a>
      </div>
    );
  }
};
