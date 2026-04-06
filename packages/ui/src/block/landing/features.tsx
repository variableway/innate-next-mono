"use client"

import * as React from "react"

import { Badge } from "../../components/ui/badge"
import { cn } from "../../lib/utils"

interface Feature {
  icon: React.ElementType
  title: string
  description: string
}

interface FeaturesSectionProps {
  badge?: string
  title: string
  subtitle: string
  features: Feature[]
  className?: string
}

function FeaturesSection({
  badge,
  title,
  subtitle,
  features,
  className,
}: FeaturesSectionProps) {
  return (
    <section
      data-slot="features-section"
      className={cn("py-24 md:py-32", className)}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center gap-4 text-center">
          {badge && <Badge variant="outline">{badge}</Badge>}
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h2>
          <p className="max-w-2xl text-lg text-muted-foreground">{subtitle}</p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative flex flex-col gap-3 rounded-xl border p-6 transition-colors hover:bg-muted/50"
            >
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <feature.icon className="size-5" />
              </div>
              <h3 className="font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export { FeaturesSection, type FeaturesSectionProps, type Feature }
