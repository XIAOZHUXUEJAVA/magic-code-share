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
      createdAt: snippet.createdAt.toISOString(),
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
      createdAt: shareData.createdAt
        ? new Date(shareData.createdAt)
        : new Date(),
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
  } catch {
    return false;
  }
}

// 获取分享链接的统计信息
export function getShareStats(url: string): { views: number; createdAt: Date } {
  // 尝试从URL中解析创建时间
  const snippet = decodeSnippetFromUrl(url);
  const createdAt = snippet?.createdAt || new Date();

  // 获取查看次数
  const views = getViewCount(url);

  return {
    views: views,
    createdAt: createdAt,
  };
}

// 获取查看次数
function getViewCount(url: string): number {
  if (typeof window === "undefined") {
    return 1; // 服务端渲染时返回默认值
  }

  try {
    // 生成URL的唯一标识
    const urlHash = btoa(url)
      .replace(/[^a-zA-Z0-9]/g, "")
      .slice(0, 16);
    const storageKey = `share_views_${urlHash}`;
    const sessionKey = `share_session_${urlHash}`;

    // 检查当前会话是否已经计数
    const currentSession = sessionStorage.getItem(sessionKey);
    const now = Date.now();

    // 从localStorage获取查看次数
    const stored = localStorage.getItem(storageKey);
    let currentViews = stored ? parseInt(stored, 10) : 0;

    // 如果是新会话或者距离上次查看超过30分钟，则增加计数
    if (
      !currentSession ||
      now - parseInt(currentSession, 10) > 30 * 60 * 1000
    ) {
      currentViews += 1;
      localStorage.setItem(storageKey, currentViews.toString());
      sessionStorage.setItem(sessionKey, now.toString());
    }

    return currentViews;
  } catch (error) {
    console.error("获取查看次数失败:", error);
    return 1;
  }
}

// 重置查看次数（用于测试）
export function resetViewCount(url: string): void {
  if (typeof window === "undefined") return;

  try {
    const urlHash = btoa(url)
      .replace(/[^a-zA-Z0-9]/g, "")
      .slice(0, 16);
    const storageKey = `share_views_${urlHash}`;
    localStorage.removeItem(storageKey);
  } catch (error) {
    console.error("重置查看次数失败:", error);
  }
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
