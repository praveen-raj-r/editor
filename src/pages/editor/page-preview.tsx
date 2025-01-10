import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, ChevronUp, Cog, Home, LogOut, Webhook } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

const PagePreview = () => {
  return (
    <div className="h-screen">
      <div className="h-full flex flex-col">
        <Header />
        <main className="bg-white h-full relative">
          <div className="absolute bottom-4 left-3">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="secondary">
                  <img className="h-5" src="./microbin-white-logo.png" />
                  Microbin
                  <Avatar className="size-6">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <ChevronUp />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <Link to="/app/dashboard">
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Home />
                      Back to Home
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </Link>
                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Webhook />
                    Browse Apps
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <Cog />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem>
                    <Bell />
                    Notifications
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <Link to="/logout">
                  <DropdownMenuItem>
                    <LogOut />
                    Log out
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </main>
      </div>
    </div>
  );
};

const Header = () => {
  return (
    <div className="w-full h-16 bg-black">
      <div className="flex items-center h-full justify-between px-3">
        <div className="flex justify-center">
          <img src="./microbin-full-white.png" />
        </div>
        <div className="flex items-center gap-3">
          <Button size="sm" disabled>
            Publish
          </Button>
          <Link to="/editor">
            <Button
              className="bg-blue-600 hover:bg-blue-900 text-white"
              size="sm"
            >
              Edit app
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default PagePreview;
