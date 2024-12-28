import { FileType, TreeItem } from '../types/FileTree';

// Import raw file contents directly
import aboutMeContent from '../files/ABOUTME.md?raw';
import appContent from '../files/src/App.tsx?raw';
import mainContent from '../files/src/main.tsx?raw';
import assetContent from '../files/src/assets/Asset.tsx?raw';
import mainAssetContent from '../files/src/assets/mainAsset.tsx?raw';
import assetTempContent from '../files/src/src-temp/Asset-Temp.tsx?raw';
import mainAssetTempContent from '../files/src/src-temp/main-asset-temp.tsx?raw';

export const fileTreeData: TreeItem[] = [
  {
    name: 'ABOUTME.md',
    isFolder: false,
    filePath: 'src/main.tsx',
    type: FileType.MARKDOWN,
    content: aboutMeContent,
  },
  {
    name: 'src',
    isFolder: true,
    children: [
      {
        name: 'App.tsx',
        isFolder: false,
        filePath: 'src/App.tsx',
        type: FileType.TYPESCRIPT,
        content: appContent,
      },
      {
        name: 'main.tsx',
        isFolder: false,
        filePath: 'src/main.tsx',
        type: FileType.TYPESCRIPT,
        content: mainContent,
      },
      {
        name: 'assets',
        isFolder: true,
        children: [
          {
            name: 'Asset.tsx',
            isFolder: false,
            filePath: 'src/assets/Asset.tsx',
            type: FileType.TYPESCRIPT,
            content: assetContent,
          },
          {
            name: 'mainAsset.tsx',
            isFolder: false,
            filePath: 'src/assets/mainAsset.tsx',
            type: FileType.TYPESCRIPT,
            content: mainAssetContent,
          },
        ],
      },
    ],
  },
  {
    name: 'src-temp',
    isFolder: true,
    children: [
      {
        name: 'Asset-Temp.tsx',
        isFolder: false,
        filePath: 'src/src-temp/Asset-Temp.tsx',
        type: FileType.TYPESCRIPT,
        content: assetTempContent,
      },
      {
        name: 'main-asset-temp.tsx',
        isFolder: false,
        filePath: 'src/src-temp/main-asset-temp.tsx',
        type: FileType.TYPESCRIPT,
        content: mainAssetTempContent,
      },
    ],
  },
];
