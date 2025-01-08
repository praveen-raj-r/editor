import * as LucideReact from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { ElementType } from "react";
import { navMain as data } from "@/data/editor/sidebar.json";

type SidebarItem = {
  title: string;
  icon: string;
  url: string;
  isActive: boolean;
};

type PrimarySidebarProps = {
  activeItem: SidebarItem;
  setActiveItem: (item: SidebarItem) => void;
};

const PrimarySidebar: React.FC<PrimarySidebarProps> = ({
  activeItem,
  setActiveItem,
}) => {
  const { setOpen } = useSidebar();

  return (
    <Sidebar
      collapsible="none"
      className="!w-[calc(var(--sidebar-width-icon)_+_1px)] border-r"
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center text-sidebar-primary-foreground">
                  <img className="size-4" src="./microbin-white-logo.png" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Microbin Inc</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="px-1.5 md:px-0">
            <SidebarMenu>
              {data.map((item) => {
                const IconComponent = LucideReact[
                  item.icon as keyof typeof LucideReact
                ] as ElementType;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={{ children: item.title, hidden: false }}
                      onClick={() => {
                        setActiveItem(item);
                        setOpen(true);
                      }}
                      isActive={activeItem.title === item.title}
                      className="px-2.5 md:px-2"
                    >
                      {IconComponent && <IconComponent />}
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default PrimarySidebar;
