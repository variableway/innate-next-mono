"use client"

import { Monitor, Smartphone, Tablet } from "lucide-react"
import { ToggleGroup, ToggleGroupItem } from "@innate/ui"

export type DeviceSize = "desktop" | "tablet" | "mobile"

interface BlockToolbarProps {
  device: DeviceSize
  onDeviceChange: (device: DeviceSize) => void
}

export function BlockToolbar({ device, onDeviceChange }: BlockToolbarProps) {
  return (
    <div className="flex items-center gap-2">
      <ToggleGroup
        type="single"
        value={device}
        onValueChange={(val) => val && onDeviceChange(val as DeviceSize)}
      >
        <ToggleGroupItem value="desktop" aria-label="Desktop">
          <Monitor className="size-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="tablet" aria-label="Tablet">
          <Tablet className="size-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="mobile" aria-label="Mobile">
          <Smartphone className="size-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}
