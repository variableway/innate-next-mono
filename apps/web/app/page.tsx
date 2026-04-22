"use client"

import {
  HeroSection,
  FeaturesSection,
  CTASection,
} from "@innate/ui";
import { Zap, Shield, Palette, Moon } from "lucide-react";

export default function HomePage() {
  return (
    <main className="flex flex-col">
      <HeroSection
        badge={{ text: "Next.js 16 + Tailwind v4", href: "#" }}
        title="构建更好的产品"
        titleHighlight="更好"
        subtitle="使用 Innate Starter 快速搭建现代化 Web 应用"
        primaryCta={{ text: "开始使用", href: "/dashboard" }}
        secondaryCta={{ text: "查看文档", href: "#" }}
      />
      <FeaturesSection
        title="核心特性"
        subtitle="基于现代技术栈构建的全功能 Starter 模板"
        features={[
          {
            icon: Zap,
            title: "Next.js 16",
            description: "App Router、Server Components、Turbopack",
          },
          {
            icon: Shield,
            title: "shadcn/ui",
            description: "50+ 基础组件，通过 CLI 一键安装",
          },
          {
            icon: Palette,
            title: "Tailwind CSS v4",
            description: "OKLCH 主题系统，CSS-based 配置",
          },
          {
            icon: Moon,
            title: "暗色模式",
            description: "内置 next-themes 支持",
          },
        ]}
      />
      <CTASection
        title="准备好了吗？"
        subtitle="立即开始你的旅程"
        primaryCta={{ text: "进入 Dashboard", href: "/dashboard" }}
      />
    </main>
  );
}
