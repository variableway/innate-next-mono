"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { getComponentBySlug, componentRegistry } from "@/lib/registry"
import { ComponentPreview } from "@/lib/component-preview"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@innate/ui"
import { Badge } from "@innate/ui"
import { Button } from "@innate/ui"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@innate/ui"
import { ScrollArea } from "@innate/ui"
import { Separator } from "@innate/ui"
import { 
  ChevronLeft, 
  Code2, 
  Copy, 
  Check, 
  Sparkles, 
  FileCode,
  Eye,
  Package
} from "lucide-react"
import { useState, useEffect } from "react"

export default function ComponentDetailPage() {
  const params = useParams()
  const slug = params?.slug as string
  const component = getComponentBySlug(slug)
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("preview")

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!component) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h1 className="text-2xl font-bold">Component not found</h1>
        <p className="text-muted-foreground mt-2">
          The component you&apos;re looking for doesn&apos;t exist.
        </p>
        <Button asChild className="mt-6">
          <Link href="/components">Back to Components</Link>
        </Button>
      </div>
    )
  }

  // Get related components (same subcategory)
  const relatedComponents = componentRegistry
    .filter((c) => 
      c.category === "ui" && 
      c.subcategory === component.subcategory && 
      c.slug !== component.slug
    )
    .slice(0, 3)

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/components" className="hover:text-foreground flex items-center gap-1">
          <ChevronLeft className="h-4 w-4" />
          Components
        </Link>
        <span>/</span>
        <span className="capitalize">{component.subcategory.replace("-", " ")}</span>
        <span>/</span>
        <span className="text-foreground font-medium">{component.name}</span>
      </div>

      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">{component.name}</h1>
          <Badge variant="outline" className="capitalize">
            {component.subcategory.replace("-", " ")}
          </Badge>
        </div>
        <p className="text-muted-foreground text-lg max-w-2xl">
          {component.description}
        </p>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Package className="h-4 w-4" />
          <span>Import from: {component.importPath}</span>
        </div>
      </div>

      {/* Props */}
      {component.props && component.props.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Props</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {component.props.map((prop) => (
                <code
                  key={prop}
                  className="px-2 py-1 bg-muted rounded text-sm font-mono"
                >
                  {prop}
                </code>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="preview" className="gap-2">
            <Eye className="h-4 w-4" />
            Preview
          </TabsTrigger>
          <TabsTrigger value="code" className="gap-2">
            <Code2 className="h-4 w-4" />
            Code
          </TabsTrigger>
          <TabsTrigger value="task" className="gap-2">
            <Sparkles className="h-4 w-4" />
            AI Task
          </TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="mt-0">
          <Card>
            <CardContent className="p-6 min-h-[300px] flex items-center justify-center bg-muted/10">
              {mounted ? (
                <ComponentPreview slug={component.slug} />
              ) : (
                <p className="text-muted-foreground">Loading preview...</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="code" className="mt-0">
          <CodeView component={component} />
        </TabsContent>

        <TabsContent value="task" className="mt-0">
          <TaskView component={component} />
        </TabsContent>
      </Tabs>

      {/* Related Components */}
      {relatedComponents.length > 0 && (
        <div className="space-y-4 pt-8 border-t">
          <h2 className="text-xl font-semibold">Related Components</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {relatedComponents.map((related) => (
              <Link key={related.slug} href={`/components/${related.slug}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">{related.name}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {related.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function CodeView({ component }: { component: { name: string; slug: string } }) {
  const [copied, setCopied] = useState(false)

  const code = `import { ${component.name} } from "@innate/ui"

export default function Example() {
  return (
    <${component.name}
      // Add your props here
    />
  )
}`

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card>
      <CardHeader className="border-b bg-muted/50 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <FileCode className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Usage Example</span>
        </div>
        <Button variant="outline" size="sm" onClick={copyToClipboard} className="gap-2">
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? "Copied!" : "Copy Code"}
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[300px]">
          <pre className="p-4 text-sm font-mono bg-muted/10">
            <code>{code}</code>
          </pre>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

function TaskView({ component }: { component: { name: string; taskDescription: string } }) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(component.taskDescription)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card>
      <CardHeader className="border-b bg-muted/50 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">AI Task Description</span>
        </div>
        <Button variant="outline" size="sm" onClick={copyToClipboard} className="gap-2">
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? "Copied!" : "Copy Task"}
        </Button>
      </CardHeader>
      <CardContent className="p-6">
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <p className="text-muted-foreground leading-relaxed">
            {component.taskDescription}
          </p>
        </div>
        <Separator className="my-6" />
        <div className="bg-muted/50 rounded-lg p-4">
          <h4 className="text-sm font-semibold mb-2">How to use this task:</h4>
          <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
            <li>Copy the AI task description above</li>
            <li>Paste it into your AI assistant chat</li>
            <li>The AI will understand the component requirements</li>
            <li>Refine as needed for your specific use case</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  )
}
