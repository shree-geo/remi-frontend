import { DynamicIcon } from "lucide-react/dynamic";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { NavItem } from "./navItem";
import { allMenus } from "./data/navMenus";

export async function DynamicNav() {
  return (
    <>
      <SidebarGroup>
        <SidebarMenu>
          <NavItem
            item={{
              title: "Dashboard",
              url: "/dashboard",
              icon: <DynamicIcon name="layout-dashboard" />,
              items: [],
              isCollapsible: false,
            }}
          />
        </SidebarMenu>
      </SidebarGroup>
      {Object.entries(allMenus).map(([groupName, menus]) => (
        <SidebarGroup key={groupName}>
          <SidebarGroupLabel>{groupName}</SidebarGroupLabel>
          <SidebarMenu>
            {menus.map((item) => (
              <NavItem key={item.title} item={item} />
            ))}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  );
}
