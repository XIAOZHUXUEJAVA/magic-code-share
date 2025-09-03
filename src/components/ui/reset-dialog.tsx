"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BorderBeam } from "@/components/magicui/border-beam";
import { BlurFade } from "@/components/magicui/blur-fade";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { RotateCcw, AlertTriangle, X } from "lucide-react";

interface ResetDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
}

export function ResetDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "确认重置",
  cancelText = "取消",
}: ResetDialogProps) {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 背景遮罩 */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* 对话框 */}
      <BlurFade delay={0.1}>
        <Card className="relative w-full max-w-md mx-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/95">
          <BorderBeam size={250} duration={8} delay={2} />

          <CardHeader className="text-center pb-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="mx-auto w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mb-4">
                  <AlertTriangle className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <CardTitle className="text-lg">
                  <AnimatedGradientText>{title}</AnimatedGradientText>
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
              <p className="text-sm text-muted-foreground text-center leading-relaxed">
                {description}
              </p>
            </BlurFade>

            <BlurFade delay={0.3}>
              <div className="flex gap-3">
                <Button variant="outline" onClick={onClose} className="flex-1">
                  {cancelText}
                </Button>

                <Button
                  variant="destructive"
                  onClick={handleConfirm}
                  className="flex-1"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  {confirmText}
                </Button>
              </div>
            </BlurFade>
          </CardContent>
        </Card>
      </BlurFade>
    </div>
  );
}

// Hook for using the reset dialog
export function useResetDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<{
    title: string;
    description: string;
    onConfirm: () => void;
    confirmText?: string;
    cancelText?: string;
  } | null>(null);

  const showDialog = (dialogConfig: {
    title: string;
    description: string;
    onConfirm: () => void;
    confirmText?: string;
    cancelText?: string;
  }) => {
    setConfig(dialogConfig);
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
    setConfig(null);
  };

  const DialogComponent = config ? (
    <ResetDialog
      isOpen={isOpen}
      onClose={closeDialog}
      onConfirm={config.onConfirm}
      title={config.title}
      description={config.description}
      confirmText={config.confirmText}
      cancelText={config.cancelText}
    />
  ) : null;

  return {
    showDialog,
    closeDialog,
    DialogComponent,
  };
}
