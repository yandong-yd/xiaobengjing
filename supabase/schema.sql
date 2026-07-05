-- 摆摊手册 Supabase 数据库初始化脚本
-- 在 Supabase SQL Editor 中执行

CREATE TABLE IF NOT EXISTS projects (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  cost_min INTEGER NOT NULL,
  cost_max INTEGER NOT NULL,
  income_min INTEGER NOT NULL,
  income_max INTEGER NOT NULL,
  difficulty TEXT NOT NULL,
  tags JSONB DEFAULT '[]',
  description TEXT,
  steps JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS cases (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  city TEXT NOT NULL,
  cost INTEGER NOT NULL,
  monthly_profit INTEGER NOT NULL,
  story TEXT,
  tags JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 启用 Row Level Security（公开读取）
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE cases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read on projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow public read on cases" ON cases FOR SELECT USING (true);
