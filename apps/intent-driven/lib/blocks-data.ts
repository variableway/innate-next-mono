export interface BlockItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  tags: string[];
  aiPrompt: string;
}

export const blocksData: BlockItem[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    description: "A comprehensive dashboard layout with stats cards, charts, recent activity, and data tables. Perfect for admin panels and analytics views.",
    icon: "LayoutDashboard",
    tags: ["layout", "charts", "stats", "admin"],
    aiPrompt: `Create a Dashboard block with the following features:
- Header with title, date range picker, and action buttons
- Stats cards row (4 cards) with trend indicators
- Main content area with:
  - Revenue chart (area chart with multiple series)
  - Recent transactions table (sortable, with status badges)
- Sidebar with navigation menu
- Use Card, Table, Badge, Button, Tabs components
- Responsive grid layout
- Dark mode support`,
  },
  {
    id: "mail",
    title: "Mail",
    description: "A full-featured email interface with folder sidebar, message list, and reading pane. Supports inbox, sent, drafts, and archived folders.",
    icon: "Mail",
    tags: ["email", "inbox", "communication"],
    aiPrompt: `Create a Mail block with the following features:
- Three-panel layout: folders sidebar | message list | reading pane
- Folders: Inbox, Drafts, Sent, Junk, Trash, Archive
- Message list with: sender avatar, subject, preview, date, read/unread status
- Reading pane with: header (from, to, subject, date), body, attachments
- Compose button and search bar
- Resizable panels using Resizable component
- Star/unstar messages`,
  },
  {
    id: "authentication",
    title: "Authentication",
    description: "Complete authentication flows including login, register, forgot password, and account verification. Multiple layout variations available.",
    icon: "Shield",
    tags: ["auth", "login", "security"],
    aiPrompt: `Create an Authentication block with the following features:
- Login form: email, password, remember me checkbox, submit button
- Social login buttons: Google, GitHub
- Link to register page
- Register form: name, email, password, confirm password, terms checkbox
- Forgot password flow
- Use Form, Input, Button, Checkbox, Label, Separator components
- Card-centered layout with logo`,
  },
  {
    id: "tasks",
    title: "Tasks",
    description: "A Kanban-style task management board with drag-and-drop support. Organize tasks into columns like To Do, In Progress, and Done.",
    icon: "CheckSquare",
    tags: ["kanban", "project-management", "productivity"],
    aiPrompt: `Create a Tasks block with the following features:
- Kanban board with 3 columns: To Do, In Progress, Done
- Task cards with: title, description, tags, assignee avatar, due date, priority badge
- Drag and drop between columns
- Add new task button with dialog form
- Filter by assignee, priority, tag
- Search tasks
- Use Card, Badge, Avatar, Dialog, Input, Select, Button components`,
  },
  {
    id: "cards",
    title: "Cards",
    description: "A collection of card component patterns for displaying content. Includes stat cards, user profile cards, pricing cards, and media cards.",
    icon: "CreditCard",
    tags: ["ui", "content", "display"],
    aiPrompt: `Create a Cards block showcasing various card patterns:
- Stat cards: large number, label, trend percentage, mini sparkline
- User profile cards: avatar, name, role, bio, social links, follow button
- Pricing cards: plan name, price, feature list, CTA button, highlighted popular plan
- Media cards: image, title, description, tags, bookmark button
- Notification cards: icon, title, message, timestamp, dismiss button
- Use Card, Avatar, Badge, Button, Separator components`,
  },
  {
    id: "playground",
    title: "Playground",
    description: "An interactive component playground for testing and previewing UI components. Real-time editing with live preview.",
    icon: "Gamepad2",
    tags: ["demo", "interactive", "testing"],
    aiPrompt: `Create a Playground block with the following features:
- Split view: code editor on left, live preview on right
- Component selector dropdown (Button, Input, Card, Badge, etc.)
- Props panel: toggle switches, select dropdowns, text inputs for component props
- Live preview updates as props change
- Copy code button
- Reset to defaults button
- Use Tabs, Select, Switch, Input, Button, Card components`,
  },
  {
    id: "forms",
    title: "Forms",
    description: "Advanced form layouts with validation, multi-step wizards, and various input types. Built with react-hook-form and zod validation.",
    icon: "FileText",
    tags: ["forms", "input", "validation"],
    aiPrompt: `Create a Forms block with the following features:
- Multi-step form wizard with progress indicator
- Step 1: Personal info (name, email, phone, date of birth)
- Step 2: Address (street, city, state, zip, country)
- Step 3: Preferences (notifications, theme, language)
- Step 4: Review and submit
- Validation with Zod schema
- Error messages per field
- Navigation between steps with back/next buttons
- Use Form, Input, Select, Checkbox, RadioGroup, Label, Button, Progress components`,
  },
  {
    id: "music",
    title: "Music",
    description: "A music player interface with playlist view, album art, playback controls, and volume slider. Inspired by modern streaming apps.",
    icon: "Music",
    tags: ["media", "player", "entertainment"],
    aiPrompt: `Create a Music block with the following features:
- Now playing bar: album art, song title, artist, playback controls (play/pause, next, prev), progress bar, volume slider
- Playlist sidebar: song list with album art, title, artist, duration
- Album grid view: cover art, album name, artist
- Player controls: shuffle, repeat, like button
- Use Slider, Button, Avatar, Card, ScrollArea, Separator components
- Dark theme optimized`,
  },
];

export function getBlockById(id: string): BlockItem | undefined {
  return blocksData.find((block) => block.id === id);
}
