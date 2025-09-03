# 快速开始指南

## 🚀 启动项目

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

### 3. 打开浏览器

访问 [http://localhost:3000](http://localhost:3000) 查看应用

## 📋 项目功能清单

### ✅ 已实现功能

#### 🎨 代码编辑器

- [x] 代码输入和编辑
- [x] 支持 20+ 种编程语言
- [x] 自动语言检测
- [x] 文件拖拽上传
- [x] 示例代码生成
- [x] 标题和作者信息输入

#### 🖼️ 代码预览

- [x] 实时预览代码卡片
- [x] 语法高亮显示
- [x] 多种窗口样式（macOS、Windows、Terminal、Safari、iPhone）
- [x] 复制按钮
- [x] 响应式设计

#### 🎨 主题配置

- [x] 6 种预设主题
- [x] 自定义背景渐变
- [x] 10 种语法高亮主题
- [x] 字体大小和字体族设置
- [x] 行号显示控制
- [x] 内边距和圆角调整
- [x] 头部、底部、水印显示控制

#### 📤 导出功能

- [x] PNG 格式导出
- [x] JPG 格式导出
- [x] PDF 格式导出
- [x] 三种质量选项（低、中、高）
- [x] 自定义文件名
- [x] 复制图片到剪贴板

#### 🔗 分享功能

- [x] 分享链接生成（模拟）
- [x] 链接复制功能
- [x] 分享界面设计

#### 🎭 UI/UX

- [x] 现代化设计
- [x] 流畅动画效果
- [x] 响应式布局
- [x] 深色/浅色主题支持
- [x] Toast 通知
- [x] 加载状态指示

## 🛠️ 技术实现

### 核心技术栈

- **Next.js 15** - React 框架
- **TypeScript** - 类型安全
- **TailwindCSS** - 样式框架
- **Shadcn/ui** - 组件库
- **Magic UI** - 动画组件

### 关键依赖

- **react-syntax-highlighter** - 语法高亮
- **html2canvas** - 截图功能
- **jsPDF** - PDF 导出
- **sonner** - Toast 通知
- **framer-motion** - 动画效果

### 项目架构

```
src/
├── app/                    # Next.js App Router
├── components/            # 组件目录
│   ├── code-editor/       # 代码编辑器
│   ├── code-preview/      # 代码预览
│   ├── theme-configurator/ # 主题配置
│   ├── export-controls/   # 导出控制
│   └── ui/               # UI 组件
├── lib/                  # 工具库
└── types/                # 类型定义
```

## 🎯 使用指南

### 1. 输入代码

- 在左侧编辑器中粘贴或输入代码
- 支持拖拽文件直接导入
- 可以使用示例代码快速开始

### 2. 配置主题

- 选择预设主题或自定义背景
- 调整窗口样式和语法高亮
- 设置字体、大小、行号等选项

### 3. 导出分享

- 选择导出格式（PNG/JPG/PDF）
- 设置导出质量
- 生成分享链接（需要后端支持）

## 🔧 自定义开发

### 添加新语言支持

在 `src/types/index.ts` 中添加：

```typescript
{ value: "语言代码", label: "显示名称", extension: "扩展名" }
```

### 添加新主题

在 `PRESET_THEMES` 数组中添加新主题配置。

### 扩展窗口样式

在 `CodePreview` 组件中添加新的窗口样式渲染逻辑。

## 🚀 部署

### Vercel 部署

```bash
npm run build
```

### Docker 部署

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🐛 常见问题

### Q: 导出功能不工作？

A: 确保浏览器支持 Canvas API 和 Clipboard API。

### Q: 语法高亮不正确？

A: 检查语言检测逻辑，可能需要手动选择语言。

### Q: 分享链接无法生成？

A: 当前为演示模式，需要实现后端 API。

## 📞 获取帮助

如果遇到问题，请：

1. 查看控制台错误信息
2. 检查浏览器兼容性
3. 提交 Issue 或联系开发团队

---

🎉 现在你可以开始使用 Magic Code Share 创建美观的代码卡片了！
