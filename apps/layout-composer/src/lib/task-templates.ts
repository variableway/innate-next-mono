// src/lib/task-templates.ts

import type { ComponentMeta } from "./registry"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface PageTemplate {
  id: string
  name: string
  description: string
  slugs: string[] // component slugs to auto-select
}

export interface GeneratedTask {
  title: string
  description: string
  fullText: string
}

// ---------------------------------------------------------------------------
// Pre-built page templates
// ---------------------------------------------------------------------------

export const pageTemplates: PageTemplate[] = [
  {
    id: "saas-landing",
    name: "SaaS Landing",
    description:
      "Complete landing page with hero, features, pricing, testimonials, FAQ, and CTA",
    slugs: [
      "hero-section",
      "features-section",
      "stats-section",
      "pricing-section",
      "testimonials-section",
      "faq-section",
      "cta-section",
    ],
  },
  {
    id: "mail-app",
    name: "Mail App",
    description: "Full email client with inbox, folders, and mail display",
    slugs: ["inbox", "mail-list", "mail-display"],
  },
  {
    id: "chat-app",
    name: "Chat App",
    description: "Real-time chat interface with conversations and messaging",
    slugs: ["chat-interface", "message-list"],
  },
  {
    id: "auth",
    name: "Auth Page",
    description: "Login form with email/password and OAuth support",
    slugs: ["login-form"],
  },
]

// ---------------------------------------------------------------------------
// Task generation
// ---------------------------------------------------------------------------

/**
 * Generate a task description from selected components.
 */
export function generateTask(
  selectedComponents: ComponentMeta[],
): GeneratedTask {
  if (selectedComponents.length === 0) {
    return { title: "", description: "", fullText: "" }
  }

  const blocks = selectedComponents.filter((c) => c.category === "block")
  const uiComponents = selectedComponents.filter((c) => c.category === "ui")

  const titleParts: string[] = []
  if (blocks.length > 0) {
    titleParts.push(
      `${blocks.length} block${blocks.length > 1 ? "s" : ""}`,
    )
  }
  if (uiComponents.length > 0) {
    titleParts.push(
      `${uiComponents.length} UI component${uiComponents.length > 1 ? "s" : ""}`,
    )
  }

  const title = `Build a page with ${titleParts.join(" and ")}`

  const description =
    `Create a page by composing the following ${selectedComponents.length} component${selectedComponents.length > 1 ? "s" : ""} ` +
    `from the @innate/ui component library. Import each component and arrange them in the order listed.`

  const sectionTexts = selectedComponents.map(
    (comp, index) => {
      const propsList = comp.props && comp.props.length > 0
        ? `\n\nKey props: ${comp.props.map((p) => `\`${p}\``).join(", ")}`
        : ""
      return (
        `### ${index + 1}. ${comp.name}\n\n` +
        `${comp.description}\n\n` +
        `**Import:** \`${comp.importPath}\`\n\n` +
        `**Task description:** ${comp.taskDescription}` +
        propsList
      )
    },
  )

  const fullText = [
    `# ${title}`,
    "",
    description,
    "",
    "---",
    "",
    ...sectionTexts,
  ].join("\n")

  return { title, description, fullText }
}

/** Render the full task as a single Markdown string (alias for task.fullText). */
export function renderTaskMarkdown(task: GeneratedTask): string {
  return task.fullText
}
