"use client"

import * as React from "react"
import { SendHorizontal } from "lucide-react"

import { cn } from "../../lib/utils"
import { Button } from "../../components/ui/button"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../../components/ui/resizable"
import { ScrollArea } from "../../components/ui/scroll-area"
import { Separator } from "../../components/ui/separator"
import { Textarea } from "../../components/ui/textarea"
import { MessageList } from "./message-list"
import type { ChatConversation, ChatMessage, ChatUser } from "./chat-types"

interface ChatInterfaceProps {
  conversations: ChatConversation[]
  users: ChatUser[]
  messages: ChatMessage[]
  currentUserId?: string
  activeConversationId?: string
  onSendMessage?: (content: string) => void
  onSelectConversation?: (id: string) => void
  className?: string
}

function ChatInterface({
  conversations,
  users,
  messages,
  currentUserId = "current-user",
  activeConversationId,
  onSendMessage,
  onSelectConversation,
  className,
}: ChatInterfaceProps) {
  const [input, setInput] = React.useState("")

  const handleSend = () => {
    if (!input.trim()) return
    onSendMessage?.(input.trim())
    setInput("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div
      data-slot="chat-interface"
      className={cn(
        "h-full rounded-lg border overflow-hidden",
        className
      )}
    >
      <ResizablePanelGroup direction="horizontal">
        {/* Conversation list */}
        <ResizablePanel defaultSize={25} minSize={20} maxSize={35}>
          <div className="flex h-[52px] items-center px-4">
            <span className="text-sm font-semibold">Messages</span>
          </div>
          <Separator />
          <ScrollArea className="h-[calc(100%-53px)]">
            <div className="flex flex-col gap-1 p-2">
              {conversations.map((conv) => (
                <button
                  key={conv.id}
                  className={cn(
                    "flex items-center gap-3 rounded-lg p-3 text-left text-sm transition-colors hover:bg-accent cursor-pointer w-full",
                    activeConversationId === conv.id && "bg-accent"
                  )}
                  onClick={() => onSelectConversation?.(conv.id)}
                >
                  <div className="relative">
                    <div className="flex size-10 items-center justify-center rounded-full bg-muted text-sm font-medium">
                      {conv.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                    {conv.unreadCount && conv.unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground font-medium">
                        {conv.unreadCount}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <div className="flex items-center justify-between">
                      <span className="font-medium truncate">
                        {conv.name}
                      </span>
                      {conv.lastMessageTime && (
                        <span className="text-xs text-muted-foreground shrink-0 ml-2">
                          {conv.lastMessageTime}
                        </span>
                      )}
                    </div>
                    {conv.lastMessage && (
                      <p className="text-xs text-muted-foreground truncate mt-0.5">
                        {conv.lastMessage}
                      </p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Chat area */}
        <ResizablePanel defaultSize={75}>
          <div className="flex h-full flex-col">
            {/* Header */}
            <div className="flex h-[52px] items-center border-b px-4">
              <span className="text-sm font-semibold">
                {conversations.find((c) => c.id === activeConversationId)
                  ?.name || "Select a conversation"}
              </span>
            </div>

            {/* Messages */}
            <MessageList
              messages={messages}
              users={users}
              currentUserId={currentUserId}
              className="flex-1"
            />

            <Separator />

            {/* Input */}
            <div className="p-4">
              <div className="flex items-end gap-2">
                <Textarea
                  placeholder="Type a message..."
                  className="min-h-[44px] max-h-[120px] resize-none"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  rows={1}
                />
                <Button
                  size="icon"
                  onClick={handleSend}
                  disabled={!input.trim()}
                >
                  <SendHorizontal className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

export { ChatInterface, type ChatInterfaceProps }
