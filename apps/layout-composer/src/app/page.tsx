"use client"

import Link from "next/link"
import { componentRegistry } from "@/lib/registry"
import { ComponentPreview } from "@/lib/component-preview"
import { Badge } from "@innate/ui"
import { Button } from "@innate/ui"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@innate/ui"
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
  ArrowRight,
  Blocks,
  Component,
  BarChart3,
  Sparkles,
  Code2,
  LayoutGrid,
} from "lucide-react"
import { useState, useEffect } from "react"

const featuredBlocks = [
  { slug: "dashboard-01", name: "Dashboard", description: "A dashboard layout with sidebar and data visualization" },
  { slug: "sidebar-07", name: "Sidebar Navigation", description: "Collapsible sidebar with navigation groups" },
  { slug: "login-03", name: "Login Form", description: "Authentication form with validation" },
  { slug: "login-04", name: "Split Login", description: "Split-screen login with image" },
]

const popularComponents = [
  { slug: "button", name: "Button" },
  { slug: "card", name: "Card" },
  { slug: "dialog", name: "Dialog" },
  { slug: "input", name: "Input" },
  { slug: "table", name: "Table" },
  { slug: "select", name: "Select" },
]

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  const featuredData = featuredBlocks
    .map((block) => ({
      ...block,
      registryData: componentRegistry.find((c) => c.slug === block.slug),
    }))
    .filter((b) => b.registryData)

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
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs text-muted-foreground uppercase tracking-wider px-4 pt-4 pb-1">
              Catalog
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Blocks" className="px-3 py-2">
                    <Link href="/blocks" className="flex items-center gap-3">
                      <Blocks className="h-4 w-4 shrink-0" />
                      <span className="group-data-[collapsible=icon]:hidden">Blocks</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Components" className="px-3 py-2">
                    <Link href="/components" className="flex items-center gap-3">
                      <Component className="h-4 w-4 shrink-0" />
                      <span className="group-data-[collapsible=icon]:hidden">Components</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Charts" className="px-3 py-2">
                    <Link href="/charts" className="flex items-center gap-3">
                      <BarChart3 className="h-4 w-4 shrink-0" />
                      <span className="group-data-[collapsible=icon]:hidden">Charts</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        <header className="flex h-14 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <span className="text-sm font-medium">Home</span>
        </header>

        <div className="flex-1 overflow-auto">
          {/* Hero */}
          <section className="border-b px-6 py-16 lg:py-20">
            <div className="mx-auto max-w-4xl text-center">
              <Badge variant="outline" className="mb-4 px-3 py-1">
                <Sparkles className="mr-1 h-3 w-3" /> shadcn/ui powered
              </Badge>
              <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Building Blocks for the Web
              </h1>
              <p className="mx-auto mb-8 max-w-xl text-muted-foreground">
                Browse blocks, components, and charts. Copy code or AI task descriptions instantly.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button asChild size="lg" className="gap-2">
                  <Link href="/blocks"><Blocks className="h-4 w-4" /> Browse Blocks <ArrowRight className="h-4 w-4" /></Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/components"><Component className="h-4 w-4" /> Components</Link>
                </Button>
              </div>
            </div>
          </section>

          {/* Featured Blocks */}
          <section className="px-6 py-12">
            <div className="mx-auto max-w-6xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Featured Blocks</h2>
                <Button asChild variant="ghost" size="sm"><Link href="/blocks">View all</Link></Button>
              </div>
              <div className="grid gap-4 lg:grid-cols-2">
                {featuredData.map((block) => (
                  <Card key={block.slug} className="group overflow-hidden">
                    <div className="border-b bg-muted/30 px-4 py-3 flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-sm">{block.name}</h3>
                        <p className="text-xs text-muted-foreground">{block.description}</p>
                      </div>
                      <Badge variant="outline" className="capitalize text-xs">Block</Badge>
                    </div>
                    <div className="h-48 bg-muted/10 overflow-hidden">
                      {mounted && block.registryData ? (
                        <div className="w-full h-full p-3 pointer-events-none scale-[0.85] origin-top">
                          <ComponentPreview slug={block.slug} />
                        </div>
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <p className="text-xs text-muted-foreground">Loading...</p>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-3 border-t flex items-center gap-2">
                      <CopyCodeButton name={block.name} />
                      <CopyTaskButton slug={block.slug} />
                      <Button variant="default" size="sm" asChild className="ml-auto text-xs">
                        <Link href={`/blocks`}>View</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Quick Component Links */}
          <section className="border-t px-6 py-12 bg-muted/20">
            <div className="mx-auto max-w-6xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Popular Components</h2>
                <Button asChild variant="ghost" size="sm"><Link href="/components">View all</Link></Button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {popularComponents.map((comp) => (
                  <Link key={comp.slug} href={`/components`}>
                    <Card className="group h-full transition-shadow hover:shadow-md cursor-pointer">
                      <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-sm">{comp.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="h-16 bg-muted/30 rounded flex items-center justify-center">
                          {mounted ? (
                            <div className="scale-50 origin-center">
                              <ComponentPreview slug={comp.slug} />
                            </div>
                          ) : (
                            <p className="text-xs text-muted-foreground">Loading...</p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

function CopyCodeButton({ name }: { name: string }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    await navigator.clipboard.writeText(`import { ${name.replace(/\s/g, "")} } from "@innate/ui"`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <Button variant="outline" size="sm" onClick={copy} className="gap-1.5 text-xs">
      <Code2 className="h-3.5 w-3.5" />{copied ? "Copied!" : "Code"}
    </Button>
  )
}

function CopyTaskButton({ slug }: { slug: string }) {
  const [copied, setCopied] = useState(false)
  const component = componentRegistry.find((c) => c.slug === slug)
  const copy = async () => {
    if (component) {
      await navigator.clipboard.writeText(component.taskDescription)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }
  return (
    <Button variant="outline" size="sm" onClick={copy} className="gap-1.5 text-xs">
      <Sparkles className="h-3.5 w-3.5" />{copied ? "Copied!" : "Task"}
    </Button>
  )
}
