# 短链接服务设置指南

## 📦 安装依赖

```bash
npm install @supabase/supabase-js nanoid
```

## 🗄️ 配置 Supabase 数据库

### 1. 创建 Supabase 项目
- 访问 https://supabase.com 并登录
- 创建新项目

### 2. 执行数据库迁移
1. 在 Supabase Dashboard 中，进入 **SQL Editor**
2. 复制 `supabase-schema.sql` 文件的内容
3. 执行 SQL 语句

### 3. 配置环境变量
1. 在 Supabase Dashboard，进入 **Settings** > **API**
2. 复制以下信息：
   - **Project URL**
   - **anon public key**

3. 编辑 `.env.local` 文件：
```env
NEXT_PUBLIC_SUPABASE_URL=你的项目URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的anon密钥
```

## 🚀 启动项目

```bash
npm run dev
```

## ✨ 功能说明

### 短链接生成
- 用户点击"生成分享链接"按钮
- 系统调用 `/api/share/create` API
- 后端生成 8 位短 ID（使用 nanoid）
- 数据存储到 Supabase
- 返回短链接：`https://your-domain.com/share/[shortId]`

### 短链接访问
- 用户访问 `/share/[shortId]`
- 系统调用 `/api/share/[shortId]` API
- 从 Supabase 获取代码片段数据
- 自动增加浏览次数
- 渲染代码预览页面

## 📁 新增文件

- `src/lib/supabase.ts` - Supabase 客户端配置
- `src/app/api/share/create/route.ts` - 创建短链接 API
- `src/app/api/share/[shortId]/route.ts` - 获取短链接 API
- `src/app/share/[shortId]/page.tsx` - 短链接展示页面
- `supabase-schema.sql` - 数据库表结构

## 🔧 修改文件

- `src/lib/share-utils.ts` - 更新为使用后端 API
- `src/components/export-controls/ExportControls.tsx` - 添加 await 关键字
- `src/app/share/page.tsx` - 简化为提示页面

## 📊 数据库表结构

### share_links 表
- `id` - UUID 主键
- `short_id` - 8位短链接ID（唯一）
- `snippet_data` - 代码片段数据（JSONB）
- `created_at` - 创建时间
- `expires_at` - 过期时间（可选）
- `view_count` - 浏览次数
- `last_viewed_at` - 最后浏览时间

## 🎯 优势

✅ **极短的链接** - 只有 8 个字符的 ID
✅ **数据持久化** - 存储在 Supabase 数据库
✅ **浏览统计** - 自动记录浏览次数
✅ **可扩展** - 支持过期时间、访问控制等功能
✅ **高性能** - 使用索引优化查询
✅ **安全** - RLS 策略保护数据

## 🔒 安全注意事项

- ✅ 已启用 Row Level Security (RLS)
- ✅ 公开读取策略（分享链接需要公开访问）
- ✅ 公开插入策略（允许创建分享链接）
- ⚠️ 建议添加速率限制防止滥用
- ⚠️ 可以添加用户认证以管理自己的分享

## 📝 后续优化建议

1. **添加过期时间** - 在创建链接时设置 `expires_at`
2. **速率限制** - 使用 Vercel Edge Config 或 Redis
3. **自定义短链接** - 允许用户自定义 short_id
4. **分享管理** - 用户可以查看和删除自己的分享
5. **访问密码** - 为敏感代码添加密码保护
6. **分享统计** - 更详细的访问统计和分析
