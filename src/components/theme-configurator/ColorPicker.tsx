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
import { Palette, Paintbrush } from "lucide-react";

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
}

// 预设纯色 - 按类别组织
const PRESET_COLORS = {
  dark: [
    "#000000",
    "#0d1117",
    "#161b22",
    "#1a1a1a",
    "#1e1e1e",
    "#2d2d30",
    "#272822",
    "#282a36",
    "#282c34",
    "#44475a",
    "#3e4451",
    "#3e3d32",
  ],
  light: [
    "#ffffff",
    "#fafbfc",
    "#f8f9fa",
    "#f6f8fa",
    "#e1e4e8",
    "#d0d7de",
    "#f5f5f5",
    "#eeeeee",
    "#e0e0e0",
    "#bdbdbd",
    "#9e9e9e",
    "#757575",
  ],
  vibrant: [
    "#ff6b6b",
    "#ee5a24",
    "#ff3838",
    "#ff6348",
    "#ff9ff3",
    "#f368e0",
    "#fd79a8",
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
  ],
};

// 预设渐变 - 增加更多选项
const PRESET_GRADIENTS = [
  {
    name: "夜空",
    value: "linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%)",
    category: "dark",
  },
  {
    name: "深海",
    value: "linear-gradient(135deg, #0f3460 0%, #0e4b99 100%)",
    category: "dark",
  },
  {
    name: "暗夜",
    value: "linear-gradient(135deg, #232526 0%, #414345 100%)",
    category: "dark",
  },
  {
    name: "星空",
    value: "linear-gradient(135deg, #000428 0%, #004e92 100%)",
    category: "dark",
  },
  {
    name: "黑洞",
    value: "radial-gradient(circle, #1a1a1a 0%, #000000 100%)",
    category: "dark",
  },
  {
    name: "暗紫",
    value: "linear-gradient(135deg, #2d1b69 0%, #11998e 100%)",
    category: "dark",
  },
  {
    name: "紫罗兰",
    value: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    category: "colorful",
  },
  {
    name: "日落",
    value: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    category: "colorful",
  },
  {
    name: "海洋",
    value: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    category: "colorful",
  },
  {
    name: "森林",
    value: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    category: "colorful",
  },
  {
    name: "火焰",
    value: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    category: "colorful",
  },
  {
    name: "极光",
    value: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    category: "colorful",
  },
  {
    name: "彩虹",
    value:
      "linear-gradient(135deg, #ff0000 0%, #ff7f00 16.66%, #ffff00 33.33%, #00ff00 50%, #0000ff 66.66%, #4b0082 83.33%, #9400d3 100%)",
    category: "colorful",
  },
  {
    name: "霓虹",
    value: "linear-gradient(135deg, #ff006e 0%, #8338ec 50%, #3a86ff 100%)",
    category: "colorful",
  },
  {
    name: "晨曦",
    value: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
    category: "light",
  },
  {
    name: "云朵",
    value: "linear-gradient(135deg, #ffffff 0%, #e3e3e3 100%)",
    category: "light",
  },
  {
    name: "薄雾",
    value: "linear-gradient(135deg, #f7f7f7 0%, #d3d3d3 100%)",
    category: "light",
  },
  {
    name: "珍珠",
    value: "radial-gradient(circle, #ffffff 0%, #f0f0f0 100%)",
    category: "light",
  },
];

