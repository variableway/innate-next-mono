"use client"

import * as React from "react"
import { formatDistanceToNow } from "date-fns"

import { cn } from "../../lib/utils"
import { Badge } from "../../components/ui/badge"
import { ScrollArea } from "../../components/ui/scroll-area"
import type { MailItem } from "./mail-types"

interface MailListProps {
  items: MailItem[]
  selected?: string | null
  onSelect?: (id: string) => void
  className?: string
}

function MailList({
  items,
  selected,
  onSelect,
  className,
}: MailListProps) {
  return (
    <ScrollArea className={cn("h-[calc(100vh-12rem)]", className)}>
      <div className="flex flex-col gap-2 p-4 pt-0">
        {items.map((item) => (
          <button
            key={item.id}
            className={cn(
              "hover:bg-accent hover:text-accent-foreground flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all cursor-pointer",
              selected === item.id && "bg-muted"
            )}
            onClick={() => onSelect?.(item.id)}
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">{item.name}</div>
                  {!item.read && (
                    <span className="flex size-2 rounded-full bg-blue-600" />
                  )}
                </div>
                <div
                  className={cn(
                    "ml-auto text-xs",
                    selected === item.id
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {formatDistanceToNow(new Date(item.date), {
                    addSuffix: true,
                  })}
                </div>
              </div>
              <div className="text-xs font-medium">{item.subject}</div>
            </div>
            <div className="text-muted-foreground line-clamp-2 text-xs">
              {item.text.substring(0, 300)}
            </div>
            {item.labels.length > 0 && (
              <div className="flex items-center gap-2">
                {item.labels.map((label) => (
                  <Badge
                    key={label}
                    variant={getBadgeVariantFromLabel(label)}
                  >
                    {label}
                  </Badge>
                ))}
              </div>
            )}
          </button>
        ))}
      </div>
    </ScrollArea>
  )
}

function getBadgeVariantFromLabel(
  label: string
): "default" | "secondary" | "outline" | "destructive" {
  if (["work"].includes(label.toLowerCase())) return "default"
  if (["personal"].includes(label.toLowerCase())) return "outline"
  return "secondary"
}

export { MailList, type MailListProps }
