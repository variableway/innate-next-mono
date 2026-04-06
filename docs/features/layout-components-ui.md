# Layout Components UI - 可行性分析与架构设计

## 一、项目目标

创建一个 **组件展示 + AI Task 描述生成器** 网站，用户可以：

1. 浏览所有 UI 组件（49 个基础组件 + 4 类 Block 组件）
2. 查看组件的实时预览和源代码
3. 选择/组合组件，自动生成 AI Agent 可理解的 Task 描述
4. 复制 Task 描述用于 AI 编程工具

**核心价值**：让非前端开发者也能准确描述 UI 需求，减少 AI 生成 UI 时的沟通成本。

---

## 二、可行性分析

### 2.1 技术可行性：✅ 完全可行

| 维度 | 评估 | 说明 |
|------|------|------|
| 组件库 | ✅ 已有 | 49 个基础组件 + 4 类 Block（Landing、Auth、Mail、Chat） |
| 框架 | ✅ 成熟 | Next.js App Router + React 19 |
| 样式 | ✅ 统一 | Tailwind CSS v4 + OKLCH 色彩系统 |
| 代码展示 | ✅ 方案多 | shadcn 官方用 rehype-pretty-code，也可用 Prism/Shiki |
| AI 描述生成 | ✅ 可行 | 纯前端逻辑，基于模板 + 用户选择组合 |

### 2.2 参考项目

我们已有 10 个参考模板在 `frontend-tpl/` 中，其中：
- **shadcn-ui** 官方文档站：展示了组件预览 + 代码复制的标准模式
- **shadcn-cheatsheet**：展示了交互式组件参考的实现
- **shadcn-dashboard-landing-template**：展示了完整的 Mail/Chat/Dashboard 应用

### 2.3 难点评估

| 难点 | 难度 | 说明 |
|------|------|------|
| 组件实时预览 | ⭐⭐ 中等 | 需要在 iframe 或隔离环境中渲染组件，避免样式冲突 |
| 代码高亮展示 | ⭐ 简单 | 使用 Shiki 或 Prism.js，现成的方案 |
| AI Task 描述生成 | ⭐⭐ 中等 | 需要设计好模板系统，覆盖各种组合场景 |
| 组件组合编排 | ⭐⭐⭐ 较难 | 用户拖拽/选择组件组合成页面布局，需要交互设计 |
| 搜索和过滤 | ⭐ 简单 | 使用 cmdk（已有依赖）实现命令面板 |

---

## 三、架构设计

### 3.1 整体架构

```
innate-next-mono/
├── apps/
│   └── showcase/              # 新建：组件展示网站
│       ├── app/
│       │   ├── (docs)/        # 文档路由组
│       │   │   ├── components/   # /components/button
│       │   │   ├── blocks/       # /blocks/landing/hero
│       │   │   └── layouts/      # /layouts/sidebar
│       │   ├── task-builder/     # /task-builder AI Task 生成器
│       │   ├── layout.studio.tsx
│       │   └── page.tsx           # 首页
│       ├── components/
│       │   ├── component-preview.tsx  # 组件预览容器
│       │   ├── code-block.tsx         # 代码展示（带高亮+复制）
│       │   ├── task-generator.tsx     # AI Task 描述生成器
│       │   ├── component-selector.tsx # 组件选择器
│       │   └── layout-canvas.tsx      # 布局画布（组合预览）
│       ├── lib/
│       │   ├── registry.ts         # 组件注册表（元数据）
│       │   └── task-templates.ts    # AI Task 描述模板
│       └── package.json
├── packages/
│   └── ui/                    # 现有：组件库 @innate/ui
```

### 3.2 核心模块

#### 模块 A：组件注册表（Registry）

**做什么**：为每个组件维护一份结构化的元数据

**为什么重要**：这是整个系统的基础。注册表决定了网站能展示什么、如何分类、生成什么代码。

```typescript
// 每个组件的注册信息
interface ComponentRegistry {
  name: string                  // 组件名称，如 "Button"
  category: "ui" | "block" | "layout"
  subcategory?: string          // 如 "form"、"navigation"、"landing"
  description: string           // 简短描述
  props: PropDefinition[]       // Props 类型定义
  variants: VariantDefinition[] // 变体列表
  dependencies: string[]        // 依赖的其他组件
  sourceFile: string            // 源码路径
  examples: ExampleDefinition[] // 示例列表
  taskTemplate?: string         // AI Task 描述模板
}
```

#### 模块 B：组件预览（Component Preview）

**做什么**：实时渲染组件，用户能看到效果

**技术方案**：
- **方案 1（推荐）**：直接渲染 - 在页面中直接使用 `@innate/ui` 组件
  - 优点：简单、快速、样式一致
  - 缺点：全局样式可能冲突
