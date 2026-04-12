"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@innate/ui"
import { Badge } from "@innate/ui"
import { Button } from "@innate/ui"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@innate/ui"
import { ScrollArea } from "@innate/ui"
import { cn } from "@innate/ui"
import {
  Code2,
  Copy,
  Check,
  Sparkles,
  FileCode,
  Eye,
  BarChart3,
} from "lucide-react"
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

// Chart examples organized by type
const allCharts: Record<string, { id: string; name: string; description: string; taskDescription: string }[]> = {
  area: [
    { id: "chart-area-default", name: "Default Area", description: "Simple area chart with gradient fill", taskDescription: "Create a default area chart using Recharts with ChartContainer from @innate/ui. Show a single data series with a gradient fill beneath the line." },
    { id: "chart-area-gradient", name: "Gradient Area", description: "Area chart with gradient fill", taskDescription: "Create an area chart with a linear gradient fill using SVG linearGradient." },
    { id: "chart-area-stacked", name: "Stacked Area", description: "Multiple series stacked area chart", taskDescription: "Create a stacked area chart with multiple data series. Each series has a distinct color." },
    { id: "chart-area-interactive", name: "Interactive Area", description: "Area chart with interactive tooltips and legend", taskDescription: "Create an interactive area chart with ChartTooltip and ChartLegend." },
    { id: "chart-area-step", name: "Step Area", description: "Area chart with step curve type", taskDescription: "Create an area chart using step curve type for discrete data changes." },
    { id: "chart-area-linear", name: "Linear Area", description: "Area chart with linear interpolation", taskDescription: "Create an area chart with linear interpolation between data points." },
    { id: "chart-area-axes", name: "Axes Area", description: "Area chart with custom axis configuration", taskDescription: "Create an area chart with customized X and Y axes." },
    { id: "chart-area-legend", name: "Legend Area", description: "Area chart with interactive legend", taskDescription: "Create an area chart with an interactive ChartLegend." },
  ],
  bar: [
    { id: "chart-bar-default", name: "Default Bar", description: "Simple bar chart", taskDescription: "Create a default vertical bar chart using Recharts with ChartContainer." },
    { id: "chart-bar-horizontal", name: "Horizontal Bar", description: "Horizontal oriented bar chart", taskDescription: "Create a horizontal bar chart using layout='vertical'." },
    { id: "chart-bar-multiple", name: "Multiple Bar", description: "Grouped bar chart with multiple series", taskDescription: "Create a grouped bar chart with multiple data series side by side." },
    { id: "chart-bar-stacked", name: "Stacked Bar", description: "Stacked bar chart", taskDescription: "Create a stacked bar chart with multiple series stacked within each bar." },
    { id: "chart-bar-interactive", name: "Interactive Bar", description: "Bar chart with interactive features", taskDescription: "Create an interactive bar chart with hover highlighting and tooltips." },
    { id: "chart-bar-active", name: "Active Bar", description: "Bar chart with active state styling", taskDescription: "Create a bar chart where the active bar has a distinct style." },
    { id: "chart-bar-label", name: "Label Bar", description: "Bar chart with value labels", taskDescription: "Create a bar chart with labels displayed on each bar." },
    { id: "chart-bar-mixed", name: "Mixed Bar", description: "Mixed bar chart with positive and negative values", taskDescription: "Create a mixed bar chart displaying both positive and negative values." },
  ],
  line: [
    { id: "chart-line-default", name: "Default Line", description: "Simple line chart", taskDescription: "Create a default line chart using Recharts with ChartContainer." },
    { id: "chart-line-dots", name: "Dots Line", description: "Line chart with data point dots", taskDescription: "Create a line chart with visible dots at each data point." },
    { id: "chart-line-interactive", name: "Interactive Line", description: "Line chart with interactive tooltips", taskDescription: "Create an interactive line chart with ChartTooltip." },
    { id: "chart-line-multiple", name: "Multiple Line", description: "Line chart with multiple series", taskDescription: "Create a line chart with multiple data series." },
    { id: "chart-line-step", name: "Step Line", description: "Line chart with step curve", taskDescription: "Create a line chart with step-type interpolation." },
    { id: "chart-line-label", name: "Label Line", description: "Line chart with value labels", taskDescription: "Create a line chart with labels at each data point." },
  ],
  pie: [
    { id: "chart-pie-simple", name: "Simple Pie", description: "Basic pie chart", taskDescription: "Create a simple pie chart using Recharts with ChartContainer." },
    { id: "chart-pie-donut", name: "Donut Chart", description: "Donut style pie chart", taskDescription: "Create a donut chart using the innerRadius prop." },
    { id: "chart-pie-donut-active", name: "Active Donut", description: "Donut chart with active segment", taskDescription: "Create a donut chart where the active segment expands outward." },
    { id: "chart-pie-label", name: "Label Pie", description: "Pie chart with labels", taskDescription: "Create a pie chart with labels outside each slice." },
    { id: "chart-pie-legend", name: "Legend Pie", description: "Pie chart with legend", taskDescription: "Create a pie chart with a ChartLegend." },
    { id: "chart-pie-interactive", name: "Interactive Pie", description: "Interactive pie chart", taskDescription: "Create an interactive pie chart with click selection." },
  ],
  radar: [
    { id: "chart-radar-default", name: "Default Radar", description: "Simple radar chart", taskDescription: "Create a default radar chart using Recharts with ChartContainer." },
    { id: "chart-radar-dots", name: "Dots Radar", description: "Radar chart with data point dots", taskDescription: "Create a radar chart with visible dots at each data point." },
    { id: "chart-radar-grid-circle", name: "Circle Grid Radar", description: "Radar chart with circular grid", taskDescription: "Create a radar chart with circular grid lines." },
  ],
  radial: [
    { id: "chart-radial-simple", name: "Simple Radial", description: "Simple radial bar chart", taskDescription: "Create a simple radial bar chart." },
    { id: "chart-radial-label", name: "Label Radial", description: "Radial chart with labels", taskDescription: "Create a radial bar chart with labels." },
    { id: "chart-radial-text", name: "Text Radial", description: "Radial chart with center text", taskDescription: "Create a radial chart with text in the center." },
  ],
  tooltip: [
    { id: "chart-tooltip-default", name: "Default Tooltip", description: "Default chart tooltip styling", taskDescription: "Implement the default ChartTooltip for charts." },
    { id: "chart-tooltip-indicator", name: "Indicator Tooltip", description: "Tooltip with colored indicators", taskDescription: "Implement a chart tooltip with colored dot indicators." },
    { id: "chart-tooltip-formatter", name: "Formatter Tooltip", description: "Tooltip with value formatting", taskDescription: "Implement a chart tooltip with custom value formatting." },
  ],
}

