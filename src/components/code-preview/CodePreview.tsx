"use client";

import { forwardRef, useMemo } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  dark,
  vs,
  dracula,
  oneDark,
  atomDark,
  tomorrow,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { CodeSnippet } from "@/types";
import { Safari } from "@/components/magicui/safari";
import { Terminal } from "@/components/magicui/terminal";
import IPhone15Pro from "@/components/magicui/iphone-15-pro";
import { CopyButton } from "@/components/ui/copy-button";
import { BorderBeam } from "@/components/magicui/border-beam";
import { cn } from "@/lib/utils";

interface CodePreviewProps {
  snippet: CodeSnippet;
  className?: string;
}

// 语法高亮主题映射
const syntaxThemes = {
  "vs-dark": dark,
  "vs-light": vs,
  dracula: dracula,
  "one-dark": oneDark,
  "atom-dark": atomDark,
  tomorrow: tomorrow,
  "github-light": vs,
  "github-dark": dark,
  monokai: atomDark,
  terminal: dark,
};

export const CodePreview = forwardRef<HTMLDivElement, CodePreviewProps>(
  ({ snippet, className }, ref) => {
    const { code, language, title, author, theme, settings } = snippet;

    // 获取语法高亮主题
    const syntaxTheme = useMemo(() => {
      return (
        syntaxThemes[theme.syntaxTheme as keyof typeof syntaxThemes] || dark
      );
    }, [theme.syntaxTheme]);

    // 渲染代码内容
    const renderCodeContent = () => (
      <div className="relative">
        <SyntaxHighlighter
          language={language === "auto" ? "javascript" : language}
          style={syntaxTheme}
          showLineNumbers={settings.lineNumbers}
          customStyle={{
            margin: 0,
            padding: `${settings.padding}px`,
            fontSize: `${settings.fontSize}px`,
            fontFamily: settings.fontFamily,
            borderRadius: settings.borderRadius,
            background: "transparent",
          }}
          codeTagProps={{
            style: {
              fontFamily: settings.fontFamily,
            },
          }}
        >
          {code}
        </SyntaxHighlighter>

        {/* 复制按钮 */}
        <div className="absolute top-4 right-4">
          <CopyButton text={code} />
        </div>
      </div>
    );

    // 渲染头部信息
    const renderHeader = () => {
      if (!settings.showHeader || (!title && !author)) return null;

      return (
        <div className="px-6 py-4 border-b border-white/10">
          {title && (
            <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
          )}
          {author && <p className="text-sm text-white/70">by {author}</p>}
        </div>
      );
    };

    // 渲染底部信息
    const renderFooter = () => {
      if (!settings.showFooter) return null;

      return (
        <div className="px-6 py-3 border-t border-white/10 flex items-center justify-between text-sm text-white/70">
          <span>{language.toUpperCase()}</span>
          <span>{code.split("\n").length} lines</span>
        </div>
      );
    };

    // 渲染水印
    const renderWatermark = () => {
      if (!settings.watermark) return null;

      return (
        <div className="absolute bottom-4 right-4 text-xs text-white/30 font-mono">
          magic-code-share
        </div>
      );
    };

    // 根据窗口样式渲染不同的容器
    const renderWindowContainer = () => {
      const content = (
        <div
          className="relative overflow-hidden"
          style={{ borderRadius: settings.borderRadius }}
        >
          {renderHeader()}
          {renderCodeContent()}
          {renderFooter()}
          {renderWatermark()}
        </div>
      );

      switch (theme.windowStyle) {
        case "safari":
          return (
            <Safari url="https://magic-code-share.com" className="w-full">
              {content}
            </Safari>
          );

        case "terminal":
          return <Terminal className="w-full">{content}</Terminal>;

        case "iphone":
          return (
            <IPhone15Pro className="w-full max-w-sm mx-auto">
              {content}
            </IPhone15Pro>
          );

        case "macos":
          return (
            <div className="relative">
              <div
                className="rounded-lg overflow-hidden shadow-2xl"
                style={{ background: theme.background }}
              >
                {/* macOS 窗口头部 */}
                <div className="flex items-center px-4 py-3 bg-black/20">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="flex-1 text-center">
                    <span className="text-sm text-white/70 font-medium">
                      {title || "Untitled"}
                    </span>
                  </div>
                </div>
                {content}
              </div>
              <BorderBeam size={250} duration={12} delay={9} />
            </div>
          );

        case "windows":
          return (
            <div className="relative">
              <div
                className="rounded-lg overflow-hidden shadow-2xl"
                style={{ background: theme.background }}
              >
                {/* Windows 窗口头部 */}
                <div className="flex items-center justify-between px-4 py-2 bg-black/20">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-white/20 rounded-sm"></div>
                    <span className="text-sm text-white/70 font-medium">
                      {title || "Untitled"}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-6 h-6 bg-white/10 hover:bg-white/20 rounded flex items-center justify-center">
                      <span className="text-white/70 text-xs">−</span>
                    </div>
                    <div className="w-6 h-6 bg-white/10 hover:bg-white/20 rounded flex items-center justify-center">
                      <span className="text-white/70 text-xs">□</span>
                    </div>
                    <div className="w-6 h-6 bg-red-500/80 hover:bg-red-500 rounded flex items-center justify-center">
                      <span className="text-white text-xs">×</span>
                    </div>
                  </div>
                </div>
                {content}
              </div>
              <BorderBeam size={250} duration={12} delay={9} />
            </div>
          );

        default:
          return (
            <div
              className="rounded-lg overflow-hidden shadow-2xl relative"
              style={{ background: theme.background }}
            >
              {content}
              <BorderBeam size={250} duration={12} delay={9} />
            </div>
          );
      }
    };

    return (
      <div
        ref={ref}
        className={cn("w-full max-w-4xl mx-auto p-8", className)}
        style={{ background: theme.background }}
      >
        {renderWindowContainer()}
      </div>
    );
  }
);

CodePreview.displayName = "CodePreview";
