# 21st SDK 研究文档

> 研究日期: 2026-04-23
> 源码位置: `references/21st-sdk/`
> 用途: 作为 UIAgent Sidebar 选项的集成方案

---

## 一、21st SDK 概览

21st SDK 是一个用于构建、部署和嵌入 AI 编码 Agent 的开源 SDK。

| 包名 | 目录 | 功能 |
|------|------|------|
| `@21st-sdk/agent` | `packages/agent/` | Agent + Tool 定义（纯类型） |
| `@21st-sdk/react` | `packages/react/` | React 聊天 UI 组件 |
| `@21st-sdk/nextjs` | `packages/nextjs/` | Next.js 集成（服务端 + 客户端） |
| `@21st-sdk/node` | `packages/node/` | Node.js API 客户端 |
| `@21st-sdk/cli` | `packages/cli/` | `an login` + `an deploy` CLI |
| `21st-sdk` (PyPI) | `packages/python-sdk/` | Python API 客户端 |

---

## 二、与 Intent Driven 项目的集成方案

### 方案 A: UIAgent Sidebar 选项（推荐）

在 Sidebar 添加 **UIAgent** 入口，使用 `@21st-sdk/react` 的聊天组件：

```
Sidebar Icon Rail:
├─ 🏠 Home
├─ 🧱 Blocks
├─ 🤖 UIAgent  ← 新增（21st SDK 集成）
└─ ➕ Add
```

**实现方式**:
1. 安装 `@21st-sdk/react` 和 `@21st-sdk/nextjs`
2. 创建 `/ui-agent` 页面
3. 使用 21st SDK 的聊天组件作为交互界面
4. 用户可以通过自然语言与 Agent 交互，Agent 可以调用 tools 操作 UI

### 方案 B: Command Box 集成

将 21st SDK Agent 接入现有的 Command Box：
- 用户输入 `/agent <指令>`
- 指令通过 `@21st-sdk/node` 发送到 Agent
- Agent 返回结构化响应，驱动 UI 变更

### 方案 C: 嵌入式 Widget

使用 21st SDK 的 widget 模式，在页面右下角悬浮一个聊天按钮：
- 不占用 Sidebar 空间
- 随时可调起
- 支持上下文感知（Agent 知道当前在哪个 Block/页面）

---

## 三、技术要点

### @21st-sdk/react 组件

React 包提供预构建的聊天 UI 组件：
- `Chat` — 主聊天容器
- `MessageList` — 消息列表
- `MessageInput` — 输入框
- `ToolCall` — Tool 调用可视化

### @21st-sdk/nextjs 集成

Next.js 包提供：
- API Route 封装（`/api/agent`）
- Streaming 响应支持
- Server Actions 集成

### 前提条件

1. 需要 21st.dev 账号和 API Key
2. 需要配置 Agent 的 tools（定义 Agent 可以执行的操作）
3. 需要部署 Agent 到 21st.dev 平台

---

## 四、建议实施步骤

```
Phase 1: 基础集成（1-2 天）
  ├─ 安装 @21st-sdk/react 和 @21st-sdk/nextjs
  ├─ 创建 /ui-agent 页面
  └─ 接入基础聊天组件

Phase 2: Tool 定义（2-3 天）
  ├─ 定义 UI 操作 tools（切换页面、切换 block、复制 prompt）
  ├─ 定义导航 tools（跳转到指定页面）
  └─ 测试 Agent 对 tools 的调用

Phase 3: 上下文感知（1-2 天）
  ├─ 将当前页面/Block 信息注入 Agent 上下文
  ├─ 支持"基于当前页面做..."的指令
  └─ 优化响应体验
```

---

## 五、参考文档

- 21st SDK 搜索: `https://21st-search-engine.fly.dev/help`
- 开源仓库: `https://github.com/21st-dev/21st-sdk`
