"use client";

import { useState, useCallback } from "react";
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

      // 只在语言设置为"自动检测"时才进行检测
      if (language === "auto" && newCode.trim().length > 0) {
        const detectedLang = detectLanguage(newCode);
        if (detectedLang) {
          onLanguageChange(detectedLang);
        }
      }
    },
    [language, onCodeChange, onLanguageChange]
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

      java: `// Java 示例
import java.util.ArrayList;
import java.util.List;

public class HelloWorld {
    public static void main(String[] args) {
        List<String> items = new ArrayList<>();
        items.add("Hello");
        items.add("World");
        
        for (String item : items) {
            System.out.println(item);
        }
    }
}`,

      cpp: `// C++ 示例
#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> numbers = {1, 2, 3, 4, 5};
    
    for (int num : numbers) {
        cout << num << " ";
    }
    cout << endl;
    
    return 0;
}`,

      c: `// C 示例
#include <stdio.h>

int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

int main() {
    int num = 5;
    printf("Factorial of %d is %d\\n", num, factorial(num));
    return 0;
}`,

      csharp: `// C# 示例
using System;
using System.Collections.Generic;

class Program {
    static void Main() {
        List<string> fruits = new List<string> 
        { "Apple", "Banana", "Orange" };
        
        foreach (var fruit in fruits) {
            Console.WriteLine(fruit);
        }
    }
}`,

      php: `<?php
// PHP 示例
function greet($name) {
    return "Hello, " . $name . "!";
}

$names = ["Alice", "Bob", "Charlie"];

foreach ($names as $name) {
    echo greet($name) . "\\n";
}
?>`,

      ruby: `# Ruby 示例
def fibonacci(n)
  return n if n <= 1
  fibonacci(n - 1) + fibonacci(n - 2)
end

(0..10).each do |i|
  puts "fibonacci(#{i}) = #{fibonacci(i)}"
end`,

      go: `// Go 示例
package main

import "fmt"

func main() {
    numbers := []int{1, 2, 3, 4, 5}
    
    for _, num := range numbers {
        fmt.Printf("%d ", num)
    }
    fmt.Println()
}`,

      rust: `// Rust 示例
fn main() {
    let numbers = vec![1, 2, 3, 4, 5];
    
    for num in &numbers {
        print!("{} ", num);
    }
    println!();
    
    let sum: i32 = numbers.iter().sum();
    println!("Sum: {}", sum);
}`,

      swift: `// Swift 示例
import Foundation

func greet(name: String) -> String {
    return "Hello, \\(name)!"
}

let names = ["Alice", "Bob", "Charlie"]

for name in names {
    print(greet(name: name))
}`,

      kotlin: `// Kotlin 示例
fun main() {
    val numbers = listOf(1, 2, 3, 4, 5)
    
    numbers.forEach { num ->
        print("$num ")
    }
    println()
    
    val sum = numbers.sum()
    println("Sum: $sum")
}`,

      html: `<!-- HTML 示例 -->
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>示例页面</title>
</head>
<body>
    <h1>欢迎使用代码分享工具</h1>
    <p>这是一个 HTML 示例页面。</p>
</body>
</html>`,

      css: `/* CSS 示例 */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.button {
  background-color: #3b82f6;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

.button:hover {
  background-color: #2563eb;
}`,

      scss: `// SCSS 示例
$primary-color: #3b82f6;
$spacing: 20px;

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: $spacing;
  
  .button {
    background-color: $primary-color;
    color: white;
    padding: $spacing / 2 $spacing;
    border-radius: 8px;
    
    &:hover {
      background-color: darken($primary-color, 10%);
    }
  }
}`,

      json: `{
  "name": "example-project",
  "version": "1.0.0",
  "description": "一个示例项目",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.0",
    "lodash": "^4.17.21"
  }
}`,

      yaml: `# YAML 示例
name: example-project
version: 1.0.0
description: 一个示例项目

dependencies:
  - express: ^4.18.0
  - lodash: ^4.17.21

scripts:
  start: node index.js
  test: jest`,

      markdown: `# Markdown 示例

## 标题

这是一个 **Markdown** 示例文档。

### 列表

- 项目 1
- 项目 2
- 项目 3

### 代码块

\`\`\`javascript
console.log("Hello, World!");
\`\`\`

### 链接

[访问 GitHub](https://github.com)`,

      sql: `-- SQL 示例
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (name, email) VALUES 
    ('Alice', 'alice@example.com'),
    ('Bob', 'bob@example.com');

SELECT * FROM users WHERE name LIKE 'A%';`,

      bash: `#!/bin/bash
# Bash 示例

echo "欢迎使用 Bash 脚本"

# 遍历文件
for file in *.txt; do
    echo "处理文件: $file"
done

# 函数定义
greet() {
    echo "Hello, $1!"
}

greet "World"`,

      auto: `// 欢迎使用代码分享工具
// 在这里粘贴你的代码，或者拖拽文件到编辑器中

function hello() {
  console.log("Hello, World!");
}

hello();`,

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
    <div className="space-y-3 sm:space-y-4">
      {/* 标题和作者信息 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-sm">
            标题 (可选)
          </Label>
          <Input
            id="title"
            placeholder="给你的代码起个标题..."
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            className="text-sm"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="author" className="text-sm">
            作者 (可选)
          </Label>
          <Input
            id="author"
            placeholder="你的名字..."
            value={author}
            onChange={(e) => onAuthorChange(e.target.value)}
            className="text-sm"
          />
        </div>
      </div>

      {/* 语言选择和工具栏 */}
      <div className="space-y-3 sm:space-y-0 sm:flex sm:flex-wrap sm:items-center sm:gap-4">
        <div className="flex items-center gap-2">
          <Label htmlFor="language" className="text-sm whitespace-nowrap">
            语言:
          </Label>
          <Select value={language} onValueChange={onLanguageChange}>
            <SelectTrigger className="w-32 sm:w-40 text-sm">
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

        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            onClick={generateSampleCode}
            className="flex items-center gap-2 text-sm"
          >
            <Wand2 className="h-4 w-4" />
            <span className="hidden sm:inline">示例代码</span>
            <span className="sm:hidden">示例</span>
          </Button>

          <label htmlFor="file-upload">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 text-sm"
              asChild
            >
              <span>
                <Upload className="h-4 w-4" />
                <span className="hidden sm:inline">上传文件</span>
                <span className="sm:hidden">上传</span>
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
          className="min-h-[300px] sm:min-h-[400px] text-xs sm:text-sm resize-none"
          style={{
            fontFamily:
              "var(--font-fira-code), var(--font-jetbrains-mono), Consolas, 'Fira Code', 'JetBrains Mono', Monaco, 'Courier New', monospace",
          }}
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
