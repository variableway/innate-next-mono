#!/bin/bash
set -euo pipefail

# sync-from-shadcn.sh
# 从 shadcn/ui registry 同步最新组件到 packages/ui/
# 使用方法：
#   ./scripts/sync-from-shadcn.sh              # 检查差异
#   ./scripts/sync-from-shadcn.sh --apply      # 应用更新
#   ./scripts/sync-from-shadcn.sh --force      # 强制覆盖所有组件

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
MONO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
APPS_WEB="$MONO_ROOT/apps/web"
PACKAGES_UI="$MONO_ROOT/packages/ui"
APPLY=false
FORCE=false

# 解析参数
for arg in "$@"; do
  case "$arg" in
    --apply) APPLY=true ;;
    --force) FORCE=true ;;
    --help|-h)
      echo "Usage: $0 [--apply] [--force]"
      echo ""
      echo "Options:"
      echo "  --apply   应用检测到的更新（默认只检查差异）"
      echo "  --force   强制覆盖所有组件，即使无差异也更新"
      echo "  --help    显示此帮助"
      exit 0
      ;;
  esac
done

echo "============================================"
echo "  shadcn/ui 组件同步工具"
echo "============================================"
echo ""
echo "源目录: $APPS_WEB"
echo "目标目录: $PACKAGES_UI"
echo ""

# 检查目录是否存在
if [[ ! -d "$APPS_WEB" ]]; then
  echo "❌ 错误: $APPS_WEB 不存在"
  echo "   请先确保 apps/web/ 目录存在（shadcn/ui 工作目录）"
  exit 1
fi

if [[ ! -d "$PACKAGES_UI" ]]; then
  echo "❌ 错误: $PACKAGES_UI 不存在"
  exit 1
fi

cd "$APPS_WEB"

# 如果没有 --force，先检查差异
if [[ "$FORCE" == false ]]; then
  echo "🔍 检查组件差异..."
  echo ""
  
  DIFF_OUTPUT=$(npx shadcn@latest diff 2>/dev/null || true)
  
  if echo "$DIFF_OUTPUT" | grep -q "No updates found" 2>/dev/null; then
    echo "✅ 没有检测到组件更新"
    echo ""
    echo "所有组件已是最新版本。"
    echo "如需强制更新，使用: $0 --force"
    exit 0
  fi
  
  echo "📋 检测到的差异:"
  echo "$DIFF_OUTPUT"
  echo ""
  
  if [[ "$APPLY" == false ]]; then
    echo "⚠️  检测到更新但未应用。使用 --apply 应用更新。"
    echo ""
    echo "建议操作:"
    echo "  1. 先 Review 差异（见上方输出）"
    echo "  2. 确认无误后运行: $0 --apply"
    exit 0
  fi
fi

# 应用更新
echo "🔄 开始同步组件..."
echo ""

# 获取所有已安装组件列表
COMPONENTS=()
if [[ -d "components/ui" ]]; then
  for f in components/ui/*.tsx; do
    if [[ -f "$f" ]]; then
      name=$(basename "$f" .tsx)
      COMPONENTS+=("$name")
    fi
  done
fi

if [[ ${#COMPONENTS[@]} -eq 0 ]]; then
  echo "⚠️  未在 apps/web/components/ui/ 下找到组件"
  echo "   请先初始化 shadcn/ui: cd apps/web && npx shadcn@latest init"
  exit 1
fi

echo "找到 ${#COMPONENTS[@]} 个组件，开始更新..."
echo ""

UPDATED=()
FAILED=()

for component in "${COMPONENTS[@]}"; do
  echo -n "  更新 $component ... "
  
  if npx shadcn@latest add "$component" --overwrite --yes --no-deps > /dev/null 2>&1; then
    echo "✅"
    UPDATED+=("$component")
  else
    echo "❌"
    FAILED+=("$component")
  fi
done

echo ""
echo "📊 更新结果:"
echo "  成功: ${#UPDATED[@]} 个"
echo "  失败: ${#FAILED[@]} 个"

if [[ ${#FAILED[@]} -gt 0 ]]; then
  echo ""
  echo "❌ 失败的组件:"
  for f in "${FAILED[@]}"; do
    echo "    - $f"
  done
fi

# 同步回 packages/ui/
echo ""
echo "🔄 同步到 packages/ui/ ..."

# 确保目标目录存在
mkdir -p "$PACKAGES_UI/src/components/ui"
mkdir -p "$PACKAGES_UI/src/lib"

# 复制组件
if [[ -d "components/ui" ]]; then
  cp -r components/ui/* "$PACKAGES_UI/src/components/ui/"
  echo "  ✅ 组件已复制到 packages/ui/src/components/ui/"
fi

# 复制工具函数
if [[ -f "lib/utils.ts" ]]; then
  cp lib/utils.ts "$PACKAGES_UI/src/lib/"
  echo "  ✅ utils.ts 已复制到 packages/ui/src/lib/"
fi

# 复制全局样式
if [[ -f "app/globals.css" ]]; then
  cp app/globals.css "$PACKAGES_UI/src/"
  echo "  ✅ globals.css 已复制到 packages/ui/src/"
fi

# 复制 shadcn 配置
if [[ -f "components.json" ]]; then
  cp components.json "$PACKAGES_UI/"
  echo "  ✅ components.json 已复制到 packages/ui/"
fi

echo ""
echo "============================================"
echo "  同步完成"
echo "============================================"
echo ""
echo "请执行以下操作："
echo "  1. git diff packages/ui/src/components/ui/   # 查看变更"
echo "  2. pnpm dev                                  # 测试是否正常"
echo "  3. git add packages/ui/ && git commit        # 提交更新"
echo ""

# 如果有失败，给出建议
if [[ ${#FAILED[@]} -gt 0 ]]; then
  echo "⚠️  注意：有 ${#FAILED[@]} 个组件更新失败。"
  echo "   建议手动检查："
  echo "     cd apps/web"
  for f in "${FAILED[@]}"; do
    echo "     npx shadcn@latest add $f --overwrite"
  done
  echo ""
fi
