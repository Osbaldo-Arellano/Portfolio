import React, { useState } from 'react';
import InfoPanel from './InfoPanel';
import FileTree from './FileTree';
import { fileTreeData } from '../../data/fileTree';
import { TreeItem } from '../../types/FileTree';
import AboutMeDefault from '../AboutMeDefault';
import FileDetailMobile from '../FileDetailMobile';

function MobileIDELayout() {
  const [selectedNode, setSelectedNode] = useState<TreeItem | null>(null);

  return (
    <div className="flex flex-col h-full w-full bg-slate-400 overflow-auto">
      {/* Info Panel */}
      <div className="flex-1">
        <InfoPanel />
      </div>

      {/* AboutMeDefault (always visible on mobile) */}
      {!selectedNode && (
        <div className="flex-1 bg-white">
          <AboutMeDefault />
        </div>
      )}

      {/* FileTree */}
      <div className="flex-1">
        <FileTree
          treeData={fileTreeData}
          onFileSelect={(node) => setSelectedNode(node)}
        />
      </div>

      {/* FileDetail (overlay when a file is selected) */}
      {selectedNode && (
        <div className="fixed inset-4 z-50 bg-slate-400 shadow-lg flex flex-col overflow-hidden">
            <FileDetailMobile
            fileNode={selectedNode}
            onClose={() => setSelectedNode(null)}
            />
        </div>
        )}
    </div>
  );
}

export default MobileIDELayout;
