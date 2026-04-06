"use client"

import * as React from "react"

import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Badge } from "../../components/ui/badge"
import { Card, CardContent } from "../../components/ui/card"
import { cn } from "../../lib/utils"

interface Testimonial {
  name: string
  role: string
  image?: string
  quote: string
}

interface TestimonialsSectionProps {
  badge?: string
  title: string
  subtitle: string
  testimonials: Testimonial[]
  className?: string
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

function TestimonialsSection({
  badge,
  title,
  subtitle,
  testimonials,
  className,
}: TestimonialsSectionProps) {
  // Split testimonials into masonry columns
  const columns = 3
  const columnArrays: Testimonial[][] = Array.from({ length: columns }, () => [])
  testimonials.forEach((testimonial, index) => {
    columnArrays[index % columns].push(testimonial)
  })

  return (
    <section
      data-slot="testimonials-section"
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

        <div className="mt-16 columns-1 gap-6 sm:columns-2 lg:columns-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="mb-6 break-inside-avoid">
              <CardContent className="pt-6">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <Avatar className="size-9">
                    {testimonial.image && (
                      <AvatarImage
                        src={testimonial.image}
                        alt={testimonial.name}
                      />
                    )}
                    <AvatarFallback>
                      {getInitials(testimonial.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export {
  TestimonialsSection,
  type TestimonialsSectionProps,
  type Testimonial,
}
