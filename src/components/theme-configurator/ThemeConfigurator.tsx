"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { CodeTheme, CodeSettings, PRESET_THEMES } from "@/types";
import { ColorPicker } from "./ColorPicker";
import { useResetDialog } from "@/components/ui/reset-dialog";
import { Palette, Monitor, Settings, Type } from "lucide-react";
import { toast } from "sonner";

interface ThemeConfiguratorProps {
  theme: CodeTheme;
  settings: CodeSettings;
  onThemeChange: (theme: CodeTheme) => void;
  onSettingsChange: (settings: CodeSettings) => void;
}

export function ThemeConfigurator({
  theme,
  settings,
  onThemeChange,
  onSettingsChange,
}: ThemeConfiguratorProps) {
  const [customBackground, setCustomBackground] = useState(theme.background);
  const { showDialog, DialogComponent } = useResetDialog();

  // 应用预设主题
  const applyPresetTheme = (presetTheme: CodeTheme) => {
    onThemeChange(presetTheme);
    setCustomBackground(presetTheme.background);
  };

  // 更新主题属性
  const updateTheme = (updates: Partial<CodeTheme>) => {
    onThemeChange({ ...theme, ...updates });
  };

  // 更新设置属性
  const updateSettings = (updates: Partial<CodeSettings>) => {
    onSettingsChange({ ...settings, ...updates });
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            主题配置
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="themes" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="themes" className="flex items-center gap-1">
                <Palette className="h-4 w-4" />
                主题
              </TabsTrigger>
              <TabsTrigger value="window" className="flex items-center gap-1">
                <Monitor className="h-4 w-4" />
                窗口
              </TabsTrigger>
              <TabsTrigger
                value="typography"
                className="flex items-center gap-1"
              >
                <Type className="h-4 w-4" />
                字体
              </TabsTrigger>
              <TabsTrigger value="layout" className="flex items-center gap-1">
                <Settings className="h-4 w-4" />
                布局
              </TabsTrigger>
            </TabsList>

            {/* 主题选择 */}
            <TabsContent value="themes" className="space-y-4">
              <div className="space-y-3">
                <Label>预设主题</Label>
                <div className="grid grid-cols-2 gap-3">
                  {PRESET_THEMES.map((presetTheme) => (
                    <Button
                      key={presetTheme.name}
                      variant={
                        theme.name === presetTheme.name ? "default" : "outline"
                      }
                      className="h-auto p-3 flex flex-col items-start"
                      onClick={() => applyPresetTheme(presetTheme)}
                    >
                      <div
                        className="w-full h-8 rounded mb-2"
                        style={{ background: presetTheme.background }}
                      />
                      <span className="text-sm font-medium">
                        {presetTheme.name}
                      </span>
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <ColorPicker
                  value={theme.background}
                  onChange={(background) => {
                    updateTheme({ background });
                    setCustomBackground(background);
                  }}
                />
              </div>

              <div className="space-y-3">
                <Label>语法高亮主题</Label>
                <Select
                  value={theme.syntaxTheme}
                  onValueChange={(value) => updateTheme({ syntaxTheme: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vs-dark">VS Code Dark</SelectItem>
                    <SelectItem value="vs-light">VS Code Light</SelectItem>
                    <SelectItem value="github-dark">GitHub Dark</SelectItem>
                    <SelectItem value="github-light">GitHub Light</SelectItem>
                    <SelectItem value="dracula">Dracula</SelectItem>
                    <SelectItem value="one-dark">One Dark</SelectItem>
                    <SelectItem value="monokai">Monokai</SelectItem>
                    <SelectItem value="atom-dark">Atom Dark</SelectItem>
                    <SelectItem value="tomorrow">Tomorrow</SelectItem>
                    {/* <SelectItem value="terminal">Terminal</SelectItem> */}
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>

            {/* 窗口样式 */}
            <TabsContent value="window" className="space-y-4">
              <div className="space-y-3">
                <Label>窗口样式</Label>
                <Select
                  value={theme.windowStyle}
                  onValueChange={(
                    value:
                      | "macos"
                      | "windows"
                      | "terminal"
                      | "safari"
                      | "iphone"
                  ) => updateTheme({ windowStyle: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="macos">macOS</SelectItem>
                    <SelectItem value="windows">Windows</SelectItem>
                    <SelectItem value="terminal">Terminal</SelectItem>
                    <SelectItem value="safari">Safari</SelectItem>
                    <SelectItem value="iphone">iPhone</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>圆角大小: {settings.borderRadius}px</Label>
                <Slider
                  value={[settings.borderRadius]}
                  onValueChange={([value]) =>
                    updateSettings({ borderRadius: value })
                  }
                  max={24}
                  min={0}
                  step={2}
                  className="w-full"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-header">显示头部</Label>
                  <Switch
                    id="show-header"
                    checked={settings.showHeader}
                    onCheckedChange={(checked) =>
                      updateSettings({ showHeader: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="show-footer">显示底部</Label>
                  <Switch
                    id="show-footer"
                    checked={settings.showFooter}
                    onCheckedChange={(checked) =>
                      updateSettings({ showFooter: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="watermark">显示水印</Label>
                  <Switch
                    id="watermark"
                    checked={settings.watermark}
                    onCheckedChange={(checked) =>
                      updateSettings({ watermark: checked })
                    }
                  />
                </div>
              </div>
            </TabsContent>

            {/* 字体设置 */}
            <TabsContent value="typography" className="space-y-4">
              <div className="space-y-3">
                <Label>字体大小: {settings.fontSize}px</Label>
                <Slider
                  value={[settings.fontSize]}
                  onValueChange={([value]) =>
                    updateSettings({ fontSize: value })
                  }
                  max={24}
                  min={10}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="space-y-3">
                <Label>字体族</Label>
                <Select
                  value={settings.fontFamily}
                  onValueChange={(value) =>
                    updateSettings({ fontFamily: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Fira Code, Monaco, Consolas, monospace">
                      Fira Code
                    </SelectItem>
                    <SelectItem value="Monaco, Consolas, monospace">
                      Monaco
                    </SelectItem>
                    <SelectItem value="Consolas, monospace">
                      Consolas
                    </SelectItem>
                    <SelectItem value="'Courier New', monospace">
                      Courier New
                    </SelectItem>
                    <SelectItem value="'SF Mono', Monaco, monospace">
                      SF Mono
                    </SelectItem>
                    <SelectItem value="'JetBrains Mono', monospace">
                      JetBrains Mono
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="line-numbers">显示行号</Label>
                <Switch
                  id="line-numbers"
                  checked={settings.lineNumbers}
                  onCheckedChange={(checked) =>
                    updateSettings({ lineNumbers: checked })
                  }
                />
              </div>
            </TabsContent>

            {/* 布局设置 */}
            <TabsContent value="layout" className="space-y-4">
              <div className="space-y-3">
                <Label>内边距: {settings.padding}px</Label>
                <Slider
                  value={[settings.padding]}
                  onValueChange={([value]) =>
                    updateSettings({ padding: value })
                  }
                  max={64}
                  min={16}
                  step={4}
                  className="w-full"
                />
              </div>

              {/* 重置按钮 */}
              <div className="pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => {
                    showDialog({
                      title: "重置主题和设置",
                      description:
                        "确定要重置主题和设置到默认状态吗？这将清除当前的自定义配置。",
                      onConfirm: () => {
                        const defaultTheme = PRESET_THEMES[0];
                        applyPresetTheme(defaultTheme);
                        updateSettings({
                          fontSize: 14,
                          fontFamily: "Fira Code, Monaco, Consolas, monospace",
                          lineNumbers: true,
                          padding: 32,
                          borderRadius: 12,
                          showHeader: true,
                          showFooter: false,
                          watermark: true,
                        });
                        toast.success("已重置主题和设置到默认状态");
                      },
                    });
                  }}
                  className="w-full"
                >
                  重置为默认设置
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      {DialogComponent}
    </>
  );
}