- **方案 2**：iframe 隔离 - 在 iframe 中渲染组件
  - 优点：完全隔离
  - 缺点：通信复杂、性能开销

**推荐方案 1**，因为我们控制整个样式系统。

#### 模块 C：代码展示（Code Block）

**做什么**：展示组件的源代码，带语法高亮和复制功能

**技术方案**：
- 使用 **Shiki** 做语法高亮（shadcn 官方方案）
- 集成 CopyButton 实现一键复制
- 支持 "展开/折叠" 长代码

#### 模块 D：AI Task 描述生成器（核心创新）

**做什么**：用户选择组件 → 自动生成 AI 可理解的 Task 描述

**工作原理**：

```
用户操作                     系统生成
─────────                   ────────
选择 HeroSection         →  "创建一个 Hero Section，包含标题、副标题和两个CTA按钮"
选择 PricingSection      →  "在 Hero 下方添加 Pricing Section，包含3个价格计划卡片"
选择侧边栏布局            →  "使用可折叠侧边栏布局，左侧导航，右侧主内容区"

→ 最终生成的 Task 描述：

"创建一个 SaaS Landing Page，使用以下组件和布局：
1. 顶部：固定导航栏（Navbar），包含 Logo、导航链接、主题切换和 CTA 按钮
2. Hero Section：居中布局，大标题带渐变高亮文字，副标题，两个 CTA 按钮
3. Features Section：3列网格布局，每个 Feature 卡片包含图标、标题和描述
4. Pricing Section：月/年切换，3个价格卡片，中间卡片标记为 Popular
5. Footer：4列链接布局，底部版权信息

使用 @innate/ui 组件库，所有组件从 packages/ui 导入。
响应式设计，支持暗色模式。"
```

**模板系统设计**：

```typescript
// task-templates.ts
const templates = {
  // 组件级模板
  component: {
    HeroSection: (config) => `
创建一个 Hero Section：
- 标题：${config.title || "自定义标题"}
- 渐变高亮文字：${config.highlight || "关键词"}
- 副标题：${config.subtitle || "描述文字"}
- ${config.primaryCta ? `主按钮：${config.primaryCta}` : "主按钮：Get Started → /signup"}
- ${config.badge ? `徽章：${config.badge}` : "可选徽章"}
组件：从 @innate/ui 导入 HeroSection`.trim(),
  },
  
  // 布局级模板
  layout: {
    dashboard: (config) => `
创建一个 Dashboard 布局：
- 使用 ResizablePanelGroup 实现 3 栏布局
- 左侧：可折叠 Sidebar（20%宽度），包含导航菜单
- 中间：内容列表区域（32%宽度）
- 右侧：详情展示区域（48%宽度）
- 顶部：固定 Header，包含搜索和用户菜单
组件：从 @innate/ui 导入 Sidebar、ResizablePanel、Separator`.trim(),
  },
  
  // 页面级模板
  page: {
    landing: (sections) => `
创建一个 SaaS Landing Page：
${sections.map((s, i) => `${i + 1}. ${s}`).join("\n")}
使用 @innate/ui 组件库，所有组件从 packages/ui 导入。
响应式设计，支持暗色模式。`.trim(),
  },
}
```

### 3.3 页面结构

```
首页 (/)
├── 组件目录 (/components)
│   ├── /components/button       # 单个组件详情
│   ├── /components/dialog
│   └── ... (49 个组件)
├── Block 目录 (/blocks)
│   ├── /blocks/landing/hero
│   ├── /blocks/mail/inbox
│   └── ...
├── Task Builder (/task-builder)  # ⭐ 核心功能
│   ├── 组件选择面板（左侧）
│   ├── 实时预览（中间）
│   └── Task 描述输出（右侧）
└── Layout Studio (/layouts)      # 布局编辑器
```

---

## 四、技术细节（非前端专家也能理解）

### 4.1 什么是 "组件注册表"？

**类比理解**：就像餐厅的菜单。每个组件是一道菜，注册表记录了：
- 菜名（组件名）
- 分类（前菜/主菜 → ui/block/layout）
- 配料（依赖的其他组件）
- 做法步骤（源代码）
- 推荐搭配（组合建议）

### 4.2 什么是 "AI Task 描述"？

**问题背景**：当用户想用 AI（如 Claude）创建一个网页时，他们往往描述不清需求。

**解决方案**：系统根据用户选择的组件，自动生成结构化的描述，让 AI 精确理解要建什么页面、用什么组件。

**示例**：
- ❌ 用户原始描述："帮我做一个好看的首页"
- ✅ 系统生成的描述："创建 Landing Page：Hero（渐变标题 + 双CTA）→ Features（3列网格）→ Pricing（月/年切换，3计划卡）→ FAQ（手风琴）→ CTA（渐变背景）"

