"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { componentRegistry } from "@/lib/registry"
import { ComponentPreview } from "@/lib/component-preview"
import { Badge } from "@innate/ui"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@innate/ui"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@innate/ui"

const blockCategories = [
  { id: "all", label: "All Blocks" },
  { id: "landing", label: "Landing" },
  { id: "auth", label: "Auth" },
  { id: "mail", label: "Mail" },
  { id: "chat", label: "Chat" },
]

export default function BlocksPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const blocks = useMemo(
    () => componentRegistry.filter((c) => c.category === "block"),
    [],
  )

  const filtered = useMemo(
    () =>
      activeCategory === "all"
        ? blocks
        : blocks.filter((c) => c.subcategory === activeCategory),
    [blocks, activeCategory],
  )

  const grouped = useMemo(() => {
    const map = new Map<string, typeof blocks>()
    for (const block of filtered) {
      if (!map.has(block.subcategory)) map.set(block.subcategory, [])
      map.get(block.subcategory)!.push(block)
    }
    return map
  }, [filtered])

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Building Blocks</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Pre-built page sections and application shells ready to compose.
        </p>
      </div>

      <Tabs value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList>
          {blockCategories.map((cat) => (
            <TabsTrigger key={cat.id} value={cat.id}>
              {cat.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeCategory} className="mt-6">
          {[...grouped.entries()].map(([subcategory, comps]) => (
            <div key={subcategory} className="mb-10">
              <h2 className="mb-4 text-xl font-semibold capitalize">{subcategory}</h2>
              <div className="grid gap-6 lg:grid-cols-2">
                {comps.map((comp) => (
                  <Link key={comp.slug} href={`/blocks/${comp.slug}`} className="group">
                    <Card className="h-full transition-shadow group-hover:shadow-lg overflow-hidden">
                      <div className="border-b bg-muted/30 overflow-hidden" style={{ maxHeight: "300px" }}>
                        {mounted ? (
                          <div className="pointer-events-none scale-[0.9] origin-top">
                            <ComponentPreview slug={comp.slug} />
                          </div>
                        ) : (
                          <div className="flex h-[200px] items-center justify-center">
                            <p className="text-sm text-muted-foreground">Loading preview...</p>
                          </div>
                        )}
                      </div>
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <CardTitle>{comp.name}</CardTitle>
                          <Badge variant="outline" className="text-xs capitalize">
                            {comp.subcategory}
                          </Badge>
                        </div>
                        <CardDescription>{comp.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