export function ColorPicker({ value, onChange }: ColorPickerProps) {
  const [gradientColor1, setGradientColor1] = useState("#667eea");
  const [gradientColor2, setGradientColor2] = useState("#764ba2");
  const [gradientDirection, setGradientDirection] = useState(135);

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
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="presets" className="flex items-center gap-1">
              <Palette className="h-3 w-3" />
              预设颜色
            </TabsTrigger>
            <TabsTrigger value="gradient" className="flex items-center gap-1">
              <Paintbrush className="h-3 w-3" />
              自定义渐变
            </TabsTrigger>
          </TabsList>

          {/* 预设颜色 */}
          <TabsContent value="presets" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-3">
                <Label>深色主题</Label>
                <div className="grid grid-cols-6 gap-2">
                  {PRESET_COLORS.dark.map((color) => (
                    <button
                      key={color}
                      className={`w-10 h-10 rounded-lg border-2 transition-all hover:scale-105 ${
                        value === color
                          ? "border-blue-500 ring-2 ring-blue-200"
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => onChange(color)}
                      title={color}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label>浅色主题</Label>
                <div className="grid grid-cols-6 gap-2">
                  {PRESET_COLORS.light.map((color) => (
                    <button
                      key={color}
                      className={`w-10 h-10 rounded-lg border-2 transition-all hover:scale-105 ${
                        value === color
                          ? "border-blue-500 ring-2 ring-blue-200"
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => onChange(color)}
                      title={color}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label>彩色主题</Label>
                <div className="grid grid-cols-6 gap-2">
                  {PRESET_COLORS.vibrant.map((color) => (
                    <button
                      key={color}
                      className={`w-10 h-10 rounded-lg border-2 transition-all hover:scale-105 ${
                        value === color
                          ? "border-blue-500 ring-2 ring-blue-200"
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => onChange(color)}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-3">
                <Label>深色渐变</Label>
                <div className="grid grid-cols-2 gap-2">
                  {PRESET_GRADIENTS.filter((g) => g.category === "dark").map(
                    (gradient) => (
                      <Button
                        key={gradient.name}
                        variant={
                          value === gradient.value ? "default" : "outline"
                        }
                        className="h-14 p-2 flex flex-col items-center justify-center relative overflow-hidden"
                        onClick={() => onChange(gradient.value)}
                      >
                        <div
                          className="absolute inset-0 opacity-30"
                          style={{ background: gradient.value }}
                        />
                        <span className="text-xs font-medium relative z-10">
                          {gradient.name}
                        </span>
                      </Button>
                    )
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <Label>彩色渐变</Label>
                <div className="grid grid-cols-2 gap-2">
                  {PRESET_GRADIENTS.filter(
                    (g) => g.category === "colorful"
                  ).map((gradient) => (
                    <Button
                      key={gradient.name}
                      variant={value === gradient.value ? "default" : "outline"}
                      className="h-14 p-2 flex flex-col items-center justify-center relative overflow-hidden"
                      onClick={() => onChange(gradient.value)}
                    >
                      <div
                        className="absolute inset-0 opacity-30"
                        style={{ background: gradient.value }}
                      />
                      <span className="text-xs font-medium relative z-10">
                        {gradient.name}
                      </span>
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label>浅色渐变</Label>
                <div className="grid grid-cols-2 gap-2">
                  {PRESET_GRADIENTS.filter((g) => g.category === "light").map(
                    (gradient) => (
                      <Button
                        key={gradient.name}
                        variant={
                          value === gradient.value ? "default" : "outline"
                        }
                        className="h-14 p-2 flex flex-col items-center justify-center relative overflow-hidden"
                        onClick={() => onChange(gradient.value)}
                      >
                        <div
                          className="absolute inset-0 opacity-30"
                          style={{ background: gradient.value }}
                        />
                        <span className="text-xs font-medium relative z-10 text-gray-800">
                          {gradient.name}
                        </span>
                      </Button>
                    )
                  )}
                </div>
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
                      onChange={(e) => {
                        setGradientColor1(e.target.value);
                        // 实时更新预览
                        const gradient = generateGradient(
                          e.target.value,
                          gradientColor2,
                          gradientDirection
                        );
                        onChange(gradient);
                      }}
                      className="w-12 h-10 rounded-lg border cursor-pointer"
                    />
                    <Input
                      value={gradientColor1}
                      onChange={(e) => {
                        setGradientColor1(e.target.value);
                        // 实时更新预览
                        const gradient = generateGradient(
                          e.target.value,
                          gradientColor2,
                          gradientDirection
                        );
                        onChange(gradient);
                      }}
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
                      onChange={(e) => {
                        setGradientColor2(e.target.value);
                        // 实时更新预览
                        const gradient = generateGradient(
                          gradientColor1,
                          e.target.value,
                          gradientDirection
                        );
                        onChange(gradient);
                      }}
                      className="w-12 h-10 rounded-lg border cursor-pointer"
                    />
                    <Input
                      value={gradientColor2}
                      onChange={(e) => {
                        setGradientColor2(e.target.value);
                        // 实时更新预览
                        const gradient = generateGradient(
                          gradientColor1,
                          e.target.value,
                          gradientDirection
                        );
                        onChange(gradient);
                      }}
                      placeholder="#764ba2"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>渐变方向: {gradientDirection}°</Label>
                <Slider
                  value={[gradientDirection]}
                  onValueChange={([value]) => {
                    setGradientDirection(value);
                    // 实时更新预览
                    const gradient = generateGradient(
                      gradientColor1,
                      gradientColor2,
                      value
                    );
                    onChange(gradient);
                  }}
                  max={360}
                  min={0}
                  step={15}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0° (右)</span>
                  <span>90° (上)</span>
                  <span>180° (左)</span>
                  <span>270° (下)</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>实时预览</Label>
                <div
                  className="w-full h-20 rounded-lg border-2 border-dashed border-gray-300"
                  style={{
                    background: generateGradient(
                      gradientColor1,
                      gradientColor2,
                      gradientDirection
                    ),
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label>快速方向选择</Label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { name: "→", value: 0 },
                    { name: "↗", value: 45 },
                    { name: "↑", value: 90 },
                    { name: "↖", value: 135 },
                    { name: "←", value: 180 },
                    { name: "↙", value: 225 },
                    { name: "↓", value: 270 },
                    { name: "↘", value: 315 },
                  ].map((direction) => (
                    <Button
                      key={direction.value}
                      variant={
                        gradientDirection === direction.value
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      onClick={() => {
                        setGradientDirection(direction.value);
                        const gradient = generateGradient(
                          gradientColor1,
                          gradientColor2,
                          direction.value
                        );
                        onChange(gradient);
                      }}
                    >
                      {direction.name}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
