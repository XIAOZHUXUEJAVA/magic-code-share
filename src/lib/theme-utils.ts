// 主题工具函数

/**
 * 计算颜色的亮度值 (0-255)
 * 使用相对亮度公式: 0.299*R + 0.587*G + 0.114*B
 */
export function getColorBrightness(color: string): number {
  // 处理十六进制颜色
  if (color.startsWith("#")) {
    const hex = color.replace("#", "");
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    return Math.round(0.299 * r + 0.587 * g + 0.114 * b);
  }

  // 处理rgb颜色
  const rgbMatch = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (rgbMatch) {
    const r = parseInt(rgbMatch[1]);
    const g = parseInt(rgbMatch[2]);
    const b = parseInt(rgbMatch[3]);
    return Math.round(0.299 * r + 0.587 * g + 0.114 * b);
  }

  // 对于渐变，提取第一个颜色进行计算
  const gradientMatch = color.match(/#[0-9a-fA-F]{6}|rgb\(\d+,\s*\d+,\s*\d+\)/);
  if (gradientMatch) {
    return getColorBrightness(gradientMatch[0]);
  }

  // 默认返回中等亮度
  return 128;
}

/**
 * 判断颜色是否为深色
 */
export function isDarkColor(color: string): boolean {
  return getColorBrightness(color) < 128;
}

/**
 * 根据背景颜色智能选择最佳的语法高亮主题
 */
export function getOptimalSyntaxTheme(background: string): string {
  const brightness = getColorBrightness(background);

  // 深色背景 (亮度 < 100)
  if (brightness < 100) {
    // 根据具体颜色特征选择最佳深色主题
    if (background.includes("#0d1117") || background.includes("#161b22")) {
      return "github-dark";
    }
    if (background.includes("#1e1e1e") || background.includes("#2d2d30")) {
      return "vs-dark";
    }
    if (background.includes("#282a36") || background.includes("#44475a")) {
      return "dracula";
    }
    if (background.includes("#282c34") || background.includes("#3e4451")) {
      return "one-dark";
    }
    if (background.includes("#272822") || background.includes("#3e3d32")) {
      return "monokai";
    }
    if (background.includes("#000000") || background.includes("#1a1a1a")) {
      return "atom-dark";
    }
    // 默认深色主题
    return "vs-dark";
  }

  // 中等亮度 (100-180)
  if (brightness < 180) {
    // 根据色调选择
    if (
      background.includes("blue") ||
      background.includes("#4facfe") ||
      background.includes("#00f2fe")
    ) {
      return "vs-dark"; // 蓝色系用深色主题
    }
    if (
      background.includes("purple") ||
      background.includes("#667eea") ||
      background.includes("#764ba2")
    ) {
      return "dracula"; // 紫色系用Dracula
    }
    return "one-dark"; // 默认中等亮度用one-dark
  }

  // 浅色背景 (亮度 >= 180)
  if (background.includes("#ffffff") || background.includes("#f8f9fa")) {
    return "github-light";
  }
  if (background.includes("#fafbfc") || background.includes("#f6f8fa")) {
    return "vs-light";
  }

  // 默认浅色主题
  return "github-light";
}

/**
 * 预设背景颜色与最佳语法主题的映射
 */
export const BACKGROUND_THEME_MAPPING: Record<string, string> = {
  // 深色纯色
  "#000000": "atom-dark",
  "#0d1117": "github-dark",
  "#161b22": "github-dark",
  "#1a1a1a": "vs-dark",
  "#1e1e1e": "vs-dark",
  "#2d2d30": "vs-dark",
  "#272822": "monokai",
  "#282a36": "dracula",
  "#282c34": "one-dark",
  "#44475a": "dracula",
  "#3e4451": "one-dark",
  "#3e3d32": "monokai",

  // 浅色纯色
  "#ffffff": "github-light",
  "#fafbfc": "vs-light",
  "#f8f9fa": "github-light",
  "#f6f8fa": "github-light",
  "#e1e4e8": "github-light",
  "#d0d7de": "github-light",
  "#f5f5f5": "vs-light",
  "#eeeeee": "vs-light",
  "#e0e0e0": "vs-light",
  "#bdbdbd": "vs-light",
  "#9e9e9e": "vs-light",
  "#757575": "vs-light",

  // 彩色
  "#ff6b6b": "atom-dark",
  "#ee5a24": "atom-dark",
  "#ff3838": "atom-dark",
  "#ff6348": "atom-dark",
  "#ff9ff3": "dracula",
  "#f368e0": "dracula",
  "#fd79a8": "dracula",
  "#4ecdc4": "one-dark",
  "#0abde3": "vs-dark",
  "#00d2d3": "vs-dark",
  "#54a0ff": "vs-dark",
  "#5f27cd": "dracula",
  "#00d8ff": "vs-dark",
  "#feca57": "tomorrow",
  "#ff9f43": "tomorrow",
  "#48dbfb": "vs-dark",
  "#26de81": "one-dark",
  "#a55eea": "dracula",

  // 渐变背景
  "linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%)":
    "github-dark",
  "linear-gradient(135deg, #0f3460 0%, #0e4b99 100%)": "vs-dark",
  "linear-gradient(135deg, #232526 0%, #414345 100%)": "atom-dark",
  "linear-gradient(135deg, #000428 0%, #004e92 100%)": "vs-dark",
  "radial-gradient(circle, #1a1a1a 0%, #000000 100%)": "atom-dark",
  "linear-gradient(135deg, #2d1b69 0%, #11998e 100%)": "dracula",
  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)": "dracula",
  "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)": "dracula",
  "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)": "vs-dark",
  "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)": "one-dark",
  "linear-gradient(135deg, #fa709a 0%, #fee140 100%)": "tomorrow",
  "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)": "github-light",
  "linear-gradient(135deg, #ff006e 0%, #8338ec 50%, #3a86ff 100%)": "dracula",
  "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)": "github-light",
  "linear-gradient(135deg, #ffffff 0%, #e3e3e3 100%)": "github-light",
  "linear-gradient(135deg, #f7f7f7 0%, #d3d3d3 100%)": "vs-light",
  "radial-gradient(circle, #ffffff 0%, #f0f0f0 100%)": "vs-light",
};

/**
 * 获取背景颜色对应的最佳语法主题
 */
export function getBestSyntaxTheme(background: string): string {
  // 首先检查预设映射
  if (BACKGROUND_THEME_MAPPING[background]) {
    return BACKGROUND_THEME_MAPPING[background];
  }

  // 使用智能算法
  return getOptimalSyntaxTheme(background);
}

/**
 * 获取可读性评分 (0-100)
 */
export function getReadabilityScore(
  background: string,
  syntaxTheme: string
): number {
  const brightness = getColorBrightness(background);

  // 深色背景配深色主题
  const darkThemes = [
    "vs-dark",
    "github-dark",
    "dracula",
    "one-dark",
    "monokai",
    "atom-dark",
  ];
  const lightThemes = ["vs-light", "github-light", "tomorrow"];

  if (brightness < 128 && darkThemes.includes(syntaxTheme)) {
    return Math.max(85, 100 - Math.abs(brightness - 50) / 2);
  }

  if (brightness >= 128 && lightThemes.includes(syntaxTheme)) {
    return Math.max(85, 100 - Math.abs(brightness - 200) / 2);
  }

  // 不匹配的组合
  return Math.max(30, 80 - Math.abs(brightness - 128) / 2);
}
