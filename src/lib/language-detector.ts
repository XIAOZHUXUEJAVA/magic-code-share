// 语言检测工具
export function detectLanguage(code: string): string | null {
  if (!code.trim()) return null;

  // 定义模式及其权重 (weight: 权重，pattern: 正则表达式)
  const patterns = {
    // Java - 更具体的模式，避免与 TypeScript 混淆
    java: [
      { weight: 10, pattern: /\b(public|private|protected)\s+(static\s+)?(class|interface|enum)\s+\w+/ },
      { weight: 8, pattern: /\b(import\s+java\.|package\s+[a-z.]+;)/ },
      { weight: 8, pattern: /\bSystem\.(out|err)\.(println|print)/ },
      { weight: 6, pattern: /\b(public|private|protected)\s+(static\s+)?\w+\s+\w+\s*\([^)]*\)\s*\{/ },
      { weight: 5, pattern: /\b(extends|implements)\s+\w+/ },
      { weight: 4, pattern: /\b(ArrayList|HashMap|List|Map|Set)<\w+>/ },
      { weight: 3, pattern: /\bnew\s+\w+<[^>]+>\(/ },
      { weight: 2, pattern: /\b(String|Integer|Boolean|Long|Double)\s+\w+\s*=/ },
      { weight: 2, pattern: /@Override|@Deprecated|@SuppressWarnings/ },
    ],
    // TypeScript - 更精确的模式
    typescript: [
      { weight: 10, pattern: /\b(interface|type)\s+\w+\s*=?\s*\{/ },
      { weight: 8, pattern: /:\s*(string|number|boolean|any|void|unknown|never)\b/ },
      { weight: 6, pattern: /\b(const|let|var)\s+\w+:\s*\w+/ },
      { weight: 5, pattern: /\b(export|import)\s+(type|interface)\b/ },
      { weight: 4, pattern: /<\w+>\s*\(/ },
      { weight: 3, pattern: /\b(readonly|namespace|declare)\b/ },
      { weight: 2, pattern: /\bas\s+(const|\w+)\b/ },
    ],
    // JavaScript
    javascript: [
      { weight: 6, pattern: /\b(const|let|var)\s+\w+\s*=/ },
      { weight: 5, pattern: /\b(function|=>)/ },
      { weight: 4, pattern: /\bconsole\.(log|error|warn)/ },
      { weight: 3, pattern: /\b(async|await|Promise)\b/ },
      { weight: 3, pattern: /\b(import|export|require)\b/ },
      { weight: 2, pattern: /\$\{.*\}/ },
    ],
    // Python
    python: [
      { weight: 8, pattern: /\bdef\s+\w+\s*\([^)]*\)\s*:/ },
      { weight: 6, pattern: /\b(import|from)\s+\w+/ },
      { weight: 5, pattern: /\bif\s+__name__\s*==\s*["']__main__["']/ },
      { weight: 4, pattern: /\b(print|len|range|str|int|float|list|dict|tuple)\s*\(/ },
      { weight: 3, pattern: /#.*$/m },
      { weight: 2, pattern: /:\s*$/m },
    ],
    // C++
    cpp: [
      { weight: 10, pattern: /#include\s*<(iostream|vector|string|algorithm)>/ },
      { weight: 8, pattern: /\busing\s+namespace\s+std;/ },
      { weight: 6, pattern: /\bstd::(cout|cin|endl|vector|string)/ },
      { weight: 4, pattern: /\b(template|typename)\s*</ },
      { weight: 3, pattern: /\bint\s+main\s*\(/ },
    ],
    // C
    c: [
      { weight: 10, pattern: /#include\s*<(stdio|stdlib|string)\.h>/ },
      { weight: 6, pattern: /\b(printf|scanf|malloc|free|sizeof)\s*\(/ },
      { weight: 4, pattern: /\bint\s+main\s*\(/ },
      { weight: 2, pattern: /\*.*\*/ },
    ],
    // C#
    csharp: [
      { weight: 10, pattern: /\busing\s+System/ },
      { weight: 8, pattern: /\bConsole\.(WriteLine|ReadLine)/ },
      { weight: 6, pattern: /\bnamespace\s+\w+/ },
      { weight: 4, pattern: /\[\w+\]/ },
      { weight: 3, pattern: /\b(public|private|protected)\s+(static\s+)?void\s+Main/ },
    ],
    // PHP
    php: [
      { weight: 10, pattern: /<\?php/ },
      { weight: 6, pattern: /\$[a-zA-Z_]\w*/ },
      { weight: 4, pattern: /\b(echo|print|function|class)\b/ },
      { weight: 3, pattern: /->\w+/ },
    ],
    // Ruby
    ruby: [
      { weight: 8, pattern: /\b(def|end)\b/ },
      { weight: 6, pattern: /@[a-zA-Z_]\w*/ },
      { weight: 4, pattern: /\b(puts|require|module|attr_accessor)\b/ },
      { weight: 2, pattern: /\|\w+\|/ },
    ],
    // Go
    go: [
      { weight: 10, pattern: /\bpackage\s+\w+/ },
      { weight: 8, pattern: /\bfunc\s+\w+\s*\([^)]*\)/ },
      { weight: 6, pattern: /\bfmt\.(Println|Printf)/ },
      { weight: 4, pattern: /:=/ },
      { weight: 3, pattern: /\b(make|chan|go|defer)\b/ },
    ],
    // Rust
    rust: [
      { weight: 10, pattern: /\bfn\s+\w+\s*\([^)]*\)/ },
      { weight: 8, pattern: /\b(let\s+mut|impl|trait)\b/ },
      { weight: 6, pattern: /\b(println!|vec!|macro_rules!)/ },
      { weight: 4, pattern: /\b(Some|None|Ok|Err)\b/ },
      { weight: 3, pattern: /\b(pub|use|mod|crate)\b/ },
    ],
    // Swift
    swift: [
      { weight: 8, pattern: /\bfunc\s+\w+\s*\([^)]*\)\s*->/ },
      { weight: 6, pattern: /\b(var|let)\s+\w+:\s*\w+/ },
      { weight: 4, pattern: /\b(import\s+\w+|override|protocol)\b/ },
      { weight: 3, pattern: /\bprint\s*\(/ },
    ],
    // Kotlin
    kotlin: [
      { weight: 10, pattern: /\bfun\s+\w+\s*\(/ },
      { weight: 8, pattern: /\b(val|var)\s+\w+:\s*\w+/ },
      { weight: 6, pattern: /\b(object|companion\s+object)\b/ },
      { weight: 4, pattern: /\bprintln\s*\(/ },
      { weight: 3, pattern: /\b(open|abstract|sealed)\s+class\b/ },
    ],
    // HTML
    html: [
      { weight: 10, pattern: /<!DOCTYPE html>/i },
      { weight: 8, pattern: /<(html|head|body|div|span|p|h[1-6])/ },
      { weight: 4, pattern: /<\/?[a-zA-Z][^>]*>/ },
      { weight: 2, pattern: /\b(class|id)=/ },
    ],
    // CSS
    css: [
      { weight: 8, pattern: /[.#][a-zA-Z-_][^{]*\{[^}]*\}/ },
      { weight: 6, pattern: /\b(color|background|margin|padding|font-size|display)\s*:/ },
      { weight: 4, pattern: /@(media|import|keyframes)/ },
    ],
    // SCSS
    scss: [
      { weight: 10, pattern: /\$[a-zA-Z-_]+:\s*[^;]+;/ },
      { weight: 8, pattern: /@(mixin|include|extend)/ },
      { weight: 4, pattern: /&[.:#]/ },
      { weight: 2, pattern: /\#\{.*\}/ },
    ],
    // JSON
    json: [
      { weight: 10, pattern: /^\s*\{[\s\S]*\}\s*$/ },
      { weight: 8, pattern: /"[^"]*":\s*("[^"]*"|[0-9]+|true|false|null)/ },
      { weight: 4, pattern: /^\s*\[[\s\S]*\]\s*$/ },
    ],
    // YAML
    yaml: [
      { weight: 8, pattern: /^[a-zA-Z_-]+:\s*[^|>]/m },
      { weight: 6, pattern: /^\s*-\s+\w+/m },
      { weight: 4, pattern: /^---/m },
    ],
    // Markdown
    markdown: [
      { weight: 8, pattern: /^#{1,6}\s+/m },
      { weight: 6, pattern: /\[.*\]\(.*\)/ },
      { weight: 4, pattern: /\*\*.*\*\*|\*.*\*/ },
      { weight: 3, pattern: /^```/m },
    ],
    // SQL
    sql: [
      { weight: 10, pattern: /\b(SELECT|FROM|WHERE|INSERT|UPDATE|DELETE)\b/i },
      { weight: 8, pattern: /\b(CREATE|ALTER|DROP)\s+(TABLE|DATABASE|INDEX)\b/i },
      { weight: 6, pattern: /\b(JOIN|INNER|LEFT|RIGHT|OUTER)\s+JOIN\b/i },
      { weight: 4, pattern: /;$/m },
    ],
    // Bash
    bash: [
      { weight: 10, pattern: /^#!\/bin\/(bash|sh)/ },
      { weight: 6, pattern: /\b(echo|cd|ls|mkdir|rm|cp|mv|grep|awk|sed)\b/ },
      { weight: 4, pattern: /\$[a-zA-Z_][a-zA-Z0-9_]*/ },
      { weight: 2, pattern: /\|\s*\w+/ },
    ],
  };

  // 计算每种语言的匹配分数（使用加权评分）
  const scores: Record<string, number> = {};

  for (const [lang, langPatterns] of Object.entries(patterns)) {
    let score = 0;
    for (const { weight, pattern } of langPatterns) {
      const matches = code.match(pattern);
      if (matches) {
        // 使用权重和匹配次数计算分数
        score += weight * matches.length;
      }
    }
    scores[lang] = score;
  }

  // 找到得分最高的语言
  const maxScore = Math.max(...Object.values(scores));
  if (maxScore === 0) return null;

  // 获取所有最高分的语言
  const topLanguages = Object.keys(scores).filter(
    (lang) => scores[lang] === maxScore
  );

  // 如果只有一个最高分语言，直接返回
  if (topLanguages.length === 1) {
    return topLanguages[0];
  }

  // 处理冲突：优先级规则
  const priorityOrder = [
    'java',      // Java 优先于 TypeScript/C#
    'typescript', // TypeScript 优先于 JavaScript
    'cpp',       // C++ 优先于 C
    'python',
    'csharp',
    'javascript',
    'c',
    'go',
    'rust',
    'kotlin',
    'swift',
    'php',
    'ruby',
    'bash',
    'sql',
    'html',
    'css',
    'scss',
    'json',
    'yaml',
    'markdown',
  ];

  // 按优先级返回第一个匹配的语言
  for (const lang of priorityOrder) {
    if (topLanguages.includes(lang)) {
      return lang;
    }
  }

  return topLanguages[0] || null;
}

// 根据文件扩展名检测语言
export function detectLanguageByExtension(filename: string): string | null {
  const extension = filename.split(".").pop()?.toLowerCase();

  const extensionMap: Record<string, string> = {
    js: "javascript",
    jsx: "javascript",
    ts: "typescript",
    tsx: "typescript",
    py: "python",
    java: "java",
    cpp: "cpp",
    cxx: "cpp",
    cc: "cpp",
    c: "c",
    cs: "csharp",
    php: "php",
    rb: "ruby",
    go: "go",
    rs: "rust",
    swift: "swift",
    kt: "kotlin",
    html: "html",
    htm: "html",
    css: "css",
    scss: "scss",
    sass: "scss",
    json: "json",
    yml: "yaml",
    yaml: "yaml",
    md: "markdown",
    sql: "sql",
    sh: "bash",
    bash: "bash",
    zsh: "bash",
  };

  return extension ? extensionMap[extension] || null : null;
}
