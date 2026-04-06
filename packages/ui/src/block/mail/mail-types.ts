export interface MailItem {
  id: string
  name: string
  email: string
  subject: string
  text: string
  date: string
  read: boolean
  labels: string[]
}

export interface MailAccount {
  label: string
  email: string
  icon?: React.ReactNode
}

export interface MailFolder {
  title: string
  label?: string
  icon: React.ElementType
  variant?: "default" | "ghost"
}

export interface MailContact {
  name: string
  email: string
}
