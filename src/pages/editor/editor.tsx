/* eslint-disable @typescript-eslint/no-explicit-any */
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import EditorSidebar from "./editor-sidebar";
import AppHeader from "@/components/layout-components/app-header";
import { ScrollArea } from "@/components/ui/scroll-area";
import DotPattern from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import DropArea from "./drop-area";
import data from "@/data/editor/components.json";

interface Component {
  name: string;
  props?: Record<string, any>;
  element: React.ReactNode;
  image?: string;
}

// Create a mapping for component images
const componentImages: Record<string, string> = data.components.reduce(
  (acc: Record<string, string>, component: { name: string; image: string }) => {
    acc[component.name] = component.image;
    return acc;
  },
  {}
);

const components: Component[] = [
  { name: "Donut chart", props: {}, element: <div>Donut chart</div> },
  { name: "Bar chart", props: {}, element: <div>Bar chart</div> },
  { name: "Table", props: {}, element: <div>Table</div> },
  { name: "Info cards", props: {}, element: <div>Info cards</div> },
  { name: "Label", props: {}, element: <div>Label</div> },
  {
    name: "Performance tracker",
    props: {},
    element: <div>Performance tracker</div>,
  },
  { name: "Tabbed Container", props: {}, element: <div>Tabbed Container</div> },
  { name: "Stat Card", props: {}, element: <div>Stat Card</div> },
];

components.forEach((component) => {
  component.image = componentImages[component.name];
});

export default function Editor() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "366px",
        } as React.CSSProperties
      }
    >
      <EditorSidebar components={components} />

      <div className="w-full max-h-screen h-screen p-0">
        <SidebarInset className="h-full">
          <div className="sticky top-0 bg-background z-10">
            <AppHeader />
          </div>

          <ScrollArea>
            <main className="h-full">
              <div className="relative flex h-[calc(100vh-64px)] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background md:shadow-xl">
                <DotPattern
                  className={cn(
                    "[mask-image:radial-gradient(1000px_circle_at_center,white,transparent)]"
                  )}
                />
                <div className="bg-[#f3f2f2] dark:bg-[#1a1919] relative h-[calc(100%-48px)] w-[calc(100%-48px)] border border-[#1b63ff]">
                  <DropArea components={components} />
                </div>
              </div>
            </main>
          </ScrollArea>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
