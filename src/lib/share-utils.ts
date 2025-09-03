import { CodeSnippet } from "@/types";
import { DEFAULT_THEME, DEFAULT_SETTINGS } from "@/types";

// 压缩和解压缩数据
function compressData(data: string): string {
  try {
    // 使用 btoa 进行 base64 编码
    return btoa(encodeURIComponent(data));
  } catch (error) {
    console.error("压缩数据失败:", error);
    return "";
  }
}

function decompressData(compressed: string): string {
  try {
    // 使用 atob 进行 base64 解码
    return decodeURIComponent(atob(compressed));
  } catch (error) {
    console.error("解压数据失败:", error);
    return "";
  }
}

// 将代码片段编码为URL参数
export function encodeSnippetToUrl(snippet: CodeSnippet): string {
  try {
    const shareData = {
      code: snippet.code,
      language: snippet.language,
      title: snippet.title || "",
      author: snippet.author || "",
      theme: snippet.theme,
      settings: snippet.settings,
    };

    const jsonString = JSON.stringify(shareData);
    const compressed = compressData(jsonString);

    if (!compressed) {
      throw new Error("数据压缩失败");
    }

    // 创建分享URL
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    const shareUrl = new URL("/share", baseUrl);
    shareUrl.searchParams.set("data", compressed);

    return shareUrl.toString();
  } catch (error) {
    console.error("编码分享链接失败:", error);
    throw new Error("生成分享链接失败");
  }
}

// 从URL参数解码代码片段
export function decodeSnippetFromUrl(url: string): CodeSnippet | null {
  try {
    const urlObj = new URL(url);
    const data = urlObj.searchParams.get("data");

    if (!data) {
      return null;
    }

    const jsonString = decompressData(data);
    if (!jsonString) {
      return null;
    }

    const shareData = JSON.parse(jsonString);

    // 验证必要字段
    if (!shareData.code || !shareData.language) {
      return null;
    }

    // 创建代码片段对象
    const snippet: CodeSnippet = {
      id: `shared-${Date.now()}`,
      code: shareData.code,
      language: shareData.language,
      title: shareData.title || "分享的代码",
      author: shareData.author || "匿名用户",
      createdAt: new Date("2024-01-01T00:00:00.000Z"),
      theme: shareData.theme || DEFAULT_THEME,
      settings: shareData.settings || DEFAULT_SETTINGS,
    };

    return snippet;
  } catch (error) {
    console.error("解码分享链接失败:", error);
    return null;
  }
}

// 从当前页面URL获取分享数据
export function getSharedSnippetFromCurrentUrl(): CodeSnippet | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const urlParams = new URLSearchParams(window.location.search);
    const data = urlParams.get("data");

    if (!data) {
      return null;
    }

    return decodeSnippetFromUrl(window.location.href);
  } catch (error) {
    console.error("从当前URL获取分享数据失败:", error);
    return null;
  }
}

// 生成短链接（模拟）
export function generateShortUrl(fullUrl: string): string {
  // 在实际应用中，这里可以调用短链接服务
  // 现在我们只是截取一部分URL作为演示
  const hash = btoa(fullUrl).slice(0, 8);
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  return `${baseUrl}/s/${hash}`;
}

// 验证分享链接是否有效
export function validateShareUrl(url: string): boolean {
  try {
    const snippet = decodeSnippetFromUrl(url);
    return snippet !== null;
  } catch (error) {
    return false;
  }
}

// 获取分享链接的统计信息（模拟）
export function getShareStats(url: string): { views: number; createdAt: Date } {
  // 在实际应用中，这里可以从后端获取统计信息
  // 使用URL哈希生成一致的模拟数据，避免水合错误
  const hash = url.split("").reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);

  return {
    views: Math.abs(hash % 100) + 1,
    createdAt: new Date("2024-01-01T00:00:00.000Z"),
  };
}

// 复制链接到剪贴板
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // 降级方案
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const result = document.execCommand("copy");
      textArea.remove();
      return result;
    }
  } catch (error) {
    console.error("复制到剪贴板失败:", error);
    return false;
  }
}
