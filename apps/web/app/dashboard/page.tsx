import { SidebarProvider, SidebarInset } from "@innate/ui";

export default function DashboardPage() {
  return (
    <SidebarProvider>
      <aside className="w-64 border-r bg-sidebar">
        <div className="p-4">
          <h2 className="text-lg font-semibold">Dashboard</h2>
          <nav className="mt-4 space-y-2">
            <a href="#" className="block rounded-md px-3 py-2 hover:bg-sidebar-accent">
              首页
            </a>
            <a href="#" className="block rounded-md px-3 py-2 hover:bg-sidebar-accent">
              分析
            </a>
            <a href="#" className="block rounded-md px-3 py-2 hover:bg-sidebar-accent">
              设置
            </a>
          </nav>
        </div>
      </aside>
      <SidebarInset>
        <main className="p-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="mt-2 text-muted-foreground">
            这是一个 Dashboard 布局示例。使用 SidebarProvider + SidebarInset 构建。
          </p>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
