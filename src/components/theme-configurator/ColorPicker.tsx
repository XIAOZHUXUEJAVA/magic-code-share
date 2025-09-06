"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Palette } from "lucide-react";

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
}

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

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-4 w-4" />
          背景颜色
        </CardTitle>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
}
