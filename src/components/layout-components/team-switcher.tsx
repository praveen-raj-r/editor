import { FC, useState } from "react";
import { ChevronsUpDown, Plus } from "lucide-react";
import * as LucideIcons from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

interface TeamSwitcherProps {
  teams: {
    name: string;
    logo: string;
    plan: string;
  }[];
}

const TeamSwitcher: FC<TeamSwitcherProps> = ({ teams }) => {
  const [activeTeam, setActiveTeam] = useState(teams[0]);
  const ActiveTeamIconComponent = activeTeam.logo
    ? (LucideIcons[activeTeam.logo as keyof typeof LucideIcons] as FC<{
        className?: string;
      }>)
    : null;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                {ActiveTeamIconComponent && (
                  <ActiveTeamIconComponent className="size-4" />
                )}
              </div>

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {activeTeam.name}
                </span>

                <span className="truncate text-xs">{activeTeam.plan}</span>
              </div>

              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side="bottom"
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Teams
            </DropdownMenuLabel>
            {teams.map((team, index) => {
              const IconComponent = team.logo
                ? (LucideIcons[team.logo as keyof typeof LucideIcons] as FC)
                : null;
              return (
                <DropdownMenuItem
                  key={team.name}
                  onClick={() => setActiveTeam(team)}
                  className="gap-2 p-2"
                >
                  <div className="flex size-6 items-center justify-center rounded-sm border">
                    {IconComponent && <IconComponent />}
                  </div>

                  {team.name}

                  <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                </DropdownMenuItem>
              );
            })}

            <DropdownMenuSeparator />

            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>

              <div className="font-medium text-muted-foreground">Add </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default TeamSwitcher;