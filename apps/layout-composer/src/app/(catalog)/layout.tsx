"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@innate/ui"
import { ScrollArea } from "@innate/ui"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@innate/ui"
import { Separator } from "@innate/ui"
import {
  Blocks,
  Component,
  BarChart3,
  LayoutGrid,
} from "lucide-react"
import { useEffect, useState } from "react"
import { getComponentsByCategory, componentRegistry, type ComponentMeta } from "@/lib/registry"
import { ComponentPreview } from "@/lib/component-preview"
import { Button } from "@innate/ui"
import { Badge } from "@innate/ui"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@innate/ui"
import { Card, CardContent, CardHeader } from "@innate/ui"
import { ScrollArea as ScrollAreaPrimitive } from "@innate/ui"
import { Code2, Copy, Check, Sparkles, FileCode, Eye } from "lucide-react"

// ── Section definitions ──────────────────────────────────────────────────────

const sidebarSections = [
  { id: "blocks", label: "Blocks", icon: Blocks, href: "/blocks" },
  { id: "components", label: "Components", icon: Component, href: "/components" },
  { id: "charts", label: "Charts", icon: BarChart3, href: "/charts" },
]

// ── Main Layout ──────────────────────────────────────────────────────────────

export default function CatalogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar collapsible="icon" className="border-r">
        <SidebarHeader className="h-14 border-b px-4 flex items-center gap-2">
          <LayoutGrid className="h-5 w-5 shrink-0" />
          <span className="font-semibold text-sm group-data-[collapsible=icon]:hidden">
            Layout Composer
          </span>
        </SidebarHeader>

        <SidebarContent>
          <ScrollArea>
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs text-muted-foreground uppercase tracking-wider px-4 pt-4 pb-1">
                Catalog
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {sidebarSections.map((section) => {
                    const isActive = pathname?.startsWith(section.href)
                    const Icon = section.icon
                    return (
                      <SidebarMenuItem key={section.id}>
                        <SidebarMenuButton
                          asChild
                          isActive={isActive}
                          tooltip={section.label}
                          className="px-3 py-2"
                        >
                          <Link href={section.href} className="flex items-center gap-3">
                            <Icon className="h-4 w-4 shrink-0" />
                            <span className="group-data-[collapsible=icon]:hidden">
                              {section.label}
                            </span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </ScrollArea>
        </SidebarContent>

        <SidebarRail />
      </Sidebar>

      {/* Main content area */}
      <SidebarInset>
        <header className="flex h-14 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb pathname={pathname} />
        </header>
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

// ── Breadcrumb ───────────────────────────────────────────────────────────────

function Breadcrumb({ pathname }: { pathname: string | null }) {
  if (!pathname) return null

  const parts = pathname.split("/").filter(Boolean)
  if (parts.length === 0) return null

  return (
    <nav className="flex items-center gap-1 text-sm text-muted-foreground">
      {parts.map((part, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && <span className="text-muted-foreground/50">/</span>}
          <span className={i === parts.length - 1 ? "text-foreground font-medium capitalize" : "capitalize"}>
            {part}
          </span>
        </span>
      ))}
    </nav>
  )
}
