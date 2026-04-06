"use client"

import * as React from "react"
import { ArrowRightIcon } from "lucide-react"

import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import { cn } from "../../lib/utils"

interface HeroSectionProps {
  badge?: { icon?: React.ReactNode; text: string; href?: string }
  title: string
  titleHighlight?: string
  subtitle: string
  primaryCta?: { text: string; href: string }
  secondaryCta?: { text: string; href: string }
  className?: string
}

function HeroSection({
  badge,
  title,
  titleHighlight,
  subtitle,
  primaryCta,
  secondaryCta,
  className,
}: HeroSectionProps) {
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
      data-slot="hero-section"
      className={cn(
        "relative flex flex-col items-center justify-center gap-6 py-24 text-center md:py-32 lg:py-40",
        className
      )}
    >
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-b from-primary/10 to-transparent blur-3xl" />
      </div>

      {badge && (
        <Badge variant="outline" className="gap-1.5 px-3 py-1 text-sm" asChild={!!badge.href}>
          {badge.href ? (
            <a href={badge.href}>
              {badge.icon}
              {badge.text}
              <ArrowRightIcon className="size-3" />
            </a>
          ) : (
            <>
              {badge.icon}
              {badge.text}
            </>
          )}
        </Badge>
      )}

      <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
        {renderTitle()}
      </h1>

      <p className="max-w-2xl text-lg text-muted-foreground">{subtitle}</p>

      {(primaryCta || secondaryCta) && (
        <div className="flex flex-col gap-3 sm:flex-row">
          {primaryCta && (
            <Button size="lg" asChild>
              <a href={primaryCta.href}>
                {primaryCta.text}
                <ArrowRightIcon className="size-4" />
              </a>
            </Button>
          )}
          {secondaryCta && (
            <Button variant="outline" size="lg" asChild>
              <a href={secondaryCta.href}>{secondaryCta.text}</a>
            </Button>
          )}
        </div>
      )}
    </section>
  )
}

export { HeroSection, type HeroSectionProps }
