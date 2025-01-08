import { FC } from "react";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import NavMain from "./nav-main";
import NavUser from "./nav-user";
import TeamSwitcher from "./team-switcher";
import { ScrollArea } from "@/components/ui/scroll-area";
import data from "@/data/sidebar.json";

const AppSidebar: FC = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="border-b h-16 group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <ScrollArea className="h-full">
        <SidebarContent>
          <NavMain items={data.navMain} />
        </SidebarContent>
      </ScrollArea>
      <SidebarFooter className="border-t">
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
