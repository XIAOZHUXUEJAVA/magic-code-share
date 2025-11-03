import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET /api/share/[shortId] - 获取短链接对应的代码片段
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ shortId: string }> }
) {
  try {
    const { shortId } = await params;

    if (!shortId) {
      return NextResponse.json({ error: "缺少短链接 ID" }, { status: 400 });
    }

    // 从数据库查询
    const { data, error } = await supabase
      .from("share_links")
      .select("*")
      .eq("short_id", shortId)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: "分享链接不存在或已过期" },
        { status: 404 }
      );
    }

    // 检查是否过期
    if (data.expires_at) {
      const expiresAt = new Date(data.expires_at);
      if (expiresAt < new Date()) {
        return NextResponse.json({ error: "分享链接已过期" }, { status: 410 });
      }
    }

    // 异步增加浏览次数（不等待结果）
    supabase.rpc("increment_view_count", { p_short_id: shortId }).then();

    return NextResponse.json({
      success: true,
      data: data,
    });
  } catch (error) {
    console.error("Get share link error:", error);
    return NextResponse.json(
      { error: "获取分享链接时发生错误" },
      { status: 500 }
    );
  }
}
