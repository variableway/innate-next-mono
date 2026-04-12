"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { componentRegistry, getComponentsByCategory, getComponentsBySubcategory } from "@/lib/registry"
import { ComponentPreview } from "@/lib/component-preview"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@innate/ui"
import { Badge } from "@innate/ui"
import { Button } from "@innate/ui"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@innate/ui"
import { ScrollArea } from "@innate/ui"
import { Separator } from "@innate/ui"
import { cn } from "@innate/ui"
import {
  Code2,
  Copy,
  Check,
  Sparkles,
  FileCode,
  Eye,
} from "lucide-react"

const blockCategories = [
  { id: "all", label: "All" },
  { id: "dashboard", label: "Dashboard" },
  { id: "sidebar", label: "Sidebar" },
  { id: "login", label: "Login" },
  { id: "signup", label: "Signup" },
  { id: "landing", label: "Landing" },
  { id: "auth", label: "Auth" },
  { id: "mail", label: "Mail" },
  { id: "chat", label: "Chat" },
]

export default function BlocksPage() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const allBlocks = getComponentsByCategory("block")

  // Filter blocks by category
  const filteredBlocks = activeTab === "all"
    ? allBlocks
    : getComponentsBySubcategory(activeTab)

  // Select first block by default
  const [selectedSlug, setSelectedSlug] = useState<string>(
    filteredBlocks[0]?.slug || ""
  )
  const selectedBlock = componentRegistry.find((c) => c.slug === selectedSlug)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Update selected when tab changes
  useEffect(() => {
    if (filteredBlocks.length > 0 && !filteredBlocks.find(b => b.slug === selectedSlug)) {
      setSelectedSlug(filteredBlocks[0].slug)
    }
  }, [activeTab, filteredBlocks, selectedSlug])

  return (
    <div className="flex h-[calc(100vh-3.5rem)]">
      {/* Left panel: Block list */}
      <div className="w-72 border-r bg-muted/30 flex flex-col shrink-0">
        {/* Category filter tabs */}
        <div className="border-b px-3 py-3">
          <h2 className="text-sm font-semibold mb-2">Blocks</h2>
          <div className="flex flex-wrap gap-1">
            {blockCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={cn(
                  "px-2.5 py-1 text-xs rounded-md transition-colors",
                  activeTab === cat.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Block items list */}
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-0.5">
            {filteredBlocks.map((block) => (
              <button
                key={block.slug}
                onClick={() => setSelectedSlug(block.slug)}
                className={cn(
                  "w-full text-left rounded-md px-3 py-2.5 transition-colors",
                  selectedSlug === block.slug
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium truncate">{block.name}</span>
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0 capitalize shrink-0">
                    {block.subcategory}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                  {block.description}
                </p>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Right panel: Block detail */}
      <div className="flex-1 overflow-auto">
        {selectedBlock ? (
          <BlockDetail block={selectedBlock} mounted={mounted} />
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Select a block to view details
          </div>
        )}
      </div>
    </div>
  )
}

// ── Block detail view ────────────────────────────────────────────────────────

function BlockDetail({
  block,
  mounted,
}: {
  block: (typeof componentRegistry)[number]
  mounted: boolean
}) {
  const [activeTab, setActiveTab] = useState("preview")

  // Reset tab when block changes
  useEffect(() => {
    setActiveTab("preview")
  }, [block.slug])

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight">{block.name}</h1>
          <Badge variant="outline" className="capitalize">{block.subcategory}</Badge>
        </div>
        <p className="text-muted-foreground">{block.description}</p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="preview" className="gap-1.5">
            <Eye className="h-3.5 w-3.5" /> Preview
          </TabsTrigger>
          <TabsTrigger value="code" className="gap-1.5">
            <Code2 className="h-3.5 w-3.5" /> Code
          </TabsTrigger>
          <TabsTrigger value="task" className="gap-1.5">
            <Sparkles className="h-3.5 w-3.5" /> AI Task
          </TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <div className="min-h-[400px] bg-muted/10 p-6">
                {mounted ? (
                  <ComponentPreview slug={block.slug} />
                ) : (
                  <div className="flex items-center justify-center h-64">
                    <p className="text-sm text-muted-foreground">Loading preview...</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="code" className="mt-4">
          <CodeView name={block.name} />
        </TabsContent>

        <TabsContent value="task" className="mt-4">
          <TaskView name={block.name} taskDescription={block.taskDescription} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

// ── Shared sub-components ────────────────────────────────────────────────────

function CodeView({ name }: { name: string }) {
  const [copied, setCopied] = useState(false)
  const code = `import { ${name} } from "@innate/ui"\n\nexport default function Example() {\n  return (\n    <${name}\n      // Add your props here\n    />\n  )\n}`

  const copy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card>
      <CardHeader className="border-b bg-muted/50 flex flex-row items-center justify-between py-3 px-4">
        <div className="flex items-center gap-2">
          <FileCode className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">{name}.tsx</span>
        </div>
        <Button variant="outline" size="sm" onClick={copy} className="gap-1.5">
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied!" : "Copy Code"}
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px]">
          <pre className="p-4 text-sm font-mono bg-muted/10"><code>{code}</code></pre>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

function TaskView({ name, taskDescription }: { name: string; taskDescription: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(taskDescription)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card>
      <CardHeader className="border-b bg-muted/50 flex flex-row items-center justify-between py-3 px-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">AI Task Description</span>
        </div>
        <Button variant="outline" size="sm" onClick={copy} className="gap-1.5">
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied!" : "Copy Task"}
        </Button>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
          {taskDescription}
        </p>
      </CardContent>
    </Card>
  )
}
