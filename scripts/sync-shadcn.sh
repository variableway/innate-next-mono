#!/bin/bash
# shadcn/ui 同步脚本
# 检测上游组件变更，生成本地同步报告

set -e

REPO_ROOT=$(git rev-parse --show-toplevel 2>/dev/null || echo ".")
UI_DIR="$REPO_ROOT/packages/ui/src/components/ui"
REPORT_FILE="$REPO_ROOT/intent-driven/sync-report-$(date +%Y-%m-%d).md"

echo "🔄 shadcn/ui Sync Check"
echo "========================"

# 获取最新 release 信息
LATEST_TAG=$(curl -s https://api.github.com/repos/shadcn-ui/ui/releases/latest | jq -r .tag_name 2>/dev/null || echo "unknown")
LATEST_DATE=$(curl -s https://api.github.com/repos/shadcn-ui/ui/releases/latest | jq -r .published_at 2>/dev/null | cut -dT -f1 || echo "unknown")

echo "Latest upstream: $LATEST_TAG ($LATEST_DATE)"
echo ""

# 生成报告
cat > "$REPORT_FILE" << EOF
# shadcn/ui 同步报告

- **生成日期**: $(date +%Y-%m-%d)
- **上游版本**: [$LATEST_TAG](https://github.com/shadcn-ui/ui/releases/tag/$LATEST_TAG)
- **上游发布日期**: $LATEST_DATE

## 本地组件清单

| # | 组件 | 版本 | 最后同步 | 自定义修改 |
|---|------|------|---------|-----------|
EOF

# 扫描所有组件
COUNT=0
for f in "$UI_DIR"/*.tsx; do
  BASENAME=$(basename "$f" .tsx)
  VERSION=$(grep -o '@shadcn-version: [^ ]*' "$f" 2>/dev/null | cut -d' ' -f2 || echo "未标记")
  LAST_SYNC=$(grep -o '@last-sync: [^ ]*' "$f" 2>/dev/null | cut -d' ' -f2 || echo "未标记")
  CUSTOM=$(grep -o '@custom-modifications:.*' "$f" 2>/dev/null | cut -d':' -f2- | sed 's/^ *//' | head -c 50 || echo "未标记")
  
  COUNT=$((COUNT + 1))
  echo "| $COUNT | $BASENAME | $VERSION | $LAST_SYNC | $CUSTOM |" >> "$REPORT_FILE"
done

echo "" >> "$REPORT_FILE"
echo "## 待办事项" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"
echo "- [ ] 检查上游 [$LATEST_TAG](https://github.com/shadcn-ui/ui/releases/tag/$LATEST_TAG) 的变更日志" >> "$REPORT_FILE"
echo "- [ ] 对比有变更的组件，评估是否需要同步" >> "$REPORT_FILE"
echo "- [ ] 对低风险变更，直接应用并更新版本标记" >> "$REPORT_FILE"
echo "- [ ] 对高风险变更，创建独立分支测试后再合并" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"
echo "## 手动同步命令" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"
echo "\`\`\`bash" >> "$REPORT_FILE"
echo "# 示例：同步 button 组件" >> "$REPORT_FILE"
echo "# 1. 从上游复制最新代码" >> "$REPORT_FILE"
echo "# 2. 保留本地自定义修改" >> "$REPORT_FILE"
echo "# 3. 更新版本标记" >> "$REPORT_FILE"
echo "sed -i '' 's/@shadcn-version: .*/@shadcn-version: NEW_VERSION/' packages/ui/src/components/ui/button.tsx" >> "$REPORT_FILE"
echo "sed -i '' 's/@last-sync: .*/@last-sync: $(date +%Y-%m-%d)/' packages/ui/src/components/ui/button.tsx" >> "$REPORT_FILE"
echo "\`\`\`" >> "$REPORT_FILE"

echo "✅ 报告已生成: $REPORT_FILE"
echo "📊 组件总数: $COUNT"
