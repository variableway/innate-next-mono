"use client"

import * as React from "react"
import { CheckIcon } from "lucide-react"

import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card"
import { ToggleGroup, ToggleGroupItem } from "../../components/ui/toggle-group"
import { cn } from "../../lib/utils"

interface PricingPlan {
  name: string
  description: string
  price: number
  yearlyPrice?: number
  features: string[]
  cta: string
  popular?: boolean
  includesPrevious?: string
}

interface PricingSectionProps {
  badge?: string
  title: string
  subtitle: string
  plans: PricingPlan[]
  className?: string
}

function PricingSection({
  badge,
  title,
  subtitle,
  plans,
  className,
}: PricingSectionProps) {
  const [billing, setBilling] = React.useState<"monthly" | "yearly">("monthly")

  return (
    <section
      data-slot="pricing-section"
      className={cn("py-24 md:py-32", className)}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center gap-4 text-center">
          {badge && <Badge variant="outline">{badge}</Badge>}
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h2>
          <p className="max-w-2xl text-lg text-muted-foreground">{subtitle}</p>

          <ToggleGroup
            type="single"
            value={billing}
            onValueChange={(value) => {
              if (value) setBilling(value as "monthly" | "yearly")
            }}
            variant="outline"
            className="mt-4"
          >
            <ToggleGroupItem value="monthly">Monthly</ToggleGroupItem>
            <ToggleGroupItem value="yearly">Yearly</ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {plans.map((plan, index) => {
            const price = billing === "yearly" && plan.yearlyPrice != null
              ? plan.yearlyPrice
              : plan.price

            return (
              <Card
                key={index}
                className={cn(
                  "relative flex flex-col",
                  plan.popular && "border-primary shadow-lg shadow-primary/10"
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge>Popular</Badge>
                  </div>
                )}

                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>

                <CardContent className="flex-1">
                  <div className="mb-6">
                    <span className="text-4xl font-bold">${price}</span>
                    <span className="text-muted-foreground">
                      {billing === "yearly" ? "/year" : "/month"}
                    </span>
                  </div>

                  {plan.includesPrevious && (
                    <p className="mb-4 text-xs text-muted-foreground">
                      Includes everything in {plan.includesPrevious}, plus:
                    </p>
                  )}

                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-start gap-2 text-sm"
                      >
                        <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  <Button
                    className="w-full"
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export { PricingSection, type PricingSectionProps, type PricingPlan }
