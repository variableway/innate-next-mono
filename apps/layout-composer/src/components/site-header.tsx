"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAIDrawerStore } from "@/lib/ai-drawer-store"
import { Badge } from "@innate/ui"
import { Button } from "@innate/ui"
import { Separator } from "@innate/ui"
import { Sparkles } from "lucide-react"

const navItems = [
  { href: "/components", label: "Components" },
  { href: "/blocks", label: "Blocks" },
  { href: "/task-builder", label: "Task Builder" },
]

export function SiteHeader() {
  const pathname = usePathname()
  const openForTask = useAIDrawerStore((s) => s.openForTask)

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-7xl items-center px-6">
        <Link href="/" className="text-lg font-semibold">
          Layout Composer
        </Link>
        <Badge variant="outline" className="ml-3">
          @innate/ui
        </Badge>

        <nav className="ml-8 hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                pathname?.startsWith(item.href)
                  ? "bg-accent font-medium"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex-1" />

        <Button
          variant="outline"
          size="sm"
          className="gap-1.5"
          onClick={() => openForTask([])}
        >
          <Sparkles className="size-4" />
          <span className="hidden sm:inline">AI</span>
        </Button>
      </div>
    </header>
  )
}
