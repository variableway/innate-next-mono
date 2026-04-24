# 设计-UI 总体方案：框架共存 · Scene 理念 · 升级路线图

> 版本: v1.0
> 日期: 2026-04-23
> 目标: 建立 Innate 项目的设计-UI 总体指导方案

---

## 一、用户结论合理性分析

### 结论 1: 两个框架有同时存在的合理性，不需要强行合并

** verdict: ✅ 非常合理 **

| 维度 | 分析 |
|------|------|
| **架构定位不同** | Next.js 面向"AI Intent Driven 应用"，TanStack Start 面向"传统 Admin 管理后台" |
| **路由哲学不同** | Next.js App Router 拥抱 RSC/Server Actions；TanStack Router 拥抱类型安全/SPA |
| **团队技能路径** | 不同团队可以专注各自技术栈，无需强制统一 |
| **部署灵活性** | Admin 可以独立部署到内网/私有化环境，主应用部署到 Vercel |
| **演进独立性** | 两套系统可以独立迭代，互不影响发布节奏 |

**共存模式建议**:

```
┌─────────────────────────────────────────────────────────────┐
│                    Innate 生态架构                           │
├─────────────────────┬───────────────────────────────────────┤
│  apps/intent-driven │  apps/admin (未来) or references/admin-ui│
│  (Next.js 16)       │  (TanStack Start)                      │
├─────────────────────┼───────────────────────────────────────┤
│  • AI 驱动交互       │  • 管理后台                            │
│  • Intent Driven     │  • 数据密集型操作                       │
│  • 流式响应          │  • 复杂表单/表格                        │
│  • 内容展示          │  • 审批流程                            │
├─────────────────────┴───────────────────────────────────────┤
│                    packages/ui (@innate/ui)                   │
│                    共享组件层（基础组件 + Block + Theme）         │
└─────────────────────────────────────────────────────────────┘
```

### 结论 2: 可以共用 Scene 理念

**verdict: ✅ 非常合理，且极具战略价值**

Scene 理念的本质是**"页面即场景，场景即规范"**。这个理念与框架无关，可以跨技术栈复用：

```typescript
// Scene 规范定义 —— 框架无关
interface SceneSpec {
  id: string           // 场景标识
  intent: string       // 用户意图 (monitor | act | review | config)
  category: string     // 分类 (dashboard | list | detail | form)
  patterns: string[]   // 使用的 UI 模式
  dataModel: string    // 关联的数据模型
  permissions: string[] // 权限要求
}
```

**跨框架复用方式**:

| 层级 | Next.js 实现 | TanStack Start 实现 |
|------|-------------|-------------------|
| **Scene Catalog** | `lib/scene-catalog.ts` | `lib/scene-catalog.ts` |
| **Spec Navigation** | `components/scene-nav.tsx` | `lib/spec-navigation.ts` |
| **Scene Blocks** | `components/scene/blocks.tsx` | `components/scenes/scene-blocks.tsx` |
| **Page Shell** | `app/(admin)/layout.tsx` | `components/spec-page-shell.tsx` |

### 结论 3: innate/ui 升级到 base-ui，theme 适配多 theme

**verdict: ✅ 合理，但需要分阶段实施**

升级路径分析见下文"shadcn/ui v4 差异分析"。

---

## 二、shadcn/ui v4 与当前 innate/ui 的差异分析

### 2.1 依赖层差异

| 维度 | 当前 innate/ui | shadcn/ui v4 (references/ui) |
|------|---------------|-----------------------------|
| **UI 基座** | `@radix-ui/react-*` (v1.x) | `@base-ui/react` (v1.3.0) |
| **shadcn 版本** | v2 (new-york) | v4 (new-york，但底层变了) |
| **Tailwind** | v4 + `@tailwindcss/postcss` | v4 + `@tailwindcss/postcss` |
| **CSS 导入** | `@import 'tailwindcss'` | `@import 'tailwindcss'` |
| **动画** | `tw-animate-css` | `tw-animate-css` + `@import "shadcn/tailwind.css"` |

### 2.2 关键差异详解

#### 差异 A: UI 基座从 Radix UI → @base-ui/react

**Radix UI** (当前 innate/ui):
```tsx
// 传统 Radix API
import * as Dialog from "@radix-ui/react-dialog"

<Dialog.Root>
  <Dialog.Trigger>Open</Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay />
    <Dialog.Content>
      <Dialog.Title>Title</Dialog.Title>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
```

