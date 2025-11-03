import { createClient } from '@supabase/supabase-js';

// 从环境变量获取 Supabase 配置
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase 环境变量缺失:');
  console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl);
  console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseAnonKey ? '已设置' : '未设置');
  throw new Error(
    '缺少 Supabase 环境变量。请在 .env.local 文件中设置 NEXT_PUBLIC_SUPABASE_URL 和 NEXT_PUBLIC_SUPABASE_ANON_KEY'
  );
}

// 验证 URL 格式
if (!supabaseUrl.startsWith('https://') || !supabaseUrl.includes('.supabase.co')) {
  console.error('无效的 Supabase URL:', supabaseUrl);
  console.error('URL 格式应该是: https://your-project-id.supabase.co');
  throw new Error('无效的 Supabase URL 格式');
}

console.log('Supabase 配置:');
console.log('URL:', supabaseUrl);
console.log('Key:', supabaseAnonKey.substring(0, 20) + '...');

// 创建 Supabase 客户端实例
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false, // 不需要持久化会话，因为这是公开的分享功能
  },
});

// 数据库类型定义
export interface ShareLinkRecord {
  id: string;
  short_id: string;
  snippet_data: {
    code: string;
    language: string;
    title?: string;
    author?: string;
    theme: Record<string, unknown>;
    settings: Record<string, unknown>;
    createdAt: string;
  };
  created_at: string;
  expires_at?: string;
  view_count: number;
  last_viewed_at?: string;
}
