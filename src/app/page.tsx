"use client";

import { useState, useRef, useCallback } from "react";
import { CodeEditor } from "@/components/code-editor/CodeEditor";
import { CodePreview } from "@/components/code-preview/CodePreview";
import { ThemeConfigurator } from "@/components/theme-configurator/ThemeConfigurator";
import { ExportControls } from "@/components/export-controls/ExportControls";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { BorderBeam } from "@/components/magicui/border-beam";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useResetDialog } from "@/components/ui/reset-dialog";
import { useHelpDialog } from "@/components/ui/help-dialog";
import {
  CodeSnippet,
  CodeTheme,
  CodeSettings,
  DEFAULT_THEME,
  DEFAULT_SETTINGS,
} from "@/types";
import { cn } from "@/lib/utils";
import { Code2, Sparkles, Github, RotateCcw, HelpCircle } from "lucide-react";
import { toast } from "sonner";

export default function HomePage() {
  const previewRef = useRef<HTMLDivElement>(null);
  const { showDialog, DialogComponent } = useResetDialog();
  const { showDialog: showHelpDialog, DialogComponent: HelpDialogComponent } =
    useHelpDialog();

  // 代码片段状态
  const [snippet, setSnippet] = useState<CodeSnippet>({
    id: "default",
    code: `// 欢迎使用 Magic Code Share
// 一个美观的代码分享工具

function createMagic() {
  const elements = ["✨", "🎨", "🚀", "💫"];
  
  return elements.map((emoji, index) => ({
    id: index,
    symbol: emoji,
    magic: true
  }));
}

const magic = createMagic();
console.log("Magic created:", magic);

export default createMagic;`,
    language: "javascript",
    title: "Magic Code Share 示例",
    author: "Coder",
    createdAt: new Date("2024-01-01T00:00:00.000Z"),
    theme: DEFAULT_THEME,
    settings: DEFAULT_SETTINGS,
  });

  // 更新代码
  const handleCodeChange = useCallback((code: string) => {
    setSnippet((prev) => ({ ...prev, code }));
  }, []);

  // 更新语言
  const handleLanguageChange = useCallback((language: string) => {
    setSnippet((prev) => ({ ...prev, language }));
  }, []);

  // 更新标题
  const handleTitleChange = useCallback((title: string) => {
    setSnippet((prev) => ({ ...prev, title }));
  }, []);

  // 更新作者
  const handleAuthorChange = useCallback((author: string) => {
    setSnippet((prev) => ({ ...prev, author }));
  }, []);

  // 更新主题
  const handleThemeChange = useCallback((theme: CodeTheme) => {
    setSnippet((prev) => ({ ...prev, theme }));
  }, []);

  // 更新设置
  const handleSettingsChange = useCallback((settings: CodeSettings) => {
    setSnippet((prev) => ({ ...prev, settings }));
  }, []);

  // 重置所有设置到默认状态
  const handleReset = useCallback(() => {
    showDialog({
      title: "重置所有设置",
      description:
        "确定要重置所有设置到默认状态吗？这将清除当前的代码、主题和配置。",
      onConfirm: () => {
        setSnippet({
          id: "default",
          code: `// 欢迎使用 Magic Code Share
// 一个美观的代码分享工具

function createMagic() {
  const elements = ["✨", "🎨", "🚀", "💫"];
  
  return elements.map((emoji, index) => ({
    id: index,
    symbol: emoji,
    magic: true
  }));
}

const magic = createMagic();
console.log("Magic created:", magic);

export default createMagic;`,
          language: "javascript",
          title: "Magic Code Share 示例",
          author: "Coder",
          createdAt: new Date("2024-01-01T00:00:00.000Z"),
          theme: DEFAULT_THEME,
          settings: DEFAULT_SETTINGS,
        });
        toast.success("已重置所有设置到默认状态");
      },
    });
  }, [showDialog]);

  return (
    <div className="min-h-screen bg-background relative">
      {/* 背景网格 */}
      <GridPattern
        width={60}
        height={60}
        x={-1}
        y={-1}
        className={cn(
          "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]",
          "fixed inset-0 -z-10"
        )}
      />

      {/* 头部 */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <BlurFade delay={0.1}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                <div className="relative flex-shrink-0">
                  <Code2 className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                  <BorderBeam size={40} duration={8} delay={2} />
                </div>
                <div className="min-w-0">
                  <AnimatedGradientText className="text-lg sm:text-2xl font-bold truncate">
                    <Sparkles className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                    <span className="hidden sm:inline">Magic Code Share</span>
                    <span className="sm:hidden">Magic Code</span>
                  </AnimatedGradientText>
                  <p className="text-xs sm:text-sm text-muted-foreground truncate">
                    美观的代码分享工具
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                  className="hidden sm:flex items-center gap-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  重置
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                  className="sm:hidden"
                  title="重置"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>

                <Button
                  variant="destructive"
                  size="sm"
                  onClick={showHelpDialog}
                  className="hidden sm:flex items-center gap-2"
                >
                  <HelpCircle className="h-4 w-4" />
                  使用说明
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={showHelpDialog}
                  className="sm:hidden"
                  title="使用说明"
                >
                  <HelpCircle className="h-4 w-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="hidden sm:inline-flex"
                  asChild
                >
                  <a
                    href="https://github.com/XIAOZHUXUEJAVA/magic-code-share"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>
          </BlurFade>
        </div>
      </header>

      {/* 主要内容 */}
      <main className="container mx-auto px-4 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* 左侧：代码编辑器 */}
          <div className="lg:col-span-1 space-y-4 sm:space-y-6">
            <BlurFade delay={0.2}>
              <Card className="p-4 sm:p-6 relative overflow-hidden">
                <BorderBeam size={250} duration={12} delay={9} />
                <CodeEditor
                  code={snippet.code}
                  language={snippet.language}
                  title={snippet.title || ""}
                  author={snippet.author || ""}
                  onCodeChange={handleCodeChange}
                  onLanguageChange={handleLanguageChange}
                  onTitleChange={handleTitleChange}
                  onAuthorChange={handleAuthorChange}
                />
              </Card>
            </BlurFade>

            <BlurFade delay={0.3}>
              <ThemeConfigurator
                theme={snippet.theme}
                settings={snippet.settings}
                onThemeChange={handleThemeChange}
                onSettingsChange={handleSettingsChange}
              />
            </BlurFade>

            <BlurFade delay={0.4}>
              <ExportControls
                previewRef={previewRef}
                title={snippet.title}
                snippet={snippet}
              />
            </BlurFade>
          </div>

          {/* 右侧：代码预览 */}
          <div className="lg:col-span-2 order-first lg:order-last">
            <BlurFade delay={0.5}>
              <div className="lg:sticky lg:top-24">
                <div className="text-center mb-4 sm:mb-6">
                  <h2 className="text-xl sm:text-2xl font-semibold mb-2">
                    实时预览
                  </h2>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    <span className="hidden sm:inline">
                      调整左侧设置，实时查看代码卡片效果
                    </span>
                    <span className="sm:hidden">
                      调整下方设置，查看代码效果
                    </span>
                  </p>
                </div>

                <div className="relative rounded-lg">
                  <CodePreview
                    ref={previewRef}
                    snippet={snippet}
                    className="transition-all duration-300"
                  />
                </div>
              </div>
            </BlurFade>
          </div>
        </div>

        {/* 底部信息 */}
        <BlurFade delay={0.6}>
          <div className="mt-8 sm:mt-16 pt-6 sm:pt-8 border-t">
            <div className="text-center space-y-3 sm:space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                <div className="flex items-center gap-2 flex-wrap justify-center">
                  <span>Next.js</span>
                  <Separator orientation="vertical" className="h-3 sm:h-4" />
                  <span>React</span>
                  <Separator orientation="vertical" className="h-3 sm:h-4" />
                  <span>TypeScript</span>
                  <Separator
                    orientation="vertical"
                    className="h-3 sm:h-4 hidden sm:block"
                  />
                  <span className="hidden sm:inline">Tailwind CSS</span>
                  <span className="sm:hidden">Tailwind</span>
                </div>
              </div>

              <div className="text-xs text-muted-foreground px-4">
                © 2025 Magic Code Share.
              </div>
            </div>
          </div>
        </BlurFade>
      </main>
      {DialogComponent}
      {HelpDialogComponent}
    </div>
  );
}
