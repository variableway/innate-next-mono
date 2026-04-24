"use client"

import { useTheme } from "next-themes"
import { useThemeStyle, type ThemeStyle } from "@/components/theme-style-provider"
import { Button } from "@innate/ui"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@innate/ui"
import { Palette, Sun, Moon, Monitor } from "lucide-react"

const styles: { id: ThemeStyle; label: string; description: string }[] = [
  { id: "vega", label: "Vega", description: "Clean and professional" },
  { id: "nova", label: "Nova", description: "Modern and rounded" },
  { id: "sera", label: "Sera", description: "Refined and elegant" },
]

export function ThemeStyleSwitcher() {
  const { style, setStyle } = useThemeStyle()
  const { setTheme, theme } = useTheme()

  const currentStyle = styles.find((s) => s.id === style) ?? styles[0]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 gap-1.5 px-2 text-muted-foreground hover:text-foreground"
        >
          <Palette className="h-4 w-4" />
          <span className="hidden sm:inline text-xs">{currentStyle.label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuLabel>Style</DropdownMenuLabel>
        {styles.map((s) => (
          <DropdownMenuItem
            key={s.id}
            onClick={() => setStyle(s.id)}
            className={style === s.id ? "bg-accent" : ""}
          >
            <div className="flex flex-col">
              <span className="text-sm">{s.label}</span>
              <span className="text-xs text-muted-foreground">{s.description}</span>
            </div>
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />
        <DropdownMenuLabel>Mode</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className={theme === "light" ? "bg-accent" : ""}
        >
          <Sun className="mr-2 h-4 w-4" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className={theme === "dark" ? "bg-accent" : ""}
        >
          <Moon className="mr-2 h-4 w-4" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className={theme === "system" ? "bg-accent" : ""}
        >
          <Monitor className="mr-2 h-4 w-4" />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