**@base-ui/react** (shadcn v4):
```tsx
// 新 Base UI API
import { Dialog } from "@base-ui/react-dialog"
import { useRender, mergeProps } from "@base-ui/react"

<Dialog.Root>
  <Dialog.Trigger render={<button>Open</button>} />
  <Dialog.Portal>
    <Dialog.Backdrop />
    <Dialog.Popup>
      <Dialog.Title>Title</Dialog.Title>
    </Dialog.Popup>
  </Dialog.Portal>
</Dialog.Root>
```

**影响评估**:
- API 命名变化：`Overlay` → `Backdrop`, `Content` → `Popup`
- 新增 `useRender` 和 `mergeProps` 工具
- 渲染控制更灵活
- **breaking change**: 直接替换会导致所有组件需要重写

#### 差异 B: 多风格主题系统

shadcn/ui v4 支持 **7 种内置风格**:

```css
/* v4 全局 CSS —— 多风格系统 */
@import "../registry/styles/style-vega.css" layer(base);
@import "../registry/styles/style-nova.css" layer(base);
@import "../registry/styles/style-lyra.css" layer(base);
@import "../registry/styles/style-maia.css" layer(base);
@import "../registry/styles/style-mira.css" layer(base);
@import "../registry/styles/style-luma.css" layer(base);
@import "../registry/styles/style-sera.css" layer(base);

@custom-variant style-vega (&:where(.style-vega *));
@custom-variant style-nova (&:where(.style-nova *));
/* ... */
```

当前 innate/ui 只有 **单一风格** (new-york)。

#### 差异 C: @theme inline 语法

shadcn v4 使用 Tailwind 4 的 `@theme inline`:

```css
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  /* ... */
}
```

当前 innate/ui 使用传统 CSS 变量定义。

#### 差异 D: 新增 CSS 变量

shadcn v4 新增变量：
- `--color-surface`
- `--color-surface-foreground`
- `--color-code`
- `--color-code-foreground`
- `--color-code-highlight`
- `--color-code-number`
- `--color-selection`
- `--color-selection-foreground`

### 2.3 升级影响评估

| 升级项 | 影响范围 | 工作量 | 风险 |
|--------|---------|--------|------|
| Radix UI → @base-ui | 所有 60+ 组件 | 高 (2-3 周) | 中 (API 变化) |
| 单主题 → 多主题 | CSS + 组件样式 | 中 (1 周) | 低 |
| @theme inline 迁移 | globals.css | 低 (1 天) | 低 |
| 新增 CSS 变量 | 主题系统 | 低 (1 天) | 低 |

---

## 三、21st.dev 设计模式研究

### 3.1 21st.dev 核心模式

21st.dev 是 shadcn/ui 生态的**组件市场和组装平台**：

```
21st.dev 模式:
┌─────────────────────────────────────────────────────────────┐
│  Component Registry (组件注册表)                             │
│  ├─ 每个组件有独立页面                                       │
│  ├─ 支持一键安装到项目                                       │
│  ├─ 支持在线预览和编辑                                       │
│  └─ 支持 AI 辅助组装                                         │
├─────────────────────────────────────────────────────────────┤
│  AI Assembly (AI 组装)                                       │
│  ├─ 自然语言描述需求                                         │
│  ├─ AI 从注册表中选择组件                                     │
│  ├─ AI 生成组装代码                                          │
│  └─ 一键部署                                                 │
├─────────────────────────────────────────────────────────────┤
│  Style System (风格系统)                                     │
│  ├─ 多风格预设                                               │
│  ├─ 实时主题编辑                                             │
│  └─ 设计 Token 导出                                          │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 21st SDK 的能力

| 包 | 能力 | 对 Innate 的价值 |
|----|------|----------------|
| `@21st-sdk/react` | React 聊天 UI 组件 | Agent 交互界面 |
| `@21st-sdk/nextjs` | Next.js 集成 | Server Actions + Streaming |
| `@21st-sdk/agent` | Agent + Tool 定义 | Intent Driven 核心 |
| `@21st-sdk/cli` | `an login` + `an deploy` | 组件部署 |

### 3.3 对 Innate 的启示

21st.dev 证明了：**组件注册表 + AI 组装**是未来的方向。Innate 可以借鉴：

1. **Block Registry**: Blocks (Dashboard, Mail, Auth 等) 作为可注册的组装单元
2. **Scene Assembly**: AI 根据用户意图，从 Block Registry 中选择并组装页面
3. **Style Market**: 多主题系统，支持一键切换风格

---

## 四、UI 设计风格灵感来源

### 4.1 核心参考源

| 来源 | 风格特点 | 适用场景 | 参考链接 |
|------|---------|---------|---------|
| **shadcn/ui v4** | 7 种风格 (vega/nova/lyra/maia/mira/luma/sera) | 基础组件风格 | ui.shadcn.com |
| **21st.dev** | 社区组件，现代 SaaS 风格 | 营销/产品页面 | 21st.dev |
| **Superlinear Academy** | 社区感、知识型 | 内容/教育平台 | superlinear.academy |
| **Vercel** | 极简、深色优先 | 开发者工具 | vercel.com |
| **Linear** | 精致、动画流畅 | 生产力工具 | linear.app |
| **Notion** | 留白、内容优先 | 知识管理 | notion.so |
| **Stripe** | 专业、信任感 | 金融/SaaS | stripe.com |
| **Raycast** | 命令行感、快捷 | 效率工具 | raycast.com |
| **Tailwind UI** | 实用、简洁 | 快速原型 | tailwindui.com |
| **Aceternity UI** | 特效、视觉冲击 | 展示/落地页 | ui.aceternity.com |

### 4.2 设计原则提炼

基于以上参考，提炼 Innate 的设计原则：

```
Innate 设计原则
─────────────────
1. 意图优先 (Intent First)
   - UI 服务于用户意图，而非功能罗列
   - 每个页面回答"用户来这里是想做什么"

