"use client"

import * as React from "react"
import { format, isToday, isYesterday } from "date-fns"
import {
  CheckCheck,
  Copy,
  MoreHorizontal,
  Reply,
  Trash2,
} from "lucide-react"

import { cn } from "../../lib/utils"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar"
import { Button } from "../../components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"
import { ScrollArea } from "../../components/ui/scroll-area"
import type { ChatMessage, ChatUser } from "./chat-types"

interface MessageListProps {
  messages: ChatMessage[]
  users: ChatUser[]
  currentUserId?: string
  className?: string
}

function MessageList({
  messages,
  users,
  currentUserId = "current-user",
  className,
}: MessageListProps) {
  const bottomRef = React.useRef<HTMLDivElement>(null)
  const prevCountRef = React.useRef(0)

  // Auto-scroll when new messages arrive
  React.useEffect(() => {
    if (messages.length > prevCountRef.current && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" })
    }
    prevCountRef.current = messages.length
  }, [messages])

  const getUser = (id: string) => users.find((u) => u.id === id)

  // Helper to check if date is valid
  const isValidDate = (d: Date) => !isNaN(d.getTime())

  const formatTime = (ts: string) => {
    const d = new Date(ts)
    if (!isValidDate(d)) return ts // Return original string if invalid date
    if (isToday(d)) return format(d, "HH:mm")
    if (isYesterday(d)) return `Yesterday ${format(d, "HH:mm")}`
    return format(d, "MMM d, HH:mm")
  }

  const formatDateHeader = (dateStr: string) => {
    const d = new Date(dateStr)
    if (!isValidDate(d)) return dateStr // Return original string if invalid date
    if (isToday(d)) return "Today"
    if (isYesterday(d)) return "Yesterday"
    return format(d, "EEEE, MMMM d")
  }

  const groupByDay = (msgs: ChatMessage[]) => {
    const groups: { date: string; messages: ChatMessage[] }[] = []
    msgs.forEach((msg) => {
      const dateObj = new Date(msg.timestamp)
      // Skip grouping if timestamp is invalid
      if (!isValidDate(dateObj)) {
        const last = groups[groups.length - 1]
        if (last && last.date === "Unknown") {
          last.messages.push(msg)
        } else {
          groups.push({ date: "Unknown", messages: [msg] })
        }
        return
      }
      const d = format(dateObj, "yyyy-MM-dd")
      const last = groups[groups.length - 1]
      if (last && last.date === d) last.messages.push(msg)
      else groups.push({ date: d, messages: [msg] })
    })
    return groups
  }

  const isConsecutive = (msg: ChatMessage, idx: number, group: ChatMessage[]) => {
    if (idx === 0) return false
    const prev = group[idx - 1]
    const msgDate = new Date(msg.timestamp)
    const prevDate = new Date(prev.timestamp)
    // If either date is invalid, only check sender
    if (!isValidDate(msgDate) || !isValidDate(prevDate)) {
      return prev.senderId === msg.senderId
    }
    const diff = msgDate.getTime() - prevDate.getTime()
    return prev.senderId === msg.senderId && diff < 5 * 60 * 1000
  }

  const groups = groupByDay(messages)

  return (
    <ScrollArea className={cn("flex-1 px-4", className)}>
      <div className="space-y-4 py-4">
        {groups.map((group) => (
          <div key={group.date}>
            {/* Date separator */}
            <div className="flex items-center justify-center py-2">
              <div className="text-xs text-muted-foreground bg-background px-3 py-1 rounded-full border">
                {formatDateHeader(group.date)}
              </div>
            </div>

            {/* Messages */}
            <div className="space-y-1">
              {group.messages.map((msg, idx) => {
                const user = getUser(msg.senderId)
                const isOwn = msg.senderId === currentUserId
                const showAvatar =
                  !isOwn &&
                  (idx === 0 ||
                    group.messages[idx - 1]?.senderId !== msg.senderId)
                const showName =
                  !isOwn &&
                  (idx === 0 ||
                    group.messages[idx - 1]?.senderId !== msg.senderId)
                const consecutive = isConsecutive(msg, idx, group.messages)

                return (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex gap-3 group",
                      isOwn && "flex-row-reverse",
                      consecutive && !isOwn && "ml-12"
                    )}
                  >
                    {/* Avatar */}
                    {!isOwn && (
                      <div className="w-8">
                        {showAvatar && user && (
                          <Avatar className="h-8 w-8">
                            {user.avatar && (
                              <AvatarImage src={user.avatar} alt={user.name} />
                            )}
                            <AvatarFallback className="text-xs">
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    )}

                    {/* Content */}
                    <div
                      className={cn(
                        "flex-1 max-w-[70%]",
                        isOwn && "flex flex-col items-end"
                      )}
                    >
                      {showName && user && !isOwn && (
                        <div className="text-sm font-medium text-foreground mb-1">
                          {user.name}
                        </div>
                      )}

                      <div className="relative group/message">
                        <div
                          className={cn(
                            "rounded-lg px-3 py-2 text-sm break-words",
                            isOwn
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted",
                            consecutive && "mt-1"
                          )}
                        >
                          <p>{msg.content}</p>

                          {/* Reactions */}
                          {msg.reactions && msg.reactions.length > 0 && (
                            <div className="flex gap-1 mt-2">
                              {msg.reactions.map((r, i) => (
                                <div
                                  key={i}
                                  className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs border bg-background/90 backdrop-blur-sm shadow-sm cursor-pointer"
                                >
                                  <span>{r.emoji}</span>
                                  <span className="text-muted-foreground">
                                    {r.count}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Timestamp */}
                          <div
                            className={cn(
                              "flex items-center gap-1 mt-1 text-xs",
                              isOwn
                                ? "text-primary-foreground/70 justify-end"
                                : "text-muted-foreground"
                            )}
                          >
                            <span>{formatTime(msg.timestamp)}</span>
                            {msg.isEdited && (
                              <span className="italic">(edited)</span>
                            )}
                            {isOwn && <CheckCheck className="h-3 w-3" />}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="absolute top-0 right-0 opacity-0 group-hover/message:opacity-100">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0"
                              >
                                <MoreHorizontal className="h-3 w-3" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Reply className="h-4 w-4 mr-2" />
                                Reply
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Copy className="h-4 w-4 mr-2" />
                                Copy
                              </DropdownMenuItem>
                              {isOwn && (
                                <>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-destructive">
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  )
}

export { MessageList, type MessageListProps }
