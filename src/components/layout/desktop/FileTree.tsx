import React, { Key } from "react";
import { TreeItem } from "../../../types/FileTree";

function FileTree({
  treeData,
  onFileSelect,
}: {
  treeData: TreeItem[];
  onFileSelect: (node: TreeItem) => void;
}) {
  return (
    <div className="w-full h-full bg-gray-200 text-black border border-gray-400 shadow-inner font-sans">
      <ul className="mt-2">
        {treeData.map((item, i) => (
          <TreeNode key={i} node={item} onFileSelect={onFileSelect} level={0} />
        ))}
      </ul>
    </div>
  );
}

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
          className="flex items-center cursor-pointer py-1 px-2 bg-gray-300 hover:bg-gray-200 border border-gray-400 transition-all"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="mr-2 text-blue-500">
            {isOpen ? "📂" : "📁"}
          </span>
          <span className="font-bold">{node.name}</span>
        </div>
        {isOpen && node.children?.length && (
          <ul className="ml-4 border-l-2 border-gray-400 pl-2 mt-1">
            {node.children.map((child, i: Key | null | undefined) => (
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
    return (
      <li
        style={indentStyle}
        className="flex items-center py-1 px-2 bg-gray-200 hover:bg-gray-100 border border-gray-400 cursor-pointer transition-all"
        onClick={() => onFileSelect(node)}
      >
        <span className="mr-2 text-blue-400">📄</span>
        <span>{node.name}</span>
      </li>
    );
  }
}

export default FileTree;
