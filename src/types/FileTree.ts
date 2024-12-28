// Define FileType enum to categorize file types
export enum FileType {
  MARKDOWN = 'markdown',
  TYPESCRIPT = 'typescript',
  JAVASCRIPT = 'javascript',
  CSS = 'css',
  HTML = 'html',
  FOLDER = 'folder',
  OTHER = 'other',
}

// Updated TreeItem type
export type TreeItem = {
  name: string; // File or folder name
  isFolder: boolean; // Is this a folder?
  filePath?: string; // Path to the file
  content?: string | (() => JSX.Element); // Content can be a string or a JSX component
  type?: FileType; // Type of file
  children?: TreeItem[]; // Children for folders
};
