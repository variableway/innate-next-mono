export interface ChatUser {
  id: string
  name: string
  avatar?: string
  status?: "online" | "offline" | "away"
}

export interface ChatMessage {
  id: string
  senderId: string
  content: string
  timestamp: string
  isEdited?: boolean
  reactions?: { emoji: string; count: number }[]
}

export interface ChatConversation {
  id: string
  name: string
  avatar?: string
  lastMessage?: string
  lastMessageTime?: string
  unreadCount?: number
  isGroup?: boolean
  participants?: ChatUser[]
}
