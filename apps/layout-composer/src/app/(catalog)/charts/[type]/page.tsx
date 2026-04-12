"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@innate/ui"
import { Badge } from "@innate/ui"
import { Button } from "@innate/ui"
import { ComponentPreview } from "@/lib/component-preview"
import {
  ChevronLeft,
  Code2,
  Copy,
  Check,
  Sparkles,
} from "lucide-react"
import { useState, useEffect } from "react"

const chartTypes = ["area", "bar", "line", "pie", "radar", "radial", "tooltip"] as const
type ChartType = (typeof chartTypes)[number]

// All chart examples organized by type
const chartExamples: Record<string, { id: string; name: string; description: string; taskDescription: string }[]> = {
  area: [
    { id: "chart-area-default", name: "Default Area", description: "Simple area chart with gradient fill", taskDescription: "Create a default area chart using Recharts with ChartContainer from @innate/ui. Show a single data series with a gradient fill beneath the line. Use ChartTooltip for hover interactions." },
    { id: "chart-area-gradient", name: "Gradient Area", description: "Area chart with gradient fill", taskDescription: "Create an area chart with a linear gradient fill. Use the Recharts Area component with a fill url referencing an SVG linearGradient definition." },
    { id: "chart-area-stacked", name: "Stacked Area", description: "Multiple series stacked area chart", taskDescription: "Create a stacked area chart with multiple data series stacked on top of each other. Each series should have a distinct color from the chart theme." },
    { id: "chart-area-interactive", name: "Interactive Area", description: "Area chart with interactive tooltips and legend", taskDescription: "Create an interactive area chart with ChartTooltip and ChartLegend. Support hover to highlight individual series and show detailed data in tooltips." },
    { id: "chart-area-step", name: "Step Area", description: "Area chart with step curve type", taskDescription: "Create an area chart using step curve type (type='step') for data that changes in discrete intervals." },
    { id: "chart-area-linear", name: "Linear Area", description: "Area chart with linear interpolation", taskDescription: "Create an area chart with linear (straight line) interpolation between data points." },
    { id: "chart-area-axes", name: "Axes Area", description: "Area chart with custom axis configuration", taskDescription: "Create an area chart with customized X and Y axes including tick formatting, grid lines, and axis labels." },
    { id: "chart-area-icons", name: "Icon Area", description: "Area chart with icon indicators", taskDescription: "Create an area chart with icon indicators on data points or in the legend." },
    { id: "chart-area-legend", name: "Legend Area", description: "Area chart with interactive legend", taskDescription: "Create an area chart with an interactive ChartLegend that can toggle series visibility." },
    { id: "chart-area-stacked-expand", name: "Stacked Expand Area", description: "Normalized stacked area chart (0-100%)", taskDescription: "Create a stacked area chart normalized to 100% showing relative proportions. Use Recharts stacked layout with stackId on each Area." },
  ],
  bar: [
    { id: "chart-bar-default", name: "Default Bar", description: "Simple bar chart", taskDescription: "Create a default vertical bar chart using Recharts BarChart with ChartContainer from @innate/ui. Use ChartTooltip for hover interactions." },
    { id: "chart-bar-horizontal", name: "Horizontal Bar", description: "Horizontal oriented bar chart", taskDescription: "Create a horizontal bar chart using Recharts with layout='vertical'. The bars extend horizontally from the Y axis." },
    { id: "chart-bar-multiple", name: "Multiple Bar", description: "Grouped bar chart with multiple series", taskDescription: "Create a grouped bar chart with multiple data series displayed side by side. Each series gets a distinct color." },
    { id: "chart-bar-stacked", name: "Stacked Bar", description: "Stacked bar chart", taskDescription: "Create a stacked bar chart where multiple data series are stacked on top of each other within each bar." },
    { id: "chart-bar-interactive", name: "Interactive Bar", description: "Bar chart with interactive features", taskDescription: "Create an interactive bar chart with hover highlighting, tooltips, and active bar styling." },
    { id: "chart-bar-active", name: "Active Bar", description: "Bar chart with active state styling", taskDescription: "Create a bar chart where the active (hovered) bar has a distinct style using the activeBar prop." },
    { id: "chart-bar-label", name: "Label Bar", description: "Bar chart with value labels", taskDescription: "Create a bar chart with labels displayed on or above each bar showing the value." },
    { id: "chart-bar-label-custom", name: "Custom Label Bar", description: "Bar chart with custom label rendering", taskDescription: "Create a bar chart with custom-rendered labels using a custom label component function." },
    { id: "chart-bar-mixed", name: "Mixed Bar", description: "Mixed bar chart with positive and negative values", taskDescription: "Create a mixed bar chart that displays both positive and negative values, with bars extending in both directions from the baseline." },
    { id: "chart-bar-negative", name: "Negative Bar", description: "Bar chart showing negative values", taskDescription: "Create a bar chart displaying negative values with bars extending below the baseline." },
  ],
  line: [
    { id: "chart-line-default", name: "Default Line", description: "Simple line chart", taskDescription: "Create a default line chart using Recharts LineChart with ChartContainer from @innate/ui. Use ChartTooltip for hover interactions." },
    { id: "chart-line-dots", name: "Dots Line", description: "Line chart with data point dots", taskDescription: "Create a line chart with visible dots/circles at each data point using the dot prop." },
    { id: "chart-line-dots-colors", name: "Colored Dots Line", description: "Line chart with colored data points", taskDescription: "Create a line chart where each data point dot has a distinct color based on its value or series." },
    { id: "chart-line-dots-custom", name: "Custom Dots Line", description: "Line chart with custom dot rendering", taskDescription: "Create a line chart with custom-rendered dots using a custom dot component." },
    { id: "chart-line-interactive", name: "Interactive Line", description: "Line chart with interactive tooltips", taskDescription: "Create an interactive line chart with ChartTooltip that shows data details on hover." },
    { id: "chart-line-label", name: "Label Line", description: "Line chart with value labels", taskDescription: "Create a line chart with labels displayed at each data point." },
    { id: "chart-line-label-custom", name: "Custom Label Line", description: "Line chart with custom label rendering", taskDescription: "Create a line chart with custom-rendered labels using a custom label component." },
    { id: "chart-line-linear", name: "Linear Line", description: "Line chart with linear interpolation", taskDescription: "Create a line chart with straight lines between data points (type='linear')." },
    { id: "chart-line-multiple", name: "Multiple Line", description: "Line chart with multiple series", taskDescription: "Create a line chart with multiple data series, each with a distinct color and legend entry." },
    { id: "chart-line-step", name: "Step Line", description: "Line chart with step curve", taskDescription: "Create a line chart with step-type interpolation (type='step') for discrete data changes." },
  ],
  pie: [
    { id: "chart-pie-simple", name: "Simple Pie", description: "Basic pie chart", taskDescription: "Create a simple pie chart using Recharts PieChart with ChartContainer from @innate/ui. Use ChartTooltip for hover interactions." },
    { id: "chart-pie-donut", name: "Donut Chart", description: "Donut style pie chart", taskDescription: "Create a donut chart (pie chart with inner radius) using the innerRadius prop on the Pie component." },
    { id: "chart-pie-donut-active", name: "Active Donut", description: "Donut chart with active segment", taskDescription: "Create a donut chart where the active/hovered segment expands outward using the activeShape prop." },
    { id: "chart-pie-donut-text", name: "Text Donut", description: "Donut chart with center text", taskDescription: "Create a donut chart with text rendered in the center of the donut showing total or selected value." },
    { id: "chart-pie-interactive", name: "Interactive Pie", description: "Interactive pie chart with selection", taskDescription: "Create an interactive pie chart with click selection and hover highlighting." },
    { id: "chart-pie-label", name: "Label Pie", description: "Pie chart with labels", taskDescription: "Create a pie chart with labels displayed outside each slice showing the value or name." },
    { id: "chart-pie-label-custom", name: "Custom Label Pie", description: "Pie chart with custom labels", taskDescription: "Create a pie chart with custom-rendered labels using a custom label component." },
    { id: "chart-pie-label-list", name: "Label List Pie", description: "Pie chart with label list legend", taskDescription: "Create a pie chart with a label list showing all categories and their values as a legend." },
    { id: "chart-pie-legend", name: "Legend Pie", description: "Pie chart with legend", taskDescription: "Create a pie chart with a ChartLegend showing all categories." },
    { id: "chart-pie-stacked", name: "Stacked Pie", description: "Nested/stacked pie chart", taskDescription: "Create a stacked pie chart with multiple concentric rings of data." },
    { id: "chart-pie-separator-none", name: "No Separator Pie", description: "Pie chart without separators", taskDescription: "Create a pie chart with no stroke separator between slices for a seamless look." },
  ],
  radar: [
    { id: "chart-radar-default", name: "Default Radar", description: "Simple radar chart", taskDescription: "Create a default radar chart using Recharts RadarChart with ChartContainer from @innate/ui." },
    { id: "chart-radar-dots", name: "Dots Radar", description: "Radar chart with data point dots", taskDescription: "Create a radar chart with visible dots at each data point on the radar polygon." },
    { id: "chart-radar-grid-circle", name: "Circle Grid Radar", description: "Radar chart with circular grid", taskDescription: "Create a radar chart with circular grid lines instead of polygonal ones." },
    { id: "chart-radar-grid-custom", name: "Custom Grid Radar", description: "Radar chart with custom grid styling", taskDescription: "Create a radar chart with custom grid styling including custom angles and tick marks." },
    { id: "chart-radar-grid-fill", name: "Fill Grid Radar", description: "Radar chart with filled grid areas", taskDescription: "Create a radar chart with filled semi-transparent areas for each series." },
    { id: "chart-radar-grid-none", name: "No Grid Radar", description: "Radar chart without grid lines", taskDescription: "Create a radar chart with no visible grid lines, showing only the data polygon." },
    { id: "chart-radar-icons", name: "Icon Radar", description: "Radar chart with icon indicators", taskDescription: "Create a radar chart with icon indicators at each vertex of the radar." },
  ],
  radial: [
    { id: "chart-radial-simple", name: "Simple Radial", description: "Simple radial bar chart", taskDescription: "Create a simple radial bar chart using Recharts with ChartContainer from @innate/ui. Shows data as arcs around a center point." },
    { id: "chart-radial-label", name: "Label Radial", description: "Radial chart with labels", taskDescription: "Create a radial bar chart with labels showing values or categories." },
    { id: "chart-radial-shape", name: "Shape Radial", description: "Radial chart with custom shapes", taskDescription: "Create a radial chart with custom shape rendering for the bars." },
    { id: "chart-radial-stacked", name: "Stacked Radial", description: "Stacked radial bar chart", taskDescription: "Create a stacked radial bar chart with multiple data series within each radial bar." },
    { id: "chart-radial-text", name: "Text Radial", description: "Radial chart with center text", taskDescription: "Create a radial chart with text displayed in the center showing summary information." },
  ],
  tooltip: [
    { id: "chart-tooltip-default", name: "Default Tooltip", description: "Default chart tooltip styling", taskDescription: "Implement the default ChartTooltip component for charts. Shows data point values on hover with consistent styling." },
    { id: "chart-tooltip-indicator", name: "Indicator Tooltip", description: "Tooltip with colored indicators", taskDescription: "Implement a chart tooltip with colored dot indicators matching each series color." },
    { id: "chart-tooltip-label", name: "Label Tooltip", description: "Tooltip with custom label formatting", taskDescription: "Implement a chart tooltip with custom label formatting for the tooltip header." },
    { id: "chart-tooltip-label-custom", name: "Custom Label Tooltip", description: "Tooltip with fully custom label", taskDescription: "Implement a chart tooltip with a fully custom label component." },
    { id: "chart-tooltip-formatter", name: "Formatter Tooltip", description: "Tooltip with value formatting", taskDescription: "Implement a chart tooltip with custom value formatting (e.g., currency, percentage)." },
    { id: "chart-tooltip-icons", name: "Icon Tooltip", description: "Tooltip with icon indicators", taskDescription: "Implement a chart tooltip with icon indicators for each data series." },
    { id: "chart-tooltip-advanced", name: "Advanced Tooltip", description: "Advanced tooltip with multiple features", taskDescription: "Implement an advanced chart tooltip combining indicators, formatting, icons, and custom styling." },
  ],
}

