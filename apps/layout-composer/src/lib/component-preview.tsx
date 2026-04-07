"use client"

import * as React from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  AlertDescription,
  AlertTitle,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AspectRatio,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Checkbox,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Input,
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
  Kbd,
  Label,
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Progress,
  RadioGroup,
  RadioGroupItem,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  ScrollArea,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Separator,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Skeleton,
  Slider,
  Spinner,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  HeroSection,
  FeaturesSection,
  PricingSection,
  StatsSection,
  FaqSection,
  CTASection,
  LoginForm,
  ChatInterface,
  MessageList,
  Inbox,
  MailList,
  MailDisplay,
} from "@innate/ui"
import type {
  ChatMessage,
  ChatConversation,
  ChatUser,
  MailItem,
  MailFolder,
  Feature,
  PricingPlan,
  Stat,
  FaqItem,
} from "@innate/ui"
import {
  Zap,
  Shield,
  Rocket,
  Users,
  Inbox as InboxIcon,
  Mail,
  Send,
} from "lucide-react"

interface ComponentPreviewProps {
  slug: string
  compact?: boolean
}

export function ComponentPreview({ slug, compact = false }: ComponentPreviewProps) {
  const PreviewComponent = previewMap[slug]
  if (!PreviewComponent) {
    return (
      <div className="flex min-h-[120px] items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/20 bg-muted/30">
        <p className="text-sm text-muted-foreground">Preview not available</p>
      </div>
    )
  }
  return (
    <div className={compact ? "pointer-events-none overflow-hidden" : ""}>
      <PreviewComponent compact={compact} />
    </div>
  )
}

type PreviewFn = React.ComponentType<{ compact: boolean }>

const previewMap: Record<string, PreviewFn> = {
  card: CardPreview,
  separator: SeparatorPreview,
  resizable: ResizablePreview,
  "scroll-area": ScrollAreaPreview,
  "aspect-ratio": AspectRatioPreview,
  tabs: TabsPreview,
  accordion: AccordionPreview,
  collapsible: CollapsiblePreview,
  carousel: CarouselPreview,
  breadcrumb: BreadcrumbPreview,
  "navigation-menu": NavigationMenuPreview,
  pagination: PaginationPreview,
  menubar: MenubarPreview,
  input: InputPreview,
  textarea: TextareaPreview,
  select: SelectPreview,
  checkbox: CheckboxPreview,
  "radio-group": RadioGroupPreview,
  switch: SwitchPreview,
  slider: SliderPreview,
  calendar: CalendarPreview,
  "input-otp": InputOTPPreview,
  form: FormPreview,
  label: LabelPreview,
  field: FieldPreview,
  "input-group": InputGroupPreview,
  dialog: DialogPreview,
  sheet: SheetPreview,
  drawer: DrawerPreview,
  "alert-dialog": AlertDialogPreview,
  tooltip: TooltipPreview,
  "hover-card": HoverCardPreview,
  popover: PopoverPreview,
  sonner: SonnerPreview,
  alert: AlertPreview,
  toast: ToastPreview,
  toaster: ToasterPreview,
  table: TablePreview,
  badge: BadgePreview,
  avatar: AvatarPreview,
  progress: ProgressPreview,
  skeleton: SkeletonPreview,
  spinner: SpinnerPreview,
  empty: EmptyPreview,
  item: ItemPreview,
  kbd: KbdPreview,
  button: ButtonPreview,
  "button-group": ButtonGroupPreview,
  toggle: TogglePreview,
  "toggle-group": ToggleGroupPreview,
  "dropdown-menu": DropdownMenuPreview,
  "context-menu": ContextMenuPreview,
  command: CommandPreview,
  "hero-section": HeroSectionPreview,
  "features-section": FeaturesSectionPreview,
  "pricing-section": PricingSectionPreview,
  "stats-section": StatsSectionPreview,
  "faq-section": FaqSectionPreview,
  ctasection: CTASectionPreview,
  "login-form": LoginFormPreview,
  inbox: InboxPreview,
  "mail-list": MailListPreview,
  "mail-display": MailDisplayPreview,
  "chat-interface": ChatInterfacePreview,
  "message-list": MessageListPreview,
}

