import { BanIcon, Calendar, Home, Inbox, Layers, List, Search, Settings, ShieldCheckIcon, Users } from "lucide-react"
import { usePathname } from "next/navigation"


import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Home",
    url: "/admin",
    icon: Home,
  },
  {
    title: "Categories",
    url: "/admin/category-list",
    icon: Layers,
  },
  {
    title: "Users",
    url: "/admin/user-list",
    icon: Users,
  },
  {
    title: "Admins",
    url: "/admin/admin-list",
    icon: ShieldCheckIcon,
  },
  {
    title: "Banned Users",
    url: "/admin/banned-users",
    icon: BanIcon,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()  


  return (
    <Sidebar className="pt-20 dark:bg-zinc-800">
      <SidebarContent className="dark:bg-zinc-800">
        <SidebarGroup>
          <SidebarGroupLabel>Admin Panel</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
            {items.map((item) => {
                const isActive = pathname === item.url  // Check if current path matches item
                return (
                  <SidebarMenuItem key={item.title} className="w-[80%]">
                    <SidebarMenuButton asChild>
                      <a
                        href={item.url}
                        className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                          isActive
                            ? "bg-purple-500 dark:bg-purple-700 text-zinc-50 hover:bg-purple-500 dark:hover:bg-purple-700 hover:text-zinc-50 font-semibold"  // Active styles
                            : "hover:bg-purple-100 dark:hover:bg-zinc-700"
                        }`}
                      >
                        <item.icon className={isActive ? "text-white" : "text-gray-500"} />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}




