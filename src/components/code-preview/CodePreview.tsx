"use client";

import { forwardRef, useMemo, useCallback, useEffect, useState } from "react";
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
};

export const CodePreview = forwardRef<HTMLDivElement, CodePreviewProps>(
  ({ snippet, className }, ref) => {
    const { code, language, title, author, theme, settings } = snippet;
    const [isMobile, setIsMobile] = useState(false);
    const [screenWidth, setScreenWidth] = useState(0);

    // 响应式检测
    useEffect(() => {
      const checkScreenSize = () => {
        const width = window.innerWidth;
        setScreenWidth(width);
        setIsMobile(width <= 768);
      };

      checkScreenSize();
      window.addEventListener("resize", checkScreenSize);
      return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    // 获取语法高亮主题
    const syntaxTheme = useMemo(() => {
      return (
        syntaxThemes[theme.syntaxTheme as keyof typeof syntaxThemes] || dark
      );
    }, [theme.syntaxTheme]);

    // 响应式字体大小计算
    const getResponsiveFontSize = () => {
      if (screenWidth <= 480) return Math.max(settings.fontSize - 2, 10); // 超小屏
      if (screenWidth <= 768) return Math.max(settings.fontSize - 1, 11); // 移动端
      if (screenWidth <= 1024) return settings.fontSize; // 平板
      return settings.fontSize; // 桌面端
    };

    // 响应式内边距计算
    const getResponsivePadding = () => {
      if (screenWidth <= 480) return Math.max(settings.padding - 8, 8);
      if (screenWidth <= 768) return Math.max(settings.padding - 4, 12);
      return settings.padding;
    };

    // 智能代码换行处理
    const processCodeForMobile = useCallback((code: string): string => {
      if (!isMobile) return code;

      const maxLineLength = screenWidth <= 480 ? 30 : 40;
      const lines = code.split("\n");
      const processedLines: string[] = [];

      lines.forEach((line) => {
        if (line.length <= maxLineLength) {
          processedLines.push(line);
        } else {
          // 保持缩进
          const indent = line.match(/^\s*/)?.[0] || "";
          const content = line.slice(indent.length);
          const words = content.split(/(\s+)/);
          let currentLine = indent;

          // 智能分割策略
          if (words.length === 1) {
            // 单个长单词，强制分割
            for (let i = 0; i < content.length; i += maxLineLength - indent.length) {
              processedLines.push(
                indent + content.slice(i, i + maxLineLength - indent.length)
              );
            }
          } else {
            // 多个单词，智能换行
            for (const word of words) {
              const testLine =
                currentLine + (currentLine === indent ? "" : " ") + word;
              if (testLine.length <= maxLineLength) {
                currentLine = testLine;
              } else {
                if (currentLine.trim()) {
                  processedLines.push(currentLine);
                  currentLine = indent + "  " + word;
                } else {
                  processedLines.push(currentLine + word);
                  currentLine = indent;
                }
              }
            }

            if (currentLine.trim()) {
              processedLines.push(currentLine);
            }
          }
        }
      });

      return processedLines.join("\n");
    }, [isMobile, screenWidth]);

    // 处理后的代码
    const processedCode = useMemo(() => {
      return processCodeForMobile(code);
    }, [code, processCodeForMobile]);

    // 渲染代码内容
    const renderCodeContent = () => (
      <div className="relative mobile-code-block">
        <SyntaxHighlighter
          language={language === "auto" ? "javascript" : language}
          style={syntaxTheme}
          showLineNumbers={isMobile ? false : settings.lineNumbers} // 移动端隐藏行号
          customStyle={{
            margin: 0,
            padding: `${getResponsivePadding()}px`,
            fontSize: `${getResponsiveFontSize()}px`,
            fontFamily: settings.fontFamily,
            borderRadius: settings.borderRadius,
            backgroundColor: "transparent",
            overflowX: isMobile ? "auto" : "visible", // 移动端允许横向滚动
            maxWidth: "100%",
          }}
          codeTagProps={{
            style: {
              fontFamily: settings.fontFamily,
              whiteSpace: isMobile ? "pre" : "pre-wrap", // 移动端保持原格式
              wordBreak: isMobile ? "break-all" : "normal",
            },
          }}
          wrapLines={!isMobile} // 桌面端换行，移动端不换行
          wrapLongLines={!isMobile}
        >
          {processedCode}
        </SyntaxHighlighter>

        {/* 复制按钮 - 响应式定位 */}
        <div
          className={cn(
            "absolute z-10",
            isMobile ? "top-2 right-2" : "top-4 right-4"
          )}
        >
          <CopyButton
            text={code}
            className={cn(
              "transition-all duration-200",
              isMobile ? "scale-90" : "scale-100"
            )}
          />
        </div>

        {/* 移动端滚动提示 */}
        {isMobile && (
          <div className="absolute bottom-2 right-2 text-xs text-white/40 pointer-events-none">
            ← 滑动查看
          </div>
        )}
      </div>
    );

    // 渲染头部信息
    const renderHeader = () => {
      if (!settings.showHeader || (!title && !author)) return null;

      return (
        <div
          className={cn(
            "border-b border-white/10",
            isMobile ? "px-3 py-3" : "px-6 py-4"
          )}
        >
          {title && (
            <h3
              className={cn(
                "font-semibold text-white mb-1 truncate",
                isMobile ? "text-sm" : "text-lg"
              )}
            >
              {title}
            </h3>
          )}
          {author && (
            <p
              className={cn(
                "text-white/70 truncate",
                isMobile ? "text-xs" : "text-sm"
              )}
            >
              by {author}
            </p>
          )}
        </div>
      );
    };

    // 渲染底部信息
    const renderFooter = () => {
      if (!settings.showFooter) return null;

      return (
        <div
          className={cn(
            "border-t border-white/10 flex items-center justify-between text-white/70",
            isMobile ? "px-3 py-2 text-xs" : "px-6 py-3 text-sm"
          )}
        >
          <span>{language.toUpperCase()}</span>
          <span>{code.split("\n").length} 行</span>
        </div>
      );
    };

    // 渲染水印
    const renderWatermark = () => {
      if (!settings.watermark) return null;

      return (
        <div
          className={cn(
            "absolute text-white/30 font-mono pointer-events-none",
            isMobile
              ? "bottom-2 right-2 text-[10px]"
              : "bottom-4 right-4 text-xs"
          )}
        >
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
        case "macos":
          return (
            <div className="relative">
              <div
                className="rounded-lg overflow-hidden shadow-2xl"
                style={{ background: theme.background }}
              >
                {/* macOS 窗口头部 */}
                <div
                  className={cn(
                    "flex items-center bg-black/20",
                    isMobile ? "px-3 py-2" : "px-4 py-3"
                  )}
                >
                  <div
                    className={cn(
                      "flex items-center",
                      isMobile ? "space-x-1" : "space-x-2"
                    )}
                  >
                    <div
                      className={cn(
                        "rounded-full bg-red-500",
                        isMobile ? "w-2 h-2" : "w-3 h-3"
                      )}
                    ></div>
                    <div
                      className={cn(
                        "rounded-full bg-yellow-500",
                        isMobile ? "w-2 h-2" : "w-3 h-3"
                      )}
                    ></div>
                    <div
                      className={cn(
                        "rounded-full bg-green-500",
                        isMobile ? "w-2 h-2" : "w-3 h-3"
                      )}
                    ></div>
                  </div>
                  <div className="flex-1 text-center">
                    <span
                      className={cn(
                        "text-white/70 font-medium truncate",
                        isMobile ? "text-xs" : "text-sm"
                      )}
                    >
                      {title || ""}
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
                <div
                  className={cn(
                    "flex items-center justify-between bg-black/20",
                    isMobile ? "px-3 py-2" : "px-4 py-2"
                  )}
                >
                  <div className="flex items-center space-x-2 flex-1 min-w-0">
                    <div
                      className={cn(
                        "bg-white/20 rounded-sm flex-shrink-0",
                        isMobile ? "w-3 h-3" : "w-4 h-4"
                      )}
                    ></div>
                    <span
                      className={cn(
                        "text-white/70 font-medium truncate",
                        isMobile ? "text-xs" : "text-sm"
                      )}
                    >
                      {title || ""}
                    </span>
                  </div>
                  <div
                    className={cn(
                      "flex items-center flex-shrink-0",
                      isMobile ? "space-x-0.5" : "space-x-1"
                    )}
                  >
                    <div
                      className={cn(
                        "bg-white/10 hover:bg-white/20 rounded flex items-center justify-center",
                        isMobile ? "w-5 h-5" : "w-6 h-6"
                      )}
                    >
                      <span
                        className={cn(
                          "text-white/70",
                          isMobile ? "text-[10px]" : "text-xs"
                        )}
                      >
                        −
                      </span>
                    </div>
                    <div
                      className={cn(
                        "bg-white/10 hover:bg-white/20 rounded flex items-center justify-center",
                        isMobile ? "w-5 h-5" : "w-6 h-6"
                      )}
                    >
                      <span
                        className={cn(
                          "text-white/70",
                          isMobile ? "text-[10px]" : "text-xs"
                        )}
                      >
                        □
                      </span>
                    </div>
                    <div
                      className={cn(
                        "bg-red-500/80 hover:bg-red-500 rounded flex items-center justify-center",
                        isMobile ? "w-5 h-5" : "w-6 h-6"
                      )}
                    >
                      <span
                        className={cn(
                          "text-white",
                          isMobile ? "text-[10px]" : "text-xs"
                        )}
                      >
                        ×
                      </span>
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
        className={cn(
          "w-full mx-auto rounded-lg overflow-hidden",
          isMobile ? "max-w-full p-2 sm:p-4" : "max-w-4xl p-8",
          className
        )}
        style={{ background: theme.background }}
      >
        <div
          className={cn(
            "transition-all duration-300",
            isMobile && "touch-pan-x" // 启用触摸滚动
          )}
        >
          {renderWindowContainer()}
        </div>
      </div>
    );
  }
);

CodePreview.displayName = "CodePreview";
