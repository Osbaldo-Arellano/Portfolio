export enum FileType {
  MARKDOWN = 'markdown',
  TYPESCRIPT = 'typescript',
  JAVASCRIPT = 'javascript',
  CSS = 'css',
  HTML = 'html',
  FOLDER = 'folder',
  OTHER = 'other',
  TSX = 'tsx',
  LATEX = 'tex',
  PDF = 'pdf'
}

export type TreeItem = {
  name: string; 
  isFolder: boolean;
  filePath?: string; 
  content?: string | (() => JSX.Element); 
  type?: FileType; 
  children?: TreeItem[];
};
