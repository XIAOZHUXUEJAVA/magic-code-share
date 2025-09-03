"use client";

import { useState, useCallback, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SUPPORTED_LANGUAGES } from "@/types";
import { detectLanguage } from "@/lib/language-detector";
import { Wand2, Upload, FileText } from "lucide-react";

interface CodeEditorProps {
  code: string;
  language: string;
  title: string;
  author: string;
  onCodeChange: (code: string) => void;
  onLanguageChange: (language: string) => void;
  onTitleChange: (title: string) => void;
  onAuthorChange: (author: string) => void;
}

export function CodeEditor({
  code,
  language,
  title,
  author,
  onCodeChange,
  onLanguageChange,
  onTitleChange,
  onAuthorChange,
}: CodeEditorProps) {
  const [isDragging, setIsDragging] = useState(false);

  // 自动检测语言
  const handleCodeChange = useCallback(
    (newCode: string) => {
      onCodeChange(newCode);

      // 如果当前语言是自动检测或者代码发生了显著变化，尝试重新检测
      if (language === "auto" || newCode.length > 50) {
        const detectedLang = detectLanguage(newCode);
        if (detectedLang && detectedLang !== language) {
          onLanguageChange(detectedLang);
        }
      }
    },
    [code, language, onCodeChange, onLanguageChange]
  );

  // 处理文件拖拽
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);
      const file = files[0];

      if (file && file.type.startsWith("text/")) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const content = event.target?.result as string;
          handleCodeChange(content);

          // 从文件扩展名检测语言
          const extension = file.name.split(".").pop()?.toLowerCase();
          const detectedLang = SUPPORTED_LANGUAGES.find(
            (lang) => lang.extension === extension
          )?.value;

          if (detectedLang) {
            onLanguageChange(detectedLang);
          }
        };
        reader.readAsText(file);
      }
    },
    [handleCodeChange, onLanguageChange]
  );

  // 处理文件上传
  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const content = event.target?.result as string;
          handleCodeChange(content);

          const extension = file.name.split(".").pop()?.toLowerCase();
          const detectedLang = SUPPORTED_LANGUAGES.find(
            (lang) => lang.extension === extension
          )?.value;

          if (detectedLang) {
            onLanguageChange(detectedLang);
          }
        };
        reader.readAsText(file);
      }
    },
    [handleCodeChange, onLanguageChange]
  );

  // 生成示例代码
  const generateSampleCode = useCallback(() => {
    const samples = {
      javascript: `// JavaScript 示例
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10)); // 55`,

      typescript: `// TypeScript 示例
interface User {
  id: number;
  name: string;
  email: string;
}

const createUser = (userData: Omit<User, 'id'>): User => {
  return {
    id: Math.random(),
    ...userData
  };
};`,

      python: `# Python 示例
def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    
    return quick_sort(left) + middle + quick_sort(right)

print(quick_sort([3, 6, 8, 10, 1, 2, 1]))`,

      default: `// 欢迎使用代码分享工具
// 在这里粘贴你的代码，或者拖拽文件到编辑器中

function hello() {
  console.log("Hello, World!");
}

hello();`,
    };

    const sampleCode =
      samples[language as keyof typeof samples] || samples.default;
    handleCodeChange(sampleCode);
  }, [language, handleCodeChange]);

  return (
    <div className="space-y-4">
      {/* 标题和作者信息 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">标题 (可选)</Label>
          <Input
            id="title"
            placeholder="给你的代码起个标题..."
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="author">作者 (可选)</Label>
          <Input
            id="author"
            placeholder="你的名字..."
            value={author}
            onChange={(e) => onAuthorChange(e.target.value)}
          />
        </div>
      </div>

      {/* 语言选择和工具栏 */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Label htmlFor="language">语言:</Label>
          <Select value={language} onValueChange={onLanguageChange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="auto">自动检测</SelectItem>
              {SUPPORTED_LANGUAGES.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={generateSampleCode}
            className="flex items-center gap-2"
          >
            <Wand2 className="h-4 w-4" />
            示例代码
          </Button>

          <label htmlFor="file-upload">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              asChild
            >
              <span>
                <Upload className="h-4 w-4" />
                上传文件
              </span>
            </Button>
          </label>
          <input
            id="file-upload"
            type="file"
            accept=".js,.ts,.py,.java,.cpp,.c,.cs,.php,.rb,.go,.rs,.swift,.kt,.html,.css,.scss,.json,.yml,.yaml,.md,.sql,.sh"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
      </div>

      {/* 代码编辑器 */}
      <div
        className={`relative ${
          isDragging ? "ring-2 ring-blue-500 ring-opacity-50" : ""
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Textarea
          placeholder="在这里粘贴你的代码，或者拖拽文件到这里..."
          value={code}
          onChange={(e) => handleCodeChange(e.target.value)}
          className="min-h-[400px] font-mono text-sm resize-none"
          style={{ fontFamily: "Fira Code, Monaco, Consolas, monospace" }}
        />

        {isDragging && (
          <div className="absolute inset-0 bg-blue-50 bg-opacity-90 flex items-center justify-center border-2 border-dashed border-blue-300 rounded-md">
            <div className="text-center">
              <FileText className="h-12 w-12 text-blue-500 mx-auto mb-2" />
              <p className="text-blue-700 font-medium">拖拽文件到这里</p>
            </div>
          </div>
        )}
      </div>

      {/* 代码统计信息 */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <span>字符数: {code.length}</span>
        <span>行数: {code.split("\n").length}</span>
        {language !== "auto" && (
          <span>
            语言: {SUPPORTED_LANGUAGES.find((l) => l.value === language)?.label}
          </span>
        )}
      </div>
    </div>
  );
}
