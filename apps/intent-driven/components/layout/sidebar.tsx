"use client";

import {
  Home,
  Plus,
  Blocks,
  Bookmark,
  Mail,
  Settings,
} from "lucide-react";

interface RailItem {
  icon: React.ReactNode;
  label: string;
  href?: string;
}

const iconRailItems: RailItem[] = [
  { icon: <Home className="w-5 h-5" />, label: "Home", href: "/" },
  { icon: <Blocks className="w-5 h-5" />, label: "Blocks", href: "/blocks" },
  { icon: <Plus className="w-5 h-5" />, label: "Add" },
];

const bottomRailItems: RailItem[] = [
  { icon: <Bookmark className="w-5 h-5" />, label: "Bookmarks" },
  { icon: <Mail className="w-5 h-5" />, label: "Messages" },
  { icon: <Settings className="w-5 h-5" />, label: "Settings" },
];

function RailButton({ item }: { item: RailItem }) {
  const content = (
    <div
      className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
      title={item.label}
    >
      {item.icon}
    </div>
  );

  if (item.href) {
    return <a href={item.href}>{content}</a>;
  }

  return <button>{content}</button>;
}

export function Sidebar() {
  return (
    <div className="flex h-full">
      {/* Narrow icon rail */}
      <div className="w-14 border-r bg-background flex flex-col items-center py-3 gap-1 shrink-0">
        {iconRailItems.map((item) => (
          <RailButton key={item.label} item={item} />
        ))}
        <div className="flex-1" />
        {bottomRailItems.map((item) => (
          <RailButton key={item.label} item={item} />
        ))}
      </div>
    </div>
  );
}
