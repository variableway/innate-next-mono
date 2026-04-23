# Intent Driven Application - Implementation Details

> 项目路径: `apps/intent-driven/`
> 创建日期: 2026-04-23
> 参考布局: `tasks/product/layout.png` (Superlinear Academy)

---

## 一、项目结构

```
apps/intent-driven/
├── app/
│   ├── globals.css          # 全局样式，导入 @innate/ui/globals.css
│   ├── layout.tsx           # 根布局，注入 AppLayout
│   └── page.tsx             # Deep News 示例页面
├── components/
│   └── layout/
│       ├── app-layout.tsx   # 整体布局容器
│       ├── sidebar.tsx      # 左侧导航栏（Icon Rail + Nav Panel）
│       └── header.tsx       # 顶部导航栏
├── lib/
│   └── utils.ts             # cn() 工具函数
├── package.json             # 依赖配置
├── tsconfig.json            # TypeScript 配置
├── next.config.ts           # Next.js 配置（静态导出）
├── postcss.config.mjs       # PostCSS 配置
└── components.json          # shadcn/ui 配置
```

---

## 二、Layout 架构

### 2.1 整体结构

```
┌─────────────────────────────────────────────────────────────┐
│                          Header (50px)                       │
│  [Logo] [Nav Tabs]                    [Search] [Notify] [👤]│
├────────┬────────────────────────────────────────────────────┤
│        │                                                    │
│ Icon   │              Main Content Area                     │
│ Rail   │                                                    │
│ (50px) │  ┌─────────────────────────────────────────────┐   │
│        │  │  Page Title + Filter/Sort                   │   │
│ ┌────┐ │  ├─────────────────────────────────────────────┤   │
│ │ 🏠 │ │  │  ┌─────────────────────────────────────┐    │   │
│ │ ➕ │ │  │  │ Card 1: Title + Author + Content   │    │   │
│ └────┘ │  │  │        + Actions (Like/Comment)    │    │   │
│        │  │  └─────────────────────────────────────┘    │   │
│ Nav    │  │  ┌─────────────────────────────────────┐    │   │
│ Panel  │  │  │ Card 2: Title + Author + Content   │    │   │
│ (220px)│  │  │        + Actions (Like/Comment)    │    │   │
│        │  │  └─────────────────────────────────────┘    │   │
│        │  │                                               │   │
│        │  └─────────────────────────────────────────────┘   │
│        │                                                    │
└────────┴────────────────────────────────────────────────────┘
```

### 2.2 组件职责

| 组件 | 文件 | 职责 |
|------|------|------|
| **AppLayout** | `app-layout.tsx` | 顶层布局容器，组织 Sidebar + Header + Main Content 的相对位置 |
| **Sidebar** | `sidebar.tsx` | 左侧双栏导航：50px Icon Rail + 220px Navigation Panel |
| **Header** | `header.tsx` | 顶部栏：Logo/品牌 + 导航标签 + 搜索/通知/头像 |
| **DeepNewsPage** | `page.tsx` | 主内容区示例：Deep News 文章卡片列表 |

### 2.3 Sidebar 设计细节

**Icon Rail (50px)**:
- 垂直排列的图标按钮
- 顶部：Home Feed、Add (+)
- 底部：Bookmarks、Messages、Settings
- Hover 状态：`hover:bg-accent` + `hover:text-foreground`

**Navigation Panel (220px)**:
- 可折叠（`isExpanded` 状态）
- 分组导航项，支持分组标题
- 导航项格式：`[Icon] [Label] [Count Badge]`
- Active 状态：`bg-accent` + `text-accent-foreground`
- 分组示例：
  - Superlinear AI（课程/内容类）
  - 社区公共空间（讨论/互动类）
  - 请代表基层的会员们（主题/活动类）

### 2.4 Header 设计细节

- **高度**: 50px（`h-14`）
- **左侧**: Logo（方块+首字母）+ 品牌名 + Dropdown Chevron
- **中间**: 导航标签（Home / Learning Library / Overview & Freebies / AI Coding Basics / Events）
- **右侧**:
  - Search 输入框（带图标，`bg-muted`）
  - Notification（带红点指示器）
  - Message
  - Bookmark
  - User Avatar

### 2.5 Main Content 设计细节

**Deep News 页面**:
- 页面标题区：标题 + Sort Dropdown + Like 统计
- 文章卡片列表
- 每张卡片包含：
  - 标题（`text-base font-semibold`）
  - 作者信息：Avatar + Name + Admin Badge + Date + Join Date
  - 内容区：Bold 标题重复 + 摘要文本
  - "See more" 展开按钮
  - 底部操作栏：Like / Comment / Liked-by Avatars / Like&Comment Count / Bookmark / More

---

## 三、技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Next.js | 16.2.4 | React 框架，App Router |
| React | 19.2.5 | UI 库 |
| TypeScript | 6.0.3 | 类型安全 |
| Tailwind CSS | 4.2.4 | 原子化样式 |
| @innate/ui | workspace | shadcn/ui 组件库（Button, Card, Avatar, Badge, Input 等） |
| @innate/utils | workspace | 共享工具函数 |
| lucide-react | 0.511.0 | 图标库 |
| framer-motion | 12.38.0 | 动画（预留） |

---

## 四、验证结果

### 4.1 项目构建

```bash
cd apps/intent-driven
pnpm build
```

✅ **构建成功** — 静态页面生成完成（3/3 pages）

### 4.2 shadcn/ui 组件更新

```bash
cd apps/intent-driven
npx shadcn@latest add tooltip -y
```

✅ **组件添加成功** — `src/components/ui/tooltip.tsx` 已创建

> 说明：由于项目使用 monorepo workspace 结构，实际生产环境中建议在 `packages/ui` 中统一管理组件，apps 通过 `@innate/ui` 引用。但在单个 app 中独立添加组件也是可行的。

### 4.3 其他组件库安装

```bash
cd apps/intent-driven
pnpm add date-fns
```

✅ **安装成功** — date-fns 4.1.0 已添加到依赖

---

## 五、关键文件说明

### 5.1 `app/layout.tsx`

- 使用 `Geist` 和 `Geist_Mono` 字体
- 注入 `AppLayout` 作为全局布局包裹器
- `suppressHydrationWarning` 避免 next-themes 的 hydration 警告

### 5.2 `next.config.ts`

- `output: 'export'` — 静态导出模式
- `distDir: 'dist'` — 输出到 dist 目录

### 5.3 `tsconfig.json`

- 继承 `@innate/tsconfig/nextjs.json`
- Path alias: `@/*` → `./src/*`, `@innate/ui` → `../../packages/ui/src`

---

## 六、后续优化建议

1. **响应式适配**: 当前布局为桌面端优化，移动端需将 Sidebar 转为 Drawer，Header 转为 Hamburger 菜单
2. **主题切换**: 集成 next-themes 实现 Dark/Light 模式切换
3. **路由集成**: 将 Header Nav Tabs 和 Sidebar 导航项与 Next.js App Router 路由绑定
4. **数据层**: 当前页面使用静态 mock 数据，后续需接入 API 或 CMS
5. **性能优化**: 对文章卡片列表实现虚拟滚动（Virtuoso 或 react-window）
6. **无障碍**: 补充 ARIA 标签和键盘导航支持

---

## 七、Layout 示范图

详见: [`layout-diagram.svg`](layout-diagram.svg)

SVG 矢量图展示了完整的 Layout 架构：
- Icon Rail (50px) + Navigation Panel (220px)
- Header (50px) with Logo / Tabs / Actions
- Main Content Area with Card List
- 标注了各区域的尺寸和职责
