import React, { useState, useEffect, useRef } from "react";
import Split from "split.js";
import InfoPanel from "./InfoPanel";
import FileTree from "./FileTree";
import { fileTreeData } from "../../data/fileTree";
import FileDetail from "../FileDetail";
import { TreeItem } from "../../types/FileTree";
import MobileIDELayout from "./mobile/MobileIDELayout";

function IDELayout() {
  const aboutMeFile =
    fileTreeData.find((file) => file.name === "ABOUTME.md") || null;

  const [openTabs, setOpenTabs] = useState<Array<TreeItem>>(
    aboutMeFile ? [aboutMeFile] : []
  );
  const [activeTab, setActiveTab] = useState<TreeItem | null>(aboutMeFile);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  const [activeExplorer, setActiveExplorer] = useState("Explorer 1");

  const explorer1Data = fileTreeData;
  const explorer2Data = [
    { name: "README.md", isFolder: false },
    { name: "assets", isFolder: true, children: [] },
    { name: "components", isFolder: true, children: [] },
  ];

  // Handle window resize for mobile detection
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Split.js references
  const leftContainerRef = useRef<HTMLDivElement>(null);
  const rightContainerRef = useRef<HTMLDivElement>(null);

  // Initialize Split.js in desktop mode
  useEffect(() => {
    if (!isMobile && leftContainerRef.current && rightContainerRef.current) {
      Split([leftContainerRef.current, rightContainerRef.current], {
        sizes: [30, 70],
        gutterSize: 4,
        minSize: [200, 300],
      });
    }
  }, [isMobile]);

  // File selection logic
  const handleFileSelect = (node: TreeItem) => {
    if (!openTabs.some((tab) => tab.name === node.name)) {
      setOpenTabs((prevTabs) => [...prevTabs, node]);
    }
    setActiveTab(node);
  };

  // Tab closing logic
  const handleCloseTab = (tab: TreeItem) => {
    setOpenTabs((prevTabs) => prevTabs.filter((t) => t !== tab));
    if (activeTab === tab) {
      setActiveTab(openTabs[0] === tab ? openTabs[1] || null : openTabs[0]);
    }
  };

  // Mobile layout
  if (isMobile) {
    return <MobileIDELayout />;
  }

  return (
    /**
     * 1) Lock the outer container to the full screen (no browser scroll)
     * 2) Use flex so we can position left & right panels side by side
     */
    <div className="h-screen w-screen overflow-hidden bg-gray-200 flex shadow-inner">
      {/* Left Panel (Split.js controls the width) */}
      <div
        ref={leftContainerRef}
        className="flex flex-col bg-gray-300 overflow-hidden"
        style={{ minWidth: "200px" }}
      >
        {/* Info Panel (no scrolling here) */}
        <div className="border-b border-gray-400 flex-shrink-0">
          <InfoPanel />
        </div>

        {/* File Explorer Section grows to fill the remaining space */}
        <div className="flex flex-col flex-1 mt-1 overflow-hidden">
          {/* Explorer Tabs (no scroll, just icons/tabs) */}
          <div className="flex bg-gray-200 flex-shrink-0">
            <div
              className={`${
                activeExplorer === "Explorer 1"
                  ? "bg-gray-300"
                  : "bg-gray-200 hover:bg-gray-300"
              } text-black border border-gray-400 rounded-t-lg px-4 py-2 cursor-pointer mr-1`}
              style={{
                marginBottom: activeExplorer === "Explorer 1" ? "0px" : "2px",
              }}
              onClick={() => setActiveExplorer("Explorer 1")}
            >
              📂 About Me
            </div>
            <div
              className={`${
                activeExplorer === "Explorer 2"
                  ? "bg-gray-300"
                  : "bg-gray-200 hover:bg-gray-300"
              } text-black border border-gray-400 rounded-t-lg px-4 py-2 cursor-pointer`}
              style={{
                marginBottom: activeExplorer === "Explorer 2" ? "0px" : "2px",
              }}
              onClick={() => setActiveExplorer("Explorer 2")}
            >
              📂 Academic Projects
            </div>
          </div>

          {/* Actual file explorer area - scrolls if it overflows */}
          <div className="flex-grow bg-gray-300 border border-gray-400 p-2 rounded-b-lg overflow-y-auto">
            {activeExplorer === "Explorer 1" && (
              <FileTree treeData={explorer1Data} onFileSelect={handleFileSelect} />
            )}
            {activeExplorer === "Explorer 2" && (
              <FileTree treeData={explorer2Data} onFileSelect={handleFileSelect} />
            )}
          </div>
        </div>
      </div>

      {/* Right Panel (Split.js also controls width) */}
      <div
        ref={rightContainerRef}
        className="flex flex-col bg-gray-200 overflow-hidden"
      >
        {/* Tabs row at top of right panel */}
        <div className="flex border-b border-gray-400 bg-gray-300 flex-shrink-0">
          {openTabs.map((tab, index) => (
            <div
              key={index}
              className={`flex items-center px-4 py-1 cursor-pointer border-r border-gray-400 ${
                activeTab === tab
                  ? "bg-gray-400 text-black"
                  : "bg-gray-300 text-black hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.name}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCloseTab(tab);
                }}
                className="ml-2 text-red-600 hover:text-red-800"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* File content area (scrolls if code or content is large) */}
        <div
          className="flex-grow bg-white text-black border-t border-gray-400 overflow-auto"
          style={{ display: "flex", flexDirection: "column" }}
        >
          {activeTab ? (
            <div className="flex-grow overflow-auto">
              <FileDetail
                fileNode={activeTab}
                onClose={() => handleCloseTab(activeTab)}
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-600">
              <p>No tab selected.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default IDELayout;
