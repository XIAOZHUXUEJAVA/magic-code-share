// 语言检测工具
export function detectLanguage(code: string): string | null {
  if (!code.trim()) return null;

  const patterns = {
    javascript: [
      /\b(function|const|let|var|=>|console\.log)\b/,
      /\b(import|export|require)\b/,
      /\b(async|await|Promise)\b/,
      /\$\{.*\}/,
    ],
    typescript: [
      /\b(interface|type|enum|namespace)\b/,
      /:\s*(string|number|boolean|any|void)/,
      /\b(public|private|protected|readonly)\b/,
      /<.*>/,
    ],
    python: [
      /\b(def|class|import|from|if __name__ == "__main__")\b/,
      /\b(print|len|range|str|int|float|list|dict)\b/,
      /#.*$/m,
      /:\s*$/m,
    ],
    java: [
      /\b(public class|private|protected|static)\b/,
      /\b(System\.out\.println|String|int|void|main)\b/,
      /\b(import java\.)/,
      /\{[\s\S]*\}/,
    ],
    cpp: [
      /\b(#include|using namespace|std::)\b/,
      /\b(int main|cout|cin|endl)\b/,
      /\b(class|struct|template)\b/,
      /<iostream>/,
    ],
    c: [
      /\b(#include|printf|scanf|malloc|free)\b/,
      /\b(int main|void|char|int|float|double)\b/,
      /<stdio\.h>/,
      /\*.*\*/,
    ],
    csharp: [
      /\b(using System|namespace|public class)\b/,
      /\b(Console\.WriteLine|string|int|void|Main)\b/,
      /\b(public|private|protected|static)\b/,
      /\[.*\]/,
    ],
    php: [
      /<\?php/,
      /\$[a-zA-Z_]/,
      /\b(echo|print|function|class|namespace)\b/,
      /->/,
    ],
    ruby: [
      /\b(def|class|module|end|puts|require)\b/,
      /@[a-zA-Z_]/,
      /\b(attr_accessor|attr_reader|attr_writer)\b/,
      /\|.*\|/,
    ],
    go: [
      /\b(package|import|func|var|const)\b/,
      /\b(fmt\.Println|make|chan|go|defer)\b/,
      /:=/,
      /\binterface\{\}/,
    ],
    rust: [
      /\b(fn|let|mut|struct|enum|impl|trait)\b/,
      /\b(println!|vec!|match|Some|None|Ok|Err)\b/,
      /\b(pub|use|mod|crate)\b/,
      /->/,
    ],
    swift: [
      /\b(func|var|let|class|struct|enum|protocol)\b/,
      /\b(print|String|Int|Bool|Array|Dictionary)\b/,
      /\b(import|override|public|private|internal)\b/,
      /->/,
    ],
    kotlin: [
      /\b(fun|val|var|class|object|interface)\b/,
      /\b(println|String|Int|Boolean|List|Map)\b/,
      /\b(import|package|override|open|abstract)\b/,
      /->/,
    ],
    html: [
      /<\/?[a-zA-Z][^>]*>/,
      /<!DOCTYPE html>/i,
      /<(div|span|p|h[1-6]|a|img|ul|ol|li)/i,
      /class=|id=/,
    ],
    css: [
      /\{[\s\S]*\}/,
      /[.#][a-zA-Z-_][^{]*\{/,
      /\b(color|background|margin|padding|font-size|display)\b/,
      /@media|@import|@keyframes/,
    ],
    scss: [/\$[a-zA-Z-_]+:/, /@mixin|@include|@extend/, /&[.:#]/, /\#{.*\}/],
    json: [
      /^\s*\{[\s\S]*\}\s*$/,
      /^\s*\[[\s\S]*\]\s*$/,
      /"[^"]*":\s*(".*"|[0-9]+|true|false|null)/,
      /^\s*"[^"]*":\s*/m,
    ],
    yaml: [
      /^[a-zA-Z_-]+:\s*$/m,
      /^[a-zA-Z_-]+:\s+[^|>]/m,
      /^\s*-\s+/m,
      /^---/m,
    ],
    markdown: [/^#{1,6}\s+/m, /\*\*.*\*\*|\*.*\*/, /\[.*\]\(.*\)/, /^```/m],
    sql: [
      /\b(SELECT|FROM|WHERE|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP)\b/i,
      /\b(TABLE|DATABASE|INDEX|VIEW|PROCEDURE|FUNCTION)\b/i,
      /\b(JOIN|INNER|LEFT|RIGHT|OUTER|ON|GROUP BY|ORDER BY)\b/i,
      /;$/m,
    ],
    bash: [
      /^#!/,
      /\b(echo|cd|ls|mkdir|rm|cp|mv|grep|awk|sed)\b/,
      /\$[a-zA-Z_][a-zA-Z0-9_]*/,
      /\|\s*\w+/,
    ],
  };

  // 计算每种语言的匹配分数
  const scores: Record<string, number> = {};

  for (const [lang, langPatterns] of Object.entries(patterns)) {
    let score = 0;
    for (const pattern of langPatterns) {
      const matches = code.match(pattern);
      if (matches) {
        score += matches.length;
      }
    }
    scores[lang] = score;
  }

  // 找到得分最高的语言
  const maxScore = Math.max(...Object.values(scores));
  if (maxScore === 0) return null;

  const detectedLang = Object.keys(scores).find(
    (lang) => scores[lang] === maxScore
  );

  return detectedLang || null;
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
