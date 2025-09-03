import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import { ToastProvider } from "@/components/providers/ToastProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Magic Code Share - 美观的代码分享工具",
  description:
    "使用 Magic Code Share 创建美观的代码卡片，支持多种主题和窗口样式，轻松分享你的代码片段。",
  keywords: ["代码分享", "代码卡片", "代码截图", "代码美化", "程序员工具"],
  authors: [{ name: "Magic Code Share Team" }],
  creator: "Magic Code Share",
  publisher: "Magic Code Share",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}
