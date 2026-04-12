"use client"

import Link from "next/link"
import { componentRegistry, getComponentsByCategory, getComponentsBySubcategory } from "@/lib/registry"
import { ComponentPreview } from "@/lib/component-preview"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@innate/ui"
import { Badge } from "@innate/ui"
import { Button } from "@innate/ui"
import { Code2, Copy, Sparkles } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@innate/ui"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@innate/ui"

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

// Featured blocks to show on the main blocks page
const featuredBlockSlugs = [
  "dashboard-01",
  "sidebar-07", 
  "sidebar-03",
  "login-03",
  "login-04",
]

export default function BlocksPage() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    setMounted(true)
  }, [])

  // Get all blocks
  const allBlocks = getComponentsByCategory("block")
  
  // Get featured blocks
  const featuredBlocks = featuredBlockSlugs
    .map((slug) => componentRegistry.find((c) => c.slug === slug))
    .filter(Boolean)

  // Filter blocks by category
  const filteredBlocks = activeTab === "all" 
    ? allBlocks 
    : getComponentsBySubcategory(activeTab)

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold tracking-tight">Building Blocks</h1>
        </div>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Pre-built page sections and application shells ready to copy and paste into your apps. 
          Each block includes code, preview, and AI task descriptions.
        </p>
      </div>

      {/* Category Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="flex-wrap h-auto gap-2 bg-transparent p-0">
          {blockCategories.map((cat) => (
            <TabsTrigger
              key={cat.id}
              value={cat.id}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {cat.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Featured Section (only on "all" tab) */}
        {activeTab === "all" && (
          <TabsContent value="all" className="mt-8 space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Featured Blocks</h2>
              <div className="grid gap-6 lg:grid-cols-2">
                {featuredBlocks.map((block) => 
                  block ? (
                    <BlockCard key={block.slug} block={block} mounted={mounted} />
                  ) : null
                )}
              </div>
            </div>
          </TabsContent>
        )}

        {/* Filtered Blocks */}
        <TabsContent value={activeTab} className="mt-8">
          <div className="grid gap-6 lg:grid-cols-2">
            {filteredBlocks.map((block) => (
              <BlockCard key={block.slug} block={block} mounted={mounted} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface BlockCardProps {
  block: {
    name: string
    slug: string
    subcategory: string
    description: string
    taskDescription: string
  }
  mounted: boolean
}

function BlockCard({ block, mounted }: BlockCardProps) {
  const [copied, setCopied] = useState(false)
  const [taskCopied, setTaskCopied] = useState(false)

  const copyCode = async () => {
    // In a real implementation, this would copy the actual block code
    await navigator.clipboard.writeText(`// ${block.name} code\n// Import from @innate/ui\nimport { ${block.name} } from "@innate/ui"`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const copyTask = async () => {
    await navigator.clipboard.writeText(block.taskDescription)
    setTaskCopied(true)
    setTimeout(() => setTaskCopied(false), 2000)
  }

  return (
    <Card className="group overflow-hidden">
      <div className="border-b bg-muted/30">
        <div className="p-4 flex items-center justify-between">
          <div>
            <h3 className="font-semibold">{block.name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-1">
              {block.description}
            </p>
          </div>
          <Badge variant="outline" className="capitalize">
            {block.subcategory}
          </Badge>
        </div>
      </div>

      {/* Preview Area */}
      <div className="relative bg-muted/10 overflow-hidden" style={{ height: "300px" }}>
        <div className="absolute inset-0 flex items-center justify-center">
          {mounted ? (
            <div className="w-full h-full p-4">
              <ComponentPreview slug={block.slug} />
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-sm text-muted-foreground">Loading preview...</p>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <CardContent className="p-4 border-t">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 gap-2"
            onClick={copyCode}
          >
            <Code2 className="h-4 w-4" />
            {copied ? "Copied!" : "Copy Code"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 gap-2"
            onClick={copyTask}
          >
            <Sparkles className="h-4 w-4" />
            {taskCopied ? "Copied!" : "Copy Task"}
          </Button>
          <Button variant="default" size="sm" asChild>
            <Link href={`/blocks/${block.slug}`}>View</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
