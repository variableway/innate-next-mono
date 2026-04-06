// src/lib/categories.ts

export const categories = {
  ui: {
    label: "UI Components",
    subcategories: {
      layout: {
        label: "Layout",
        description: "Containers and structural components for page layout",
      },
      navigation: {
        label: "Navigation",
        description: "Components for navigating between pages and sections",
      },
      form: {
        label: "Form",
        description: "Input controls and form management components",
      },
      feedback: {
        label: "Feedback",
        description: "Overlays, notifications, and status indicators",
      },
      "data-display": {
        label: "Data Display",
        description: "Components for presenting data and visual information",
      },
      actions: {
        label: "Actions",
        description: "Buttons, menus, and interactive controls",
      },
    },
  },
  block: {
    label: "Block Components",
    subcategories: {
      landing: {
        label: "Landing",
        description: "Pre-built sections for landing pages",
      },
      auth: {
        label: "Auth",
        description: "Authentication form blocks",
      },
      mail: {
        label: "Mail",
        description: "Email client interface blocks",
      },
      chat: {
        label: "Chat",
        description: "Chat application interface blocks",
      },
    },
  },
} as const

/** Get a flat list of all category keys */
export function getCategoryKeys(): ("ui" | "block")[] {
  return Object.keys(categories) as ("ui" | "block")[]
}

/** Get all subcategory keys for a given category */
export function getSubcategoryKeys(
  category: "ui" | "block",
): string[] {
  return Object.keys(categories[category].subcategories)
}

/** Type-safe subcategory key */
export type UICategory = keyof (typeof categories)["ui"]["subcategories"]
export type BlockCategory = keyof (typeof categories)["block"]["subcategories"]
