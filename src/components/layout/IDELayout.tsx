import React, { useState, useEffect, useRef } from 'react';
import Split from 'split.js';
import InfoPanel from './InfoPanel';
import FileTree from './FileTree';
import { fileTreeData } from '../../data/fileTree';
import FileDetail from '../FileDetail';
import { TreeItem } from '../../types/FileTree';
import MobileIDELayout from './MobileIDELayout';

function IDELayout() {
  const aboutMeFile = fileTreeData.find((file) => file.name === 'ABOUTME.md') || null;

  const [openTabs, setOpenTabs] = useState<Array<TreeItem>>(
    aboutMeFile ? [aboutMeFile] : []
  );
  const [activeTab, setActiveTab] = useState<TreeItem | null>(aboutMeFile);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
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
    <div className="flex h-full w-full bg-gray-900 border border-gray-700 shadow-inner">
      {/* Left Panel */}
      <div
        ref={leftContainerRef}
        className="flex flex-col w-full lg:w-[30%] bg-gray-800 border-r border-gray-700 overflow-auto"
        style={{ minWidth: '200px' }}
      >
        {/* Info Panel */}
        <div className="flex-1 border-b border-gray-700">
          <InfoPanel />
        </div>
        {/* File Tree */}
        <div className="flex-1">
          <FileTree treeData={fileTreeData} onFileSelect={handleFileSelect} />
        </div>
      </div>

      {/* Right Panel */}
      <div
        ref={rightContainerRef}
        className="flex-grow bg-gray-950 overflow-auto flex flex-col"
      >
        {/* Tabs */}
        <div className="flex border-b border-gray-700 bg-gray-800">
          {openTabs.map((tab, index) => (
            <div
              key={index}
              className={`flex items-center px-4 py-2 cursor-pointer border-r border-gray-700 ${
                activeTab === tab
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.name}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCloseTab(tab);
                }}
                className="ml-2 text-red-500 hover:text-red-600"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-grow bg-gray-900 text-gray-200 border-t border-gray-700">
          {activeTab ? (
            <FileDetail
              fileNode={activeTab}
              onClose={() => handleCloseTab(activeTab)}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <p>No tab selected.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default IDELayout;