export default function ChartTypePage() {
  const params = useParams()
  const type = params?.type as string
  const charts = chartExamples[type] || []
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (charts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h1 className="text-2xl font-bold">Chart type not found</h1>
        <p className="text-muted-foreground mt-2">
          The chart type you&apos;re looking for doesn&apos;t exist.
        </p>
        <Button asChild className="mt-6">
          <Link href="/charts">Back to Charts</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/charts" className="hover:text-foreground flex items-center gap-1">
          <ChevronLeft className="h-4 w-4" />
          Charts
        </Link>
        <span>/</span>
        <span className="text-foreground font-medium capitalize">{type}</span>
      </div>

      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight capitalize">{type} Charts</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          A collection of {type} chart components built with Recharts and @innate/ui.
        </p>
      </div>

      {/* Chart Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {charts.map((chart) => (
          <ChartCard key={chart.id} chart={chart} mounted={mounted} />
        ))}
      </div>
    </div>
  )
}

interface ChartCardProps {
  chart: {
    id: string
    name: string
    description: string
    taskDescription: string
  }
  mounted: boolean
}

function ChartCard({ chart, mounted }: ChartCardProps) {
  const [copied, setCopied] = useState(false)
  const [taskCopied, setTaskCopied] = useState(false)

  const copyCode = async () => {
    const code = `import { ChartContainer, ChartTooltip, ChartLegend } from "@innate/ui"
import { Area, AreaChart, XAxis, YAxis, CartesianGrid } from "recharts"

const data = [
  { month: "Jan", value: 100 },
  { month: "Feb", value: 200 },
  { month: "Mar", value: 150 },
]

export function ${chart.id.replace(/-/g, "_").replace(/^chart_/, "")}Chart() {
  return (
    <ChartContainer config={{}}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
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
    await navigator.clipboard.writeText(chart.taskDescription)
    setTaskCopied(true)
    setTimeout(() => setTaskCopied(false), 2000)
  }

  return (
    <Card className="group overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{chart.name}</CardTitle>
          <Badge variant="outline" className="text-xs">
            {chart.id}
          </Badge>
        </div>
        <CardDescription className="line-clamp-2">
          {chart.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Preview */}
        <div className="h-40 bg-muted/30 rounded-lg flex items-center justify-center overflow-hidden">
          {mounted ? (
            <div className="w-full h-full p-4 flex items-center justify-center">
              <ComponentPreview slug={chart.id} />
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Loading...</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex-1 gap-2" onClick={copyCode}>
            {copied ? <Check className="h-4 w-4" /> : <Code2 className="h-4 w-4" />}
            {copied ? "Copied!" : "Copy Code"}
          </Button>
          <Button variant="outline" size="sm" className="flex-1 gap-2" onClick={copyTask}>
            {taskCopied ? <Check className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
            {taskCopied ? "Copied!" : "Copy Task"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
