"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BorderBeam } from "@/components/magicui/border-beam";
import { BlurFade } from "@/components/magicui/blur-fade";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import {
  HelpCircle,
  X,
  Code,
  Palette,
  Download,
  Share2,
  Settings,
  RotateCcw,
} from "lucide-react";

interface HelpDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HelpDialog({ isOpen, onClose }: HelpDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 背景遮罩 */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* 对话框 */}
      <BlurFade delay={0.1}>
        <div className="relative w-full max-w-4xl mx-4">
          <BorderBeam size={250} duration={8} delay={2} />
          <Card className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/95 max-h-[85vh] overflow-y-auto">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="mx-auto w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-4">
                    <HelpCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle className="text-xl">
                    <AnimatedGradientText>
                      Magic Code Share 使用说明
                    </AnimatedGradientText>
                  </CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="h-8 w-8 -mt-2 -mr-2"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <BlurFade delay={0.2}>
                <div className="space-y-6">
                  {/* 基本介绍 */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Code className="h-5 w-5 text-primary" />
                      什么是 Magic Code Share？
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Magic Code Share
                      是一个美观的代码分享工具，帮助你创建精美的代码截图和分享链接。
                      支持多种编程语言语法高亮、自定义主题、多种窗口样式等功能。
                    </p>
                  </div>

                  {/* 主要功能 */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">主要功能</h3>

                    <div className="grid gap-4">
                      <div className="flex gap-3 p-3 rounded-lg bg-muted/50">
                        <Code className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium">代码编辑</h4>
                          <p className="text-sm text-muted-foreground">
                            支持多种编程语言，实时语法高亮，智能代码补全
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3 p-3 rounded-lg bg-muted/50">
                        <Palette className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium">主题配置</h4>
                          <p className="text-sm text-muted-foreground">
                            多种预设主题，自定义背景色、字体、窗口样式等
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3 p-3 rounded-lg bg-muted/50">
                        <Download className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium">导出功能</h4>
                          <p className="text-sm text-muted-foreground">
                            支持导出为 PNG、JPG、PDF 格式
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3 p-3 rounded-lg bg-muted/50">
                        <Share2 className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium">分享链接</h4>
                          <p className="text-sm text-muted-foreground">
                            生成分享链接，支持社交媒体分享和嵌入代码
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 使用步骤 */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">使用步骤</h3>

                    <div className="space-y-3">
                      <div className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium flex-shrink-0 mt-0.5">
                          1
                        </div>
                        <div>
                          <p className="font-medium">编写或粘贴代码</p>
                          <p className="text-sm text-muted-foreground">
                            在左侧编辑器中输入你的代码
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium flex-shrink-0 mt-0.5">
                          2
                        </div>
                        <div>
                          <p className="font-medium">选择主题和样式</p>
                          <p className="text-sm text-muted-foreground">
                            在主题配置中选择喜欢的样式
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium flex-shrink-0 mt-0.5">
                          3
                        </div>
                        <div>
                          <p className="font-medium">预览效果</p>
                          <p className="text-sm text-muted-foreground">
                            在右侧预览区查看实时效果
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium flex-shrink-0 mt-0.5">
                          4
                        </div>
                        <div>
                          <p className="font-medium">导出或分享</p>
                          <p className="text-sm text-muted-foreground">
                            使用导出功能保存图片或生成分享链接
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 快捷操作
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">快捷操作</h3>

                  <div className="grid gap-2 text-sm">
                    <div className="flex justify-between items-center p-2 rounded bg-muted/30">
                      <span>重置所有设置</span>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <RotateCcw className="h-3 w-3" />
                        <span>重置按钮</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded bg-muted/30">
                      <span>快速导出 PNG</span>
                      <kbd className="px-2 py-1 text-xs bg-muted rounded">
                        Ctrl + S
                      </kbd>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded bg-muted/30">
                      <span>切换主题</span>
                      <kbd className="px-2 py-1 text-xs bg-muted rounded">
                        Ctrl + T
                      </kbd>
                    </div>
                  </div>
                </div>
 */}
                  {/* 技巧提示 */}
                  <div className="space-y-3 p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
                    <h4 className="font-medium text-blue-900 dark:text-blue-100">
                      💡 使用技巧
                    </h4>
                    <ul className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
                      <li>• 使用不同的窗口样式来匹配你的设计风格</li>
                      <li>• 调整内边距和圆角来获得更好的视觉效果</li>
                      <li>• 选择合适的背景色来突出代码内容</li>
                      <li>• 使用水印功能来标识你的作品</li>
                    </ul>
                  </div>
                </div>
              </BlurFade>

              <BlurFade delay={0.3}>
                <div className="flex justify-center pt-4">
                  <Button onClick={onClose} className="px-8">
                    开始使用
                  </Button>
                </div>
              </BlurFade>
            </CardContent>
          </Card>
        </div>
      </BlurFade>
    </div>
  );
}

// Hook for using the help dialog
export function useHelpDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const showDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  const DialogComponent = <HelpDialog isOpen={isOpen} onClose={closeDialog} />;

  return {
    showDialog,
    closeDialog,
    DialogComponent,
  };
}
