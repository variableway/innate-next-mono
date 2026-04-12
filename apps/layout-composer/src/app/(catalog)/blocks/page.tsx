"use client"

import { useState, useEffect } from "react"
import { componentRegistry, getComponentsByCategory, getComponentsBySubcategory } from "@/lib/registry"
import { ComponentPreview } from "@/lib/component-preview"
import { Card, CardContent, CardHeader } from "@innate/ui"
import { Badge } from "@innate/ui"
import { Button } from "@innate/ui"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@innate/ui"
import { ScrollArea } from "@innate/ui"
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

  const filteredBlocks = activeTab === "all"
    ? allBlocks
    : getComponentsBySubcategory(activeTab)

  const [selectedSlug, setSelectedSlug] = useState<string>(
    filteredBlocks[0]?.slug || ""
  )
  const selectedBlock = componentRegistry.find((c) => c.slug === selectedSlug)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (filteredBlocks.length > 0 && !filteredBlocks.find(b => b.slug === selectedSlug)) {
      setSelectedSlug(filteredBlocks[0].slug)
    }
  }, [activeTab, filteredBlocks, selectedSlug])

  return (
    <div className="flex h-full">
      {/* Left: item list */}
      <div className="w-64 shrink-0 border-r flex flex-col">
        {/* Category filter */}
        <div className="border-b p-3">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Category
          </h2>
          <div className="flex flex-wrap gap-1">
            {blockCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={cn(
                  "px-2 py-0.5 text-[11px] rounded font-medium transition-colors",
                  activeTab === cat.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Block list */}
        <ScrollArea className="flex-1">
          <div className="p-1.5">
            {filteredBlocks.map((block) => (
              <button
                key={block.slug}
                onClick={() => setSelectedSlug(block.slug)}
                className={cn(
                  "w-full text-left rounded-md px-3 py-2 transition-colors",
                  selectedSlug === block.slug
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                )}
              >
                <div className="flex items-center justify-between gap-1">
                  <span className="text-sm font-medium truncate">{block.name}</span>
                  <Badge variant="outline" className="text-[10px] px-1 py-0 capitalize shrink-0">
                    {block.subcategory}
                  </Badge>
                </div>
                <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
                  {block.description}
                </p>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Right: block detail */}
      <div className="flex-1 min-w-0 overflow-auto">
        {selectedBlock ? (
          <BlockDetail block={selectedBlock} mounted={mounted} />
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
            Select a block to view details
          </div>
        )}
      </div>
    </div>
  )
}

function BlockDetail({
  block,
  mounted,
}: {
  block: (typeof componentRegistry)[number]
  mounted: boolean
}) {
  const [activeTab, setActiveTab] = useState("preview")

  useEffect(() => { setActiveTab("preview") }, [block.slug])

  return (
    <div className="p-6 space-y-5">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold tracking-tight">{block.name}</h1>
          <Badge variant="outline" className="capitalize text-xs">{block.subcategory}</Badge>
        </div>
        <p className="text-sm text-muted-foreground mt-1">{block.description}</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="h-8">
          <TabsTrigger value="preview" className="text-xs gap-1.5 px-3">
            <Eye className="h-3 w-3" /> Preview
          </TabsTrigger>
          <TabsTrigger value="code" className="text-xs gap-1.5 px-3">
            <Code2 className="h-3 w-3" /> Code
          </TabsTrigger>
          <TabsTrigger value="task" className="text-xs gap-1.5 px-3">
            <Sparkles className="h-3 w-3" /> AI Task
          </TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="mt-4">
          <div className="rounded-lg border bg-muted/10">
            <div className="min-h-[400px] p-6">
              {mounted ? (
                <ComponentPreview slug={block.slug} />
              ) : (
                <div className="flex items-center justify-center h-64 text-sm text-muted-foreground">
                  Loading preview...
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="code" className="mt-4">
          <CodeView name={block.name} />
        </TabsContent>

        <TabsContent value="task" className="mt-4">
          <TaskView taskDescription={block.taskDescription} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function CodeView({ name }: { name: string }) {
  const [copied, setCopied] = useState(false)
  const code = `import { ${name} } from "@innate/ui"\n\nexport default function Example() {\n  return (\n    <${name} />\n  )\n}`

  return (
    <Card>
      <CardHeader className="border-b py-2.5 px-4 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <FileCode className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-xs font-medium">{name}.tsx</span>
        </div>
        <Button variant="outline" size="sm" className="h-7 text-xs gap-1.5"
          onClick={async () => { await navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000) }}>
          {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          {copied ? "Copied!" : "Copy"}
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px]">
          <pre className="p-4 text-xs font-mono bg-muted/10"><code>{code}</code></pre>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

function TaskView({ taskDescription }: { taskDescription: string }) {
  const [copied, setCopied] = useState(false)

  return (
    <Card>
      <CardHeader className="border-b py-2.5 px-4 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-xs font-medium">AI Task Description</span>
        </div>
        <Button variant="outline" size="sm" className="h-7 text-xs gap-1.5"
          onClick={async () => { await navigator.clipboard.writeText(taskDescription); setCopied(true); setTimeout(() => setCopied(false), 2000) }}>
          {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          {copied ? "Copied!" : "Copy"}
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
