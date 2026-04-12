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
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@innate/ui"
import {
  LayoutGrid,
  Component,
  BarChart3,
  Blocks,
  ChevronRight,
} from "lucide-react"

const sidebarSections = [
  {
    id: "blocks",
    label: "Blocks",
    icon: Blocks,
    href: "/blocks",
    items: [
      { name: "Dashboard", href: "/blocks" },
      { name: "Sidebar", href: "/blocks" },
      { name: "Login", href: "/blocks" },
      { name: "Signup", href: "/blocks" },
      { name: "Landing", href: "/blocks" },
      { name: "Auth", href: "/blocks" },
      { name: "Mail", href: "/blocks" },
      { name: "Chat", href: "/blocks" },
    ],
  },
  {
    id: "components",
    label: "Components",
    icon: Component,
    href: "/components",
    items: [
      { name: "Layout", href: "/components" },
      { name: "Form", href: "/components" },
      { name: "Feedback", href: "/components" },
      { name: "Data Display", href: "/components" },
      { name: "Actions", href: "/components" },
      { name: "Navigation", href: "/components" },
    ],
  },
  {
    id: "charts",
    label: "Charts",
    icon: BarChart3,
    href: "/charts",
    items: [
      { name: "Area", href: "/charts/area" },
      { name: "Bar", href: "/charts/bar" },
      { name: "Line", href: "/charts/line" },
      { name: "Pie", href: "/charts/pie" },
      { name: "Radar", href: "/charts/radar" },
      { name: "Radial", href: "/charts/radial" },
      { name: "Tooltip", href: "/charts/tooltip" },
    ],
  },
]

export default function CatalogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  // Check which section is active
  const activeSection = sidebarSections.find((section) =>
    pathname?.startsWith(section.href)
  )

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen">
        {/* Main Sidebar */}
        <Sidebar className="border-r bg-muted/30" collapsible="icon">
          <SidebarHeader className="h-14 border-b px-4 flex items-center">
            <Link
              href="/"
              className="flex items-center gap-2 font-semibold group-data-[collapsible=icon]:hidden"
            >
              <LayoutGrid className="h-5 w-5" />
              <span>Catalog</span>
            </Link>
          </SidebarHeader>

          <SidebarContent>
            <ScrollArea className="h-[calc(100vh-3.5rem)]">
              {sidebarSections.map((section) => {
                const isActive = pathname?.startsWith(section.href)
                const Icon = section.icon

                return (
                  <SidebarGroup key={section.id}>
                    <SidebarGroupLabel asChild>
                      <Link
                        href={section.href}
                        className={cn(
                          "flex items-center gap-2 text-sm font-medium",
                          isActive && "text-primary"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        <span className="group-data-[collapsible=icon]:hidden">
                          {section.label}
                        </span>
                      </Link>
                    </SidebarGroupLabel>

                    <SidebarGroupContent className="group-data-[collapsible=icon]:hidden">
                      <SidebarMenu>
                        {section.items.map((item) => {
                          const isItemActive = pathname === item.href
                          return (
                            <SidebarMenuItem key={item.href}>
                              <SidebarMenuButton
                                asChild
                                isActive={isItemActive}
                                tooltip={item.name}
                              >
                                <Link
                                  href={item.href}
                                  className="flex items-center gap-2 pl-8"
                                >
                                  <ChevronRight className="h-3 w-3" />
                                  <span>{item.name}</span>
                                </Link>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          )
                        })}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </SidebarGroup>
                )
              })}
            </ScrollArea>
          </SidebarContent>

          <SidebarRail />
        </Sidebar>

        {/* Content Area with optional Item Sidebar */}
        <main className="flex-1 flex min-h-screen overflow-hidden">
          {/* Left sidebar for items within the section */}
          <ItemSidebar section={activeSection} pathname={pathname} />

          {/* Main content area */}
          <div className="flex-1 overflow-auto">
            <div className="container py-6">
              <div className="flex items-center gap-2 mb-6 lg:hidden">
                <SidebarTrigger />
                <span className="text-sm text-muted-foreground">Menu</span>
              </div>
              {children}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

// Item sidebar - shows items within the current section
function ItemSidebar({
  section,
  pathname,
}: {
  section?: (typeof sidebarSections)[number]
  pathname: string | null
}) {
  if (!section) return null

  return (
    <div className="w-64 border-r bg-muted/20 hidden lg:block flex-shrink-0">
      <div className="h-14 border-b px-4 flex items-center font-semibold">
        {section.label}
      </div>
      <ScrollArea className="h-[calc(100vh-3.5rem)]">
        <div className="p-2 space-y-1">
          {section.items.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                  isActive
                    ? "bg-accent text-accent-foreground font-medium"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                )}
              >
                {item.name}
              </Link>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}
