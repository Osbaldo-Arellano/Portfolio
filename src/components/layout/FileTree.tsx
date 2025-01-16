import React from "react";
import { TreeItem } from "../../types/FileTree";

function FileTree({
  treeData,
  onFileSelect,
}: {
  treeData: TreeItem[];
  onFileSelect: (node: TreeItem) => void;
}) {
  return (
    // Retain a fixed height with overflow as you had, but using a table
    <div className="file-item w-full h-64 overflow-y-auto border border-gray-400 font-sans">
      <table className="min-w-full text-left">
        {/* Header */}
        <thead className="bg-gray-100 border-b border-gray-400">
          <tr>
            <th className="px-2 py-2 w-1/3">Name</th>
            <th className="px-2 py-2">Permissions</th>
            <th className="px-2 py-2">Type</th>
          </tr>
        </thead>
        {/* Body (recursive rows) */}
        <tbody>
          {treeData.map((item, i) => (
            <TreeRow key={i} node={item} onFileSelect={onFileSelect} level={0} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TreeRow({
  node,
  onFileSelect,
  level,
}: {
  node: TreeItem;
  onFileSelect: (n: TreeItem) => void;
  level: number;
}) {
  const [isOpen, setIsOpen] = React.useState(false);

  // Indent the first column (Name) to mimic nested folders/files
  const indentPx = level * 24; // ~1.5rem increments

  // If it's a folder, render a folder row + (if open) child rows
  if (node.isFolder) {
    // The row for this folder
    const folderRow = (
      <tr
        className="hover:text-gray-900 transition-all"
        // If you want the whole row clickable, attach onClick to <tr>; 
        // or keep it on the <td> where the name is. This is personal preference.
      >
        <td
          className="py-1 px-2 cursor-pointer font-bold"
          style={{ paddingLeft: indentPx }}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="mr-2 text-blue-500">{isOpen ? "📂" : "📁"}</span>
          {node.name}
        </td>
        {/* Placeholder cells for the other columns */}
        <td className="py-1 px-2 text-gray-700">{node.permissions}</td>
        <td className="py-1 px-2 text-gray-700">Folder</td>
      </tr>
    );

    // If open, render child rows after the folder row
    let childRows: JSX.Element[] = [];
    if (isOpen && node.children) {
      childRows = node.children.map((child, idx) => (
        <TreeRow
          key={idx}
          node={child}
          onFileSelect={onFileSelect}
          level={level + 1}
        />
      ));
    }

    return (
      <>
        {folderRow}
        {childRows}
      </>
    );
  }

  // If it's a file, return a single <tr> (row) with columns
  return (
    <tr
      className="hover:text-gray-900 transition-all cursor-pointer"
      onClick={() => onFileSelect(node)}
    >
      <td
        className="py-1 px-2"
        style={{ paddingLeft: indentPx }}
      >
        <span className="mr-2 text-blue-400">📄</span>
        {node.name}
      </td>
      {/* Placeholder columns for your table layout */}
      <td className="py-1 px-2 text-gray-700">{node.permissions}</td>
      <td className="py-1 px-2 text-gray-700">File</td>
    </tr>
  );
}

export default FileTree;
