"use client"

import * as React from "react"

import { Card, CardContent } from "../../components/ui/card"
import { cn } from "../../lib/utils"

interface Stat {
  icon: React.ElementType
  value: string
  label: string
  description: string
}

interface StatsSectionProps {
  stats: Stat[]
  className?: string
}

function StatsSection({ stats, className }: StatsSectionProps) {
  return (
    <section
      data-slot="stats-section"
      className={cn("py-24 md:py-32", className)}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <stat.icon className="size-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm font-medium">{stat.label}</p>
                  </div>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export { StatsSection, type StatsSectionProps, type Stat }
