"use client"

import { useMemo, useState, useCallback } from "react"
import Link from "next/link"
import { componentRegistry, type ComponentMeta } from "@/lib/registry"
import { ComponentPreview } from "@/lib/component-preview"
import {
  generateTask,
  pageTemplates,
} from "@/lib/task-templates"
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
import { Separator } from "@innate/ui"
import { Checkbox } from "@innate/ui"

export default function TaskBuilderPage() {
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([])
  const [search, setSearch] = useState("")
  const [copied, setCopied] = useState(false)

  // ── Derived data ───────────────────────────────────────────

  const selectedComponents = useMemo(
    () =>
      selectedSlugs
        .map((slug) => componentRegistry.find((c) => c.slug === slug)!)
        .filter(Boolean),
    [selectedSlugs],
  )

  const task = useMemo(
    () => generateTask(selectedComponents),
    [selectedComponents],
  )

  const filteredRegistry = useMemo(() => {
    if (!search.trim()) return componentRegistry
    const q = search.toLowerCase()
    return componentRegistry.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.subcategory.toLowerCase().includes(q),
    )
  }, [search])

  // Group by category, then subcategory
  const groupedRegistry = useMemo(() => {
    const map = new Map<string, Map<string, ComponentMeta[]>>()
    for (const comp of filteredRegistry) {
      const cat = comp.category === "block" ? "Blocks" : "UI Components"
      if (!map.has(cat)) map.set(cat, new Map())
      const subMap = map.get(cat)!
      if (!subMap.has(comp.subcategory)) subMap.set(comp.subcategory, [])
      subMap.get(comp.subcategory)!.push(comp)
    }
    return map
  }, [filteredRegistry])

  // ── Handlers ───────────────────────────────────────────────

  const toggleComponent = useCallback((slug: string) => {
    setSelectedSlugs((prev) =>
      prev.includes(slug)
        ? prev.filter((s) => s !== slug)
        : [...prev, slug],
    )
  }, [])

  const applyTemplate = useCallback(
    (templateId: string) => {
      const tmpl = pageTemplates.find((t) => t.id === templateId)
      if (tmpl) {
        setSelectedSlugs(tmpl.slugs)
      }
    },
    [],
  )

  const moveComponent = useCallback(
    (slug: string, direction: "up" | "down") => {
      setSelectedSlugs((prev) => {
        const idx = prev.indexOf(slug)
        if (idx === -1) return prev
        const next = [...prev]
        const targetIdx = direction === "up" ? idx - 1 : idx + 1
        if (targetIdx < 0 || targetIdx >= next.length) return prev
        ;[next[idx], next[targetIdx]] = [next[targetIdx], next[idx]]
        return next
      })
    },
    [],
  )

  const removeComponent = useCallback((slug: string) => {
    setSelectedSlugs((prev) => prev.filter((s) => s !== slug))
  }, [])

  const clearAll = useCallback(() => {
    setSelectedSlugs([])
  }, [])

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(task.fullText).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [task.fullText])

  const handleDownload = useCallback(() => {
    if (!task.fullText) return
    const blob = new Blob([task.fullText], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "task.md"
    a.click()
    URL.revokeObjectURL(url)
  }, [task.fullText])

  // ── Render ─────────────────────────────────────────────────

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <header className="flex h-14 shrink-0 items-center gap-4 border-b px-6">
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:underline"
        >
          &larr; Home
        </Link>
        <Separator orientation="vertical" className="h-5" />
        <h1 className="text-lg font-semibold">AI Task Builder</h1>
        <Badge variant="outline">{selectedSlugs.length} selected</Badge>
      </header>

      {/* Three-column layout */}
      <div className="grid flex-1 grid-cols-1 md:grid-cols-[280px_1fr_1fr]">
        {/* LEFT: Component selector */}
        <div className="border-r flex flex-col">
          <div className="p-4">
            <Input
              placeholder="Search components..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Page templates */}
          <div className="px-4 pb-3">
            <p className="mb-2 text-xs font-medium uppercase text-muted-foreground">
              Page Templates
            </p>
            <div className="flex flex-wrap gap-2">
              {pageTemplates.map((tmpl) => (
                <Button
                  key={tmpl.id}
                  variant="outline"
                  size="sm"
                  onClick={() => applyTemplate(tmpl.id)}
                  className="text-xs"
                >
                  {tmpl.name}
                </Button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Component list */}
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-4">
              {[...groupedRegistry.entries()].map(([category, subMap]) => (
                <div key={category}>
                  <p className="mb-2 text-xs font-semibold uppercase text-muted-foreground">
                    {category}
                  </p>
                  {[...subMap.entries()].map(([subcategory, comps]) => (
                    <div key={subcategory} className="mb-3">
                      <p className="mb-1 text-xs font-medium text-muted-foreground/70">
                        {subcategory}
                      </p>
                      <div className="space-y-1">
                        {comps.map((comp) => (
                          <label
                            key={comp.slug}
                            className="flex cursor-pointer items-start gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent/50"
                          >
                            <Checkbox
                              checked={selectedSlugs.includes(comp.slug)}
                              onCheckedChange={() => toggleComponent(comp.slug)}
                              className="mt-0.5"
                            />
                            <span className="flex-1">{comp.name}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* CENTER: Live preview */}
        <div className="border-r flex flex-col">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <h2 className="text-sm font-semibold">Preview</h2>
            {selectedSlugs.length > 0 && (
              <Button variant="ghost" size="sm" onClick={clearAll}>
                Clear All
              </Button>
            )}
          </div>

          <ScrollArea className="flex-1">
            <div className="p-4">
              {selectedComponents.length === 0 ? (
                <div className="flex min-h-[300px] items-center justify-center rounded-lg border-2 border-dashed">
                  <div className="text-center text-muted-foreground">
                    <p className="text-sm font-medium">No components selected</p>
                    <p className="mt-1 text-xs">
                      Pick components from the left panel or use a page template
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {selectedComponents.map((comp, index) => (
                    <Card key={comp.slug}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs tabular-nums">
                            {index + 1}
                          </Badge>
                          <CardTitle className="text-sm">{comp.name}</CardTitle>
                          <Badge variant="secondary" className="ml-auto text-xs">
                            {comp.category === "block" ? "Block" : "UI"}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="mb-3">
                          {comp.description}
                        </CardDescription>
                        <div className="mb-3">
                          <ComponentPreview slug={comp.slug} compact />
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 text-xs"
                            disabled={index === 0}
                            onClick={() => moveComponent(comp.slug, "up")}
                          >
                            Up
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 text-xs"
                            disabled={index === selectedComponents.length - 1}
                            onClick={() => moveComponent(comp.slug, "down")}
                          >
                            Down
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="ml-auto h-7 text-xs text-destructive hover:text-destructive"
                            onClick={() => removeComponent(comp.slug)}
                          >
                            Remove
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* RIGHT: Generated task description */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <h2 className="text-sm font-semibold">Generated Task</h2>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={!task.fullText}
                onClick={handleCopy}
              >
                {copied ? "Copied!" : "Copy"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={!task.fullText}
                onClick={handleDownload}
              >
                Download .md
              </Button>
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-4">
              {task.fullText ? (
                <pre className="whitespace-pre-wrap rounded-lg bg-muted p-4 text-sm leading-relaxed font-mono">
                  {task.fullText}
                </pre>
              ) : (
                <div className="flex min-h-[300px] items-center justify-center rounded-lg border-2 border-dashed">
                  <div className="text-center text-muted-foreground">
                    <p className="text-sm font-medium">
                      Task description will appear here
                    </p>
                    <p className="mt-1 text-xs">
                      Select components to generate an AI-ready task description
                    </p>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}
