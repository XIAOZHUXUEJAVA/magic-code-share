import { CodeSnippet } from "@/types";
import { DEFAULT_THEME, DEFAULT_SETTINGS } from "@/types";

// 使用后端 API 创建短链接
export async function encodeSnippetToUrl(snippet: CodeSnippet): Promise<string> {
  try {
    const response = await fetch('/api/share/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ snippet }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || '创建分享链接失败');
    }

    const data = await response.json();
    return data.shareUrl;
  } catch (error) {
    console.error("创建分享链接失败:", error);
    throw new Error("生成分享链接失败");
  }
}

// 从后端 API 获取代码片段（包含分享链接的元数据）
export async function decodeSnippetFromShortId(shortId: string): Promise<(CodeSnippet & { viewCount?: number; lastViewedAt?: Date }) | null> {
  try {
    const response = await fetch(`/api/share/${shortId}`);

    if (!response.ok) {
      if (response.status === 404) {
        console.error('分享链接不存在');
        return null;
      }
      if (response.status === 410) {
        console.error('分享链接已过期');
        return null;
      }
      throw new Error('获取分享数据失败');
    }

    const result = await response.json();
    const shareData = result.data.snippet_data;

    // 验证必要字段
    if (!shareData.code || !shareData.language) {
      return null;
    }

    // 创建代码片段对象，使用数据库的 created_at 作为分享链接创建时间
    const snippet: CodeSnippet & { viewCount?: number; lastViewedAt?: Date } = {
      id: `shared-${result.data.short_id}`,
      code: shareData.code,
      language: shareData.language,
      title: shareData.title || "分享的代码",
      author: shareData.author || "匿名用户",
      createdAt: result.data.created_at
        ? new Date(result.data.created_at)
        : new Date(),
      theme: shareData.theme || DEFAULT_THEME,
      settings: shareData.settings || DEFAULT_SETTINGS,
      viewCount: result.data.view_count || 0,
      lastViewedAt: result.data.last_viewed_at
        ? new Date(result.data.last_viewed_at)
        : undefined,
    };

    return snippet;
  } catch (error) {
    console.error("获取分享数据失败:", error);
    return null;
  }
}

// 从当前页面 URL 路径获取短链接 ID
export function getShortIdFromUrl(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    // 从 /share/[shortId] 路径中提取 shortId
    const pathParts = window.location.pathname.split('/');
    const shareIndex = pathParts.indexOf('share');
    
    if (shareIndex !== -1 && pathParts[shareIndex + 1]) {
      return pathParts[shareIndex + 1];
    }

    return null;
  } catch (error) {
    console.error("从URL获取短链接ID失败:", error);
    return null;
  }
}

// 验证短链接 ID 格式
export function validateShortId(shortId: string): boolean {
  // nanoid(8) 生成的 ID 格式：8位字母数字字符
  return /^[a-zA-Z0-9_-]{8}$/.test(shortId);
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
