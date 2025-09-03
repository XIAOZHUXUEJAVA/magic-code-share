"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Palette, Paintbrush, Sparkles } from "lucide-react";

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
}

// 预设纯色
const PRESET_COLORS = [
  "#000000",
  "#1a1a1a",
  "#2d2d30",
  "#282a36",
  "#282c34",
  "#272822",
  "#0d1117",
  "#161b22",
  "#1e1e1e",
  "#44475a",
  "#3e4451",
  "#3e3d32",
  "#ffffff",
  "#f8f9fa",
  "#f6f8fa",
  "#fafbfc",
  "#e1e4e8",
  "#d0d7de",
  "#ff6b6b",
  "#ee5a24",
  "#ff9ff3",
  "#f368e0",
  "#ff3838",
  "#ff6348",
  "#4ecdc4",
  "#0abde3",
  "#00d2d3",
  "#54a0ff",
  "#5f27cd",
  "#00d8ff",
  "#feca57",
  "#ff9f43",
  "#48dbfb",
  "#26de81",
  "#a55eea",
  "#fd79a8",
];

// 预设渐变
const PRESET_GRADIENTS = [
  {
    name: "夜空",
    value: "linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%)",
  },
  {
    name: "深海",
    value: "linear-gradient(135deg, #0f3460 0%, #0e4b99 100%)",
  },
  {
    name: "紫罗兰",
    value: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    name: "日落",
    value: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  },
  {
    name: "海洋",
    value: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  },
  {
    name: "森林",
    value: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  },
  {
    name: "火焰",
    value: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  },
  {
    name: "极光",
    value: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
  },
  {
    name: "暗夜",
    value: "linear-gradient(135deg, #232526 0%, #414345 100%)",
  },
  {
    name: "星空",
    value: "linear-gradient(135deg, #000428 0%, #004e92 100%)",
  },
];

export function ColorPicker({ value, onChange }: ColorPickerProps) {
  const [gradientColor1, setGradientColor1] = useState("#667eea");
  const [gradientColor2, setGradientColor2] = useState("#764ba2");
  const [gradientDirection, setGradientDirection] = useState(135);
  const [customValue, setCustomValue] = useState(value);

  // 生成渐变
  const generateGradient = (
    color1: string,
    color2: string,
    direction: number
  ) => {
    return `linear-gradient(${direction}deg, ${color1} 0%, ${color2} 100%)`;
  };

  // 应用自定义渐变
  const applyCustomGradient = () => {
    const gradient = generateGradient(
      gradientColor1,
      gradientColor2,
      gradientDirection
    );
    onChange(gradient);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-4 w-4" />
          背景颜色
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="presets" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="presets" className="flex items-center gap-1">
              <Palette className="h-3 w-3" />
              预设
            </TabsTrigger>
            <TabsTrigger value="gradient" className="flex items-center gap-1">
              <Paintbrush className="h-3 w-3" />
              渐变
            </TabsTrigger>
            <TabsTrigger value="custom" className="flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              自定义
            </TabsTrigger>
          </TabsList>

          {/* 预设颜色 */}
          <TabsContent value="presets" className="space-y-4">
            <div className="space-y-3">
              <Label>纯色背景</Label>
              <div className="grid grid-cols-6 gap-2">
                {PRESET_COLORS.map((color) => (
                  <button
                    key={color}
                    className="w-8 h-8 rounded border-2 border-gray-200 hover:border-gray-400 transition-colors"
                    style={{ backgroundColor: color }}
                    onClick={() => onChange(color)}
                    title={color}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Label>渐变背景</Label>
              <div className="grid grid-cols-2 gap-2">
                {PRESET_GRADIENTS.map((gradient) => (
                  <Button
                    key={gradient.name}
                    variant="outline"
                    className="h-12 p-2 flex flex-col items-center justify-center relative overflow-hidden"
                    onClick={() => onChange(gradient.value)}
                  >
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{ background: gradient.value }}
                    />
                    <span className="text-xs font-medium relative z-10">
                      {gradient.name}
                    </span>
                  </Button>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* 渐变生成器 */}
          <TabsContent value="gradient" className="space-y-4">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>起始颜色</Label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={gradientColor1}
                      onChange={(e) => setGradientColor1(e.target.value)}
                      className="w-12 h-10 rounded border cursor-pointer"
                    />
                    <Input
                      value={gradientColor1}
                      onChange={(e) => setGradientColor1(e.target.value)}
                      placeholder="#667eea"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>结束颜色</Label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={gradientColor2}
                      onChange={(e) => setGradientColor2(e.target.value)}
                      className="w-12 h-10 rounded border cursor-pointer"
                    />
                    <Input
                      value={gradientColor2}
                      onChange={(e) => setGradientColor2(e.target.value)}
                      placeholder="#764ba2"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>渐变方向: {gradientDirection}°</Label>
                <Slider
                  value={[gradientDirection]}
                  onValueChange={([value]) => setGradientDirection(value)}
                  max={360}
                  min={0}
                  step={15}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label>预览</Label>
                <div
                  className="w-full h-16 rounded border"
                  style={{
                    background: generateGradient(
                      gradientColor1,
                      gradientColor2,
                      gradientDirection
                    ),
                  }}
                />
              </div>

              <Button onClick={applyCustomGradient} className="w-full">
                应用渐变
              </Button>
            </div>
          </TabsContent>

          {/* 自定义CSS */}
          <TabsContent value="custom" className="space-y-4">
            <div className="space-y-3">
              <Label>CSS 背景值</Label>
              <Input
                placeholder="输入 CSS 背景值..."
                value={customValue}
                onChange={(e) => setCustomValue(e.target.value)}
              />
              <div className="text-xs text-muted-foreground">
                支持所有CSS背景属性，如：
                <br />
                • 纯色：#ff0000 或 rgb(255,0,0)
                <br />
                • 渐变：linear-gradient(45deg, #ff0000, #0000ff)
                <br />• 图片：url(image.jpg)
              </div>
            </div>

            <div className="space-y-2">
              <Label>预览</Label>
              <div
                className="w-full h-16 rounded border"
                style={{ background: customValue }}
              />
            </div>

            <Button onClick={() => onChange(customValue)} className="w-full">
              应用自定义背景
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