2. 上下文感知 (Context Aware)
   - 界面元素感知当前场景状态
   - 智能显示/隐藏，减少认知负担

3. 渐进式复杂度 (Progressive Complexity)
   - 默认简洁，按需展开
   - 新手模式 → 进阶模式 → 专家模式

4. 一致性中的多样性 (Consistent Diversity)
   - 统一的设计语言
   - 多风格主题支持 (vega/nova/lyra 等)

5. 流式反馈 (Streaming Feedback)
   - AI 操作过程可见
   - 状态变化实时反馈
```

---

## 五、总体架构设计

### 5.1 Innate 设计-UI 分层架构

```
┌─────────────────────────────────────────────────────────────────┐
│                      Layer 4: 应用层                             │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │ apps/intent     │  │ apps/admin      │  │ apps/docs       │ │
│  │ (Next.js)       │  │ (TanStack)      │  │ (Nextra)        │ │
│  │ AI Intent Drive │  │ Scene Driven    │  │ Content         │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│                      Layer 3: 组装层                             │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  @innate/ui/block/                                       │   │
│  │  ├─ landing/    ← 营销页面区块                           │   │
│  │  ├─ auth/       ← 认证表单区块                           │   │
│  │  ├─ mail/       ← 邮件界面区块                           │   │
│  │  ├─ chat/       ← 聊天界面区块                           │   │
│  │  ├─ admin/      ← 管理后台区块 ← 新增                    │   │
│  │  └─ scene/      ← Scene 构建块 ← 新增                    │   │
│  └─────────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────────┤
│                      Layer 2: 组件层                             │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  @innate/ui/components/ui/                               │   │
│  │  基础组件 (Button, Card, Table, Dialog, etc.)            │   │
│  │  基于 @base-ui/react (升级后) 或 Radix UI (当前)         │   │
│  │  多风格主题支持 (vega/nova/lyra/maia/mira/luma/sera)     │   │
│  └─────────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────────┤
│                      Layer 1: 基础层                             │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │ Tailwind CSS 4  │  │ OKLCH 色彩空间   │  │ CSS 变量主题    │ │
│  │ @base-ui/react  │  │ Geist 字体      │  │ Dark/Light      │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

### 5.2 核心概念定义

| 概念 | 定义 | 示例 |
|------|------|------|
| **Component** | 原子级 UI 组件 | Button, Input, Badge |
| **Block** | 预组装的功能区块 | Dashboard, Mail Inbox, Auth Form |
| **Scene** | 业务场景页面 | "监控仪表盘"、"审批列表"、"用户详情" |
| **Pattern** | UI 交互模式 | "筛选-列表-详情"、"表单-验证-提交" |
| **Intent** | 用户意图 | monitor, act, review, config, create |
| **Style** | 视觉风格主题 | vega, nova, lyra, sera |

---

## 六、详细实施计划

### Phase 1: 基础升级 (2-3 周)

**目标**: 升级主题系统，为多风格做准备

