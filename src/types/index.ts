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
    name: "GitHub Light",
    background: "linear-gradient(135deg, #ffffff 0%, #f6f8fa 100%)",
    windowStyle: "macos",
    syntaxTheme: "github-light",
  },
  {
    name: "VS Code Dark",
    background: "linear-gradient(135deg, #1e1e1e 0%, #2d2d30 100%)",
    windowStyle: "macos",
    syntaxTheme: "vs-dark",
  },
  {
    name: "VS Code Light",
    background: "linear-gradient(135deg, #ffffff 0%, #f3f3f3 100%)",
    windowStyle: "macos",
    syntaxTheme: "vs-light",
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
    name: "Atom Dark",
    background: "linear-gradient(135deg, #1d1f21 0%, #373b41 100%)",
    windowStyle: "macos",
    syntaxTheme: "atom-dark",
  },
  {
    name: "Tomorrow",
    background: "linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)",
    windowStyle: "macos",
    syntaxTheme: "tomorrow",
  },
  {
    name: "Solarized Dark",
    background: "linear-gradient(135deg, #002b36 0%, #073642 100%)",
    windowStyle: "macos",
    syntaxTheme: "vs-dark",
  },
  {
    name: "Solarized Light",
    background: "linear-gradient(135deg, #fdf6e3 0%, #eee8d5 100%)",
    windowStyle: "macos",
    syntaxTheme: "vs-light",
  },
  {
    name: "Material Dark",
    background: "linear-gradient(135deg, #263238 0%, #37474f 100%)",
    windowStyle: "macos",
    syntaxTheme: "vs-dark",
  },
  {
    name: "Material Light",
    background: "linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%)",
    windowStyle: "macos",
    syntaxTheme: "vs-light",
  },
  {
    name: "Nord",
    background: "linear-gradient(135deg, #2e3440 0%, #3b4252 100%)",
    windowStyle: "macos",
    syntaxTheme: "vs-dark",
  },
  {
    name: "Gruvbox Dark",
    background: "linear-gradient(135deg, #282828 0%, #3c3836 100%)",
    windowStyle: "macos",
    syntaxTheme: "monokai",
  },
  {
    name: "Gruvbox Light",
    background: "linear-gradient(135deg, #fbf1c7 0%, #f2e5bc 100%)",
    windowStyle: "macos",
    syntaxTheme: "vs-light",
  },
  {
    name: "Oceanic Next",
    background: "linear-gradient(135deg, #1b2b34 0%, #343d46 100%)",
    windowStyle: "macos",
    syntaxTheme: "vs-dark",
  },
  {
    name: "Palenight",
    background: "linear-gradient(135deg, #292d3e 0%, #444267 100%)",
    windowStyle: "macos",
    syntaxTheme: "vs-dark",
  },
  {
    name: "Ayu Dark",
    background: "linear-gradient(135deg, #0a0e14 0%, #151a1e 100%)",
    windowStyle: "macos",
    syntaxTheme: "vs-dark",
  },
  {
    name: "Ayu Light",
    background: "linear-gradient(135deg, #fafafa 0%, #f8f9fa 100%)",
    windowStyle: "macos",
    syntaxTheme: "vs-light",
  },
  {
    name: "Tokyo Night",
    background: "linear-gradient(135deg, #1a1b26 0%, #24283b 100%)",
    windowStyle: "macos",
    syntaxTheme: "vs-dark",
  },
  {
    name: "Catppuccin",
    background: "linear-gradient(135deg, #1e1e2e 0%, #313244 100%)",
    windowStyle: "macos",
    syntaxTheme: "vs-dark",
  },
  {
    name: "Synthwave '84",
    background: "linear-gradient(135deg, #2b213a 0%, #262335 100%)",
    windowStyle: "macos",
    syntaxTheme: "vs-dark",
  },
  {
    name: "Cobalt2",
    background: "linear-gradient(135deg, #193549 0%, #1e3a8a 100%)",
    windowStyle: "macos",
    syntaxTheme: "vs-dark",
  },
  {
    name: "Night Owl",
    background: "linear-gradient(135deg, #011627 0%, #1d3b53 100%)",
    windowStyle: "macos",
    syntaxTheme: "vs-dark",
  },
  {
    name: "Light Owl",
    background: "linear-gradient(135deg, #fbfbfb 0%, #f0f0f0 100%)",
    windowStyle: "macos",
    syntaxTheme: "vs-light",
  },
  {
    name: "Shades of Purple",
    background: "linear-gradient(135deg, #2d2b55 0%, #1e1e3f 100%)",
    windowStyle: "macos",
    syntaxTheme: "vs-dark",
  },
  {
    name: "Terminal",
    background: "linear-gradient(135deg, #000000 0%, #1a1a1a 100%)",
    windowStyle: "terminal",
    syntaxTheme: "vs-dark",
  },
];

// 默认设置
export const DEFAULT_SETTINGS: CodeSettings = {
  fontSize: 14,
  fontFamily: "var(--font-fira-code), Fira Code, Monaco, Consolas, monospace",
  lineNumbers: true,
  padding: 32,
  borderRadius: 12,
  showHeader: true,
  showFooter: false,
  watermark: true,
};

export const DEFAULT_THEME: CodeTheme = PRESET_THEMES[0];
