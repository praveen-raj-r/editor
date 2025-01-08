import { FC } from "react";
import * as LucideIcons from "lucide-react";
import { NavItemProps, NavMainProps } from "@/types";
import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

const NavMain: FC<NavMainProps> = ({ items }) => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Overview</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item, index) => {
          const IconComponent = item.icon
            ? (LucideIcons[item.icon as keyof typeof LucideIcons] as FC)
            : null;
          {
            return item.url === "#" ? (
              <DropDownNavItem
                key={`DropDownNavItem-${index}`}
                item={item}
                IconComponent={IconComponent}
              />
            ) : (
              <SingleNavItem
                key={`SingleNavItem-${index}`}
                item={item}
                IconComponent={IconComponent}
              />
            );
          }
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
};

const DropDownNavItem: FC<NavItemProps> = ({ item, IconComponent }) => {
  return (
    <Collapsible
      key={item.title}
      asChild
      defaultOpen={item.isActive}
      className="group/collapsible"
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip={item.title}>
            {IconComponent && <IconComponent />}
            <span>{item.title}</span>
            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.items?.map((subItem) => {
              const SubIconComponent = subItem.icon
                ? (LucideIcons[subItem.icon as keyof typeof LucideIcons] as FC)
                : null;
              return (
                <SidebarMenuSubItem key={subItem.title}>
                  <SidebarMenuSubButton asChild>
                    <a href={subItem.url}>
                      {SubIconComponent && <SubIconComponent />}
                      <span>{subItem.title}</span>
                    </a>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              );
            })}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
};

const SingleNavItem: FC<NavItemProps> = ({ item, IconComponent }) => {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild tooltip={item.title}>
        <a href={item.url}>
          {IconComponent && <IconComponent />}
          <span>{item.title}</span>
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default NavMain;