```
Week 1: CSS 变量统一
  ├─ 对齐 shadcn v4 CSS 变量命名
  ├─ 新增 surface/code/selection 变量
  ├─ 引入 @theme inline 语法
  └─ 验证 Dark/Light 切换

Week 2: 多风格主题系统
  ├─ 创建 3 种核心风格: vega (默认) / nova / sera
  ├─ 每种风格独立的 CSS 变量文件
  ├─ 风格切换机制 (class-based)
  └─ 组件适配多风格

Week 3: 验证与修复
  ├─ 全组件视觉回归测试
  ├─ Dark/Light × 3 风格 = 6 种组合验证
  └─ 修复样式差异
```

### Phase 2: UI 基座评估 (1-2 周)

**目标**: 评估 Radix UI → @base-ui 升级的必要性和时机

```
Week 1: 技术调研
  ├─ 评估 @base-ui/react 稳定性
  ├─ 对比 Radix UI vs @base-ui API 差异
  ├─ 编写组件迁移指南
  └─ 确定迁移范围（全部 vs 增量）

Week 2: 试点迁移
  ├─ 选择 3-5 个核心组件试点迁移
  ├─ 验证 @base-ui 在现有项目中的兼容性
  └─ 输出迁移决策报告
```

**关键决策点**:

| 方案 | 说明 | 工作量 | 推荐度 |
|------|------|--------|--------|
| A. 全面迁移 | 所有组件升级到 @base-ui | 2-3 周 | ⭐⭐⭐ |
| B. 增量迁移 | 新组件用 @base-ui，旧组件保持 Radix | 1 周 | ⭐⭐⭐⭐ |
| C. 保持现状 | 继续使用 Radix UI，等待生态成熟 | 0 | ⭐⭐⭐⭐ |

**建议**: 方案 C（保持现状）+ 方案 B（增量）。Radix UI 生态成熟稳定，@base-ui 虽为未来方向但尚在新旧交替期。可以等新项目/新组件使用 @base-ui，现有组件保持 Radix。

### Phase 3: Scene 系统构建 (2-3 周)

**目标**: 建立跨框架的 Scene 规范系统

```
Week 1: Scene 规范定义
  ├─ 定义 SceneSpec TypeScript 接口
  ├─ 定义 Intent 枚举 (monitor/act/review/config/create)
  ├─ 定义 Category 枚举 (dashboard/list/detail/form/chart)
  ├─ 定义 Pattern 库 (10-15 种通用模式)
  └─ 创建 Scene Catalog 数据层

Week 2: Scene Navigation
  ├─ 基于 Scene Catalog 自动生成导航
  ├─ 支持分组、图标、徽章
  ├─ 支持权限过滤
  └─ Next.js 和 TanStack Start 双实现

Week 3: Scene Blocks
  ├─ 提取 admin-ui 的 Scene 构建块
  ├─ 创建 @innate/ui/block/scene/
  ├─ SceneIntro, MetricCards, InfoListCard 等
  └─ 文档和示例
```

### Phase 4: Block 组装系统 (3-4 周)

**目标**: 建立 AI 可理解的 Block 注册表和组装机制

```
Week 1: Block Registry
  ├─ 定义 Block 注册表格式 (JSON Schema)
  ├─ 为现有 8 个 Blocks 编写详细 Spec
  ├─ 每个 Block 包含: 名称、描述、依赖、props、slots
  └─ 创建 Block 搜索/发现接口

Week 2: AI Prompt 标准化
  ├─ 为每个 Block 编写 AI Prompt 模板
  ├─ 标准化 Prompt 格式 (system prompt + user prompt)
  ├─ 支持 Block 组合 Prompt
  └─ 创建 Prompt 版本管理

Week 3: 组装引擎原型
  ├─ AI 根据用户意图选择 Block
  ├─ AI 生成组装代码 (页面级)
  ├─ 人工确认 → 一键应用
  └─ 支持保存为 Template

Week 4: 集成到 Intent Driven
  ├─ Command Box 支持 "/assemble <描述>"
  ├─ AI 分析当前页面，建议添加 Block
  └─ 拖拽式 Block 组装 (可选)
```

### Phase 5: Admin 组件迁移 (2-3 周)

**目标**: 将 admin-ui 有价值的组件提取到 @innate/ui

