"use client"

import * as React from "react"
import {
  Archive,
  File,
  Inbox,
  Send,
  Trash2,
} from "lucide-react"

import { cn } from "../../lib/utils"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../../components/ui/resizable"
import { ScrollArea } from "../../components/ui/scroll-area"
import { Separator } from "../../components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip"
import { MailList } from "./mail-list"
import { MailDisplay } from "./mail-display"
import type { MailItem, MailFolder } from "./mail-types"

const defaultFolders: MailFolder[] = [
  { title: "Inbox", label: "128", icon: Inbox, variant: "default" },
  { title: "Drafts", label: "9", icon: File, variant: "ghost" },
  { title: "Sent", icon: Send, variant: "ghost" },
  { title: "Trash", icon: Trash2, variant: "ghost" },
  { title: "Archive", icon: Archive, variant: "ghost" },
]

interface InboxProps {
  mails: MailItem[]
  folders?: MailFolder[]
  defaultLayout?: number[]
  defaultCollapsed?: boolean
  navCollapsedSize?: number
  className?: string
}

function Inbox({
  mails,
  folders = defaultFolders,
  defaultLayout = [20, 32, 48],
  defaultCollapsed = false,
  navCollapsedSize = 4,
  className,
}: InboxProps) {
  const [selected, setSelected] = React.useState<string | null>(null)
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed)

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        className={cn(
          "h-full items-stretch rounded-lg border overflow-hidden",
          className
        )}
      >
        {/* Sidebar */}
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible
          minSize={15}
          maxSize={20}
          onCollapse={() => setCollapsed(true)}
          onExpand={() => setCollapsed(false)}
          className={cn(
            collapsed && "w-full transition-all duration-300 ease-in-out"
          )}
        >
          <div className="flex h-[52px] items-center justify-center px-2">
            <span className="text-sm font-semibold">Mail</span>
          </div>
          <Separator />
          <div className="m-3">
            <Button className="w-full">
              {collapsed ? "" : "Compose"}
              <Send className="size-4" />
            </Button>
          </div>
          <Separator />
          <ScrollArea className="flex-1">
            <div className="flex flex-col gap-1 p-2">
              {folders.map((folder) => (
                <Tooltip key={folder.title} delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Button
                      variant={folder.variant === "default" ? "secondary" : "ghost"}
                      className={cn(
                        "w-full justify-start",
                        collapsed && "justify-center px-2"
                      )}
                    >
                      <folder.icon className="size-4 shrink-0" />
                      {!collapsed && (
                        <>
                          <span className="ml-2">{folder.title}</span>
                          {folder.label && (
                            <span className="text-muted-foreground ml-auto text-xs">
                              {folder.label}
                            </span>
                          )}
                        </>
                      )}
                    </Button>
                  </TooltipTrigger>
                  {collapsed && (
                    <TooltipContent side="right">
                      {folder.title}
                    </TooltipContent>
                  )}
                </Tooltip>
              ))}
            </div>
          </ScrollArea>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Mail List */}
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <div className="flex items-center px-4 py-2">
            <h1 className="text-xl font-bold">Inbox</h1>
          </div>
          <Separator />
          <div className="p-4">
            <div className="relative">
              <Input placeholder="Search" className="pl-8" />
            </div>
          </div>
          <MailList
            items={mails}
            selected={selected}
            onSelect={setSelected}
          />
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Mail Display */}
        <ResizablePanel defaultSize={defaultLayout[2]} minSize={30}>
          <MailDisplay
            mail={mails.find((m) => m.id === selected) || null}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  )
}

export { Inbox, type InboxProps }
