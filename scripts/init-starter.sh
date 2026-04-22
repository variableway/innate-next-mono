#!/usr/bin/env bash
# Initialize the Innate Web Starter
# Usage: ./scripts/init-starter.sh

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
WEB_DIR="$PROJECT_ROOT/apps/web"

echo "🚀 Initializing Innate Web Starter..."

# 1. Install dependencies
echo "📦 Installing dependencies..."
cd "$PROJECT_ROOT"
pnpm install

# 2. Install shadcn/ui base components
echo "🧩 Installing shadcn/ui base components..."
cd "$WEB_DIR"
npx shadcn@latest add -y -o button card dialog sidebar tabs table badge avatar select input textarea separator scroll-area skeleton

# 3. Install form components
echo "📝 Installing form components..."
npx shadcn@latest add -y -o form label checkbox radio-group switch slider

# 4. Install 21st.dev marketing blocks (optional)
echo "🎨 Installing 21st.dev marketing blocks..."
# Uncomment to install:
# npx shadcn@latest add "https://21st.dev/r/serafim/hero"
# npx shadcn@latest add "https://21st.dev/r/serafim/features"
# npx shadcn@latest add "https://21st.dev/r/serafim/pricing"
# npx shadcn@latest add "https://21st.dev/r/serafim/cta"

echo ""
echo "✅ Starter initialized!"
echo ""
echo "Next steps:"
echo "  cd apps/web"
echo "  pnpm dev"
