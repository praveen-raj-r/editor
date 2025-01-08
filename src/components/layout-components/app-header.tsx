import { SidebarTrigger } from "@/components/ui/sidebar";
import { FC } from "react";
import ThemeToggle from "./theme-toggle";
import ProfileDropdown from "./profile-dropdown";
import NotificationsSheet from "./notifications-sheet";
import AnimatedGradientText from "../ui/animated-gradient-text";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";

const AppHeader: FC = () => {
  const { pathname } = useLocation();
  const isNotEditor = pathname !== "/editor";

  return (
    <header
      className={`flex justify-center items-center border-b h-16 gap-1 sm:gap-2 transition-[width,height] ease-linear ${
        isNotEditor
          ? "group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
          : ""
      }`}
    >
      <div className="flex items-center w-full justify-between gap-2 px-4">
        <SidebarTrigger className="-ml-1" />

        <div className="px-1 sm:px-4 flex items-center gap-2">
          {isNotEditor ? (
            <Link to="/editor">
              <AnimatedGradientText>
                🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />{" "}
                <span
                  className={cn(
                    `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
                  )}
                >
                  Introducing Macro Editor
                </span>
                <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
              </AnimatedGradientText>
            </Link>
          ) : (
            <Link to="/app/dashboard">
              <Button variant="secondary" size="sm">
                Back to App
              </Button>
            </Link>
          )}

          {isNotEditor && <NotificationsSheet />}

          <ThemeToggle />

          {isNotEditor && <ProfileDropdown />}
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
