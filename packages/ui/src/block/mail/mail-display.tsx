"use client"

import * as React from "react"
import {
  Archive,
  ArchiveX,
  Forward,
  MoreVertical,
  Reply,
  ReplyAll,
  Trash2,
} from "lucide-react"
import { format } from "date-fns"

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
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"
import { Label } from "../../components/ui/label"
import { Separator } from "../../components/ui/separator"
import { Switch } from "../../components/ui/switch"
import { Textarea } from "../../components/ui/textarea"
import type { MailItem } from "./mail-types"

interface MailDisplayProps {
  mail: MailItem | null
  onReply?: (text: string) => void
  onArchive?: () => void
  onDelete?: () => void
  className?: string
}

function MailDisplay({
  mail,
  onReply,
  onArchive,
  onDelete,
  className,
}: MailDisplayProps) {
  const [replyText, setReplyText] = React.useState("")

  if (!mail) {
    return (
      <div className="text-muted-foreground flex h-full items-center justify-center p-8 text-center">
        No message selected
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col">
      {/* Toolbar */}
      <div className="flex items-center p-2">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            title="Archive"
            onClick={onArchive}
          >
            <Archive className="size-4" />
            <span className="sr-only">Archive</span>
          </Button>
          <Button variant="ghost" size="icon" title="Move to junk">
            <ArchiveX className="size-4" />
            <span className="sr-only">Move to junk</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            title="Move to trash"
            onClick={onDelete}
          >
            <Trash2 className="size-4" />
            <span className="sr-only">Move to trash</span>
          </Button>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon" title="Reply">
            <Reply className="size-4" />
            <span className="sr-only">Reply</span>
          </Button>
          <Button variant="ghost" size="icon" title="Reply all">
            <ReplyAll className="size-4" />
            <span className="sr-only">Reply all</span>
          </Button>
          <Button variant="ghost" size="icon" title="Forward">
            <Forward className="size-4" />
            <span className="sr-only">Forward</span>
          </Button>
        </div>
        <Separator orientation="vertical" className="mx-2 h-6" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="size-4" />
              <span className="sr-only">More</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Mark as unread</DropdownMenuItem>
            <DropdownMenuItem>Star thread</DropdownMenuItem>
            <DropdownMenuItem>Add label</DropdownMenuItem>
            <DropdownMenuItem>Mute thread</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Separator />

      {/* Email header */}
      <div className="flex items-start p-4">
        <div className="flex items-start gap-4 text-sm">
          <Avatar>
            <AvatarImage alt={mail.name} />
            <AvatarFallback>
              {mail.name
                .split(" ")
                .map((chunk) => chunk[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <div className="font-semibold">{mail.name}</div>
            <div className="line-clamp-1 text-xs">{mail.subject}</div>
            <div className="line-clamp-1 text-xs">
              <span className="font-medium">Reply-To:</span> {mail.email}
            </div>
          </div>
        </div>
        {mail.date && (
          <div className="text-muted-foreground ml-auto text-xs">
            {format(new Date(mail.date), "PPpp")}
          </div>
        )}
      </div>

      <Separator />

      {/* Email body */}
      <div className="flex-1 p-4 text-sm whitespace-pre-wrap">
        {mail.text}
      </div>

      <Separator className="mt-auto" />

      {/* Reply composer */}
      <div className="p-4">
        <div className="grid gap-4">
          <Textarea
            className="p-4"
            placeholder={`Reply ${mail.name}...`}
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <div className="flex items-center">
            <Label
              htmlFor="mute"
              className="flex items-center gap-2 text-xs font-normal cursor-pointer"
            >
              <Switch id="mute" aria-label="Mute thread" />
              Mute this thread
            </Label>
            <Button
              size="sm"
              className="ml-auto"
              onClick={(e) => {
                e.preventDefault()
                onReply?.(replyText)
                setReplyText("")
              }}
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export { MailDisplay, type MailDisplayProps }
