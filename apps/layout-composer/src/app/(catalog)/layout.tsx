"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
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

const sidebarSections = [
  { id: "blocks", label: "Blocks", icon: Blocks, href: "/blocks" },
  { id: "components", label: "Components", icon: Component, href: "/components" },
  { id: "charts", label: "Charts", icon: BarChart3, href: "/charts" },
]

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
          <Link href="/" className="flex items-center gap-2">
            <LayoutGrid className="h-5 w-5 shrink-0" />
            <span className="font-semibold text-sm group-data-[collapsible=icon]:hidden">
              Layout Composer
            </span>
          </Link>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs text-muted-foreground uppercase tracking-wider">
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
                      >
                        <Link href={section.href} className="flex items-center gap-3">
                          <Icon className="h-4 w-4 shrink-0" />
                          <span>{section.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <nav className="flex items-center gap-1 text-sm text-muted-foreground">
            {pathname && pathname.split("/").filter(Boolean).map((part, i, arr) => (
              <span key={i} className="flex items-center gap-1">
                {i > 0 && <span className="opacity-50">/</span>}
                <span className={i === arr.length - 1 ? "text-foreground font-medium capitalize" : "capitalize"}>
                  {part}
                </span>
              </span>
            ))}
          </nav>
        </header>
        <div className="flex-1 min-h-0 overflow-hidden">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
