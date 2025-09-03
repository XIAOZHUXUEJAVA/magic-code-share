// 核心类型定义
export interface CodeSnippet {
  id: string;
  code: string;
  language: string;
  title?: string;
  author?: string;
  createdAt: Date;
  theme: CodeTheme;
  settings: CodeSettings;
}

export interface CodeTheme {
  name: string;
  background: string;
  windowStyle: "macos" | "windows" | "terminal" | "safari" | "iphone";
  syntaxTheme: string;
}

export interface CodeSettings {
  fontSize: number;
  fontFamily: string;
  lineNumbers: boolean;
  padding: number;
  borderRadius: number;
  showHeader: boolean;
  showFooter: boolean;
  watermark: boolean;
}

export interface ExportOptions {
  format: "png" | "jpg" | "pdf";
  quality: number;
  scale: number;
  width?: number;
  height?: number;
}

export interface ShareLink {
  id: string;
  shortUrl: string;
  originalUrl: string;
  expiresAt?: Date;
  viewCount: number;
}

// 支持的编程语言
export const SUPPORTED_LANGUAGES = [
  { value: "javascript", label: "JavaScript", extension: "js" },
  { value: "typescript", label: "TypeScript", extension: "ts" },
  { value: "python", label: "Python", extension: "py" },
  { value: "java", label: "Java", extension: "java" },
  { value: "cpp", label: "C++", extension: "cpp" },
  { value: "c", label: "C", extension: "c" },
  { value: "csharp", label: "C#", extension: "cs" },
  { value: "php", label: "PHP", extension: "php" },
  { value: "ruby", label: "Ruby", extension: "rb" },
  { value: "go", label: "Go", extension: "go" },
  { value: "rust", label: "Rust", extension: "rs" },
  { value: "swift", label: "Swift", extension: "swift" },
  { value: "kotlin", label: "Kotlin", extension: "kt" },
  { value: "html", label: "HTML", extension: "html" },
  { value: "css", label: "CSS", extension: "css" },
  { value: "scss", label: "SCSS", extension: "scss" },
  { value: "json", label: "JSON", extension: "json" },
  { value: "yaml", label: "YAML", extension: "yml" },
  { value: "markdown", label: "Markdown", extension: "md" },
  { value: "sql", label: "SQL", extension: "sql" },
  { value: "bash", label: "Bash", extension: "sh" },
] as const;

// 预设主题
export const PRESET_THEMES: CodeTheme[] = [
  {
    name: "GitHub Dark",
    background: "linear-gradient(135deg, #0d1117 0%, #161b22 100%)",
    windowStyle: "macos",
    syntaxTheme: "github-dark",
  },
  {
    name: "VS Code Dark",
    background: "linear-gradient(135deg, #1e1e1e 0%, #2d2d30 100%)",
    windowStyle: "macos",
    syntaxTheme: "vs-dark",
  },
  {
    name: "Dracula",
    background: "linear-gradient(135deg, #282a36 0%, #44475a 100%)",
    windowStyle: "macos",
    syntaxTheme: "dracula",
  },
  {
    name: "One Dark",
    background: "linear-gradient(135deg, #282c34 0%, #3e4451 100%)",
    windowStyle: "macos",
    syntaxTheme: "one-dark",
  },
  {
    name: "Monokai",
    background: "linear-gradient(135deg, #272822 0%, #3e3d32 100%)",
    windowStyle: "macos",
    syntaxTheme: "monokai",
  },
  {
    name: "Terminal",
    background: "linear-gradient(135deg, #000000 0%, #1a1a1a 100%)",
    windowStyle: "terminal",
    syntaxTheme: "terminal",
  },
];

// 默认设置
export const DEFAULT_SETTINGS: CodeSettings = {
  fontSize: 14,
  fontFamily: "Fira Code, Monaco, Consolas, monospace",
  lineNumbers: true,
  padding: 32,
  borderRadius: 12,
  showHeader: true,
  showFooter: false,
  watermark: true,
};

export const DEFAULT_THEME: CodeTheme = PRESET_THEMES[0];
