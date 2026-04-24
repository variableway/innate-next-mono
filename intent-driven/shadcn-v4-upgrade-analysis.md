# shadcn/ui v4 升级分析与持续更新策略

> 分析日期: 2026-04-23
> 分析对象: packages/ui (@innate/ui) vs shadcn/ui v4 (references/ui/apps/v4/)

---

## 一、当前 innate/ui 状态快照

| 维度 | 现状 |
|------|------|
| **组件数量** | 57 个基础组件 + Block 组件 |
| **UI 基座** | Radix UI (v1.x) — 34 个组件直接依赖 |
| **Tailwind** | v4 + oklch |
| **样式文件** | globals.css（传统 CSS 变量） |
| **组件配置** | ❌ 无 components.json |
| **多风格** | ❌ 单主题（new-york） |
| **@theme inline** | ❌ 未使用 |
| **shadcn/tailwind.css** | ❌ 未导入 |

### 已具备的 v4 特性

 surprisingly，当前 innate/ui 已经部分吸收了 v4 的改进：

```tsx
// button.tsx —— 已包含 v4 风格的语法
const buttonVariants = cva(
  "... outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 ...",
  // has-[>svg]:px-3 等现代 Tailwind 语法
)
```

**这说明组件代码本身并不落后，差距主要在基础设施层。**

---

## 二、v4 的核心改进（升级价值评估）

### 2.1 改进项与价值评分

| 改进项 | 说明 | 对 Innate 的价值 | 必要性 |
|--------|------|-----------------|--------|
| **@base-ui/react** | Radix UI 的继任者 | 🟡 中长期价值 | 低（当前 Radix 稳定） |
| **7 种风格系统** | vega/nova/lyra/maia/mira/luma/sera | 🟢 高价值 | **高** |
| **@theme inline** | Tailwind 4 新语法 | 🟢 高价值 | **高** |
| **components.json** | 组件配置标准化 | 🟢 高价值 | **高** |
| **新增 CSS 变量** | surface/code/selection | 🟢 中等价值 | 中 |
| **shadcn/tailwind.css** | 官方样式层 | 🟡 中等价值 | 中 |
| **Slot 组件变化** | @radix-ui/react-slot → base-ui Slot | 🔴 无直接价值 | 低 |

### 2.2 真正值得升级的部分

```
┌─────────────────────────────────────────────────────────────┐
│  v4 改进项                      优先级   工作量   推荐度    │
├─────────────────────────────────────────────────────────────┤
│  1. 多风格主题系统               P0       3-5d    ⭐⭐⭐⭐⭐  │
│  2. @theme inline 语法           P0       1-2d    ⭐⭐⭐⭐⭐  │
│  3. components.json 配置         P0       1d      ⭐⭐⭐⭐⭐  │
│  4. 新增 CSS 变量                P1       1d      ⭐⭐⭐⭐   │
│  5. shadcn/tailwind.css          P1       1d      ⭐⭐⭐    │
│  6. Radix UI → @base-ui          P2       2-3w   ⭐⭐      │
└─────────────────────────────────────────────────────────────┘
```

**结论：前 3 项（主题系统 + @theme inline + components.json）是"必升项"，Radix → @base-ui 是"可选项"。**

---

## 三、升级路径设计（分阶段）

### Phase 1: 基础设施对齐（1 周）

**目标**：让 innate/ui 具备 v4 的"外壳"

```
Day 1: 创建 components.json
  ├─ 定义 style: "new-york"
  ├─ 定义 rsc: true, tsx: true
  ├─ 配置 Tailwind 路径
  └─ 配置 aliases (components/utils/ui/lib/hooks)

Day 2-3: 引入 @theme inline
  ├─ 改造 globals.css
  ├─ 添加 @theme inline 块
  ├─ 映射现有 CSS 变量到 Tailwind theme
  └─ 验证所有组件样式正常

Day 4-5: 新增 CSS 变量
  ├─ --color-surface
  ├─ --color-code / --color-code-foreground
  ├─ --color-selection
  └─ 验证 Dark/Light 模式
```

### Phase 2: 多风格主题系统（1-2 周）

**目标**：从单主题扩展到 3 种核心风格

```
Week 1: 核心风格实现
  ├─ style-vega (默认，保持当前风格)
  ├─ style-nova (现代圆润)
  ├─ style-sera (精致专业)
  └─ 每种风格独立的 CSS 变量文件

Week 2: 组件适配 + 验证
  ├─ Button/Card/Input 等核心组件适配多风格
  ├─ 风格切换机制（class-based）
  └─ 全组件视觉回归测试
```

### Phase 3: Radix → @base-ui 评估（可选，2-3 周）

**目标**：试点迁移，评估是否全面切换

