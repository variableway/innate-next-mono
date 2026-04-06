"use client"

import * as React from "react"

import { Button } from "../../components/ui/button"
import { cn } from "../../lib/utils"

interface CTASectionProps {
  title: string
  titleHighlight?: string
  subtitle: string
  primaryCta?: { text: string; href: string; icon?: React.ElementType }
  secondaryCta?: { text: string; href: string; icon?: React.ElementType }
  trustIndicators?: { text: string; color: string }[]
  className?: string
}

function CTASection({
  title,
  titleHighlight,
  subtitle,
  primaryCta,
  secondaryCta,
  trustIndicators,
  className,
}: CTASectionProps) {
  const renderTitle = () => {
    if (!titleHighlight) return title
    const parts = title.split(titleHighlight)
    return (
      <>
        {parts[0]}
        <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          {titleHighlight}
        </span>
        {parts[1]}
      </>
    )
  }

  return (
    <section
      data-slot="cta-section"
      className={cn("py-24 md:py-32", className)}
    >
      <div className="mx-auto max-w-4xl px-6">
        <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-b from-muted/50 to-muted p-12 text-center md:p-16">
          {/* Background decoration */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-0 -z-10 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
          </div>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {renderTitle()}
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            {subtitle}
          </p>

          {(primaryCta || secondaryCta) && (
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              {primaryCta && (
                <Button size="lg" asChild>
                  <a href={primaryCta.href}>
                    {primaryCta.text}
                    {primaryCta.icon && (
                      <primaryCta.icon className="size-4" />
                    )}
                  </a>
                </Button>
              )}
              {secondaryCta && (
                <Button variant="outline" size="lg" asChild>
                  <a href={secondaryCta.href}>
                    {secondaryCta.text}
                    {secondaryCta.icon && (
                      <secondaryCta.icon className="size-4" />
                    )}
                  </a>
                </Button>
              )}
            </div>
          )}

          {trustIndicators && trustIndicators.length > 0 && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              {trustIndicators.map((indicator, index) => (
                <span
                  key={index}
                  className="flex items-center gap-1.5 text-sm text-muted-foreground"
                >
                  <span
                    className="size-2 rounded-full"
                    style={{ backgroundColor: indicator.color }}
                  />
                  {indicator.text}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export { CTASection, type CTASectionProps }
