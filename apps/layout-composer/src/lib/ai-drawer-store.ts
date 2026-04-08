import { create } from "zustand"

interface AIDrawerState {
  isOpen: boolean
  mode: "single" | "multi"
  slug: string | null
  selectedSlugs: string[]
  openForComponent: (slug: string) => void
  openForTask: (slugs: string[]) => void
  close: () => void
}

export const useAIDrawerStore = create<AIDrawerState>((set) => ({
  isOpen: false,
  mode: "single",
  slug: null,
  selectedSlugs: [],
  openForComponent: (slug) =>
    set({ isOpen: true, mode: "single", slug, selectedSlugs: [] }),
  openForTask: (slugs) =>
    set({ isOpen: true, mode: "multi", slug: null, selectedSlugs: slugs }),
  close: () =>
    set({ isOpen: false, slug: null, selectedSlugs: [] }),
}))
