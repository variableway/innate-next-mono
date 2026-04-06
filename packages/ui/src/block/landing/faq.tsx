"use client"

import * as React from "react"
import { ArrowRightIcon } from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import { cn } from "../../lib/utils"

interface FaqItem {
  value: string
  question: string
  answer: string
}

interface FaqSectionProps {
  badge?: string
  title: string
  subtitle: string
  items: FaqItem[]
  ctaText?: string
  ctaHref?: string
  className?: string
}

function FaqSection({
  badge,
  title,
  subtitle,
  items,
  ctaText,
  ctaHref,
  className,
}: FaqSectionProps) {
  return (
    <section
      data-slot="faq-section"
      className={cn("py-24 md:py-32", className)}
    >
      <div className="mx-auto max-w-4xl px-6">
        <div className="flex flex-col items-center gap-4 text-center">
          {badge && <Badge variant="outline">{badge}</Badge>}
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h2>
          <p className="max-w-2xl text-lg text-muted-foreground">{subtitle}</p>
        </div>

        <Accordion type="single" collapsible className="mt-12">
          {items.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">{item.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {ctaText && ctaHref && (
          <div className="mt-12 flex justify-center">
            <Button variant="outline" asChild>
              <a href={ctaHref}>
                {ctaText}
                <ArrowRightIcon className="size-4" />
              </a>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

export { FaqSection, type FaqSectionProps, type FaqItem }
