"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@innate/ui"
import { Badge } from "@innate/ui"
import { Button } from "@innate/ui"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@innate/ui"
import { useState, useEffect } from "react"
import { Code2, Sparkles, BarChart3, LineChart, PieChart, Activity, Radar } from "lucide-react"

const chartTypes = [
  { id: "area", label: "Area", icon: Activity },
  { id: "bar", label: "Bar", icon: BarChart3 },
  { id: "line", label: "Line", icon: LineChart },
  { id: "pie", label: "Pie", icon: PieChart },
  { id: "radar", label: "Radar", icon: Radar },
]

// Chart examples data
const chartExamples = [
  { id: "chart-area-interactive", name: "Interactive Area", type: "area", description: "Area chart with interactive tooltips and legend" },
  { id: "chart-area-default", name: "Default Area", type: "area", description: "Simple area chart with gradient fill" },
  { id: "chart-area-stacked", name: "Stacked Area", type: "area", description: "Multiple series stacked area chart" },
  { id: "chart-bar-interactive", name: "Interactive Bar", type: "bar", description: "Bar chart with interactive features" },
  { id: "chart-bar-default", name: "Default Bar", type: "bar", description: "Simple bar chart" },
  { id: "chart-bar-horizontal", name: "Horizontal Bar", type: "bar", description: "Horizontal oriented bar chart" },
  { id: "chart-bar-multiple", name: "Multiple Bar", type: "bar", description: "Grouped bar chart with multiple series" },
  { id: "chart-line-interactive", name: "Interactive Line", type: "line", description: "Line chart with dots and tooltips" },
  { id: "chart-line-default", name: "Default Line", type: "line", description: "Simple line chart" },
  { id: "chart-line-multiple", name: "Multiple Line", type: "line", description: "Multiple series line chart" },
  { id: "chart-pie-simple", name: "Simple Pie", type: "pie", description: "Basic pie chart" },
  { id: "chart-pie-donut", name: "Donut Chart", type: "pie", description: "Donut style pie chart" },
  { id: "chart-radar-default", name: "Default Radar", type: "radar", description: "Simple radar chart" },
  { id: "chart-radar-multiple", name: "Multiple Radar", type: "radar", description: "Radar chart with multiple series" },
]

export default function ChartsPage() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("area")

  useEffect(() => {
    setMounted(true)
  }, [])

  // Filter charts by type
  const filteredCharts = activeTab === "all"
    ? chartExamples
    : chartExamples.filter((chart) => chart.type === activeTab)

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Charts</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          A collection of chart components built with Recharts. Each chart includes 
          code examples and AI task descriptions.
        </p>
      </div>

      {/* Chart Type Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="flex-wrap h-auto gap-2 bg-transparent p-0">
          <TabsTrigger
            value="all"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            All Charts
          </TabsTrigger>
          {chartTypes.map((type) => {
            const Icon = type.icon
            return (
              <TabsTrigger
                key={type.id}
                value={type.id}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2"
              >
                <Icon className="h-4 w-4" />
                {type.label}
              </TabsTrigger>
            )
          })}
        </TabsList>

        <TabsContent value={activeTab} className="mt-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCharts.map((chart) => (
              <ChartCard key={chart.id} chart={chart} mounted={mounted} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface ChartCardProps {
  chart: {
    id: string
    name: string
    type: string
    description: string
  }
  mounted: boolean
}

function ChartCard({ chart, mounted }: ChartCardProps) {
  const [copied, setCopied] = useState(false)
  const [taskCopied, setTaskCopied] = useState(false)

  const copyCode = async () => {
    const code = `import { ChartContainer, ChartTooltip } from "@innate/ui"
import { Area, AreaChart, XAxis, YAxis } from "recharts"

// ${chart.name} Chart
const data = [
  { month: "Jan", value: 100 },
  { month: "Feb", value: 200 },
  { month: "Mar", value: 150 },
]

export function ${chart.name.replace(/\s+/g, "")}Chart() {
  return (
    <ChartContainer config={{}}>
      <AreaChart data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <ChartTooltip />
        <Area type="monotone" dataKey="value" />
      </AreaChart>
    </ChartContainer>
  )
}`
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const copyTask = async () => {
    const task = `Create a ${chart.name.toLowerCase()} chart using Recharts and @innate/ui Chart components.

Requirements:
- Chart type: ${chart.type}
- Description: ${chart.description}
- Use ChartContainer for consistent theming
- Include ChartTooltip for data exploration
- Support responsive sizing
- Follow the shadcn/ui chart patterns

Example data structure:
{\n  month: string,\n  value: number\n}`
    await navigator.clipboard.writeText(task)
    setTaskCopied(true)
    setTimeout(() => setTaskCopied(false), 2000)
  }

  return (
    <Card className="group overflow-hidden flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{chart.name}</CardTitle>
          <Badge variant="outline" className="text-xs capitalize">
            {chart.type}
          </Badge>
        </div>
        <CardDescription className="line-clamp-2">
          {chart.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col gap-4">
        {/* Chart Preview Placeholder */}
        <div className="h-40 bg-muted/30 rounded-lg flex items-center justify-center overflow-hidden">
          {mounted ? (
            <div className="w-full h-full p-4 flex items-center justify-center">
              <div className="text-center space-y-2">
                <BarChart3 className="h-8 w-8 mx-auto text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Chart Preview</p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Loading...</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 gap-2"
            onClick={copyCode}
          >
            <Code2 className="h-4 w-4" />
            {copied ? "Copied!" : "Code"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 gap-2"
            onClick={copyTask}
          >
            <Sparkles className="h-4 w-4" />
            {taskCopied ? "Copied!" : "Task"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
