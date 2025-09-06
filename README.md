# Magic Code Share

一个美观的代码分享工具，类似于 [carbon.now.sh](https://carbon.now.sh)，使用 Next.js + React + TypeScript + TailwindCSS + Shadcn + Magic UI 构建。

## ✨ 功能特性

### 🎨 代码输入与语法高亮

- 支持用户粘贴代码或拖拽文件
- 自动识别语言并高亮显示
- 支持 20+ 种编程语言（JavaScript、TypeScript、Python、Java、C++、Go、Rust 等）
- 清晰美观的语法高亮效果

### 🖼️ 美观展示

- 多种预设主题（GitHub Dark、VS Code Dark、Dracula、One Dark、Monokai 等）
- 可选窗口样式（macOS、Windows、Terminal、Safari、iPhone）
- 可调整字体大小、字体族、行号显示
- 自定义背景渐变和圆角设置
- 支持添加标题和作者信息

### 📤 导出功能

- 支持导出为 PNG、JPG、PDF 格式
- 多种质量选项（低、中、高）
- 一键复制图片到剪贴板
- 自定义文件名

### 🔗 分享功能

- 生成分享链接（需要后端支持）
- 一键复制分享链接
- 支持社交媒体分享（预留接口）

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建生产版本

```bash
npm run build
npm start
```

## 🛠️ 技术栈

- **框架**: Next.js 15
- **UI 库**: React 18
- **类型系统**: TypeScript
- **样式**: TailwindCSS
- **组件库**: Shadcn/ui
- **动画**: Magic UI
- **语法高亮**: react-syntax-highlighter
- **导出功能**: html2canvas + jsPDF
- **通知**: Sonner
- **图标**: Lucide React

## 📁 项目结构

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # 主页面
│   └── globals.css        # 全局样式
├── components/            # 组件目录
│   ├── code-editor/       # 代码编辑器组件
│   ├── code-preview/      # 代码预览组件
│   ├── theme-configurator/ # 主题配置组件
│   ├── export-controls/   # 导出控制组件
│   ├── providers/         # 提供者组件
│   ├── magicui/          # Magic UI 组件
│   └── ui/               # Shadcn UI 组件
├── lib/                  # 工具库
│   ├── utils.ts          # 通用工具函数
│   ├── language-detector.ts # 语言检测
│   └── export-utils.ts   # 导出工具
└── types/                # 类型定义
    └── index.ts          # 主要类型定义
```

## 🎯 核心组件

### CodeEditor

代码编辑器组件，支持：

- 代码输入和编辑
- 文件拖拽上传
- 语言自动检测
- 示例代码生成

### CodePreview

代码预览组件，支持：

- 实时预览代码卡片
- 多种窗口样式
- 语法高亮显示
- 复制按钮

### ThemeConfigurator

主题配置组件，支持：

- 预设主题选择
- 自定义背景设置
- 字体和布局配置
- 窗口样式选择

### ExportControls

导出控制组件，支持：

- 多格式导出
- 质量设置
- 分享链接生成
- 剪贴板操作




## 🙏 致谢

- [carbon.now.sh](https://carbon.now.sh) - 灵感来源
- [Magic UI](https://magicui.design) - 美观的 UI 组件
- [Shadcn/ui](https://ui.shadcn.com) - 优秀的组件库
- [Next.js](https://nextjs.org) - 强大的 React 框架


---

⭐ 如果这个项目对你有帮助，请给我们一个 Star！