### 4.3 "组件预览" 技术难点

**挑战**：在一个页面里展示几十个组件，每个组件可能有不同状态（正常、悬停、禁用）。

**解决方案**：
- 使用 **Tabs** 切换不同变体展示
- 每个预览区域有独立的 **背景容器**（白色/暗色切换）
- 代码和预览使用 **可调整大小的面板**（ResizablePanel）

### 4.4 "Task 描述生成" 的技术原理

这不需要 AI 模型，纯模板引擎：

1. 用户选择组件 → 记录到**状态管理**（React State）
2. 用户调整参数 → 更新状态
3. 用户点击"生成" → 模板引擎读取状态，填入模板变量
4. 输出结果 → 显示在文本框中，可一键复制

---

## 五、任务拆解

### Phase 1：基础设施（2-3 天）

| 任务 | 说明 | 产出 |
|------|------|------|
| T1.1 创建 Showcase App | 在 `apps/showcase/` 初始化 Next.js 项目 | 可运行的空项目 |
| T1.2 集成 @innate/ui | 配置 monorepo 引用和 Tailwind CSS | 可使用组件库 |
| T1.3 搭建页面框架 | Layout（Sidebar + Header + Content） | 基本导航结构 |
| T1.4 添加代码高亮 | 集成 Shiki 语法高亮 | 可展示代码 |

### Phase 2：组件展示（3-4 天）

| 任务 | 说明 | 产出 |
|------|------|------|
| T2.1 创建组件注册表 | 为所有 49 个组件定义元数据 | `registry.ts` |
| T2.2 组件列表页 | /components 页面，分类展示所有组件 | 可浏览组件 |
| T2.3 组件详情页 | /components/[name]，预览 + 代码 + Props 表 | 可查看单个组件 |
| T2.4 Block 展示页 | /blocks 页面，展示 Landing/Auth/Mail/Chat | 可查看 Block |
| T2.5 搜索功能 | 使用 cmdk 实现全局组件搜索 | ⌘K 搜索 |

### Phase 3：AI Task Builder（核心功能）（3-4 天）

| 任务 | 说明 | 产出 |
|------|------|------|
| T3.1 设计 Task 模板 | 为每种组件/布局设计 AI Task 描述模板 | `task-templates.ts` |
| T3.2 组件选择器 | 可搜索、可多选的组件列表 | 选择面板 |
| T3.3 参数配置面板 | 选中组件后可调整关键参数 | 参数面板 |
| T3.4 实时预览画布 | 组合选中组件的实时预览 | 预览区域 |
| T3.5 Task 描述生成 | 根据选择生成 AI Task 描述 | 文本输出 |
| T3.6 复制/导出功能 | 一键复制 Task 描述 | 复制按钮 |

### Phase 4：优化完善（1-2 天）

| 任务 | 说明 | 产出 |
|------|------|------|
| T4.1 暗色模式 | 全面支持暗色主题切换 | 主题切换 |
| T4.2 响应式 | 移动端适配 | 移动端可用 |
| T4.3 快速布局模板 | 预设常见页面模板（SaaS、Dashboard、Blog） | 一键选模板 |
| T4.4 部署配置 | Vercel 部署配置 | 可访问的线上站点 |

---

## 六、关键技术选型

| 技术 | 用途 | 原因 |
|------|------|------|
| Next.js 15+ | 框架 | App Router、SSG、与 monorepo 集成 |
| @innate/ui | 组件库 | 已有 49 组件 + 4 Block |
| Shiki | 代码高亮 | VSCode 同款引擎，支持所有语言 |
| cmdk | 搜索 | 已有依赖，⌘K 命令面板 |
| Zustand | 状态管理 | Task Builder 的选择状态管理 |
| Sonner | 通知 | 已有依赖，复制成功提示 |

---

## 七、风险与应对

| 风险 | 可能性 | 应对 |
|------|--------|------|
| 组件预览样式冲突 | 中 | 使用统一的 Tailwind 配置，避免全局污染 |
| Task 模板不够灵活 | 中 | 设计可扩展的模板系统，用户可编辑生成结果 |
| 大量组件加载慢 | 低 | 按需加载（dynamic import），代码分割 |
| AI 描述质量不高 | 中 | 参考实际 AI 编程场景的 Prompt，迭代优化模板 |

---

## 八、总结

这个项目 **技术可行**，核心创新在于 **AI Task 描述生成器**。现有组件库（49 基础组件 + 4 Block）提供了丰富的展示素材。预计 **10-12 天**可完成 MVP 版本。

**建议优先级**：
1. Phase 1 + Phase 2（组件展示）→ 先让网站能跑起来
2. Phase 3（Task Builder）→ 核心创新功能
3. Phase 4（优化）→ 锦上添花