```
Week 1: 技术验证
  ├─ 选择 3 个组件试点迁移（Button, Dialog, Tooltip）
  ├─ 对比 Radix vs @base-ui API 差异
  └─ 测试与现有代码的兼容性

Week 2: 决策
  ├─ 评估稳定性、生态成熟度
  ├─ 产出迁移决策报告
  └─ 确定：全面迁移 / 增量迁移 / 保持现状

Week 3: 执行（如果决定迁移）
  └─ 或：制定长期迁移路线图
```

---

## 四、持续更新策略（核心问题）

这是用户最关心的部分。shadcn/ui 是 **copy-paste 模式**，意味着：
- 组件代码在项目中，不在 node_modules
- 上游更新时，需要手动同步到项目

### 4.1 当前同步方式的痛点

```
上游 shadcn/ui 发布更新
        ↓
开发者在官网查看最新组件代码
        ↓
手动复制到项目中
        ↓
解决合并冲突
        ↓
测试回归
        ↓
（重复 57 次，对每个组件）
```

**问题**：
- 无法知道哪些组件有更新
- 手动同步容易遗漏
- 自定义修改会被覆盖
- 没有版本追踪

### 4.2 推荐方案：三层更新策略

#### Layer 1: 自动化跟踪（每周一次）

**工具**: 自定义脚本 + GitHub API

```bash
# scripts/sync-shadcn.sh
#!/bin/bash
# 1. 获取 shadcn/ui 最新 release
# 2. 对比本地组件与上游差异
# 3. 生成变更报告

LATEST_TAG=$(curl -s https://api.github.com/repos/shadcn-ui/ui/releases/latest | jq -r .tag_name)
echo "Latest shadcn/ui: $LATEST_TAG"

# 对比 button.tsx
# ...
```

**输出**: `sync-report-2026-04-23.md`
```markdown
## shadcn/ui 同步报告

### 有更新的组件
| 组件 | 本地版本 | 上游版本 | 变更类型 | 风险 |
|------|---------|---------|---------|------|
| Button | v2.1 | v2.3 | 新增 `size="icon-sm"` | 低 |
| Dialog | v1.8 | v2.0 | 动画 API 变更 | 高 |
| Sidebar | v3.2 | v3.5 | 新增 `collapsible` 属性 | 中 |

### 无需更新的组件
Accordion, Avatar, Badge ... (34 个)

### 建议操作
1. 低风险更新：Button, Badge, Card (自动应用)
2. 中风险更新：Sidebar (需人工 Review)
3. 高风险更新：Dialog (需测试验证)
```

#### Layer 2: 语义化版本标记（每个组件）

在每个组件文件头部添加版本标记：

```tsx
// packages/ui/src/components/ui/button.tsx
// @shadcn-version: 2.3.0
// @last-sync: 2026-04-23
// @custom-modifications:
//   - 新增 `intent-driven` variant
//   - 修改 `icon` size 为 `size-5`

import * as React from 'react'
// ...
```

**好处**:
- 一眼看出组件是否落后
- 记录自定义修改，同步时不会丢失
- 便于自动化脚本判断更新范围

#### Layer 3: 变更隔离机制（防止覆盖自定义）

```
packages/ui/src/components/ui/
├─ button.tsx                    ← 上游同步（只放纯上游代码）
├─ button.custom.tsx             ← 自定义扩展（可选）
├─ _sync/
│   ├─ button-2.3.0.tsx         ← 上游原始备份
│   └─ button-2.2.0.tsx         ← 上一版本备份
└─ index.ts                      ← 导出时合并 base + custom
```

**合并策略**:
```tsx
// index.ts
export * from './button'           // 上游基础
export { IntentDrivenButton } from './button.custom'  // 自定义扩展
```

### 4.3 长期方案：Fork + 定期 Rebase

更激进的方案：Fork shadcn/ui 官方仓库，定期 rebase：

```bash
# 设置上游
gh repo fork shadcn-ui/ui --clone=false
# 本地添加 upstream remote
git remote add upstream https://github.com/shadcn-ui/ui.git

# 每周同步
git fetch upstream
git rebase upstream/main
# 解决冲突
# 测试
# 发布到内部 registry
```

**适用场景**:
- 团队规模 > 5 人
- 需要大量自定义组件
- 有专人维护 UI 基础设施

**不适用场景**:
- 小团队（维护成本太高）
- 自定义修改少（直接用官方更好）

---

## 五、v4 升级决策矩阵

### 5.1 升级 vs 不升级

