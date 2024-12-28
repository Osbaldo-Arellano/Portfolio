import React, { Key } from "react";
import { TreeItem } from "../../types/FileTree";

// src/components/layout/FileTree.tsx
function FileTree({
  treeData,
  onFileSelect,
}: {
  treeData: TreeItem[];
  onFileSelect: (node: TreeItem) => void;
}) {
  return (
    <div className="w-full h-full bg-gradient-to-r from-gray-800 to-black text-gray-300 p-4 border border-gray-600 shadow-lg">
      <p className="text-lg font-bold text-gray-100 tracking-wide border-b border-gray-600 pb-2 mb-4 uppercase">
        📁 Projects
      </p>
      <ul className="space-y-2">
        {treeData.map((item, i) => (
          <TreeNode
            key={i}
            node={item}
            onFileSelect={onFileSelect}
            level={0}
          />
        ))}
      </ul>
    </div>
  );
}

// A single tree node (folder or file)
function TreeNode({
  node,
  onFileSelect,
  level,
}: {
  node: TreeItem;
  onFileSelect: (n: TreeItem) => void;
  level: number;
}) {
  const [isOpen, setIsOpen] = React.useState(false);

  const indentStyle = { paddingLeft: `${level * 1.5}rem` };

  if (node.isFolder) {
    return (
      <li style={indentStyle} className="flex flex-col">
        <div
          className="flex items-center cursor-pointer py-1 px-2 bg-gray-700 hover:bg-gray-600 border border-gray-600 transition-all"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="mr-2 text-yellow-500">
            {isOpen ? "▾" : "▸"}
          </span>
          <span className="font-bold text-gray-200">{node.name}</span>
        </div>
        {isOpen && node.children?.length && (
          <ul className="ml-4 border-l-2 border-gray-600 pl-2 mt-2">
            {node.children?.map((child, i: Key | null | undefined) => (
              <TreeNode
                key={i}
                node={child}
                onFileSelect={onFileSelect}
                level={level + 1}
              />
            ))}
          </ul>
        )}
      </li>
    );
  } else {
    // It's a file
    return (
      <li
        style={indentStyle}
        className="flex items-center py-1 px-2 bg-gray-800 hover:bg-gray-700 border border-gray-600 cursor-pointer transition-all"
        onClick={() => onFileSelect(node)}
      >
        <span className="mr-2 text-blue-400">▸</span>
        <span className="text-gray-300">{node.name}</span>
      </li>
    );
  }
}

export default FileTree;
