"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BorderBeam } from "@/components/magicui/border-beam";
import {
  exportToPNG,
  exportToJPG,
  exportToPDF,
  downloadFile,
  copyImageToClipboard,
  generateFilename,
  getOptimizedExportOptions,
} from "@/lib/export-utils";
import { encodeSnippetToUrl, copyToClipboard } from "@/lib/share-utils";
import { CodeSnippet } from "@/types";

import {
  Download,
  Share2,
  Copy,
  Image,
  FileImage,
  FileText,
  Link,
  Loader2,
  Check,
} from "lucide-react";
import { toast } from "sonner";

interface ExportControlsProps {
  previewRef: React.RefObject<HTMLDivElement | null>;
  title: string | undefined;
  code: string;
  snippet: CodeSnippet;
}

export function ExportControls({
  previewRef,
  title,
  code,
  snippet,
}: ExportControlsProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [exportFormat, setExportFormat] = useState<"png" | "jpg" | "pdf">(
    "png"
  );
  const [exportQuality, setExportQuality] = useState<"low" | "medium" | "high">(
    "high"
  );
  const [customFilename, setCustomFilename] = useState("");
  const [shareLink, setShareLink] = useState("");
  const [isGeneratingLink, setIsGeneratingLink] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  // 导出图片
  const handleExport = async () => {
    if (!previewRef.current) {
      toast.error("预览区域未找到");
      return;
    }

    setIsExporting(true);
    try {
      const options = getOptimizedExportOptions(exportFormat, exportQuality);
      let dataUrl: string;

      switch (exportFormat) {
        case "png":
          dataUrl = await exportToPNG(previewRef.current, options);
          break;
        case "jpg":
          dataUrl = await exportToJPG(previewRef.current, options);
          break;
        case "pdf":
          dataUrl = await exportToPDF(previewRef.current, options);
          break;
        default:
          throw new Error("Unsupported format");
      }

      const filename =
        customFilename ||
        generateFilename(title || "code-snippet", exportFormat);
      downloadFile(dataUrl, filename);

      toast.success(`成功导出为 ${exportFormat.toUpperCase()}`);
    } catch (error) {
      console.error("Export failed:", error);
      toast.error("导出失败，请重试");
    } finally {
      setIsExporting(false);
    }
  };

  // 复制图片到剪贴板
  const handleCopyImage = async () => {
    if (!previewRef.current) {
      toast.error("预览区域未找到");
      return;
    }

    setIsExporting(true);
    try {
      const options = getOptimizedExportOptions("png", exportQuality);
      await copyImageToClipboard(previewRef.current!, options);
      toast.success("图片已复制到剪贴板");
    } catch (error) {
      console.error("Copy failed:", error);
      toast.error("复制失败，请重试");
    } finally {
      setIsExporting(false);
    }
  };

  // 生成分享链接
  const handleGenerateShareLink = async () => {
    setIsGeneratingLink(true);
    try {
      const link = encodeSnippetToUrl(snippet);
      setShareLink(link);
      toast.success("分享链接已生成");
    } catch (error) {
      console.error("Generate link failed:", error);
      toast.error("生成分享链接失败");
    } finally {
      setIsGeneratingLink(false);
    }
  };

  // 复制分享链接
  const handleCopyShareLink = async () => {
    try {
      const success = await copyToClipboard(shareLink);
      if (success) {
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 2000);
        toast.success("链接已复制到剪贴板");
      } else {
        toast.error("复制链接失败");
      }
    } catch {
      toast.error("复制链接失败");
    }
  };

  return (
    <Card className="relative w-full">
      <BorderBeam size={250} duration={8} delay={2} />
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Share2 className="h-5 w-5" />
          导出与分享
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="share" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              value="share"
              className="flex items-center gap-1 text-sm"
            >
              <Link className="h-4 w-4" />
              <span className="hidden sm:inline">分享</span>
              <span className="sm:hidden">分享</span>
            </TabsTrigger>
            <TabsTrigger
              value="export"
              className="flex items-center gap-1 text-sm"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">导出</span>
              <span className="sm:hidden">导出</span>
            </TabsTrigger>
          </TabsList>

          {/* 导出选项 */}
          <TabsContent value="export" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-2">
                <Label className="text-sm">导出格式</Label>
                <Select
                  value={exportFormat}
                  onValueChange={(value: "png" | "jpg" | "pdf") =>
                    setExportFormat(value)
                  }
                >
                  <SelectTrigger className="text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="png">
                      <div className="flex items-center gap-2">
                        <Image className="h-4 w-4" />
                        <span className="hidden sm:inline">PNG (透明背景)</span>
                        <span className="sm:hidden">PNG</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="jpg">
                      <div className="flex items-center gap-2">
                        <FileImage className="h-4 w-4" />
                        <span className="hidden sm:inline">JPG (白色背景)</span>
                        <span className="sm:hidden">JPG</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="pdf">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        PDF
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm">导出质量</Label>
                <Select
                  value={exportQuality}
                  onValueChange={(value: "low" | "medium" | "high") =>
                    setExportQuality(value)
                  }
                >
                  <SelectTrigger className="text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">
                      <div className="flex items-center justify-between w-full">
                        <span>低质量</span>
                        <Badge variant="secondary" className="text-xs">
                          快速
                        </Badge>
                      </div>
                    </SelectItem>
                    <SelectItem value="medium">
                      <div className="flex items-center justify-between w-full">
                        <span>中等质量</span>
                        <Badge variant="secondary" className="text-xs">
                          平衡
                        </Badge>
                      </div>
                    </SelectItem>
                    <SelectItem value="high">
                      <div className="flex items-center justify-between w-full">
                        <span>高质量</span>
                        <Badge variant="secondary" className="text-xs">
                          推荐
                        </Badge>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm">自定义文件名 (可选)</Label>
              <Input
                placeholder={`${title || "code-snippet"}.${exportFormat}`}
                value={customFilename}
                onChange={(e) => setCustomFilename(e.target.value)}
                className="text-sm"
              />
            </div>

            <Separator />

            <div className="flex flex-col gap-2 sm:gap-3">
              <Button
                onClick={handleExport}
                disabled={isExporting}
                className="w-full text-sm"
                size="sm"
              >
                {isExporting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span className="hidden sm:inline">导出中...</span>
                    <span className="sm:hidden">导出中</span>
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">
                      导出为 {exportFormat.toUpperCase()}
                    </span>
                    <span className="sm:hidden">
                      导出 {exportFormat.toUpperCase()}
                    </span>
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                onClick={handleCopyImage}
                disabled={isExporting}
                className="w-full text-sm"
                size="sm"
              >
                {isExporting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span className="hidden sm:inline">处理中...</span>
                    <span className="sm:hidden">处理中</span>
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">复制图片到剪贴板</span>
                    <span className="sm:hidden">复制图片</span>
                  </>
                )}
              </Button>
            </div>
          </TabsContent>

          {/* 分享选项 */}
          <TabsContent value="share" className="space-y-3 sm:space-y-4">
            <div className="space-y-3 sm:space-y-4">
              <div className="text-xs sm:text-sm text-muted-foreground">
                生成一个分享链接，其他人可以通过链接查看你的代码卡片。
              </div>

              <Button
                onClick={handleGenerateShareLink}
                disabled={isGeneratingLink}
                className="w-full text-sm"
                size="sm"
              >
                {isGeneratingLink ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span className="hidden sm:inline">生成中...</span>
                    <span className="sm:hidden">生成中</span>
                  </>
                ) : (
                  <>
                    <Link className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">生成分享链接</span>
                    <span className="sm:hidden">生成链接</span>
                  </>
                )}
              </Button>

              {shareLink && (
                <div className="space-y-2">
                  <Label className="text-sm">分享链接</Label>
                  <div className="flex gap-2">
                    <Input
                      value={shareLink}
                      readOnly
                      className="font-mono text-xs sm:text-sm"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleCopyShareLink}
                      className="flex-shrink-0"
                    >
                      {linkCopied ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    链接已生成，可以分享给其他人查看你的代码卡片。
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
