"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

export type ThemeStyle = "vega" | "nova" | "sera"

interface ThemeStyleContextType {
  style: ThemeStyle
  setStyle: (style: ThemeStyle) => void
}

const ThemeStyleContext = createContext<ThemeStyleContextType | undefined>(undefined)

export function useThemeStyle() {
  const context = useContext(ThemeStyleContext)
  if (!context) {
    throw new Error("useThemeStyle must be used within a ThemeStyleProvider")
  }
  return context
}

const STYLE_KEY = "innate-theme-style"

function getBody() {
  if (typeof document !== "undefined") {
    return document.body
  }
  return null
}

function applyStyleClass(style: ThemeStyle) {
  const body = getBody()
  if (!body) return
  body.classList.remove("style-vega", "style-nova", "style-sera")
  body.classList.add(`style-${style}`)
}

export function ThemeStyleProvider({ children }: { children: ReactNode }) {
  const [style, setStyleState] = useState<ThemeStyle>("vega")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem(STYLE_KEY) as ThemeStyle | null
    if (saved && ["vega", "nova", "sera"].includes(saved)) {
      setStyleState(saved)
      applyStyleClass(saved)
    }
  }, [])

  const setStyle = (newStyle: ThemeStyle) => {
    setStyleState(newStyle)
    localStorage.setItem(STYLE_KEY, newStyle)
    applyStyleClass(newStyle)
  }

  return (
    <ThemeStyleContext.Provider value={{ style, setStyle }}>
      {children}
    </ThemeStyleContext.Provider>
  )
}
