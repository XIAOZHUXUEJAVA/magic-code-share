"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GridPattern } from "@/components/magicui/grid-pattern";
import { BlurFade } from "@/components/magicui/blur-fade";
import { BorderBeam } from "@/components/magicui/border-beam";
import { AlertCircle, Home, Share2 } from "lucide-react";
import Link from "next/link";

export default function SharePage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden">
      <GridPattern
        width={40}
        height={40}
        className="absolute inset-0 opacity-30"
      />
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <BlurFade delay={0.1}>
          <Card className="w-full max-w-md relative">
            <BorderBeam size={250} duration={8} delay={2} />
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Share2 className="h-6 w-6 text-primary" />
                分享页面
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                <AlertCircle className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div className="space-y-2">
                  <p className="text-sm font-medium">
                    请使用完整的分享链接
                  </p>
                  <p className="text-sm text-muted-foreground">
                    分享链接格式应为：<br />
                    <code className="text-xs bg-background px-2 py-1 rounded mt-1 inline-block">
                      /share/[shortId]
                    </code>
                  </p>
                </div>
              </div>
              
              <div className="pt-2">
                <Button asChild className="w-full">
                  <Link href="/">
                    <Home className="mr-2 h-4 w-4" />
                    返回首页
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </BlurFade>
      </div>
    </div>
  );
}
