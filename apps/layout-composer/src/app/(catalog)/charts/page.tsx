"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@innate/ui"
import { Badge } from "@innate/ui"
import { Button } from "@innate/ui"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@innate/ui"
import { ScrollArea } from "@innate/ui"
import { cn } from "@innate/ui"
import { Code2, Copy, Check, Sparkles, FileCode, Eye, BarChart3 } from "lucide-react"
import { ComponentPreview } from "@/lib/component-preview"

const chartTypes = [
  { id: "area", label: "Area" },
  { id: "bar", label: "Bar" },
  { id: "line", label: "Line" },
  { id: "pie", label: "Pie" },
  { id: "radar", label: "Radar" },
  { id: "radial", label: "Radial" },
  { id: "tooltip", label: "Tooltip" },
]

const allCharts: Record<string, { id: string; name: string; description: string; taskDescription: string }[]> = {
  area: [
    { id: "chart-area-default", name: "Default Area", description: "Simple area chart with gradient fill", taskDescription: "Create a default area chart using Recharts with ChartContainer from @innate/ui." },
    { id: "chart-area-gradient", name: "Gradient Area", description: "Area chart with gradient fill", taskDescription: "Create an area chart with a linear gradient fill using SVG linearGradient." },
    { id: "chart-area-stacked", name: "Stacked Area", description: "Multiple series stacked", taskDescription: "Create a stacked area chart with multiple data series." },
    { id: "chart-area-interactive", name: "Interactive Area", description: "Area chart with tooltips and legend", taskDescription: "Create an interactive area chart with ChartTooltip and ChartLegend." },
    { id: "chart-area-step", name: "Step Area", description: "Step curve type", taskDescription: "Create an area chart using step curve type." },
    { id: "chart-area-linear", name: "Linear Area", description: "Linear interpolation", taskDescription: "Create an area chart with linear interpolation." },
    { id: "chart-area-axes", name: "Axes Area", description: "Custom axis configuration", taskDescription: "Create an area chart with customized axes." },
    { id: "chart-area-legend", name: "Legend Area", description: "Interactive legend", taskDescription: "Create an area chart with interactive ChartLegend." },
  ],
  bar: [
    { id: "chart-bar-default", name: "Default Bar", description: "Simple bar chart", taskDescription: "Create a default vertical bar chart." },
    { id: "chart-bar-horizontal", name: "Horizontal Bar", description: "Horizontal orientation", taskDescription: "Create a horizontal bar chart." },
    { id: "chart-bar-multiple", name: "Multiple Bar", description: "Grouped bar chart", taskDescription: "Create a grouped bar chart with multiple series." },
    { id: "chart-bar-stacked", name: "Stacked Bar", description: "Stacked bar chart", taskDescription: "Create a stacked bar chart." },
    { id: "chart-bar-interactive", name: "Interactive Bar", description: "Interactive features", taskDescription: "Create an interactive bar chart." },
    { id: "chart-bar-active", name: "Active Bar", description: "Active state styling", taskDescription: "Create a bar chart with active state styling." },
    { id: "chart-bar-label", name: "Label Bar", description: "Value labels", taskDescription: "Create a bar chart with value labels." },
    { id: "chart-bar-mixed", name: "Mixed Bar", description: "Positive and negative values", taskDescription: "Create a mixed bar chart." },
  ],
  line: [
    { id: "chart-line-default", name: "Default Line", description: "Simple line chart", taskDescription: "Create a default line chart." },
    { id: "chart-line-dots", name: "Dots Line", description: "Data point dots", taskDescription: "Create a line chart with dots at data points." },
    { id: "chart-line-interactive", name: "Interactive Line", description: "Interactive tooltips", taskDescription: "Create an interactive line chart." },
    { id: "chart-line-multiple", name: "Multiple Line", description: "Multiple series", taskDescription: "Create a line chart with multiple series." },
    { id: "chart-line-step", name: "Step Line", description: "Step curve", taskDescription: "Create a line chart with step interpolation." },
    { id: "chart-line-label", name: "Label Line", description: "Value labels", taskDescription: "Create a line chart with value labels." },
  ],
  pie: [
    { id: "chart-pie-simple", name: "Simple Pie", description: "Basic pie chart", taskDescription: "Create a simple pie chart." },
    { id: "chart-pie-donut", name: "Donut Chart", description: "Donut style", taskDescription: "Create a donut chart." },
    { id: "chart-pie-donut-active", name: "Active Donut", description: "Active segment", taskDescription: "Create a donut chart with active segment." },
    { id: "chart-pie-label", name: "Label Pie", description: "With labels", taskDescription: "Create a pie chart with labels." },
    { id: "chart-pie-legend", name: "Legend Pie", description: "With legend", taskDescription: "Create a pie chart with legend." },
    { id: "chart-pie-interactive", name: "Interactive Pie", description: "Interactive selection", taskDescription: "Create an interactive pie chart." },
  ],
  radar: [
    { id: "chart-radar-default", name: "Default Radar", description: "Simple radar chart", taskDescription: "Create a default radar chart." },
    { id: "chart-radar-dots", name: "Dots Radar", description: "Data point dots", taskDescription: "Create a radar chart with dots." },
    { id: "chart-radar-grid-circle", name: "Circle Grid Radar", description: "Circular grid", taskDescription: "Create a radar chart with circular grid." },
  ],
  radial: [
    { id: "chart-radial-simple", name: "Simple Radial", description: "Radial bar chart", taskDescription: "Create a simple radial bar chart." },
    { id: "chart-radial-label", name: "Label Radial", description: "With labels", taskDescription: "Create a radial chart with labels." },
    { id: "chart-radial-text", name: "Text Radial", description: "Center text", taskDescription: "Create a radial chart with center text." },
  ],
  tooltip: [
    { id: "chart-tooltip-default", name: "Default Tooltip", description: "Default styling", taskDescription: "Implement default ChartTooltip." },
    { id: "chart-tooltip-indicator", name: "Indicator Tooltip", description: "Colored indicators", taskDescription: "Implement tooltip with colored indicators." },
    { id: "chart-tooltip-formatter", name: "Formatter Tooltip", description: "Value formatting", taskDescription: "Implement tooltip with value formatting." },
  ],
}

