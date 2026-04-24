"use client";

import { cn } from "@innate/ui";
import { Search, Bell, MessageSquare, Bookmark, ChevronDown, LogOut, Settings, User } from "lucide-react";
import { ThemeStyleSwitcher } from "@/components/theme-style-switcher";
import { Input } from "@innate/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@innate/ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@innate/ui";

export interface HeaderNavItem {
  label: string;
  active?: boolean;
}

// ===== DATA: Header navigation items =====
export const headerNavItems: HeaderNavItem[] = [
  { label: "Home", active: true },
  { label: "Learning Library" },
  { label: "Overview & Freebies" },
  { label: "AI Coding Basics" },
  { label: "Events" },
];

// ===== DATA: Header action items =====
export const headerActions = {
  search: { placeholder: "Search" },
  notifications: { hasUnread: true },
  messages: { enabled: true },
  bookmarks: { enabled: true },
} as const;

// ===== DATA: User profile =====
export const userProfile = {
  name: "Developer",
  email: "dev@innate.app",
  role: "Admin",
  avatar: "",
  initials: "D",
};

export function Header() {
  return (
    <header className="h-14 border-b bg-background flex items-center px-4 gap-4 shrink-0">
      {/* Logo only */}
      <div className="flex items-center gap-2 shrink-0">
        <div className="w-7 h-7 bg-foreground rounded flex items-center justify-center">
          <span className="text-background text-xs font-bold">S</span>
        </div>
        <ChevronDown className="w-4 h-4 text-muted-foreground" />
      </div>

      {/* Navigation tabs - data driven */}
      <nav className="hidden md:flex items-center gap-1">
        {headerNavItems.map((item) => (
          <a
            key={item.label}
            href="#"
            className={cn(
              "px-3 py-1.5 rounded-md text-sm transition-colors",
              item.active
                ? "bg-accent text-accent-foreground font-medium"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
            )}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div className="flex-1" />

      {/* Right actions */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="hidden sm:flex items-center relative">
          <Search className="w-4 h-4 absolute left-2.5 text-muted-foreground" />
          <Input
            placeholder={headerActions.search.placeholder}
            className="w-48 pl-8 h-8 text-sm bg-muted border-0"
          />
        </div>

        {/* Notifications */}
        <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors relative">
          <Bell className="w-4 h-4" />
          {headerActions.notifications.hasUnread && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          )}
        </button>

        {/* Messages */}
        {headerActions.messages.enabled && (
          <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors">
            <MessageSquare className="w-4 h-4" />
          </button>
        )}

        {/* Bookmarks */}
        {headerActions.bookmarks.enabled && (
          <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors">
            <Bookmark className="w-4 h-4" />
          </button>
        )}

        {/* Theme Style Switcher */}
        <ThemeStyleSwitcher />

        {/* User profile dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-md hover:bg-accent transition-colors">
              <Avatar className="w-7 h-7">
                <AvatarImage src={userProfile.avatar} />
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                  {userProfile.initials}
                </AvatarFallback>
              </Avatar>
              <div className="hidden sm:flex flex-col items-start leading-none">
                <span className="text-sm font-medium">{userProfile.name}</span>
                <span className="text-xs text-muted-foreground">{userProfile.role}</span>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">{userProfile.name}</p>
                <p className="text-xs text-muted-foreground">{userProfile.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
