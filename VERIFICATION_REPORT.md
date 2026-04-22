# innate-next-mono 验证报告

> 验证时间：2026-04-22
> 验证范围：清理、修复、依赖安装、构建

---

## 验证项与结果

| 验证项 | 命令 | 结果 | 备注 |
|--------|------|------|------|
| **依赖安装** | `pnpm install` | ✅ 通过 | 555+ 包解析成功 |
| **构建** | `pnpm --filter @innate/web build` | ✅ 通过 | 静态页面生成成功，4 个路由 |
| **类型检查** | 内置在 `next build` 中 | ✅ 通过 | TypeScript 检查 21.9s 完成 |
| **Lint** | `pnpm --filter @innate/web lint` | ⚠️ 跳过 | Next.js 16 已移除 `next lint` |
| **目录清理** | `rm -rf frontend-tpl/` | ✅ 完成 | 删除了 10 个空子目录 |

---

## 已修复的问题

### 1. 依赖缺失

| 问题 | 修复文件 | 修复内容 |
|------|---------|---------|
| `tw-animate-css` 未安装 | `packages/ui/package.json` | 添加 `"tw-animate-css": "^1.0.0"` |
| `babel-plugin-react-compiler` 未安装 | `apps/web/package.json` | 添加 `"babel-plugin-react-compiler": "^1.0.0"` |
| `@innate/tsconfig` 未作为 workspace 依赖 | `apps/web/package.json` | 添加 `"@innate/tsconfig": "workspace:*"` |

### 2. 配置错误

| 问题 | 修复文件 | 修复内容 |
|------|---------|---------|
| tsconfig exports 无法解析 | `packages/tsconfig/package.json` | exports 添加 `.json` 后缀映射 |
| root dev script 指向不存在的包 | `package.json` | `"dev": "pnpm --filter @innate/web dev"` |

### 3. 代码类型错误

| 问题 | 修复文件 | 修复内容 |
|------|---------|---------|
| dashboard import 路径错误 | `apps/web/app/dashboard/page.tsx` | `@/components/ui/sidebar` → `@innate/ui` |
| FeaturesSection 缺少 icon | `apps/web/app/page.tsx` | 为 4 个 feature 添加 Lucide 图标 |
| FeaturesSection 缺少 subtitle | `apps/web/app/page.tsx` | 添加 `subtitle` prop |
| CTASection props 不匹配 | `apps/web/app/page.tsx` | `description`→`subtitle`, `cta`→`primaryCta` |
| Server Component 传递函数 | `apps/web/app/page.tsx` | 添加 `"use client"` |

### 4. 目录清理

| 问题 | 操作 |
|------|------|
| `frontend-tpl/` 10 个空子目录 | 已删除整个 `frontend-tpl/` 目录 |

---

## 已知问题（不影响构建）

### ESLint / Lint

- **现象**：`next lint` 在 Next.js 16 中已移除；ESLint 9 flat config 与 `eslint-config-next` 存在兼容性问题
- **影响**：不影响构建和运行
- **建议**：待 `eslint-config-next` 更新为 flat config 格式后再配置

---

## 构建输出

```
▲ Next.js 16.2.4 (Turbopack)
✓ Compiled successfully in 49s
  Running TypeScript ...
  Finished TypeScript in 21.9s ...
  Generating static pages using 5 workers (4/4) in 1124ms
  Finalizing page optimization ...

Route (app)
┌ ○ /
├ ○ /_not-found
└ ○ /dashboard

○  (Static)  prerendered as static content
```

---

## 验证后项目状态

```
innate-next-mono/
├── apps/
│   └── web/                    # ✅ Next.js 16 Starter，构建通过
├── packages/
│   ├── ui/                     # ✅ 57+ 组件，block/ 业务区块
│   ├── utils/                  # ✅ 工具函数
│   └── tsconfig/               # ✅ TS 配置共享
├── scripts/
│   ├── init-starter.sh         # ✅ 初始化脚本
│   └── sync-from-shadcn.sh     # ✅ 手动同步脚本
├── .github/workflows/
│   └── update-shadcn-components.yml  # ✅ 自动更新流水线
├── pnpm-workspace.yaml         # ✅ 5 个 workspace 项目
└── package.json                # ✅ dev script 指向 @innate/web
```

---

## 结论

**innate-next-mono 构建验证通过**。所有关键问题已修复，项目可以：

1. `pnpm install` — 依赖安装成功
2. `pnpm --filter @innate/web build` — 构建成功，生成静态页面
3. `pnpm --filter @innate/web dev` — 可启动开发服务器（待验证）