| 因素 | 升级 v4 | 保持现状 |
|------|---------|---------|
| **多风格需求** | ✅ 原生支持 | ❌ 自己实现 |
| **@theme inline** | ✅ 更现代 | ⚠️ 当前也够用 |
| **components.json** | ✅ shadcn CLI 可用 | ❌ 无法使用 CLI |
| **上游同步** | ✅ 更容易 | ⚠️ 也能同步，稍麻烦 |
| **工作量** | 2-3 周 | 0 |
| **风险** | 中（可能有 breaking change） | 低 |
| **长期维护** | ✅ 跟随社区 | ⚠️ 可能逐渐落后 |

### 5.2 我的建议

```
┌─────────────────────────────────────────────────────────────┐
│  推荐策略："基础设施升级 + 组件按需更新"                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ✅ 必做（本周内）                                           │
│  ├─ 创建 components.json                                     │
│  ├─ 引入 @theme inline                                       │
│  └─ 建立组件版本标记规范                                      │
│                                                              │
│  ✅ 优先做（本月内）                                          │
│  ├─ 实现 3 种核心风格（vega/nova/sera）                       │
│  ├─ 建立自动化同步脚本                                        │
│  └─ 新增 surface/code CSS 变量                               │
│                                                              │
│  ⚠️ 暂缓（观察期）                                           │
│  ├─ Radix UI → @base-ui（等生态成熟）                        │
│  └─ 全面组件重写                                             │
│                                                              │
│  🔄 持续（每周）                                             │
│  ├─ 运行同步脚本，检查上游变更                                │
│  ├─ Review 变更报告，选择性应用                               │
│  └─ 更新组件版本标记                                         │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 六、快速启动方案

如果决定开始升级，以下是 **最小可行升级**（1 天内完成）：

### Step 1: 创建 components.json（10 分钟）

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@innate/ui",
    "utils": "@innate/ui",
    "ui": "@innate/ui",
    "lib": "@innate/ui",
    "hooks": "@innate/ui"
  },
  "iconLibrary": "lucide"
}
```

### Step 2: 添加 @theme inline（30 分钟）

```css
/* packages/ui/src/globals.css */
@import 'tailwindcss';
@import 'tw-animate-css';

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
  --color-surface: var(--surface);
  --color-surface-foreground: var(--surface-foreground);
}

:root {
  /* 现有变量 + 新增 */
  --surface: oklch(0.97 0 0);
  --surface-foreground: oklch(0.145 0 0);
  /* ... 现有变量 ... */
}
```

### Step 3: 添加组件版本标记（1 小时）

为每个组件添加头部注释：

```tsx
// packages/ui/src/components/ui/button.tsx
// @shadcn-version: 2.3.0
// @last-sync: 2026-04-23
// @upstream: https://github.com/shadcn-ui/ui/tree/main/apps/v4/registry/new-york-v4/ui/button.tsx
// @custom-modifications: none
```

### Step 4: 创建同步脚本（2 小时）

```bash
# scripts/sync-shadcn.sh
#!/bin/bash
set -e

REPO_ROOT=$(git rev-parse --show-toplevel)
UI_DIR="$REPO_ROOT/packages/ui/src/components/ui"
REPORT_FILE="$REPO_ROOT/sync-report-$(date +%Y-%m-%d).md"

# 获取最新 release
LATEST=$(curl -s https://api.github.com/repos/shadcn-ui/ui/releases/latest | jq -r .tag_name)
echo "# shadcn/ui 同步报告" > "$REPORT_FILE"
echo "日期: $(date)" >> "$REPORT_FILE"
echo "上游版本: $LATEST" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"

# TODO: 实现组件级别的 diff 检测
# 可以使用 GitHub Raw API 对比文件内容

echo "报告已生成: $REPORT_FILE"
```

---

## 七、总结

| 问题 | 结论 |
|------|------|
| **v4 升级是否必要？** | ✅ **建议升级**，但只需升级"基础设施"（components.json + @theme inline + 多风格），不需要全面重写组件 |
| **Radix → @base-ui 是否必须？** | ❌ **不是必须**，Radix UI 仍然稳定，可以等 @base-ui 生态更成熟 |
| **持续更新怎么做？** | 三层策略：自动化跟踪脚本 + 组件版本标记 + 变更隔离机制 |
| **最小启动成本？** | 1 天（components.json + @theme inline + 版本标记） |
| **最大收益点？** | 多风格主题系统 — 让 Innate 项目可以一键切换视觉风格 |

### 核心建议

1. **本周内**：创建 components.json，建立版本标记规范
2. **本月内**：实现 3 种核心风格，建立自动化同步脚本
3. **持续**：每周运行同步脚本，选择性应用上游更新
4. **暂缓**：Radix → @base-ui 的全面迁移，等生态成熟

**v4 升级不是"要不要"的问题，而是"升级多少"的问题。建议"小步快跑"，先对齐基础设施，组件按需更新。**
