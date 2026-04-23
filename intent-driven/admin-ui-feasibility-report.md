# Admin-UI 与 Next.js 同时运行可行性报告

> 分析日期: 2026-04-23
> 分析对象: `references/admin-ui/` (TanStack Start + Vite)
> 目标: 确定是否可与 `apps/intent-driven` (Next.js 16) 同时运行

---

## 一、Admin-UI 技术栈分析

| 维度 | Admin-UI | Intent Driven (当前) |
|------|----------|---------------------|
| **框架** | TanStack Start | Next.js 16 |
| **构建工具** | Vite 7.1 | Next.js 内置 (Turbopack) |
| **路由** | @tanstack/react-router | Next.js App Router |
| **UI 基座** | @base-ui/react | Radix UI (via shadcn/ui) |
| **样式** | Tailwind CSS v4 | Tailwind CSS v4 |
| **React 版本** | 19.2 | 19.2 |
| **TypeScript** | 5.7 | 6.0 |
| **SSR 方案** | TanStack Start SSR | Next.js SSR / SSG |

---

## 二、可行性结论

### ✅ 可以同时运行（独立部署模式）

Admin-UI 和 Next.js 是两个完全独立的项目，可以在**不同端口**同时运行：

```bash
# Terminal 1: Admin-UI
cd references/admin-ui
pnpm dev          # → http://localhost:3000

# Terminal 2: Intent Driven (Next.js)
cd apps/intent-driven
pnpm dev          # → http://localhost:3001 (或自动分配的端口)
```

**优点**:
- 零耦合，互不影响
- 各自独立构建、部署、扩展
- Admin-UI 的 TanStack Router 和 Next.js App Router 不会冲突

**缺点**:
- 需要维护两个独立的开发服务器
- 用户需要在两个应用间跳转
- 无法共享组件（因为 UI 基座不同：@base-ui/react vs Radix UI）

---

### ❌ 不可直接整合到同一个代码库

将 Admin-UI 的代码直接整合到 Next.js 项目中存在以下**不可逾越的障碍**:

| 冲突点 | 说明 | 严重性 |
|--------|------|--------|
| **路由系统冲突** | TanStack Router 和 Next.js App Router 都控制 URL → 组件映射，无法共存 | 🔴 致命 |
| **构建工具冲突** | Vite 和 Next.js 的编译管道不同，无法合并 | 🔴 致命 |
| **UI 基座差异** | @base-ui/react 和 Radix UI 的组件 API 不同，无法直接复用 | 🟡 高 |
| **SSR 机制差异** | TanStack Start 的 SSR 和 Next.js 的 SSR 数据获取方式不同 | 🟡 高 |
| **TypeScript 版本** | Admin-UI 使用 TS 5.7，当前项目使用 TS 6.0，存在潜在兼容性风险 | 🟢 低 |

---

## 三、可行的整合方案

### 方案 A: 微前端 / iframe 嵌入（推荐）

将 Admin-UI 作为独立应用部署，在 Next.js 中通过 iframe 或微前端框架嵌入：

```
┌─────────────────────────────────────────┐
│  Intent Driven (Next.js)                │
│  ┌─────────────────────────────────┐    │
│  │  /admin 页面                    │    │
│  │  ┌─────────────────────────┐    │    │
│  │  │ iframe src="admin-ui"   │    │    │
│  │  │                         │    │    │
│  │  │  Admin-UI 独立运行      │    │    │
│  │  │                         │    │    │
│  │  └─────────────────────────┘    │    │
│  └─────────────────────────────────┘    │
└─────────────────────────────────────────┘
```

**优点**: 完全隔离，技术栈自由
**缺点**: iframe 体验不佳，跨域通信复杂

### 方案 B: 组件级迁移（工作量最大）

将 Admin-UI 的组件逐个迁移到 Next.js + shadcn/ui 技术栈：

```
Admin-UI 组件          →   Next.js 等效实现
─────────────────────────────────────────────
@base-ui/react Button   →   shadcn/ui Button
TanStack Router         →   Next.js App Router
Vite                    →   Next.js (Turbopack)
```

**优点**: 统一技术栈，最佳用户体验
**缺点**: 工作量巨大，需要重写所有组件和路由

### 方案 C: 独立子域名部署（最实用）

```
主应用:   https://app.example.com    → Next.js (Intent Driven)
管理后台: https://admin.example.com  → TanStack Start (Admin-UI)
```

**优点**: 各自独立扩展，技术栈自由，部署简单
**缺点**: 需要 SSO 单点登录，需要统一导航体验

---

## 四、Admin-UI 组件资产分析

Admin-UI 包含以下有价值的组件和模式：

| 组件/模式 | 可复用性 | 迁移难度 |
|-----------|---------|---------|
| `dashboard/*` 仪表板卡片 | 中 | 需从 @base-ui 迁移到 Radix |
| `data-table` 数据表格 | 高 | 可用 shadcn/ui Table 替代 |
| `site-header` 站点头部 | 低 | 与当前 Header 设计不同 |
| `app-sidebar` 应用侧边栏 | 中 | 可用当前 Sidebar 替代 |
| `scene-blocks` 场景区块 | 高 | 概念可直接复用 |
| `chart-area-interactive` 图表 | 高 | 可用 recharts 替代 |

---

## 五、最终建议

| 场景 | 推荐方案 |
|------|---------|
| **快速验证 / MVP** | 独立端口运行，通过链接跳转 |
| **生产环境长期维护** | 独立子域名部署 (方案 C) |
| **追求统一用户体验** | 组件级迁移到 Next.js (方案 B) — 投入 2-3 周 |
| **临时集成** | iframe 嵌入 (方案 A) — 不推荐长期使用 |

**结论**: Admin-UI 和 Next.js **可以同时运行**，但应作为**独立应用**部署，而非合并到同一代码库。
