import { FileType, Permissions, TreeItem } from '../types/FileTree';


import aboutMeContent from '../files/ABOUTME.md?raw';
import CloudBlogPost from '../../src/files/src/blog-posts/cloud-project/Kube-day-1.md?raw'
import CloudBlogPost2 from '../../src/files/src/blog-posts/cloud-project/Kube-day-2.md?raw'

import CapstoneBlogPost from '../../src/files/src/blog-posts/capstone/reflection-1.md?raw'
import CapstoneBlogPost2 from '../../src/files/src/blog-posts/capstone/reflection-2.md?raw'

export const fileTreeData: TreeItem[] = [
  {
    name: 'ABOUTME.md',
    isFolder: false,
    filePath: 'files/ABOUTME.md',
    type: FileType.MARKDOWN,
    permissions: Permissions.READONLY,
    content: aboutMeContent,
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
            name: 'DayOne.md',
            isFolder: false,
            filePath: '/src/files/src/blog-posts/cloud-project/Kube-day-1.md',
            type: FileType.MARKDOWN,
            permissions: Permissions.READONLY,
            content: CloudBlogPost
          },
          {
            name: 'DayTwo.md',
            isFolder: false,
            filePath: '/src/files/src/blog-posts/cloud-project/Kube-day-1.md',
            type: FileType.MARKDOWN,
            permissions: Permissions.READONLY,
            content: CloudBlogPost2
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
        children: [
          {
            name: 'Reflection.md',
            isFolder: false,
            filePath: '/src/files/src/blog-posts/capstone/reflection-1.md',
            type: FileType.MARKDOWN,
            permissions: Permissions.READONLY,
            content: CapstoneBlogPost
          },
          {
            name: 'Reflection-2.md',
            isFolder: false,
            filePath: '/src/files/src/blog-posts/capstone/reflection-2.md',
            type: FileType.MARKDOWN,
            permissions: Permissions.READONLY,
            content: CapstoneBlogPost2
          },
        ]
      },
    ],
  },
  {
    name: 'ContactMe.tsx',
    isFolder: false,
    filePath: 'files/ContactMe.tsx', 
    type: FileType.TYPESCRIPT,
    permissions: Permissions.WRITE,
    content: '', // Leave content empty for dynamic import
  },
  {
    name: 'Playlist.tsx',
    isFolder: false,
    filePath: 'files/Playlist.tsx', 
    type: FileType.TYPESCRIPT,
    permissions: Permissions.LISTENONLY,
    content: '', // Leave content empty for dynamic import
  },
  {
    name: 'Resume.pdf',
    isFolder: false,
    filePath: '/Resume.pdf',
    type: FileType.PDF,
    permissions: Permissions.READONLY,
    content: '', // Leave content empty for dynamic import
  },
  {
    name: 'src',
    isFolder: true,
    children: [
      {
        name: 'DayOne.md',
        isFolder: false,
        filePath: '/src/files/src/blog-posts/cloud-project/Kube-day-1.md',
        type: FileType.MARKDOWN,
        permissions: Permissions.READONLY,
        content: CloudBlogPost
      },
    ]
  },
];
