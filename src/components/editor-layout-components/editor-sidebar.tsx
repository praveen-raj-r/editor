/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Sidebar } from "@/components/ui/sidebar";
import PrimarySidebar from "./primary-sidebar";
import ComponentsSidebar from "./components-sidebar";

interface Component {
  name: string;
  props?: Record<string, any>;
  element: React.ReactNode;
  image?: string;
}

interface EditorSidebarProps {
  components: Component[];
  data: {
    title: string;
    url: string;
    icon: string;
    isActive: boolean;
  }[];
}

function EditorSidebar({ components, data }: EditorSidebarProps) {
  const [activeItem, setActiveItem] = useState(data[0]);

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row"
    >
      <PrimarySidebar
        data={data}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      />

      <ComponentsSidebar components={components} />
    </Sidebar>
  );
}
export default EditorSidebar;
