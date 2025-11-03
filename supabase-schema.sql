-- 创建短链接表
CREATE TABLE IF NOT EXISTS share_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  short_id VARCHAR(10) UNIQUE NOT NULL,
  snippet_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE,
  view_count INTEGER DEFAULT 0,
  last_viewed_at TIMESTAMP WITH TIME ZONE
);

-- 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_share_links_short_id ON share_links(short_id);
CREATE INDEX IF NOT EXISTS idx_share_links_created_at ON share_links(created_at);
CREATE INDEX IF NOT EXISTS idx_share_links_expires_at ON share_links(expires_at);

-- 创建函数：自动清理过期链接（可选）
CREATE OR REPLACE FUNCTION cleanup_expired_links()
RETURNS void AS $$
BEGIN
  DELETE FROM share_links 
  WHERE expires_at IS NOT NULL 
  AND expires_at < NOW();
END;
$$ LANGUAGE plpgsql;

-- 创建函数：增加浏览次数
CREATE OR REPLACE FUNCTION increment_view_count(p_short_id VARCHAR)
RETURNS void AS $$
BEGIN
  UPDATE share_links 
  SET 
    view_count = view_count + 1,
    last_viewed_at = NOW()
  WHERE short_id = p_short_id;
END;
$$ LANGUAGE plpgsql;

-- 启用 Row Level Security (RLS)
ALTER TABLE share_links ENABLE ROW LEVEL SECURITY;

-- 创建策略：允许所有人读取
CREATE POLICY "Allow public read access" 
ON share_links FOR SELECT 
USING (true);

-- 创建策略：允许所有人插入（创建分享链接）
CREATE POLICY "Allow public insert access" 
ON share_links FOR INSERT 
WITH CHECK (true);

-- 创建策略：允许更新浏览次数
CREATE POLICY "Allow public update view count" 
ON share_links FOR UPDATE 
USING (true)
WITH CHECK (true);

-- 注释
COMMENT ON TABLE share_links IS '代码分享短链接表';
COMMENT ON COLUMN share_links.short_id IS '短链接ID，用于URL';
COMMENT ON COLUMN share_links.snippet_data IS '代码片段数据（JSON格式）';
COMMENT ON COLUMN share_links.view_count IS '浏览次数';
COMMENT ON COLUMN share_links.expires_at IS '过期时间（可选）';
