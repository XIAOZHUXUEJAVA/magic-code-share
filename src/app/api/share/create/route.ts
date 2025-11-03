import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { nanoid } from 'nanoid';
import { CodeSnippet } from '@/types';

// 生成短链接 ID（使用 nanoid 生成 8 位字符）
function generateShortId(): string {
  return nanoid(8);
}

// POST /api/share/create - 创建短链接
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const snippet: CodeSnippet = body.snippet;

    if (!snippet || !snippet.code || !snippet.language) {
      return NextResponse.json(
        { error: '缺少必要的代码片段数据' },
        { status: 400 }
      );
    }

    // 准备存储的数据（移除不需要的字段）
    const snippetData = {
      code: snippet.code,
      language: snippet.language,
      title: snippet.title || '',
      author: snippet.author || '',
      theme: snippet.theme,
      settings: snippet.settings,
      createdAt: snippet.createdAt instanceof Date 
        ? snippet.createdAt.toISOString() 
        : snippet.createdAt,
    };

    // 生成唯一的短链接 ID
    let shortId = generateShortId();
    let attempts = 0;
    const maxAttempts = 5;

    // 检查 ID 是否已存在，如果存在则重新生成
    while (attempts < maxAttempts) {
      const { data: existing } = await supabase
        .from('share_links')
        .select('short_id')
        .eq('short_id', shortId)
        .single();

      if (!existing) {
        break; // ID 不存在，可以使用
      }

      shortId = generateShortId();
      attempts++;
    }

    if (attempts >= maxAttempts) {
      return NextResponse.json(
        { error: '生成短链接失败，请重试' },
        { status: 500 }
      );
    }

    // 插入到数据库
    const { data, error } = await supabase
      .from('share_links')
      .insert({
        short_id: shortId,
        snippet_data: snippetData,
        expires_at: null, // 可以设置过期时间，例如 7 天后
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      return NextResponse.json(
        { 
          error: '保存分享链接失败',
          details: error.message || '数据库错误',
          hint: error.hint || ''
        },
        { status: 500 }
      );
    }

    // 生成完整的分享链接
    const baseUrl = request.nextUrl.origin;
    const shareUrl = `${baseUrl}/share/${shortId}`;

    return NextResponse.json({
      success: true,
      shortId: shortId,
      shareUrl: shareUrl,
      data: data,
    });
  } catch (error) {
    console.error('Create share link error:', error);
    return NextResponse.json(
      { error: '创建分享链接时发生错误' },
      { status: 500 }
    );
  }
}
