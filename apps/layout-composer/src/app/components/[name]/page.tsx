"use client"

import { use, useState } from "react"
import Link from "next/link"
import { getComponentBySlug } from "@/lib/registry"
import { ComponentPreview } from "@/lib/component-preview"
import { useAIDrawerStore } from "@/lib/ai-drawer-store"
import { Badge } from "@innate/ui"
import { Button } from "@innate/ui"
import { Sparkles } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@innate/ui"
import { Separator } from "@innate/ui"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@innate/ui"

export default function ComponentDetailPage({
  params,
}: {
  params: Promise<{ name: string }>
}) {
  const { name } = use(params)
  const comp = getComponentBySlug(name)
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const openForComponent = useAIDrawerStore((s) => s.openForComponent)

  if (!comp) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Component not found</h1>
        <p className="text-muted-foreground">
          No component with slug &quot;{name}&quot; exists.
        </p>
        <Link href="/components">
          <Button variant="outline">Back to Catalog</Button>
        </Link>
      </div>
    )
  }

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 2000)
    })
  }

  const importCode = `import { ${comp.name} } from "${comp.importPath}"`

  const categoryLabel = comp.category === "block" ? "Block" : "UI"

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b">
        <div className="mx-auto flex h-14 max-w-5xl items-center gap-4 px-6">
          <Link
            href="/components"
            className="text-sm text-muted-foreground hover:underline"
          >
            &larr; Catalog
          </Link>
          <Separator orientation="vertical" className="h-5" />
          <Badge variant="outline">{categoryLabel}</Badge>
          <Badge variant="outline">{comp.subcategory}</Badge>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-8">
        {/* Title area */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">{comp.name}</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            {comp.description}
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-4 gap-1.5"
            onClick={() => openForComponent(comp.slug)}
          >
            <Sparkles className="size-4" />
            AI Task Description
          </Button>
        </div>

        {/* Import code with copy */}
        <Card className="mb-8">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Import
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <code className="flex-1 rounded bg-muted px-3 py-2 text-sm font-mono">
                {importCode}
              </code>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(importCode, "import")}
              >
                {copiedField === "import" ? "Copied!" : "Copy"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabs: Preview / Props */}
        <Tabs defaultValue="preview">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="props">Props</TabsTrigger>
          </TabsList>

          {/* Preview */}
          <TabsContent value="preview">
            <Card>
              <CardContent className="p-6">
                <ComponentPreview slug={comp.slug} />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Props */}
          <TabsContent value="props">
            <Card>
              <CardContent className="p-6">
                {comp.props && comp.props.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b text-left">
                          <th className="pb-2 pr-4 font-medium">Prop</th>
                          <th className="pb-2 font-medium">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {comp.props.map((prop) => (
                          <tr key={prop} className="border-b last:border-0">
                            <td className="py-2 pr-4 font-mono text-xs">
                              {prop}
                            </td>
                            <td className="py-2 text-muted-foreground text-sm">
                              See task description for details
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No documented props.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
