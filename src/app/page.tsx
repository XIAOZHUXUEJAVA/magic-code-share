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
import {
  CodeSnippet,
  CodeTheme,
  CodeSettings,
  DEFAULT_THEME,
  DEFAULT_SETTINGS,
} from "@/types";
import { cn } from "@/lib/utils";
import { Code2, Sparkles, Github, Twitter, RotateCcw } from "lucide-react";
import { toast } from "sonner";

export default function HomePage() {
  const previewRef = useRef<HTMLDivElement>(null);
  const { showDialog, DialogComponent } = useResetDialog();

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
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Code2 className="h-8 w-8 text-primary" />
                  <BorderBeam size={40} duration={8} delay={2} />
                </div>
                <div>
                  <AnimatedGradientText className="text-2xl font-bold">
                    <Sparkles className="mr-2 h-5 w-5" />
                    Magic Code Share
                  </AnimatedGradientText>
                  <p className="text-sm text-muted-foreground">
                    美观的代码分享工具
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReset}
                  className="flex items-center gap-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  重置
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>
          </BlurFade>
        </div>
      </header>

      {/* 主要内容 */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* 左侧：代码编辑器 */}
          <div className="xl:col-span-1 space-y-6">
            <BlurFade delay={0.2}>
              <Card className="p-6 relative overflow-hidden">
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
                code={snippet.code}
                snippet={snippet}
              />
            </BlurFade>
          </div>

          {/* 右侧：代码预览 */}
          <div className="xl:col-span-2">
            <BlurFade delay={0.5}>
              <div className="sticky top-24">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-semibold mb-2">实时预览</h2>
                  <p className="text-muted-foreground">
                    调整左侧设置，实时查看代码卡片效果
                  </p>
                </div>

                <div className="relative">
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
          <div className="mt-16 pt-8 border-t">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                <span>Made with ❤️ using</span>
                <div className="flex items-center gap-2">
                  <span>Next.js</span>
                  <Separator orientation="vertical" className="h-4" />
                  <span>React</span>
                  <Separator orientation="vertical" className="h-4" />
                  <span>TypeScript</span>
                  <Separator orientation="vertical" className="h-4" />
                  <span>Tailwind CSS</span>
                  <Separator orientation="vertical" className="h-4" />
                  <span>Magic UI</span>
                </div>
              </div>

              <div className="text-xs text-muted-foreground">
                © 2024 Magic Code Share. 开源项目，欢迎贡献代码。
              </div>
            </div>
          </div>
        </BlurFade>
      </main>
      {DialogComponent}
    </div>
  );
}
