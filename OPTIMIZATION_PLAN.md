# innate-next-mono 优化计划

> 目标：将 innate-next-mono 从"自建组件库"改造为"聚合型 Template 项目"
> 依据：tasks/analysis/fe-skills-frontend-optimization.md 调研结论

---

## 一、可行性评估

### 当前状态

| 维度 | 现状 | 评估 |
|------|------|------|
| 项目结构 | Monorepo（packages/ui + utils + tsconfig） | ✅ 结构合理，多项目复用的最佳骨架 |
| 组件实现 | 50+ 预置组件（基于 shadcn/ui） | ✅ 核心资产，配合自动更新可持续维护 |
| 主题系统 | OKLCH + Tailwind CSS v4 | ✅ 质量高，保留作为配置层 |
| 业务区块 | Landing、Auth、Chat、Mail | ✅ 有价值，保留 |
| 应用示例 | apps/web/ 已创建 | ✅ 完整的 Web 应用 starter |
| 自动更新 | GitHub Action 已配置 | ✅ 每周自动同步 shadcn/ui 组件 |
| 模板目录 | frontend-tpl/ 全为空 | ❌ 废弃占位目录，已迁移至 apps/web/ |

### 结论（修正版）

**innate-next-mono 的定位：**

不是"自建组件库"，而是"预置组件的 Monorepo Template"。

核心策略修正：
1. ✅ **保留** `packages/ui/src/components/ui/` 中的 50+ 预置组件（核心复用资产）
2. ✅ **新增** GitHub Action 自动更新流水线（每周同步 shadcn/ui）
3. ✅ **新增** `scripts/sync-from-shadcn.sh` 手动同步脚本
4. ✅ **保留** Monorepo 结构（多项目共享 UI 的最佳实践）
5. ✅ **保留** 主题系统（globals.css）和业务区块（block/）

---

## 二、改造方案

### Phase 1: 创建 Web 应用模板（apps/web/）

创建完整的 Next.js 16 Web 应用，作为 starter 模板：

```
apps/web/
├── app/
│   ├── layout.tsx          # 根布局（字体、主题）
│   ├── page.tsx            # Landing Page 示例
│   ├── dashboard/
│   │   └── page.tsx        # Dashboard 布局示例
│   └── globals.css         # 导入 @innate/ui/globals.css
├── components/
│   └── ui/                 # shadcn/ui 组件（通过 CLI 安装）
├── lib/
│   └── utils.ts            # cn() 工具
├── next.config.ts
├── package.json
├── tsconfig.json
└── tailwind.config.ts
```

### Phase 2: 强化 packages/ui 为共享组件库（修正）

保留 packages/ui 作为**共享组件库**，不降级为"配置层"：

```
packages/ui/
├── src/
│   ├── components/ui/      # ✅ 保留：57+ shadcn/ui 组件（核心复用资产）
│   ├── block/              # ✅ 保留：Landing、Auth、Chat、Mail 业务区块
│   ├── globals.css         # ✅ 保留：OKLCH 主题变量
│   ├── lib/utils.ts        # ✅ 保留：cn() 工具
│   └── index.ts            # 导出所有组件和工具
├── components.json         # 新增：shadcn/ui 配置文件（记录来源版本）
└── package.json            # 保留基础组件导出
```

**同步策略**：
- 自动：GitHub Action 每周检查并创建更新 PR
- 手动：`./scripts/sync-from-shadcn.sh --apply`
- 原则：更新后 Review theme 兼容性，不修改组件内部源码

### Phase 3: 初始化 shadcn/ui 配置

```bash
cd apps/web
npx shadcn@latest init --yes --template next --base-color zinc
```

配置 `apps/web/components.json`：
- `uiDir`: `./components/ui`
- `style`: `new-york`
- `baseColor`: `zinc`

### Phase 4: 创建安装脚本

```bash
# scripts/init-starter.sh
# 一键初始化 starter 项目
cd apps/web
npx shadcn@latest add button card dialog sidebar tabs table
npx shadcn@latest add "https://21st.dev/r/serafim/hero"
npx shadcn@latest add "https://21st.dev/r/serafim/features"
```

---

## 三、迁移路径

| 步骤 | 动作 | 预计时间 |
|------|------|---------|
| 1 | 创建 apps/web/ 目录和基础文件 | 30 min |
| 2 | 初始化 shadcn/ui 配置 | 15 min |
| 3 | 安装常用基础组件 | 15 min |
| 4 | 创建 Landing Page 示例 | 30 min |
| 5 | 创建 Dashboard 布局示例 | 30 min |
| 6 | 配置 GitHub Action 自动更新流水线 | 20 min |
| 7 | 更新 README.md | 20 min |
| 8 | 更新 fe-skills SKILL.md | 20 min |

**总计：约 3 小时**

---

## 四、关键决策

### 决策 1（修正）：packages/ui/src/components/ui/ 中的 50+ 组件如何处理？

**原结论（Task 5-6）**：删除手写组件，改为实时安装 ❌
**修正结论（Task 9）**：保留预置组件，配合自动更新 ✅

**理由**：
1. shadcn/ui 的本质就是"代码拷贝"——预置和安装没有本质区别
2. 预置组件提供**确定性**（版本锁定、离线可用）
3. 预置组件提供**复用便利性**（新项目无需逐个安装）
4. GitHub Action 自动更新解决了同步问题

**维护方式**：
- 每周自动检查差异（`.github/workflows/update-shadcn-components.yml`）
- 自动创建 PR，人工 Review（5 分钟）
- 合并后所有 monorepo 项目自动获得最新组件

### 决策 2：apps/web/ 中的应用示例应该包含什么？

**必须包含**：
1. Landing Page（使用 @innate/ui block/landing + 21st.dev 组件）
2. Dashboard 布局（Sidebar + 主内容）
3. 表单示例（react-hook-form + zod）
4. 暗色模式切换

**可选包含**：
1. 数据表格（shadcn/ui table）
2. 图表（recharts）
3. 认证页面

---

## 五、风险与缓解

| 风险 | 缓解措施 |
|------|---------|
| 改造期间破坏现有项目 | 在 feature 分支上改造，合并前充分测试 |
| shadcn/ui 组件与现有主题不兼容 | 通过 globals.css 变量映射解决 |
| 21st.dev 组件依赖外部资源 | 检查每个组件的依赖，必要时本地化处理 |
| 组件更新引入 breaking changes | Review PR 时检查 props/API 变化，必要时在 block/ 中适配 |

---

## 六、Skill 更新计划

改造完成后，更新 fe-skills：

1. **innate-frontend/SKILL.md**
   - 引用 `innate-next-mono/apps/web/` 作为 starter 模板
   - 引用 `innate-next-mono/packages/ui/src/globals.css` 作为主题配置
   - 引用 `innate-next-mono/packages/ui/src/block/` 作为业务区块示例
   - 强调 `@innate/ui` 作为共享组件库的复用价值
   - 添加"快速复用"章节（Monorepo / 复制代码 / 实时安装三种方式）
   - 更新升级策略为"自动更新 + 手动同步"

2. **desktop-app/SKILL.md**
   - 在 `apps/web/` 基础上增加 Tauri 配置
   - 桌面 starter = web starter + Tauri 层