```
Week 1: 组件审计
  ├─ 盘点 admin-ui 所有组件
  ├─ 评估复用价值 (高/中/低)
  ├─ 识别与现有组件的重复/冲突
  └─ 制定迁移优先级

Week 2: 核心组件迁移
  ├─ section-cards → @innate/ui/block/admin/
  ├─ data-table (增强版) → @innate/ui/
  ├─ metric-cards → @innate/ui/block/admin/
  ├─ scene-blocks → @innate/ui/block/scene/
  └─ dashboard/* → @innate/ui/block/admin/dashboard/

Week 3: 集成验证
  ├─ 在 intent-driven 中使用迁移后的组件
  ├─ 创建 Admin Dashboard 示例页面
  ├─ 验证 Dark/Light/多风格兼容性
  └─ 文档更新
```

### Phase 6: 21st SDK 集成 (2 周)

**目标**: 接入 21st SDK，实现 AI 组装能力

```
Week 1: 基础集成
  ├─ 安装 @21st-sdk/react + @21st-sdk/nextjs
  ├─ 创建 /ui-agent 页面
  ├─ 配置 Agent tools (切换 Block、切换页面、复制 Prompt)
  └─ 基础聊天界面

Week 2: 组装能力
  ├─ Agent 理解 Block Registry
  ├─ Agent 根据描述推荐 Block 组合
  ├─ Agent 生成页面代码
  └─ 一键应用生成的代码
```

---

## 七、设计灵感来源详细清单

### 7.1 按场景分类

| 场景 | 主要灵感来源 | 关键特征 |
|------|-------------|---------|
| **Admin Dashboard** | Vercel Dashboard, Stripe Dashboard, Linear | 数据密度高、深色友好、卡片式布局 |
| **Content/List** | Notion, Superlinear, GitHub Issues | 留白、层次清晰、操作直观 |
| **Form/Wizard** | Typeform, Linear (Issue Creation) | 渐进式、即时验证、智能默认值 |
| **Chat/Agent** | Raycast, ChatGPT, 21st.dev | 命令行感、流式响应、上下文保持 |
| **Marketing/Landing** | 21st.dev, Vercel, Stripe | 动画精致、信息密度适中、CTA 明确 |
| **Code/DevTools** | Vercel, GitHub, Storybook | 代码高亮、暗黑主题、工具链集成 |

### 7.2 设计资源推荐

| 资源 | 类型 | 用途 |
|------|------|------|
| `ui.shadcn.com` | 组件库 | 基础组件参考 |
| `21st.dev` | 组件市场 | Block 组件灵感 |
| `vercel.com/design` | 设计系统 | 企业级设计规范 |
| `linear.app` | 产品 | 动画和交互参考 |
| `refero.design` | 设计参考 | 截图收集和搜索 |
| `mobbin.com` | 设计参考 | App/Web 截图库 |
| `awwwards.com` | 设计灵感 | 获奖网站 |
| `dribbble.com` | 设计灵感 | 概念设计 |

---

## 八、风险管理

| 风险 | 等级 | 缓解措施 |
|------|------|---------|
| @base-ui/react 不稳定 | 🟡 中 | 保持 Radix UI，增量采用 @base-ui |
| 多风格维护成本 | 🟡 中 | 只维护 3 种核心风格，其他按需添加 |
| Scene 系统过度设计 | 🟡 中 | 从简单开始，按需扩展 |
| AI 组装效果不达预期 | 🟡 中 | 先人工组装，再逐步引入 AI |
| 工作量超支 | 🔴 高 | Phase 按优先级排序，允许裁剪 |

---

## 九、总结

### 用户结论验证

| 结论 | 验证结果 |
|------|---------|
| 两个框架共存 | ✅ 非常合理，定位互补 |
| 共用 Scene 理念 | ✅ 极具战略价值，框架无关 |
| 升级到 base-ui | ⚠️ 合理但建议分阶段，当前 Radix UI 仍稳定 |
| 多 theme 支持 | ✅ 必要，shadcn v4 已证明方向 |

### 核心建议

1. **不急于全面迁移到 @base-ui** — Radix UI 生态成熟，@base-ui 尚在新旧交替期
2. **优先做多风格主题系统** — 这是立即可见价值的改进
3. **Scene 理念作为跨项目规范** — 建立统一的 Scene Catalog 和 Intent 体系
4. **21st.dev 模式作为长期愿景** — Block Registry + AI 组装是终极目标
5. **设计灵感持续收集** — 建立内部设计参考库，定期更新

### 下一步行动

1. **本周**: 启动 Phase 1 — CSS 变量对齐和多风格主题
2. **下周**: 启动 Phase 3 — Scene 规范定义
3. **本月内**: 完成 Phase 1 + Phase 3 基础版
4. **持续**: 收集设计灵感，更新设计参考库
