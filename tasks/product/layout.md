# Project Layout

- 构建web/desktop application的主体Layout.

## Task 1: 构建web/desktop application的主体Layout.

1. Sidebar 包含了所有的功能模块，用户可以点击不同的模块，来切换不同的功能模块。
2. 总体结构参考这个图 ![alt text](<layout.png>),实际的网站是： https://www.superlinear.academy/，但是还是更喜欢截图形式的，给一下你的判断
同时生成一个layout的示范图
3. 当前需要构建的就是模仿这个图片的结构构件一个全新的Layout，
4. 在全新项目中实现Layout，同时验证当前脚本是否可以正常运行，是否可以更新最新的shacdn-ui组件，以及其他组件库
5. 实现细节在[text](intent-driven/)记录
6. 新的项目名称为indent-driven,建立到apps下面

# Task 2: 先清空所有的Submenu吧

1. Workspace和Community的东西也不需要，先全部清空吧
2. Main Content区域，Header 上面Superliner Academy 也去掉吧，只留Logo吧，其他Header上的Menu 信息暂时先保留，但是需要清晰的数据和代码分离

## Task 3： 开始实现block组件

1. 当前期望的是实现一个category，就是Block组件的展示
2. 期望的Layout是：Sidebar上面选择Blocks按钮，category这边展示所有的Block组件，选择一个Block组件，右侧就展示整个Block的页面
3. Block组件的信息，是shacdn-ui上面的，https://ui.shadcn.com/blocks 这个页面上的组件，具体代码应该可以产看[text](../../docs/analysis/agent-shadcn-ui.md)
代码位置在：[text](../../references/ui)
4. 以及 https://www.shadcn.net/，这个页面上 Mail
Dashboard
Cards
Tasks
Playground
Forms
Music
Authentication
这些block
5. 每一个Block组件，都需要有一个对应的页面，来展示这个Block组件的详细信息，同时有按钮可以复制给AI用的prompt
6. 21dev 相关的组件还不知道怎么时候，可以研究给一个具体的文档说明，变成两个一个Sidebar的选项，就是UIAgent吧
```
---
name: 21st-sdk
description: Use for any interaction with @21st-sdk packages or 21st Agents. If the task involves files in ./agents/, it most likely refers to 21st SDK.
---

# 21st SDK / 21st Agents

1. For any @21st-sdk or 21st Agents task, fetch `https://21st-search-engine.fly.dev/help` first.
2. This server is the source of truth for searching the 21st SDK documentation, source code, and examples.
3. Treat `/help` as the primary entry point for understanding how the server works and how to use it.
```
比如说这个是他的skill，可以详细阅读一下确定怎么写

## Task 4: 实现admin-ui里面的场景代码

1. [admin-ui](../../references/admin-ui)是代码
2. 按照这个代码方式，以及使用的框架，确认是否可以和nextjs同时运行？给一个可行性报告。