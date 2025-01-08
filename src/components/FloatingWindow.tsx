import React, { useState } from "react";
import { TreeItem } from "../types/FileTree";

interface FloatingWindowProps {
  tab: TreeItem;
  x: number;
  y: number;
  width: number;
  height: number;
  onClose: () => void;
}

const FloatingWindow: React.FC<FloatingWindowProps> = ({
  tab,
  x,
  y,
  width,
  height,
  onClose,
}) => {
  const [position, setPosition] = useState({ x, y });

  const handleDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    setPosition({ x: e.clientX - width / 2, y: e.clientY - 20 }); // Adjust to center drag
  };

  return (
    <div
      style={{
        position: "absolute",
        top: position.y,
        left: position.x,
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: "white",
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        border: "1px solid #ccc",
        zIndex: 1000,
      }}
      onMouseDown={handleDrag}
    >
      <div
        style={{
          padding: "10px",
          backgroundColor: "#f3f3f3",
          borderBottom: "1px solid #ddd",
          cursor: "move",
        }}
      >
        <span>{tab.name}</span>
        <button
          style={{ float: "right", background: "none", border: "none", cursor: "pointer" }}
          onClick={onClose}
        >
          ✕
        </button>
      </div>
      <div style={{ padding: "10px", overflow: "auto", height: "calc(100% - 40px)" }}>
        {/* Render tab content here */}
        <p>Content of {tab.name}</p>
      </div>
    </div>
  );
};

export default FloatingWindow;
