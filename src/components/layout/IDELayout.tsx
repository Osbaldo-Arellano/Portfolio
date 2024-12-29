import React, { useState, useEffect, useRef } from "react";
import Split from "split.js";
import InfoPanel from "./InfoPanel";
import FileTree from "./FileTree";
import { fileTreeData } from "../../data/fileTree";
import FileDetail from "../FileDetail";
import { TreeItem } from "../../types/FileTree";
import MobileIDELayout from "./MobileIDELayout";

function IDELayout() {
  const aboutMeFile =
    fileTreeData.find((file) => file.name === "ABOUTME.md") || null;

  const [openTabs, setOpenTabs] = useState<Array<TreeItem>>(
    aboutMeFile ? [aboutMeFile] : []
  );
  const [activeTab, setActiveTab] = useState<TreeItem | null>(aboutMeFile);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  const [activeExplorer, setActiveExplorer] = useState("Explorer 1"); // Active file explorer

  const explorer1Data = fileTreeData; // Data for Explorer 1
  const explorer2Data = [
    { name: "README.md", isFolder: false },
    { name: "assets", isFolder: true, children: [] },
    { name: "components", isFolder: true, children: [] },
  ]; // Data for Explorer 2

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const leftContainerRef = useRef<HTMLDivElement>(null);
  const rightContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMobile && leftContainerRef.current && rightContainerRef.current) {
      Split([leftContainerRef.current, rightContainerRef.current], {
        sizes: [30, 70],
        gutterSize: 4,
        minSize: [200, 300],
      });
    }
  }, [isMobile]);

  const handleFileSelect = (node: TreeItem) => {
    if (!openTabs.find((tab) => tab.name === node.name)) {
      setOpenTabs((prevTabs) => [...prevTabs, node]);
    }
    setActiveTab(node);
  };

  const handleCloseTab = (tab: TreeItem) => {
    setOpenTabs((prevTabs) => prevTabs.filter((t) => t !== tab));
    if (activeTab === tab) {
      setActiveTab(openTabs[0] === tab ? openTabs[1] || null : openTabs[0]);
    }
  };

  if (isMobile) {
    return <MobileIDELayout />;
  }

  return (
    <div className="flex h-full w-full bg-gray-200 shadow-inner">
      {/* Left Panel */}
      <div
        ref={leftContainerRef}
        className="flex flex-col w-full lg:w-[30%] bg-gray-300 overflow-hidden"
        style={{ minWidth: "200px" }}
      >
        {/* Info Panel */}
        <div
          className="flex-shrink-0 border-b border-gray-400"
          style={{ maxHeight: "580px", overflowY: "auto" }}
        >
          <InfoPanel />
        </div>

        {/* Add Small Margin Between Info Panel and File Explorer */}
        <div className="flex flex-col flex-1 mt-1">
          {/* File Explorer Tabs */}
          <div className="relative flex bg-gray-200">
            {/* Explorer 1 Tab */}
            <div
              className={`relative z-10 ${
                activeExplorer === "Explorer 1"
                  ? "bg-gray-300"
                  : "bg-gray-200 hover:bg-gray-300"
              } text-black border border-gray-400 rounded-t-lg px-4 py-2 cursor-pointer`}
              style={{
                marginLeft: "2px",
                marginRight: "4px",
                marginBottom: activeExplorer === "Explorer 1" ? "0px" : "2px",
              }}
              onClick={() => setActiveExplorer("Explorer 1")}
            >
              📂 About Me
            </div>

            {/* Explorer 2 Tab */}
            <div
              className={`relative z-10 ${
                activeExplorer === "Explorer 2"
                  ? "bg-gray-300"
                  : "bg-gray-200 hover:bg-gray-300"
              } text-black border border-gray-400 rounded-t-lg px-4 py-2 cursor-pointer`}
              style={{
                marginRight: "2px",
                marginBottom: activeExplorer === "Explorer 2" ? "0px" : "2px",
              }}
              onClick={() => setActiveExplorer("Explorer 2")}
            >
              📂 Academic Projects
            </div>
          </div>

          {/* File Trees for Each Explorer */}
          <div
            className="flex-grow bg-gray-300 border border-gray-400 p-2 rounded-b-lg overflow-y-auto"
          >
            {activeExplorer === "Explorer 1" && (
              <FileTree treeData={explorer1Data} onFileSelect={handleFileSelect} />
            )}
            {activeExplorer === "Explorer 2" && (
              <FileTree treeData={explorer2Data} onFileSelect={handleFileSelect} />
            )}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div
        ref={rightContainerRef}
        className="flex-grow bg-gray-200 overflow-auto flex flex-col"
      >
        {/* Tabs */}
        <div className="flex border-b border-gray-400 bg-gray-300">
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

        {/* Content Area */}
        <div className="flex-grow bg-white text-black border-t border-gray-400">
          {activeTab ? (
            <FileDetail
              fileNode={activeTab}
              onClose={() => handleCloseTab(activeTab)}
            />
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