// Flat list of all charts for "all" view
const flatCharts = Object.values(allCharts).flat()

export default function ChartsPage() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("area")

  const charts = activeTab === "all"
    ? flatCharts
    : (allCharts[activeTab] || [])

  const [selectedId, setSelectedId] = useState<string>(charts[0]?.id || "")
  const selectedChart = charts.find((c) => c.id === selectedId)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (charts.length > 0 && !charts.find(c => c.id === selectedId)) {
      setSelectedId(charts[0].id)
    }
  }, [activeTab, charts, selectedId])

  return (
    <div className="flex h-[calc(100vh-3.5rem)]">
      {/* Left panel: Chart type list */}
      <div className="w-72 border-r bg-muted/30 flex flex-col shrink-0">
        <div className="border-b px-3 py-3">
          <h2 className="text-sm font-semibold mb-2">Charts</h2>
          <div className="flex flex-wrap gap-1">
            {chartTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setActiveTab(type.id)}
                className={cn(
                  "px-2.5 py-1 text-xs rounded-md transition-colors",
                  activeTab === type.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-2 space-y-0.5">
            {charts.map((chart) => (
              <button
                key={chart.id}
                onClick={() => setSelectedId(chart.id)}
                className={cn(
                  "w-full text-left rounded-md px-3 py-2.5 transition-colors",
                  selectedId === chart.id
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium truncate">{chart.name}</span>
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0 shrink-0">
                    {chart.id.split("-")[1]}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                  {chart.description}
                </p>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Right panel: Chart detail */}
      <div className="flex-1 overflow-auto">
        {selectedChart ? (
          <ChartDetail chart={selectedChart} mounted={mounted} />
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Select a chart to view details
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

  const code = `import { ChartContainer, ChartTooltip } from "@innate/ui"\nimport { Area, AreaChart, XAxis, YAxis } from "recharts"\n\nconst data = [\n  { month: "Jan", value: 100 },\n  { month: "Feb", value: 200 },\n  { month: "Mar", value: 150 },\n]\n\nexport function ${chart.name.replace(/\\s+/g, "")}Chart() {\n  return (\n    <ChartContainer config={{}}>\n      <AreaChart data={data}>\n        <XAxis dataKey="month" />\n        <YAxis />\n        <ChartTooltip />\n        <Area type="monotone" dataKey="value" />\n      </AreaChart>\n    </ChartContainer>\n  )\n}`

  const copyCode = async () => {
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
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight">{chart.name}</h1>
          <Badge variant="outline">{chart.id.split("-")[1]}</Badge>
        </div>
        <p className="text-muted-foreground">{chart.description}</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="preview" className="gap-1.5">
            <Eye className="h-3.5 w-3.5" /> Preview
          </TabsTrigger>
          <TabsTrigger value="code" className="gap-1.5">
            <Code2 className="h-3.5 w-3.5" /> Code
          </TabsTrigger>
          <TabsTrigger value="task" className="gap-1.5">
            <Sparkles className="h-3.5 w-3.5" /> AI Task
          </TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="mt-4">
          <Card>
            <CardContent className="p-6 min-h-[300px] bg-muted/10 flex items-center justify-center">
              {mounted ? (
                <div className="w-full max-w-2xl">
                  <ComponentPreview slug={chart.id} />
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <BarChart3 className="h-8 w-8" />
                  <p className="text-sm">Loading preview...</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="code" className="mt-4">
          <Card>
            <CardHeader className="border-b bg-muted/50 flex flex-row items-center justify-between py-3 px-4">
              <div className="flex items-center gap-2">
                <FileCode className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{chart.name.replace(/\s+/g, "")}.tsx</span>
              </div>
              <Button variant="outline" size="sm" onClick={copyCode} className="gap-1.5">
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? "Copied!" : "Copy Code"}
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[400px]">
                <pre className="p-4 text-sm font-mono bg-muted/10"><code>{code}</code></pre>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="task" className="mt-4">
          <Card>
            <CardHeader className="border-b bg-muted/50 flex flex-row items-center justify-between py-3 px-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">AI Task Description</span>
              </div>
              <Button variant="outline" size="sm" onClick={copyTask} className="gap-1.5">
                {taskCopied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {taskCopied ? "Copied!" : "Copy Task"}
              </Button>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {chart.taskDescription}
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
