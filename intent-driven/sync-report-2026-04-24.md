# shadcn/ui 同步报告

- **生成日期**: 2026-04-24
- **上游版本**: [shadcn@4.4.0](https://github.com/shadcn-ui/ui/releases/tag/shadcn@4.4.0)
- **上游发布日期**: 2026-04-21

## 本地组件清单

| # | 组件 | 版本 | 最后同步 | 自定义修改 |
|---|------|------|---------|-----------|
| 1 | accordion | 2.3.0 | 2026-04-23 | none |
| 2 | alert-dialog | 2.3.0 | 2026-04-23 | none |
| 3 | alert | 2.3.0 | 2026-04-23 | none |
| 4 | aspect-ratio | 2.3.0 | 2026-04-23 | none |
| 5 | avatar | 2.3.0 | 2026-04-23 | none |
| 6 | badge | 2.3.0 | 2026-04-23 | none |
| 7 | breadcrumb | 2.3.0 | 2026-04-23 | none |
| 8 | button-group | 2.3.0 | 2026-04-23 | none |
| 9 | button | 2.3.0 | 2026-04-23 | none |
| 10 | calendar | 2.3.0 | 2026-04-23 | none |
| 11 | card | 2.3.0 | 2026-04-23 | none |
| 12 | carousel | 2.3.0 | 2026-04-23 | none |
| 13 | chart | 2.3.0 | 2026-04-23 | none |
| 14 | checkbox | 2.3.0 | 2026-04-23 | none |
| 15 | collapsible | 2.3.0 | 2026-04-23 | none |
| 16 | command | 2.3.0 | 2026-04-23 | none |
| 17 | context-menu | 2.3.0 | 2026-04-23 | none |
| 18 | dialog | 2.3.0 | 2026-04-23 | none |
| 19 | drawer | 2.3.0 | 2026-04-23 | none |
| 20 | dropdown-menu | 2.3.0 | 2026-04-23 | none |
| 21 | empty | 2.3.0 | 2026-04-23 | none |
| 22 | field | 2.3.0 | 2026-04-23 | none |
| 23 | form | 2.3.0 | 2026-04-23 | none |
| 24 | hover-card | 2.3.0 | 2026-04-23 | none |
| 25 | input-group | 2.3.0 | 2026-04-23 | none |
| 26 | input-otp | 2.3.0 | 2026-04-23 | none |
| 27 | input | 2.3.0 | 2026-04-23 | none |
| 28 | item | 2.3.0 | 2026-04-23 | none |
| 29 | kbd | 2.3.0 | 2026-04-23 | none |
| 30 | label | 2.3.0 | 2026-04-23 | none |
| 31 | menubar | 2.3.0 | 2026-04-23 | none |
| 32 | navigation-menu | 2.3.0 | 2026-04-23 | none |
| 33 | pagination | 2.3.0 | 2026-04-23 | none |
| 34 | popover | 2.3.0 | 2026-04-23 | none |
| 35 | progress | 2.3.0 | 2026-04-23 | none |
| 36 | radio-group | 2.3.0 | 2026-04-23 | none |
| 37 | resizable | 2.3.0 | 2026-04-23 | none |
| 38 | scroll-area | 2.3.0 | 2026-04-23 | none |
| 39 | select | 2.3.0 | 2026-04-23 | none |
| 40 | separator | 2.3.0 | 2026-04-23 | none |
| 41 | sheet | 2.3.0 | 2026-04-23 | none |
| 42 | sidebar | 2.3.0 | 2026-04-23 | none |
| 43 | skeleton | 2.3.0 | 2026-04-23 | none |
| 44 | slider | 2.3.0 | 2026-04-23 | none |
| 45 | sonner | 2.3.0 | 2026-04-23 | none |
| 46 | spinner | 2.3.0 | 2026-04-23 | none |
| 47 | switch | 2.3.0 | 2026-04-23 | none |
| 48 | table | 2.3.0 | 2026-04-23 | none |
| 49 | tabs | 2.3.0 | 2026-04-23 | none |
| 50 | textarea | 2.3.0 | 2026-04-23 | none |
| 51 | toast | 2.3.0 | 2026-04-23 | none |
| 52 | toaster | 2.3.0 | 2026-04-23 | none |
| 53 | toggle-group | 2.3.0 | 2026-04-23 | none |
| 54 | toggle | 2.3.0 | 2026-04-23 | none |
| 55 | tooltip | 2.3.0 | 2026-04-23 | none |
| 56 | use-mobile | 2.3.0 | 2026-04-23 | none |

## 待办事项

- [ ] 检查上游 [shadcn@4.4.0](https://github.com/shadcn-ui/ui/releases/tag/shadcn@4.4.0) 的变更日志
- [ ] 对比有变更的组件，评估是否需要同步
- [ ] 对低风险变更，直接应用并更新版本标记
- [ ] 对高风险变更，创建独立分支测试后再合并

## 手动同步命令

```bash
# 示例：同步 button 组件
# 1. 从上游复制最新代码
# 2. 保留本地自定义修改
# 3. 更新版本标记
sed -i '' 's/@shadcn-version: .*/@shadcn-version: NEW_VERSION/' packages/ui/src/components/ui/button.tsx
sed -i '' 's/@last-sync: .*/@last-sync: 2026-04-24/' packages/ui/src/components/ui/button.tsx
```
