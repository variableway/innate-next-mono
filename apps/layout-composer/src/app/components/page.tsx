"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { componentRegistry, getSubcategories } from "@/lib/registry"
import { Badge } from "@innate/ui"
import { Button } from "@innate/ui"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@innate/ui"
import { Input } from "@innate/ui"
import { ScrollArea } from "@innate/ui"

// Friendly display names for subcategories
const subcategoryLabels: Record<string, string> = {
  layout: "Layout",
  navigation: "Navigation",
  form: "Form",
  feedback: "Feedback",
  "data-display": "Data Display",
  actions: "Actions",
  landing: "Landing",
  auth: "Auth",
  mail: "Mail",
  chat: "Chat",
}

export default function ComponentsPage() {
  const [search, setSearch] = useState("")
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null)

  const subcategories = useMemo(() => getSubcategories(), [])

  const filtered = useMemo(() => {
    let items = componentRegistry

    if (activeSubcategory) {
      items = items.filter((c) => c.subcategory === activeSubcategory)
    }

    if (search.trim()) {
      const q = search.toLowerCase()
      items = items.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.subcategory.toLowerCase().includes(q),
      )
    }

    return items
  }, [search, activeSubcategory])

  // Group filtered results by category > subcategory
  const grouped = useMemo(() => {
    const map = new Map<string, Map<string, typeof componentRegistry>>()
    for (const comp of filtered) {
      const catLabel = comp.category === "block" ? "Blocks" : "UI Components"
      if (!map.has(catLabel)) {
        map.set(catLabel, new Map())
      }
      const catMap = map.get(catLabel)!
      if (!catMap.has(comp.subcategory)) {
        catMap.set(comp.subcategory, [])
      }
      catMap.get(comp.subcategory)!.push(comp)
    }
    return map
  }, [filtered])

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden w-56 shrink-0 border-r md:block">
        <div className="p-4">
          <Link href="/" className="text-sm font-semibold hover:underline">
            &larr; Layout Composer
          </Link>
        </div>
        <div className="px-4 pb-2">
          <h2 className="text-xs font-medium uppercase text-muted-foreground">
            Categories
          </h2>
        </div>
        <ScrollArea className="h-[calc(100vh-100px)]">
          <div className="space-y-1 px-2 pb-4">
            <button
              onClick={() => setActiveSubcategory(null)}
              className={`w-full rounded-md px-3 py-1.5 text-left text-sm transition-colors ${
                activeSubcategory === null
                  ? "bg-accent font-medium"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
              }`}
            >
              All Components
            </button>
            {subcategories.map((sub) => (
              <button
                key={sub}
                onClick={() =>
                  setActiveSubcategory(activeSubcategory === sub ? null : sub)
                }
                className={`w-full rounded-md px-3 py-1.5 text-left text-sm transition-colors ${
                  activeSubcategory === sub
                    ? "bg-accent font-medium"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                }`}
              >
                {subcategoryLabels[sub] || sub}
              </button>
            ))}
          </div>
        </ScrollArea>
      </aside>

      {/* Main content */}
      <div className="flex-1">
        {/* Top bar */}
        <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="mx-auto flex max-w-5xl items-center gap-4 px-6 py-3">
            <Link href="/" className="md:hidden text-sm font-semibold">
              &larr; Home
            </Link>
            <h1 className="hidden md:block text-lg font-semibold">
              Component Catalog
            </h1>
            <div className="flex-1" />
            <Input
              placeholder="Search components..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-xs"
            />
          </div>
        </header>

        {/* Mobile category chips */}
        <div className="flex gap-2 overflow-x-auto px-6 py-3 md:hidden">
          <Button
            variant={activeSubcategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveSubcategory(null)}
          >
            All
          </Button>
          {subcategories.map((sub) => (
            <Button
              key={sub}
              variant={activeSubcategory === sub ? "default" : "outline"}
              size="sm"
              onClick={() =>
                setActiveSubcategory(activeSubcategory === sub ? null : sub)
              }
            >
              {subcategoryLabels[sub] || sub}
            </Button>
          ))}
        </div>

        {/* Grid */}
        <div className="mx-auto max-w-5xl px-6 py-6">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground">
              No components match your search.
            </div>
          ) : (
            [...grouped.entries()].map(([category, subMap]) => (
              <div key={category} className="mb-8">
                <h2 className="mb-4 text-xl font-semibold">{category}</h2>
                {[...subMap.entries()].map(([subcategory, comps]) => (
                  <div key={subcategory} className="mb-6">
                    <h3 className="mb-3 text-sm font-medium text-muted-foreground">
                      {subcategoryLabels[subcategory] || subcategory}
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {comps.map((comp) => (
                        <Link
                          key={comp.slug}
                          href={`/components/${comp.slug}`}
                          className="group"
                        >
                          <Card className="h-full transition-shadow group-hover:shadow-md">
                            <CardHeader className="pb-2">
                              <div className="flex items-center gap-2">
                                <CardTitle className="text-base">
                                  {comp.name}
                                </CardTitle>
                                <Badge variant="outline" className="text-xs">
                                  {comp.category === "block" ? "Block" : "UI"}
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <CardDescription className="line-clamp-2">
                                {comp.description}
                              </CardDescription>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
