import { FC } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout-components/app-sidebar";
import AppHeader from "@/components/layout-components/app-header";
import { Outlet } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";

const AppLayout: FC = () => {
  return (
    <SidebarProvider>
      <AppSidebar />

      <div className="w-full max-h-screen p-0">
        <SidebarInset className="min-h-[calc(100vh-16px)] max-h-[calc(100vh-16px)] h-[calc(100vh-16px)]">
          <div className="sticky top-0 bg-background z-10">
            <AppHeader />
          </div>

          <ScrollArea>
            <main className="flex flex-col p-2 pb-0">
              <Outlet />
            </main>
          </ScrollArea>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