const flatCharts = Object.values(allCharts).flat()

export default function ChartsPage() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("area")
  const charts = activeTab === "all" ? flatCharts : (allCharts[activeTab] || [])
  const [selectedId, setSelectedId] = useState(charts[0]?.id || "")
  const selected = charts.find((c) => c.id === selectedId)

  useEffect(() => { setMounted(true) }, [])
  useEffect(() => {
    if (charts.length > 0 && !charts.find(c => c.id === selectedId)) {
      setSelectedId(charts[0].id)
    }
  }, [activeTab, charts, selectedId])

  return (
    <div className="flex h-full">
      {/* Left: chart list */}
      <div className="w-64 shrink-0 border-r flex flex-col">
        <div className="border-b p-3">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Chart Type
          </h2>
          <div className="flex flex-wrap gap-1">
            {chartTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setActiveTab(type.id)}
                className={cn(
                  "px-2 py-0.5 text-[11px] rounded font-medium transition-colors",
                  activeTab === type.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-1.5">
            {charts.map((chart) => (
              <button
                key={chart.id}
                onClick={() => setSelectedId(chart.id)}
                className={cn(
                  "w-full text-left rounded-md px-3 py-2 transition-colors",
                  selectedId === chart.id
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                )}
              >
                <div className="flex items-center justify-between gap-1">
                  <span className="text-sm font-medium truncate">{chart.name}</span>
                  <Badge variant="outline" className="text-[10px] px-1 py-0 shrink-0">
                    {chart.id.split("-")[1]}
                  </Badge>
                </div>
                <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
                  {chart.description}
                </p>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Right: chart detail */}
      <div className="flex-1 min-w-0 overflow-auto">
        {selected ? (
          <ChartDetail chart={selected} mounted={mounted} />
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
            Select a chart
          </div>
        )}
      </div>
    </div>
  )
}

function ChartDetail({
  chart,
  mounted,
}: {
  chart: { id: string; name: string; description: string; taskDescription: string }
  mounted: boolean
}) {
  const [activeTab, setActiveTab] = useState("preview")
  const [copied, setCopied] = useState(false)
  const [taskCopied, setTaskCopied] = useState(false)

  useEffect(() => { setActiveTab("preview") }, [chart.id])

  const code = `import { ChartContainer, ChartTooltip } from "@innate/ui"\nimport { Area, AreaChart, XAxis, YAxis } from "recharts"\n\nconst data = [\n  { month: "Jan", value: 100 },\n  { month: "Feb", value: 200 },\n  { month: "Mar", value: 150 },\n]\n\nexport function ${chart.name.replace(/\s+/g, "")}Chart() {\n  return (\n    <ChartContainer config={{}}>\n      <AreaChart data={data}>\n        <XAxis dataKey="month" />\n        <YAxis />\n        <ChartTooltip />\n        <Area type="monotone" dataKey="value" />\n      </AreaChart>\n    </ChartContainer>\n  )\n}`

  return (
    <div className="p-6 space-y-5">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold tracking-tight">{chart.name}</h1>
          <Badge variant="outline" className="text-xs">{chart.id.split("-")[1]}</Badge>
        </div>
        <p className="text-sm text-muted-foreground mt-1">{chart.description}</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="h-8">
          <TabsTrigger value="preview" className="text-xs gap-1.5 px-3">
            <Eye className="h-3 w-3" /> Preview
          </TabsTrigger>
          <TabsTrigger value="code" className="text-xs gap-1.5 px-3">
            <Code2 className="h-3 w-3" /> Code
          </TabsTrigger>
          <TabsTrigger value="task" className="text-xs gap-1.5 px-3">
            <Sparkles className="h-3 w-3" /> AI Task
          </TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="mt-4">
          <div className="rounded-lg border bg-muted/10">
            <div className="min-h-[300px] p-6 flex items-center justify-center">
              {mounted ? (
                <div className="w-full max-w-2xl">
                  <ComponentPreview slug={chart.id} />
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <BarChart3 className="h-8 w-8" />
                  <p className="text-sm">Loading...</p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="code" className="mt-4">
          <Card>
            <CardHeader className="border-b py-2.5 px-4 flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCode className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-xs font-medium">{chart.name.replace(/\s+/g, "")}.tsx</span>
              </div>
              <Button variant="outline" size="sm" className="h-7 text-xs gap-1.5"
                onClick={async () => { await navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000) }}>
                {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                {copied ? "Copied!" : "Copy"}
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[400px]">
                <pre className="p-4 text-xs font-mono bg-muted/10"><code>{code}</code></pre>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="task" className="mt-4">
          <Card>
            <CardHeader className="border-b py-2.5 px-4 flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-xs font-medium">AI Task Description</span>
              </div>
              <Button variant="outline" size="sm" className="h-7 text-xs gap-1.5"
                onClick={async () => { await navigator.clipboard.writeText(chart.taskDescription); setTaskCopied(true); setTimeout(() => setTaskCopied(false), 2000) }}>
                {taskCopied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                {taskCopied ? "Copied!" : "Copy"}
              </Button>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">{chart.taskDescription}</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
