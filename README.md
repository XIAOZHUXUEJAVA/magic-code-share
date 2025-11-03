# Magic Code Share

一个美观的代码分享工具，支持多种主题、导出格式和短链接分享。

使用链接：https://magiccodeshare.netlify.app/

## 功能特性

### 代码编辑

- 支持 20+ 种编程语言
- 自动语言检测
- 可自定义标题和作者信息
- 实时语法高亮

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

- **短链接分享**：基于 Supabase 的后端短链接服务
- 永久存储：代码片段存储在数据库中
- 浏览统计：自动记录查看次数
- 一键复制分享链接
- 短链接格式：`/share/[8位ID]`

## 快速开始

### 环境要求

- Node.js 18+
- Supabase 账号（用于存储）

### 1. 安装依赖

```bash
npm install
```

### 2. 配置 Supabase

#### 2.1 创建 Supabase 项目

1. 访问 [Supabase](https://supabase.com) 并登录
2. 创建新项目
3. 进入 **Settings** > **API** 获取：
   - **Project URL**
   - **anon public key**

#### 2.2 创建数据库表

1. 在 Supabase Dashboard 中，进入 **SQL Editor**
2. 复制 `supabase-schema.sql` 文件的内容
3. 执行 SQL 语句创建表和策略

#### 2.3 配置环境变量

创建 `.env.local` 文件：

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

> ⚠️ **重要**: 请将 `.env.local` 添加到 `.gitignore` 中，不要提交敏感信息到 Git

### 3. 启动项目

```bash
# 开发模式
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

## 使用说明

1. 在编辑器中输入代码
2. 选择编程语言（支持自动检测）
3. 选择主题和窗口样式
4. 调整字体、布局等设置
5. 实时预览效果
6. 导出图片或生成分享链接

## 许可证

本项目基于 MIT 许可证开源。详情请查看 [LICENSE](LICENSE) 文件。
