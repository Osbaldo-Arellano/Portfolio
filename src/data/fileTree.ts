import { FileType, TreeItem } from '../types/FileTree';

// Import raw file contents directly
import aboutMeContent from '../files/ABOUTME.md?raw';

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
        name: 'main.tsx',
        isFolder: false,
        filePath: 'files/Main.tsx', 
        type: FileType.TYPESCRIPT,
        content: '', // Leave content empty for dynamic import
      },
      
      {
        name: 'ContactMe.tsx',
        isFolder: false,
        filePath: 'files/ContactMe.tsx', 
        type: FileType.TYPESCRIPT,
        content: '', // Leave content empty for dynamic import
      },

      {
        name: 'Playlist.tsx',
        isFolder: false,
        filePath: 'files/Playlist.tsx', 
        type: FileType.TYPESCRIPT,
        content: '', // Leave content empty for dynamic import
      }
    ],
  },
];
