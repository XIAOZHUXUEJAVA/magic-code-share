# Magic Code Share

一个美观的代码分享工具，支持多种主题和导出格式。

## 功能特性

### 代码编辑

- 支持 20+ 种编程语言
- 自动语言检测
- 可自定义标题和作者信息

### 主题配置

- 28 种预设主题（GitHub、VS Code、Dracula、One Dark 等）
- 2 种窗口样式（macOS、Windows）
- 自定义渐变背景
- 字体、布局、圆角等样式配置

### 导出功能

- 支持 PNG、JPG、PDF 格式导出
- 三种质量选项（低、中、高）
- 一键复制到剪贴板
- 自定义文件名

### 分享功能

- 基于 URL 参数的分享链接
- 一键复制分享链接

## 快速开始

### 环境要求

- Node.js 18+

### 安装和运行

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
npm start
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 技术栈

- **框架**: Next.js 15
- **UI**: React 19 + TypeScript
- **样式**: Tailwind CSS 4
- **组件**: Radix UI + Shadcn/ui
- **动画**: Framer Motion + Magic UI
- **语法高亮**: React Syntax Highlighter + Prism.js
- **导出**: html-to-image + jsPDF

## 项目结构

```
src/
├── app/                    # Next.js 页面
├── components/             # React 组件
│   ├── code-editor/       # 代码编辑器
│   ├── code-preview/      # 代码预览
│   ├── theme-configurator/ # 主题配置
│   ├── export-controls/   # 导出控制
│   └── ui/               # UI 组件
├── lib/                   # 工具函数
└── types/                 # 类型定义
```

## 使用说明

1. 在编辑器中输入代码
2. 选择编程语言（支持自动检测）
3. 选择主题和窗口样式
4. 调整字体、布局等设置
5. 实时预览效果
6. 导出图片或生成分享链接

## 致谢

- [Carbon](https://carbon.now.sh) - 设计灵感
- [Shadcn/ui](https://ui.shadcn.com) - UI 组件库
- [Magic UI](https://magicui.design) - 动画组件
