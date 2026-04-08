"use client"

import { use, useState } from "react"
import Link from "next/link"
import { getComponentBySlug } from "@/lib/registry"
import { useAIDrawerStore } from "@/lib/ai-drawer-store"
import { Badge } from "@innate/ui"
import { Button } from "@innate/ui"
import { Card, CardContent } from "@innate/ui"
import { Separator } from "@innate/ui"
import { Sparkles } from "lucide-react"
import { ResizablePreview } from "@/components/resizable-preview"
import { BlockToolbar, type DeviceSize } from "@/components/block-toolbar"

export default function BlockDetailPage({
  params,
}: {
  params: Promise<{ name: string }>
}) {
  const { name } = use(params)
  const comp = getComponentBySlug(name)
  const [device, setDevice] = useState<DeviceSize>("desktop")
  const openForComponent = useAIDrawerStore((s) => s.openForComponent)

  if (!comp) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Block not found</h1>
        <p className="text-muted-foreground">
          No block with slug &quot;{name}&quot; exists.
        </p>
        <Link href="/blocks">
          <Button variant="outline">Back to Blocks</Button>
        </Link>
      </div>
    )
  }

  const importCode = `import { ${comp.name} } from "${comp.importPath}"`

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Link href="/blocks" className="hover:underline">Blocks</Link>
          <span>/</span>
          <span className="capitalize">{comp.subcategory}</span>
        </div>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold">{comp.name}</h1>
            <p className="mt-2 text-muted-foreground">{comp.description}</p>
          </div>
          <Button
            variant="outline"
            className="gap-1.5"
            onClick={() => openForComponent(comp.slug)}
          >
            <Sparkles className="size-4" />
            AI Description
          </Button>
        </div>
      </div>

      <Separator className="mb-6" />

      {/* Import code */}
      <div className="mb-6 flex items-center gap-2">
        <code className="rounded-md bg-muted px-3 py-1.5 text-sm font-mono">
          {importCode}
        </code>
      </div>

      {/* Preview toolbar + preview */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Preview</h2>
          <BlockToolbar device={device} onDeviceChange={setDevice} />
        </div>
        <ResizablePreview slug={comp.slug} device={device} />
      </div>

      {/* Props section */}
      {comp.props && comp.props.length > 0 && (
        <div className="mt-8">
          <h2 className="mb-4 text-lg font-semibold">Props</h2>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-2">
                {comp.props.map((prop) => (
                  <Badge key={prop} variant="outline" className="font-mono text-xs">
                    {prop}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
