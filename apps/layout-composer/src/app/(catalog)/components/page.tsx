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
  Package,
} from "lucide-react"

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
  const allComponents = getComponentsByCategory("ui")

  const filteredComponents = activeTab === "all"
    ? allComponents
    : getComponentsBySubcategory(activeTab)

  const [selectedSlug, setSelectedSlug] = useState<string>(
    filteredComponents[0]?.slug || ""
  )
  const selectedComponent = componentRegistry.find((c) => c.slug === selectedSlug)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (filteredComponents.length > 0 && !filteredComponents.find(c => c.slug === selectedSlug)) {
      setSelectedSlug(filteredComponents[0].slug)
    }
  }, [activeTab, filteredComponents, selectedSlug])

  return (
    <div className="flex h-[calc(100vh-3.5rem)]">
      {/* Left panel: Component list */}
      <div className="w-72 border-r bg-muted/30 flex flex-col shrink-0">
        <div className="border-b px-3 py-3">
          <h2 className="text-sm font-semibold mb-2">Components</h2>
          <div className="flex flex-wrap gap-1">
            {componentSubcategories.map((cat) => (
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

        <ScrollArea className="flex-1">
          <div className="p-2 space-y-0.5">
            {filteredComponents.map((component) => (
              <button
                key={component.slug}
                onClick={() => setSelectedSlug(component.slug)}
                className={cn(
                  "w-full text-left rounded-md px-3 py-2.5 transition-colors",
                  selectedSlug === component.slug
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium truncate">{component.name}</span>
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0 capitalize shrink-0">
                    {component.subcategory.replace("-", " ")}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                  {component.description}
                </p>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Right panel: Component detail */}
      <div className="flex-1 overflow-auto">
        {selectedComponent ? (
          <ComponentDetail component={selectedComponent} mounted={mounted} />
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Select a component to view details
          </div>
        )}
      </div>
    </div>
  )
}

function ComponentDetail({
  component,
  mounted,
}: {
  component: (typeof componentRegistry)[number]
  mounted: boolean
}) {
  const [activeTab, setActiveTab] = useState("preview")

  useEffect(() => { setActiveTab("preview") }, [component.slug])

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight">{component.name}</h1>
          <Badge variant="outline" className="capitalize">{component.subcategory.replace("-", " ")}</Badge>
        </div>
        <p className="text-muted-foreground">{component.description}</p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Package className="h-3.5 w-3.5" />
          <span className="font-mono">{component.importPath}</span>
        </div>
      </div>

      {/* Props */}
      {component.props && component.props.length > 0 && (
        <div>
          <h3 className="text-sm font-medium mb-2">Props</h3>
          <div className="flex flex-wrap gap-1.5">
            {component.props.map((prop) => (
              <code key={prop} className="px-2 py-0.5 bg-muted rounded text-xs font-mono">{prop}</code>
            ))}
          </div>
        </div>
      )}

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
            <CardContent className="p-6 min-h-[300px] flex items-center justify-center bg-muted/10">
              {mounted ? (
                <ComponentPreview slug={component.slug} />
              ) : (
                <p className="text-sm text-muted-foreground">Loading preview...</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="code" className="mt-4">
          <CodeView name={component.name} />
        </TabsContent>

        <TabsContent value="task" className="mt-4">
          <TaskView name={component.name} taskDescription={component.taskDescription} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

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
          <span className="text-sm font-medium">Usage Example</span>
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
