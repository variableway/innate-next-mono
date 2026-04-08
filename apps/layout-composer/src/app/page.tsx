"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { componentRegistry } from "@/lib/registry"
import { ComponentPreview } from "@/lib/component-preview"
import { Badge } from "@innate/ui"
import { Button } from "@innate/ui"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@innate/ui"

const featuredBlocks = ["hero-section", "inbox", "chat-interface"]

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const featured = featuredBlocks
    .map((slug) => componentRegistry.find((c) => c.slug === slug))
    .filter(Boolean)

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero */}
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-20 text-center">
        <Badge variant="outline" className="mb-6">
          Component-driven task generation
        </Badge>
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
          Design layouts, generate{" "}
          <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            AI task descriptions
          </span>
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground">
          Browse the @innate/ui component library, pick the building blocks you
          need, and instantly generate a structured task description ready for
          AI-assisted development.
        </p>

        {/* Feature cards */}
        <div className="mt-10 grid w-full max-w-3xl gap-4 sm:grid-cols-3">
          <Link href="/components" className="group">
            <Card className="h-full transition-shadow group-hover:shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Components</CardTitle>
                <CardDescription>
                  58 UI primitives
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" size="sm" className="w-full">
                  Browse
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/blocks" className="group">
            <Card className="h-full transition-shadow group-hover:shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Blocks</CardTitle>
                <CardDescription>
                  14 pre-built sections
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" size="sm" className="w-full">
                  Explore
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/task-builder" className="group">
            <Card className="h-full transition-shadow group-hover:shadow-md border-primary/40">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  Task Builder
                  <Badge>New</Badge>
                </CardTitle>
                <CardDescription>
                  AI-ready descriptions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button size="sm" className="w-full">
                  Open
                </Button>
              </CardContent>
            </Card>
          </Link>
        </div>
      </main>

      {/* Featured Blocks */}
      <section className="border-t">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold">Featured Blocks</h2>
            <p className="mt-2 text-muted-foreground">
              Interactive previews of pre-built page sections
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {featured.map(
              (comp) =>
                comp && (
                  <Link
                    key={comp.slug}
                    href={`/blocks/${comp.slug}`}
                    className="group"
                  >
                    <Card className="h-full transition-shadow group-hover:shadow-lg overflow-hidden">
                      <div
                        className="border-b bg-muted/30 overflow-hidden"
                        style={{ maxHeight: "280px" }}
                      >
                        {mounted ? (
                          <div className="pointer-events-none scale-[0.85] origin-top">
                            <ComponentPreview slug={comp.slug} />
                          </div>
                        ) : (
                          <div className="flex h-[200px] items-center justify-center">
                            <p className="text-sm text-muted-foreground">
                              Loading...
                            </p>
                          </div>
                        )}
                      </div>
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-base">
                            {comp.name}
                          </CardTitle>
                          <Badge
                            variant="outline"
                            className="text-xs capitalize"
                          >
                            {comp.subcategory}
                          </Badge>
                        </div>
                        <CardDescription className="line-clamp-2">
                          {comp.description}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                ),
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        Layout Composer &mdash; built with @innate/ui
      </footer>
    </div>
  )
}
