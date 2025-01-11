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

  const explorer3Data = [
    { name: "README.md", isFolder: false },
    { name: "assets", isFolder: true, children: [] },
    { name: "components", isFolder: true, children: [] },
  ]; // Data for Explorer 3

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
        gutterSize: 5,
        minSize: [200, 300],
        snapOffset: 10, // Snap to this offset
        dragInterval: 1, // Only allow moves in increments of 1px
        gutter: (index, direction) => {
          const gutterElement = document.createElement("div");
          gutterElement.className = `
            flex items-center justify-center
            bg-gray-400 text-white
            gutter
            gutter-${direction}
          `;
  
          // Adjust cursor based on direction to indicate drag behavior
          gutterElement.style.cursor = direction === "horizontal" ? "col-resize" : "row-resize";
  
          // Add the text and style it to prevent selection
          gutterElement.innerHTML = "<span class='gutter-handle'>⋮</span>";

          return gutterElement;
        },
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

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.dataTransfer.setData("tabIndex", index.toString());
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    const draggingIndex = parseInt(e.dataTransfer.getData("tabIndex"), 10);
  
    // Rearrange the tabs
    if (draggingIndex !== index) {
      const updatedTabs = [...openTabs];
      const [draggedTab] = updatedTabs.splice(draggingIndex, 1); // Remove dragged tab
      updatedTabs.splice(index, 0, draggedTab); // Insert dragged tab at new index
      setOpenTabs(updatedTabs); // Update state
    }
  };
  
  return (
    <div className="flex h-full w-full bg-gray-200 shadow-inner">
      {/* Left Panel */}
      <div
        ref={leftContainerRef}
        className="
          flex flex-col 
          w-full lg:w-[30%] 
          bg-transparent 
          overflow-y-auto 
          hide-scrollbar
          border-r    
        "
        style={{ minWidth: "200px", maxHeight: "100vh" }}
      >
        {/* Info Panel */}
        <div
          className="flex-shrink-0 border-b border-gray-400"
          style={{ overflowY: "auto" }}
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
              📂 Personal Projects
            </div>
            
            {/* Explorer 3 Tab */}
            <div
              className={`relative z-10 ${
                activeExplorer === "Explorer 3"
                  ? "bg-gray-300"
                  : "bg-gray-200 hover:bg-gray-300"
              } text-black border border-gray-400 rounded-t-lg px-4 py-2 cursor-pointer`}
              style={{
                marginRight: "2px",
                marginBottom: activeExplorer === "Explorer 3" ? "0px" : "2px",
              }}
              onClick={() => setActiveExplorer("Explorer 3")}
            >
              📂 Academic Projects
            </div>
          </div>

          

          {/* File Trees for Each Explorer */}
          <div
            className="bg-gray-300 border border-gray-400 p-1 overflow-y-auto"
          >
            {activeExplorer === "Explorer 1" && (
              <FileTree treeData={explorer1Data} onFileSelect={handleFileSelect} />
            )}
            {activeExplorer === "Explorer 2" && (
              <FileTree treeData={explorer2Data} onFileSelect={handleFileSelect} />
            )}
            {activeExplorer === "Explorer 3" && (
              <FileTree treeData={explorer3Data} onFileSelect={handleFileSelect} />
            )}
          </div>
        </div>
        
        <div className="bg-gray-800 p-1 border border-gray-700 shadow-md">
          <h4 className="font-bold text-gray-100 mb-2">Terminal</h4>
          <div className="bg-black text-green-300 p-2 border border-gray-600 h-24 overflow-y-auto">
            <p>$ npm start</p>
            <p>Hello, this is Osbaldo's AI clone. Ask me anything!...</p>
          </div>
          <input
            type="text"
            className="w-full bg-gray-900 text-gray-100 p-1 mt-2 rounded focus:outline-none"
            placeholder="Ask me something..."
          />
        </div>


      </div>


      {/* Right Panel */}
      <div
        ref={rightContainerRef}
        className="flex-grow bg-gray-200 flex flex-col overflow-hidden border-l"
      >
      {/* Tabs */}
      <div className="flex border-b border-gray-400 bg-gray-300 flex-shrink-0">
        {openTabs.map((tab, index) => (
          <div
            key={index}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => e.preventDefault()} // Allow drop by preventing default behavior
            onDrop={(e) => handleDrop(e, index)}
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
        <div
          className="flex-grow bg-white text-black border-t border-gray-400 overflow-hidden"
          style={{
            display: "flex",
            flexDirection: "column",
          }}
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
