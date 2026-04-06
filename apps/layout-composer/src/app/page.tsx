import Link from "next/link"
import { Button } from "@innate/ui"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@innate/ui"
import { Badge } from "@innate/ui"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="mx-auto flex h-14 max-w-6xl items-center px-6">
          <Link href="/" className="text-lg font-semibold">
            Layout Composer
          </Link>
          <Badge variant="outline" className="ml-3">
            @innate/ui
          </Badge>
        </div>
      </header>

      {/* Hero */}
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
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

        {/* Cards */}
        <div className="mt-12 grid w-full max-w-2xl gap-6 sm:grid-cols-2">
          <Link href="/components" className="group">
            <Card className="h-full transition-shadow group-hover:shadow-md">
              <CardHeader>
                <CardTitle>Component Catalog</CardTitle>
                <CardDescription>
                  Browse all available UI components and blocks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Browse Components
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/task-builder" className="group">
            <Card className="h-full transition-shadow group-hover:shadow-md border-primary/40">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  AI Task Builder
                  <Badge>New</Badge>
                </CardTitle>
                <CardDescription>
                  Compose components and generate AI-ready task descriptions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Open Task Builder</Button>
              </CardContent>
            </Card>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        Layout Composer &mdash; built with @innate/ui
      </footer>
    </div>
  )
}
