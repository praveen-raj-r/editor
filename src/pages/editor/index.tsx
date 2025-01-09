import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import EditorSidebar from "@/components/editor-layout-components/editor-sidebar";
import { components, sidebarData } from "./editor-components";
import EditorCanvas from "./editor-canvas";
import AppHeader from "@/components/layout-components/app-header";

function Editor() {
  const componentsSidebarWidth = "366px";

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": componentsSidebarWidth,
        } as React.CSSProperties
      }
    >
      <EditorSidebar data={sidebarData.navMain} components={components} />

      <div className="w-full max-h-screen h-screen p-0">
        <SidebarInset className="h-full">
          <div className="sticky top-0 bg-background z-10">
            <AppHeader />
          </div>

          <EditorCanvas components={components} />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

export default Editor;
