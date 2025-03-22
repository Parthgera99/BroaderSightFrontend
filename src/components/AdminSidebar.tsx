import { BanIcon, Calendar, Home, Inbox, Layers, List, Search, Settings, ShieldCheckIcon, Users } from "lucide-react"

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
  return (
    <Sidebar className="pt-20 dark:bg-zinc-800">
      <SidebarContent className="dark:bg-zinc-800">
        <SidebarGroup>
          <SidebarGroupLabel>Admin Panel</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}




