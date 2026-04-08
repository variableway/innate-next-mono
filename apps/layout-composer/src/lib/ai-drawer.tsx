"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { useAIDrawerStore } from "./ai-drawer-store"
import { getComponentBySlug } from "./registry"
import { generateTask } from "./task-templates"
import { Badge } from "@innate/ui"
import { Button } from "@innate/ui"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@innate/ui"
import { Separator } from "@innate/ui"
import { ScrollArea } from "@innate/ui"

export function AIDrawer() {
  const { isOpen, mode, slug, selectedSlugs, close } = useAIDrawerStore()
  const [copied, setCopied] = useState(false)

  const singleComponent = useMemo(
    () => (mode === "single" && slug ? getComponentBySlug(slug) : null),
    [mode, slug],
  )

  const multiTask = useMemo(() => {
    if (mode !== "multi" || selectedSlugs.length === 0) return null
    const comps = selectedSlugs
      .map((s) => getComponentBySlug(s))
      .filter((c): c is NonNullable<typeof c> => c !== undefined)
    return generateTask(comps)
  }, [mode, selectedSlugs])

  const content = useMemo(() => {
    if (mode === "single" && singleComponent) {
      const comp = singleComponent
      const importCode = `import { ${comp.name} } from "${comp.importPath}"`
      return { title: comp.name, description: comp.description, text: comp.taskDescription, importCode, props: comp.props }
    }
    if (mode === "multi" && multiTask) {
      return { title: multiTask.title, description: multiTask.description, text: multiTask.fullText, importCode: null, props: null }
    }
    return null
  }, [mode, singleComponent, multiTask])

  const handleCopy = () => {
    if (!content?.text) return
    navigator.clipboard.writeText(content.text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const handleDownload = () => {
    if (!content?.text) return
    const blob = new Blob([content.text], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "task.md"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && close()}>
      <SheetContent className="w-[420px] sm:w-[540px] sm:max-w-[540px] p-0 flex flex-col">
        <SheetHeader className="px-6 pt-6 pb-4">
          <SheetTitle className="flex items-center gap-2">
            AI Task Description
            <Badge variant="secondary" className="text-xs">
              {mode === "single" ? "Single" : "Multi"}
            </Badge>
          </SheetTitle>
          <SheetDescription>
            {content?.title || "Component task description"}
          </SheetDescription>
        </SheetHeader>

        <Separator />

        <ScrollArea className="flex-1">
          <div className="p-6 space-y-6">
            {content ? (
              <>
                {/* Import code */}
                {content.importCode && (
                  <div>
                    <h4 className="mb-2 text-sm font-medium">Import</h4>
                    <code className="block rounded-md bg-muted px-3 py-2 text-sm font-mono">
                      {content.importCode}
                    </code>
                  </div>
                )}

                {/* Props list */}
                {content.props && content.props.length > 0 && (
                  <div>
                    <h4 className="mb-2 text-sm font-medium">Key Props</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {content.props.map((prop) => (
                        <Badge key={prop} variant="outline" className="text-xs font-mono">
                          {prop}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <Separator />

                {/* AI Task Description */}
                <div>
                  <h4 className="mb-2 text-sm font-medium">Task Description</h4>
                  <pre className="whitespace-pre-wrap rounded-lg bg-muted p-4 text-sm leading-relaxed font-mono">
                    {content.text}
                  </pre>
                </div>
              </>
            ) : (
              <div className="py-8 text-center text-sm text-muted-foreground">
                Select a component to see its AI task description.
              </div>
            )}
          </div>
        </ScrollArea>

        <Separator />

        {/* Actions */}
        <div className="flex items-center gap-2 px-6 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            disabled={!content?.text}
          >
            {copied ? "Copied!" : "Copy"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            disabled={!content?.text}
          >
            Download .md
          </Button>
          {mode === "single" && slug && (
            <Link href={`/task-builder?components=${slug}`} className="ml-auto">
              <Button size="sm">Add to Task Builder</Button>
            </Link>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
