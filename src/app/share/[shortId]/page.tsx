"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
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
import { decodeSnippetFromShortId, validateShortId } from "@/lib/share-utils";
import { cn } from "@/lib/utils";
import {
  Code2,
  Sparkles,
  ArrowLeft,
  Share2,
  Calendar,
  User,
  FileCode,
  AlertCircle,
  Home,
  Eye,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function SharePage() {
  const params = useParams();
  const shortId = params.shortId as string;

  const [snippet, setSnippet] = useState<CodeSnippet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSharedSnippet = async () => {
      try {
        // 验证短链接 ID 格式
        if (!validateShortId(shortId)) {
          setError("无效的分享链接格式");
          setLoading(false);
          return;
        }

        // 从后端获取代码片段
        const result = await decodeSnippetFromShortId(shortId);

        if (!result) {
          setError("分享链接不存在或已过期");
          setLoading(false);
          return;
        }

        setSnippet(result);
        setError(null);
      } catch (err) {
        console.error("加载分享内容失败:", err);
        setError("加载分享内容失败，请稍后重试");
      } finally {
        setLoading(false);
      }
    };

    loadSharedSnippet();
  }, [shortId]);

  // 复制当前链接
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("分享链接已复制到剪贴板");
    } catch {
      toast.error("复制链接失败");
    }
  };

  // 加载中状态
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

  // 错误状态
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

  // 正常显示分享内容
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
                  <span className="hidden sm:inline">复制链接</span>
                </Button>
                <Button asChild>
                  <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">返回首页</span>
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
                  {snippet.title || "代码片段"}
                </CardTitle>
                <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                  {snippet.author && (
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {snippet.author}
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {snippet.createdAt.toLocaleDateString("zh-CN")}
                  </div>
                  {"viewCount" in snippet &&
                    snippet.viewCount !== undefined && (
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {snippet.viewCount} 次浏览
                      </div>
                    )}
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
            </div>
          </BlurFade>

          {/* 底部信息 */}
          <BlurFade delay={0.5}>
            <div className="pt-8 border-t">
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground flex-wrap">
                  <span>Made with ❤️ using</span>
                  <div className="flex items-center gap-2 flex-wrap justify-center">
                    <span>Next.js</span>
                    <Separator orientation="vertical" className="h-4" />
                    <span>React</span>
                    <Separator orientation="vertical" className="h-4" />
                    <span>TypeScript</span>
                    <Separator orientation="vertical" className="h-4" />
                    <span>Tailwind CSS</span>
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
