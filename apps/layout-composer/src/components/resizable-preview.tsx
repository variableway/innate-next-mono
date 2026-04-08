"use client"

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@innate/ui"
import { ComponentPreview } from "@/lib/component-preview"

interface ResizablePreviewProps {
  slug: string
  device?: "desktop" | "tablet" | "mobile"
}

const deviceWidths = {
  desktop: "100%",
  tablet: "768px",
  mobile: "375px",
}

export function ResizablePreview({ slug, device = "desktop" }: ResizablePreviewProps) {
  return (
    <div className="rounded-lg border bg-muted/30">
      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel defaultSize={100}>
          <div
            className="mx-auto transition-all duration-300"
            style={{ maxWidth: deviceWidths[device] }}
          >
            <ComponentPreview slug={slug} />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
