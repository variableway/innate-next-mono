"use client"

import Link from "next/link"
import { getComponentsByCategory, getComponentsBySubcategory, componentRegistry } from "@/lib/registry"
import { ComponentPreview } from "@/lib/component-preview"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@innate/ui"
import { Badge } from "@innate/ui"
import { Button } from "@innate/ui"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@innate/ui"
import { useState, useEffect } from "react"
import { Code2, Sparkles } from "lucide-react"

const componentSubcategories = [
  { id: "all", label: "All" },
  { id: "layout", label: "Layout" },
  { id: "form", label: "Form" },
  { id: "feedback", label: "Feedback" },
  { id: "data-display", label: "Data Display" },
  { id: "actions", label: "Actions" },
  { id: "navigation", label: "Navigation" },
]

export default function ComponentsPage() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    setMounted(true)
  }, [])

  // Get all UI components
  const allComponents = getComponentsByCategory("ui")
  
  // Filter by subcategory
  const filteredComponents = activeTab === "all"
    ? allComponents
    : getComponentsBySubcategory(activeTab)

  // Group by subcategory for display
  const groupedBySubcategory = filteredComponents.reduce((acc, component) => {
    if (!acc[component.subcategory]) {
      acc[component.subcategory] = []
    }
    acc[component.subcategory].push(component)
    return acc
  }, {} as Record<string, typeof allComponents>)

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">UI Components</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          A collection of accessible, reusable UI components built on Radix UI primitives. 
          Each component includes code examples and AI task descriptions.
        </p>
      </div>

      {/* Category Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="flex-wrap h-auto gap-2 bg-transparent p-0">
          {componentSubcategories.map((cat) => (
            <TabsTrigger
              key={cat.id}
              value={cat.id}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {cat.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeTab} className="mt-8 space-y-8">
          {activeTab === "all" ? (
            // Show grouped by subcategory when "all" is selected
            Object.entries(groupedBySubcategory).map(([subcategory, components]) => (
              <div key={subcategory}>
                <h2 className="text-xl font-semibold mb-4 capitalize">
                  {subcategory.replace("-", " ")}
                </h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {components.map((component) => (
                    <ComponentCard key={component.slug} component={component} mounted={mounted} />
                  ))}
                </div>
              </div>
            ))
          ) : (
            // Show flat list when filtered
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredComponents.map((component) => (
                <ComponentCard key={component.slug} component={component} mounted={mounted} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface ComponentCardProps {
  component: {
    name: string
    slug: string
    subcategory: string
    description: string
    taskDescription: string
  }
  mounted: boolean
}

function ComponentCard({ component, mounted }: ComponentCardProps) {
  const [copied, setCopied] = useState(false)
  const [taskCopied, setTaskCopied] = useState(false)

  const copyCode = async () => {
    await navigator.clipboard.writeText(
      `import { ${component.name} } from "@innate/ui"\n\n// ${component.description}`
    )
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const copyTask = async () => {
    await navigator.clipboard.writeText(component.taskDescription)
    setTaskCopied(true)
    setTimeout(() => setTaskCopied(false), 2000)
  }

  return (
    <Card className="group overflow-hidden flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{component.name}</CardTitle>
          <Badge variant="outline" className="text-xs capitalize">
            {component.subcategory.replace("-", " ")}
          </Badge>
        </div>
        <CardDescription className="line-clamp-2">
          {component.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col gap-4">
        {/* Preview */}
        <div className="h-32 bg-muted/30 rounded-lg flex items-center justify-center overflow-hidden">
          {mounted ? (
            <div className="scale-75 origin-center">
              <ComponentPreview slug={component.slug} />
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Loading...</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 gap-2"
            onClick={copyCode}
          >
            <Code2 className="h-4 w-4" />
            {copied ? "Copied!" : "Code"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 gap-2"
            onClick={copyTask}
          >
            <Sparkles className="h-4 w-4" />
            {taskCopied ? "Copied!" : "Task"}
          </Button>
          <Button variant="default" size="sm" asChild>
            <Link href={`/components/${component.slug}`}>View</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