function CardPreview({ compact }: { compact: boolean }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card description goes here.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">Main content area with some example text.</p>
        </CardContent>
        {!compact && (
          <CardFooter className="justify-end">
            <Button size="sm">Action</Button>
          </CardFooter>
        )}
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>You have 3 unread messages.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-2">
          <div className="flex items-center gap-2 rounded-md bg-muted px-3 py-2 text-sm">New project assigned</div>
          <div className="flex items-center gap-2 rounded-md bg-muted px-3 py-2 text-sm">Meeting at 3pm</div>
          {!compact && <div className="flex items-center gap-2 rounded-md bg-muted px-3 py-2 text-sm">Deployment complete</div>}
        </CardContent>
      </Card>
    </div>
  )
}

function SeparatorPreview({ compact }: { compact: boolean }) {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium">Section One</h4>
        <p className="text-sm text-muted-foreground">Content above separator</p>
      </div>
      <Separator />
      <div>
        <h4 className="text-sm font-medium">Section Two</h4>
        <p className="text-sm text-muted-foreground">Content below separator</p>
      </div>
      {!compact && (
        <>
          <div className="flex h-5 items-center space-x-4">
            <Separator orientation="vertical" />
            <div className="flex h-5 items-center space-x-4 text-sm">
              <span>Vertical</span>
              <Separator orientation="vertical" />
              <span>Separators</span>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

function ResizablePreview({ compact }: { compact: boolean }) {
  return (
    <ResizablePanelGroup orientation="horizontal" className="min-h-[200px] rounded-lg border">
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-4">
          <p className="text-sm text-muted-foreground">Panel One</p>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <ResizablePanelGroup orientation="vertical">
          <ResizablePanel defaultSize={50}>
            <div className="flex h-full items-center justify-center p-4">
              <p className="text-sm text-muted-foreground">Panel Two</p>
            </div>
          </ResizablePanel>
          {!compact && <ResizableHandle withHandle />}
          {!compact && (
            <ResizablePanel defaultSize={50}>
              <div className="flex h-full items-center justify-center p-4">
                <p className="text-sm text-muted-foreground">Panel Three</p>
              </div>
            </ResizablePanel>
          )}
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

function ScrollAreaPreview({ compact }: { compact: boolean }) {
  const items = compact ? 8 : 15
  return (
    <ScrollArea className="h-[200px] w-full rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
        {Array.from({ length: items }).map((_, i) => (
          <React.Fragment key={i}>
            <div className="text-sm">Item {i + 1}</div>
            {i < items - 1 && <Separator className="my-2" />}
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  )
}

function AspectRatioPreview() {
  return (
    <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg">
      <div className="flex h-full w-full items-center justify-center rounded-lg border-2 border-dashed">
        <p className="text-sm text-muted-foreground">16:9 Aspect Ratio</p>
      </div>
    </AspectRatio>
  )
}

function TabsPreview({ compact }: { compact: boolean }) {
  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList className="grid w-full grid-cols={3}" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        {!compact && <TabsTrigger value="settings">Settings</TabsTrigger>}
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Account</CardTitle>
            <CardDescription>Manage your account settings.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1"><Label htmlFor="name">Name</Label><Input id="name" defaultValue="John Doe" /></div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Password</CardTitle>
            <CardDescription>Change your password here.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1"><Label htmlFor="pwd">Password</Label><Input id="pwd" type="password" /></div>
          </CardContent>
        </Card>
      </TabsContent>
      {!compact && (
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Settings</CardTitle>
              <CardDescription>Configure your preferences.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2"><Switch /> <Label>Enable notifications</Label></div>
            </CardContent>
          </Card>
        </TabsContent>
      )}
    </Tabs>
  )
}

function AccordionPreview() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>Yes. It comes with beautiful default styles.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>Yes. It&apos;s animated by default with smooth transitions.</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

function CollapsiblePreview() {
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <div className="w-full space-y-2">
      <div className="flex items-center gap-2">
        <h4 className="text-sm font-semibold">Reviews</h4>
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              {isOpen ? "Hide" : "Show"} details
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 pt-2">
            <div className="rounded-md border px-4 py-3 text-sm">Great product! Highly recommended.</div>
            <div className="rounded-md border px-4 py-3 text-sm">Works exactly as described.</div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  )
}

function CarouselPreview() {
  const items = ["Project Alpha", "Project Beta", "Project Gamma", "Project Delta"]
  return (
    <Carousel className="w-full max-w-xs mx-auto">
      <CarouselContent>
        {items.map((item, idx) => (
          <CarouselItem key={idx}>
            <div className="flex aspect-square items-center justify-center rounded-lg border bg-muted p-6">
              <span className="text-2xl font-semibold">{item}</span>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

function BreadcrumbPreview() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

function NavigationMenuPreview() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
              <li className="row-span-3"><a className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none" href="#"><span className="mt-2 mb-2 text-lg font-medium">Layout Composer</span><span className="text-sm text-muted-foreground">Beautifully designed components</span></a></li>
              <li><a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent" href="#"><div className="text-sm font-medium leading-none">Introduction</div><p className="line-clamp-2 text-sm text-muted-foreground">Re-usable components built with Radix UI</p></a></li>
              <li><a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent" href="#"><div className="text-sm font-medium leading-none">Installation</div><p className="line-clamp-2 text-sm text-muted-foreground">How to install dependencies and structure</p></a></li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {["Alert Dialog", "Hover Card", "Scroll Area", "Tooltip"].map((name) => (
                <li key={name}><a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent" href="#"><div className="text-sm font-medium leading-none">{name}</div><p className="line-clamp-2 text-sm text-muted-foreground">A {name.toLowerCase()} component</p></a></li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

function PaginationPreview() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
        <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
        <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
        <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
        <PaginationItem><PaginationEllipsis /></PaginationItem>
        <PaginationItem><PaginationNext href="#" /></PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

function MenubarPreview() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>New Tab</MenubarItem>
          <MenubarItem>New Window</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Print</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Undo</MenubarItem>
          <MenubarItem>Redo</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Cut</MenubarItem>
          <MenubarItem>Copy</MenubarItem>
          <MenubarItem>Paste</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Zoom In</MenubarItem>
          <MenubarItem>Zoom Out</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}

function InputPreview() {
  return (
    <div className="grid w-full items-center gap-4">
      <div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" type="email" placeholder="name@example.com" /></div>
      <div className="space-y-2"><Label htmlFor="password">Password</Label><Input id="password" type="password" placeholder="Enter password" /></div>
    </div>
  )
}

function TextareaPreview() {
  return (
    <div className="space-y-2">
      <Label htmlFor="message">Your message</Label>
      <Textarea id="message" placeholder="Type your message here..." />
    </div>
  )
}

function SelectPreview() {
  return (
    <div className="space-y-2">
      <Label htmlFor="framework">Framework</Label>
      <Select>
        <SelectTrigger id="framework" className="w-full"><SelectValue placeholder="Select a framework" /></SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Frameworks</SelectLabel>
            <SelectItem value="next">Next.js</SelectItem>
            <SelectItem value="remix">Remix</SelectItem>
            <SelectItem value="astro">Astro</SelectItem>
            <SelectItem value="nuxt">Nuxt.js</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

function CheckboxPreview() {
  return (
    <div className="space-y-3">
      {["Receive emails", "Receive push notifications", "Receive SMS"].map((label, i) => (
        <div key={i} className="flex items-center gap-2">
          <Checkbox id={`check-${i}`} defaultChecked={i === 0} />
          <Label htmlFor={`check-${i}`} className="text-sm font-normal">{label}</Label>
        </div>
      ))}
    </div>
  )
}

function RadioGroupPreview() {
  return (
    <RadioGroup defaultValue="comfortable">
      {["Default", "Comfortable", "Compact"].map((label) => (
        <div key={label} className="flex items-center gap-2">
          <RadioGroupItem value={label.toLowerCase()} id={`radio-${label}`} />
          <Label htmlFor={`radio-${label}`} className="text-sm font-normal">{label}</Label>
        </div>
      ))}
    </RadioGroup>
  )
}

function SwitchPreview() {
  return (
    <div className="space-y-3">
      {["Airplane Mode", "Bluetooth", "Notifications"].map((label, i) => (
        <div key={i} className="flex items-center justify-between rounded-lg border p-3">
          <Label htmlFor={`switch-${i}`} className="text-sm">{label}</Label>
          <Switch id={`switch-${i}`} defaultChecked={i === 0} />
        </div>
      ))}
    </div>
  )
}

function SliderPreview() {
  return (
    <div className="space-y-6">
      <div className="space-y-2"><Label>Volume</Label><Slider defaultValue={[50]} max={100} step={1} /></div>
      <div className="space-y-2"><Label>Temperature Range</Label><Slider defaultValue={[20, 80]} max={100} step={1} /></div>
    </div>
  )
}

function CalendarPreview() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  return (
    <div className="rounded-lg border p-3 inline-block">
      <CalendarPrimitive selected={date} onSelect={setDate} />
    </div>
  )
}

function CalendarPrimitive(props: { selected?: Date; onSelect?: (d: Date | undefined) => void }) {
  return (
    <div className="text-center text-sm">
      <p className="text-muted-foreground">Calendar component with date selection</p>
      <p className="mt-1 font-medium">{props.selected?.toLocaleDateString()}</p>
    </div>
  )
}

function InputOTPPreview() {
  return (
    <div className="space-y-2">
      <Label>One-Time Password</Label>
      <InputOTP maxLength={6}>
        <InputOTPGroup><InputOTPSlot index={0} /><InputOTPSlot index={1} /><InputOTPSlot index={2} /></InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup><InputOTPSlot index={3} /><InputOTPSlot index={4} /><InputOTPSlot index={5} /></InputOTPGroup>
      </InputOTP>
    </div>
  )
}

function FormPreview() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-base">Form Example</CardTitle>
        <CardDescription>react-hook-form + zod validation</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2"><Label>Username</Label><Input placeholder="Enter username" /></div>
        <div className="space-y-2"><Label>Email</Label><Input type="email" placeholder="name@example.com" /></div>
        <Button className="w-full">Submit</Button>
      </CardContent>
    </Card>
  )
}

function LabelPreview() {
  return (
    <div className="space-y-4">
      <div className="space-y-2"><Label htmlFor="name">Full Name</Label><Input id="name" placeholder="John Doe" /></div>
      <div className="space-y-2"><Label htmlFor="search">Search</Label><Input id="search" placeholder="Search..." /></div>
    </div>
  )
}

function FieldPreview() {
  return (
    <div className="space-y-4">
      <div className="space-y-1"><Label>Name</Label><Input placeholder="Enter your name" /><p className="text-xs text-muted-foreground">Your display name</p></div>
      <div className="space-y-1"><Label>Email</Label><Input type="email" placeholder="name@example.com" /><p className="text-xs text-muted-foreground">We&apos;ll never share your email</p></div>
    </div>
  )
}

function InputGroupPreview() {
  return (
    <div className="space-y-4">
      <div className="space-y-2"><Label>Search</Label><div className="flex"><Input placeholder="Search..." className="rounded-r-none" /><Button className="rounded-l-none">Go</Button></div></div>
      <div className="space-y-2"><Label>Website</Label><div className="flex"><span className="inline-flex items-center rounded-l-md border border-r-0 bg-muted px-3 text-sm text-muted-foreground">https://</span><Input className="rounded-l-none" placeholder="example.com" /></div></div>
    </div>
  )
}

function DialogPreview() {
  return (
    <Dialog>
      <DialogTrigger asChild><Button variant="outline">Open Dialog</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>Edit Profile</DialogTitle><DialogDescription>Make changes to your profile here. Click save when done.</DialogDescription></DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2"><Label htmlFor="dialog-name">Name</Label><Input id="dialog-name" defaultValue="John Doe" /></div>
          <div className="space-y-2"><Label htmlFor="dialog-username">Username</Label><Input id="dialog-username" defaultValue="@johndoe" /></div>
        </div>
        <DialogFooter><Button>Save changes</Button></DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function SheetPreview() {
  return (
    <Sheet>
      <SheetTrigger asChild><Button variant="outline">Open Sheet</Button></SheetTrigger>
      <SheetContent>
        <SheetHeader><SheetTitle>Edit Profile</SheetTitle><SheetDescription>Make changes to your profile here.</SheetDescription></SheetHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2"><Label>Name</Label><Input defaultValue="John Doe" /></div>
          <div className="space-y-2"><Label>Username</Label><Input defaultValue="@johndoe" /></div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

function DrawerPreview() {
  return (
    <Drawer>
      <DrawerTrigger asChild><Button variant="outline">Open Drawer</Button></DrawerTrigger>
      <DrawerContent>
        <DrawerHeader><DrawerTitle>Move Goal</DrawerTitle><DrawerDescription>Set your daily activity goal.</DrawerDescription></DrawerHeader>
        <div className="p-4"><div className="space-y-2"><Label>Daily steps</Label><Input defaultValue="350" /></div></div>
        <DrawerFooter><Button>Submit</Button><DrawerClose asChild><Button variant="outline">Cancel</Button></DrawerClose></DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function AlertDialogPreview() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild><Button variant="destructive">Delete Account</Button></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>This action cannot be undone. This will permanently delete your account and remove your data from our servers.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

function TooltipPreview() {
  return (
    <TooltipProvider>
      <div className="flex gap-4">
        <Tooltip><TooltipTrigger asChild><Button variant="outline">Hover me</Button></TooltipTrigger><TooltipContent><p>This is a tooltip</p></TooltipContent></Tooltip>
        <Tooltip><TooltipTrigger asChild><Button variant="outline">And me</Button></TooltipTrigger><TooltipContent><p>Another tooltip</p></TooltipContent></Tooltip>
      </div>
    </TooltipProvider>
  )
}

function HoverCardPreview() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild><Button variant="link">@nextjs</Button></HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">Next.js</h4>
            <p className="text-sm text-muted-foreground">The React Framework for the Web.</p>
            <div className="flex gap-2 pt-2"><Badge variant="secondary">React</Badge><Badge variant="secondary">Framework</Badge></div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

function PopoverPreview() {
  return (
    <Popover>
      <PopoverTrigger asChild><Button variant="outline">Open Popover</Button></PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2"><h4 className="font-medium leading-none">Dimensions</h4><p className="text-sm text-muted-foreground">Set the dimensions for the layer.</p></div>
          <div className="grid gap-2"><div className="grid grid-cols-3 items-center gap-4"><Label htmlFor="width">Width</Label><Input id="width" defaultValue="100%" className="col-span-2" /></div></div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

function SonnerPreview() {
  return <div className="space-y-2"><p className="text-sm text-muted-foreground">Sonner toast notifications — use the <code className="rounded bg-muted px-1 text-xs">toast()</code> function to trigger.</p><Button variant="outline" onClick={() => {}}>Show Toast</Button></div>
}

function AlertPreview() {
  return (
    <div className="space-y-3">
      <Alert>
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>You can add components to your app using the CLI.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
      </Alert>
    </div>
  )
}

function ToastPreview() {
  return <div className="space-y-2"><p className="text-sm text-muted-foreground">Toast component for notifications. Use the <code className="rounded bg-muted px-1 text-xs">useToast</code> hook.</p></div>
}

function ToasterPreview() {
  return <div className="space-y-2"><p className="text-sm text-muted-foreground">The Toaster component renders toast notifications in the DOM root.</p></div>
}

function TablePreview() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[{ invoice: "INV001", status: "Paid", method: "Credit Card", amount: "$250.00" }, { invoice: "INV002", status: "Pending", method: "PayPal", amount: "$150.00" }, { invoice: "INV003", status: "Unpaid", method: "Bank Transfer", amount: "$350.00" }].map((row) => (
          <TableRow key={row.invoice}>
            <TableCell className="font-medium">{row.invoice}</TableCell>
            <TableCell><Badge variant={row.status === "Paid" ? "default" : row.status === "Pending" ? "secondary" : "outline"}>{row.status}</Badge></TableCell>
            <TableCell>{row.method}</TableCell>
            <TableCell className="text-right">{row.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

function BadgePreview() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Destructive</Badge>
    </div>
  )
}

function AvatarPreview() {
  return (
    <div className="flex gap-4">
      <Avatar><AvatarImage src="https://github.com/shadcn.png" alt="User" /><AvatarFallback>CN</AvatarFallback></Avatar>
      <Avatar><AvatarFallback>JD</AvatarFallback></Avatar>
      <Avatar><AvatarFallback>AB</AvatarFallback></Avatar>
    </div>
  )
}

function ProgressPreview() {
  const [progress, setProgress] = React.useState(65)
  return (
    <div className="space-y-4 w-full">
      <Progress value={progress} className="w-full" />
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={() => setProgress(Math.max(0, progress - 10))}>-10%</Button>
        <Button size="sm" variant="outline" onClick={() => setProgress(Math.min(100, progress + 10))}>+10%</Button>
        <span className="ml-auto text-sm text-muted-foreground self-center">{progress}%</span>
      </div>
    </div>
  )
}

function SkeletonPreview() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}

function SpinnerPreview() {
  return (
    <div className="flex items-center gap-4">
      <Spinner className="size-4" />
      <Spinner className="size-6" />
      <Spinner className="size-8" />
      <span className="text-sm text-muted-foreground">Loading...</span>
    </div>
  )
}

function EmptyPreview() {
  return (
    <div className="flex min-h-[150px] items-center justify-center rounded-lg border-2 border-dashed">
      <div className="text-center"><p className="text-sm font-medium text-muted-foreground">No items found</p><p className="mt-1 text-xs text-muted-foreground">Try adjusting your search or filters</p></div>
    </div>
  )
}

function ItemPreview() {
  return (
    <div className="space-y-2">
      {["Profile Settings", "Notifications", "Security"].map((title) => (
        <div key={title} className="flex items-center justify-between rounded-md border p-3">
          <span className="text-sm font-medium">{title}</span>
          <Button variant="ghost" size="sm">Open</Button>
        </div>
      ))}
    </div>
  )
}

function KbdPreview() {
  return (
    <div className="flex flex-wrap gap-2">
      <Kbd>Ctrl</Kbd><span className="text-muted-foreground self-center">+</span><Kbd>C</Kbd>
      <span className="mx-2 text-muted-foreground self-center">|</span>
      <Kbd>Ctrl</Kbd><span className="text-muted-foreground self-center">+</span><Kbd>V</Kbd>
      <span className="mx-2 text-muted-foreground self-center">|</span>
      <Kbd>Esc</Kbd>
    </div>
  )
}

function ButtonPreview() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  )
}

function ButtonGroupPreview() {
  return (
    <div className="space-y-4">
      <ButtonGroup>
        <Button variant="outline">Left</Button>
        <Button variant="outline">Center</Button>
        <Button variant="outline">Right</Button>
      </ButtonGroup>
    </div>
  )
}

function TogglePreview() {
  return (
    <div className="flex gap-2">
      <Toggle>Bold</Toggle>
      <Toggle>Italic</Toggle>
      <Toggle>Underline</Toggle>
    </div>
  )
}

function ToggleGroupPreview() {
  return (
    <ToggleGroup type="multiple">
      <ToggleGroupItem value="b">B</ToggleGroupItem>
      <ToggleGroupItem value="i">I</ToggleGroupItem>
      <ToggleGroupItem value="u">U</ToggleGroupItem>
    </ToggleGroup>
  )
}

function DropdownMenuPreview() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild><Button variant="outline">Open Menu</Button></DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function ContextMenuPreview() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-32 w-full items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground">
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Back</ContextMenuItem>
        <ContextMenuItem>Forward</ContextMenuItem>
        <ContextMenuItem>Reload</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

function CommandPreview() {
  return (
    <Command className="rounded-lg border">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>Calendar</CommandItem>
          <CommandItem>Search Emoji</CommandItem>
          <CommandItem>Calculator</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>Profile</CommandItem>
          <CommandItem>Billing</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

function HeroSectionPreview({ compact }: { compact: boolean }) {
  return (
    <div className="rounded-lg border overflow-hidden">
      <HeroSection
        badge={{ text: "New Release" }}
        title="Build faster with "
        titleHighlight="innate"
        subtitle="Beautifully crafted components built with Radix UI and Tailwind CSS."
        primaryCta={{ text: "Get Started", href: "#" }}
        secondaryCta={{ text: "Learn More", href: "#" }}
        className={compact ? "py-12" : undefined}
      />
    </div>
  )
}

function FeaturesSectionPreview({ compact }: { compact: boolean }) {
  const features: Feature[] = compact
    ? [
        { icon: Zap, title: "Fast", description: "Built for performance" },
        { icon: Shield, title: "Secure", description: "Enterprise-grade security" },
      ]
    : [
        { icon: Zap, title: "Fast", description: "Built for performance with optimized rendering" },
        { icon: Shield, title: "Secure", description: "Enterprise-grade security out of the box" },
        { icon: Rocket, title: "Scalable", description: "Grows with your application needs" },
      ]
  return (
    <div className="rounded-lg border overflow-hidden">
      <FeaturesSection
        badge="Features"
        title="Everything you need"
        subtitle="Built with modern tools for the best developer experience"
        features={features}
      />
    </div>
  )
}

function PricingSectionPreview() {
  const plans: PricingPlan[] = [
    { name: "Starter", price: 9, description: "For individuals", features: ["5 projects", "Basic support", "1GB storage"], cta: "Get Started" },
    { name: "Pro", price: 29, description: "For teams", features: ["Unlimited projects", "Priority support", "100GB storage", "Analytics"], cta: "Get Started", popular: true },
    { name: "Enterprise", price: 99, description: "For organizations", features: ["Everything in Pro", "Custom integrations", "Dedicated support", "SLA guarantee"], cta: "Contact Sales" },
  ]
  return (
    <div className="rounded-lg border overflow-hidden">
      <PricingSection badge="Pricing" title="Choose the right plan" subtitle="Simple, transparent pricing" plans={plans} />
    </div>
  )
}

function StatsSectionPreview() {
  const stats: Stat[] = [
    { icon: Users, value: "10k+", label: "Users", description: "Active monthly users" },
    { icon: Shield, value: "99.9%", label: "Uptime", description: "Guaranteed availability" },
    { icon: Rocket, value: "50M", label: "Requests", description: "Processed daily" },
  ]
  return (
    <div className="rounded-lg border overflow-hidden">
      <StatsSection stats={stats} />
    </div>
  )
}

function FaqSectionPreview() {
  const items: FaqItem[] = [
    { value: "faq-1", question: "What is @innate/ui?", answer: "A comprehensive React component library built with Radix UI and Tailwind CSS." },
    { value: "faq-2", question: "Is it free to use?", answer: "Yes, it is open source and free to use in personal and commercial projects." },
  ]
  return (
    <div className="rounded-lg border overflow-hidden">
      <FaqSection badge="FAQ" title="Frequently asked questions" subtitle="Find answers to common questions" items={items} />
    </div>
  )
}

function CTASectionPreview() {
  return (
    <div className="rounded-lg border overflow-hidden">
      <CTASection
        title="Ready to get started?"
        subtitle="Start building your next project today."
        primaryCta={{ text: "Get Started", href: "#" }}
        secondaryCta={{ text: "Learn More", href: "#" }}
      />
    </div>
  )
}

function LoginFormPreview() {
  return (
    <div className="mx-auto w-full max-w-sm">
      <LoginForm />
    </div>
  )
}

function InboxPreview({ compact }: { compact: boolean }) {
  const folders: MailFolder[] = [
    { title: "Inbox", label: "3", icon: InboxIcon },
    { title: "Sent", icon: Send },
    { title: "Drafts", icon: Mail },
  ]
  const mails: MailItem[] = [
    { id: "1", name: "Alice", email: "alice@example.com", subject: "Meeting Tomorrow", text: "Hey, are we still on for tomorrow?", date: "10:30 AM", read: false, labels: ["work"] },
    { id: "2", name: "Bob", email: "bob@example.com", subject: "Project Update", text: "The latest changes have been pushed.", date: "9:15 AM", read: true, labels: [] },
  ]
  return (
    <div className="rounded-lg border overflow-hidden" style={{ height: compact ? "300px" : "500px" }}>
      <Inbox folders={folders} mails={mails} />
    </div>
  )
}

function MailListPreview() {
  const mails: MailItem[] = [
    { id: "1", name: "Alice", email: "alice@example.com", subject: "Meeting Tomorrow", text: "Hey, are we still on for tomorrow?", date: "10:30 AM", read: false, labels: ["work"] },
    { id: "2", name: "Bob", email: "bob@example.com", subject: "Project Update", text: "The latest changes have been pushed.", date: "9:15 AM", read: true, labels: [] },
    { id: "3", name: "Charlie", email: "charlie@example.com", subject: "Code Review", text: "Can you review PR #42?", date: "Yesterday", read: true, labels: ["review"] },
  ]
  return (
    <div className="rounded-lg border overflow-hidden h-[300px]">
      <MailList items={mails} />
    </div>
  )
}

function MailDisplayPreview() {
  const mail: MailItem = {
    id: "1",
    name: "Alice",
    email: "alice@example.com",
    subject: "Meeting Tomorrow",
    text: "Hey, are we still on for tomorrow at 3pm? I wanted to discuss the new design system and how we can integrate it with our existing components.",
    date: "10:30 AM",
    read: false,
    labels: ["work"],
  }
  return (
    <div className="rounded-lg border overflow-hidden h-[300px]">
      <MailDisplay mail={mail} />
    </div>
  )
}

function ChatInterfacePreview({ compact }: { compact: boolean }) {
  const users: ChatUser[] = [
    { id: "1", name: "You", avatar: "", status: "online" },
    { id: "2", name: "Alice", avatar: "", status: "online" },
  ]
  const conversations: ChatConversation[] = [
    { id: "c1", name: "Design Team", lastMessage: "Sounds good!", lastMessageTime: "2m ago", unreadCount: 2, isGroup: true },
    { id: "c2", name: "Alice", lastMessage: "PR merged", lastMessageTime: "1h ago", unreadCount: 0 },
  ]
  const messages: ChatMessage[] = [
    { id: "m1", content: "Hey team, how's the project going?", senderId: "2", timestamp: "10:00 AM" },
    { id: "m2", content: "Going well! Almost done with the components.", senderId: "1", timestamp: "10:02 AM" },
    { id: "m3", content: "Great to hear!", senderId: "2", timestamp: "10:03 AM" },
  ]
  return (
    <div className="rounded-lg border overflow-hidden" style={{ height: compact ? "300px" : "500px" }}>
      <ChatInterface users={users} currentUserId="1" conversations={conversations} messages={messages} />
    </div>
  )
}

function MessageListPreview() {
  const users: ChatUser[] = [
    { id: "1", name: "You", avatar: "", status: "online" },
    { id: "2", name: "Alice", avatar: "", status: "online" },
  ]
  const messages: ChatMessage[] = [
    { id: "m1", content: "Hey, how's it going?", senderId: "2", timestamp: "10:00 AM" },
    { id: "m2", content: "All good! Working on the new features.", senderId: "1", timestamp: "10:02 AM" },
    { id: "m3", content: "Nice! Let me know if you need help.", senderId: "2", timestamp: "10:03 AM" },
  ]
  return (
    <div className="rounded-lg border overflow-hidden h-[300px]">
      <MessageList messages={messages} users={users} currentUserId="1" />
    </div>
  )
}
