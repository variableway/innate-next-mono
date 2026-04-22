# Innate - Next.js Starter Template

> 聚合型前端 Starter 项目。基于 Next.js 16 + shadcn/ui + Tailwind CSS v4，聚合社区最佳组件而非自建组件库。

## 项目定位

本项目 **不是组件库**，而是 **Starter Kit + 配置层**：
- 基础 UI 组件来自 [shadcn/ui](https://ui.shadcn.com) 官方和社区 registry
- 营销区块来自 [21st.dev](https://21st.dev)
- 主题系统、业务区块、项目结构由本项目维护

## 项目结构

```
innate-next-mono/
├── apps/
│   └── web/                 # Next.js 16 Web 应用模板
│       ├── app/             # App Router
│       │   ├── layout.tsx   # 根布局（字体、主题 Provider）
│       │   ├── page.tsx     # Landing Page 示例
│       │   ├── dashboard/   # Dashboard 布局示例
│       │   └── globals.css  # 全局样式（导入 @innate/ui 主题）
│       ├── components/ui/   # shadcn/ui 组件（通过 CLI 安装）
│       ├── lib/
│       │   └── utils.ts     # cn() 工具
│       └── next.config.ts
├── packages/
│   ├── ui/                  # @innate/ui — 主题 + 业务区块配置层
│   │   ├── src/globals.css  # OKLCH 主题变量（核心资产）
│   │   ├── src/lib/utils.ts # cn() 工具
│   │   └── src/block/       # 业务区块（Landing、Auth、Chat、Mail）
│   ├── utils/               # 共享工具函数
│   └── tsconfig/            # 共享 TypeScript 配置
├── scripts/
│   └── init-starter.sh      # 一键初始化脚本
├── package.json
├── pnpm-workspace.yaml
└── tsconfig.json
```

## 快速开始

```bash
# 1. 安装依赖
pnpm install

# 2. 初始化 starter（安装 shadcn/ui 组件）
./scripts/init-starter.sh

# 3. 启动开发服务器
cd apps/web
pnpm dev
```

## 组件来源

| 组件类型 | 来源 | 安装方式 |
|---------|------|---------|
| 基础组件（Button、Card、Dialog 等） | shadcn/ui 官方 | `npx shadcn@latest add button` |
| 营销区块（Hero、Features、CTA 等） | 21st.dev | `npx shadcn@latest add "https://21st.dev/r/..."` |
| 业务区块（Auth、Chat、Mail） | 本项目 `@innate/ui` | `import { LoginForm } from "@innate/ui"` |
| 主题系统 | 本项目 `@innate/ui/globals.css` | `import "@innate/ui/globals.css"` |

## 技术栈

- **Framework:** Next.js 16 + App Router + Turbopack
- **React:** 19 + React Compiler
- **Language:** TypeScript 6
- **Package Manager:** pnpm workspaces
- **Styling:** Tailwind CSS v4 + OKLCH 色彩空间
- **UI Components:** shadcn/ui (Radix UI + Tailwind)
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Theme:** next-themes (暗色模式)

## 关键文件

| 文件 | 说明 |
|------|------|
| `packages/ui/src/globals.css` | OKLCH 主题变量定义，亮/暗模式 |
| `packages/ui/src/block/landing/` | Landing Page 业务区块 |
| `packages/ui/src/block/auth/` | 认证表单区块 |
| `apps/web/app/layout.tsx` | 根布局（字体加载、ThemeProvider） |
| `apps/web/app/page.tsx` | Landing Page 示例 |
| `apps/web/app/dashboard/page.tsx` | Dashboard 布局示例 |

## 维护策略

- **社区组件**：通过 `npx shadcn@latest diff` 检查更新，定期同步
- **主题系统**：手动维护，跟随 OKLCH 生态演进
- **业务区块**：根据项目需求迭代，不受 shadcn/ui 升级影响

## 与 Skill 的关系

本项目是 [fe-skills/innate-frontend](../../fire-skills/fe-skills/innate-frontend/SKILL.md) 的示范代码实现。
