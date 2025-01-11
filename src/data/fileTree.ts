import { FileType, TreeItem } from '../types/FileTree';

// Import raw file contents directly
import aboutMeContent from '../files/ABOUTME.md?raw';
import CloudBlogPost from '../../src/files/src/blog-posts/Kube-day-1.md?raw'
// src\files\src\blog-posts
export const fileTreeData: TreeItem[] = [
  {
    name: 'ABOUTME.md',
    isFolder: false,
    filePath: 'files/ABOUTME.md',
    type: FileType.MARKDOWN,
    content: aboutMeContent,
  },
  {
    name: 'Resume.pdf',
    isFolder: false,
    filePath: '/Resume.pdf',
    type: FileType.PDF,
    content: '', // Leave content empty for dynamic import
  },
    {
    name: 'Blog Posts',
    isFolder: true,
    children: [
      {
        name: 'Cloud Project',
        isFolder: true,
        children: [
          {
            name: 'Kube Conductor Day One',
            isFolder: false,
            filePath: '/Kube-day-1.md',
            type: FileType.MARKDOWN,
            content: CloudBlogPost
          },
        ]
      },
      {
        name: 'Portfolio Project',
        isFolder: true,
      },
      {
        name: 'Senior Capstone Project',
        isFolder: true,
      },
      // {
      //   name: 'main.tsx',
      //   isFolder: false,
      //   filePath: 'files/Main.tsx', 
      //   type: FileType.TYPESCRIPT,
      //   content: '', // Leave content empty for dynamic import
      // },
      
      // {
      //   name: 'ContactMe.tsx',
      //   isFolder: false,
      //   filePath: 'files/ContactMe.tsx', 
      //   type: FileType.TYPESCRIPT,
      //   content: '', // Leave content empty for dynamic import
      // },

      // {
      //   name: 'Playlist.tsx',
      //   isFolder: false,
      //   filePath: 'files/Playlist.tsx', 
      //   type: FileType.TYPESCRIPT,
      //   content: '', // Leave content empty for dynamic import
      // }
      
    ],
  },
];
