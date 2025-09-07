"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CodePreview } from "@/components/code-preview/CodePreview";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { BorderBeam } from "@/components/magicui/border-beam";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CodeSnippet } from "@/types";
import {
  decodeSnippetFromUrl,
  getShareStats,
  resetViewCount,
} from "@/lib/share-utils";
import { cn } from "@/lib/utils";
import {
  Code2,
  Sparkles,
  ArrowLeft,
  Share2,
  Eye,
  Calendar,
  User,
  FileCode,
  AlertCircle,
  Home,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

function SharePageContent() {
  const searchParams = useSearchParams();
  const [snippet, setSnippet] = useState<CodeSnippet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<{ views: number; createdAt: Date } | null>(
    null
  );

  useEffect(() => {
    const loadSharedSnippet = () => {
      try {
        const data = searchParams.get("data");
        if (!data) {
          setError("未找到分享数据");
          return;
        }

        const currentUrl = window.location.href;
        const decodedSnippet = decodeSnippetFromUrl(currentUrl);

        if (!decodedSnippet) {
          setError("分享链接无效或已损坏");
          return;
        }

        setSnippet(decodedSnippet);
        setStats(getShareStats(currentUrl));
      } catch (err) {
        console.error("加载分享代码失败:", err);
        setError("加载分享代码失败");
      } finally {
        setLoading(false);
      }
    };

    loadSharedSnippet();
  }, [searchParams]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("分享链接已复制到剪贴板");
    } catch {
      toast.error("复制链接失败");
    }
  };

  const handleResetViews = () => {
    if (window.location.href) {
      resetViewCount(window.location.href);
      // 重新加载统计信息
      setStats(getShareStats(window.location.href));
      toast.success("查看次数已重置");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">加载分享内容中...</p>
        </div>
      </div>
    );
  }

  if (error || !snippet) {
    return (
      <div className="min-h-screen bg-background relative">
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

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center space-y-6">
            <div className="relative mx-auto w-16 h-16 flex items-center justify-center">
              <AlertCircle className="h-16 w-16 text-muted-foreground" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-bold">分享链接无效</h1>
              <p className="text-muted-foreground">
                {error || "无法加载分享的代码片段"}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <Button asChild>
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  返回首页
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/">
                  <Code2 className="mr-2 h-4 w-4" />
                  创建新的代码分享
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
                    分享的代码片段
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={handleCopyLink}>
                  <Share2 className="mr-2 h-4 w-4" />
                  复制链接
                </Button>
                <Button asChild>
                  <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    返回首页
                  </Link>
                </Button>
              </div>
            </div>
          </BlurFade>
        </div>
      </header>

      {/* 主要内容 */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* 代码信息卡片 */}
          <BlurFade delay={0.2}>
            <Card className="relative overflow-hidden">
              <BorderBeam size={250} duration={12} delay={9} />
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileCode className="h-5 w-5" />
                  {snippet.title}
                </CardTitle>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {snippet.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {stats?.createdAt.toLocaleDateString("zh-CN")}
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {stats?.views} 次查看
                  </div>
                  <Badge variant="secondary">{snippet.language}</Badge>
                </div>
              </CardHeader>
            </Card>
          </BlurFade>

          {/* 代码预览 */}
          <BlurFade delay={0.3}>
            <div className="space-y-4">
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-2">代码预览</h2>
                <p className="text-muted-foreground">
                  这是一个分享的代码片段，你可以查看和复制代码内容
                </p>
              </div>

              <div className="flex justify-center">
                <CodePreview
                  snippet={snippet}
                  className="transition-all duration-300"
                />
              </div>
            </div>
          </BlurFade>

          {/* 操作按钮 */}
          <BlurFade delay={0.4}>
            <div className="flex justify-center gap-4 flex-wrap">
              <Button asChild>
                <Link href="/">
                  <Code2 className="mr-2 h-4 w-4" />
                  创建我的代码分享
                </Link>
              </Button>
              <Button variant="outline" onClick={handleCopyLink}>
                <Share2 className="mr-2 h-4 w-4" />
                分享这个代码
              </Button>
              {/* 开发者工具 - 仅在开发环境显示 */}
              {process.env.NODE_ENV === "development" && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleResetViews}
                >
                  重置查看次数
                </Button>
              )}
            </div>
          </BlurFade>

          {/* 底部信息 */}
          <BlurFade delay={0.5}>
            <div className="pt-8 border-t">
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
        </div>
      </main>
    </div>
  );
}

export default function SharePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">加载分享内容中...</p>
          </div>
        </div>
      }
    >
      <SharePageContent />
    </Suspense>
  );
}
