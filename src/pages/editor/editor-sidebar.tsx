/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Sidebar } from "@/components/ui/sidebar";
import PrimarySidebar from "./primary-sidebar";
import ComponentsSidebar from "./components-sidebar";
import { navMain as data } from "@/data/editor/sidebar.json";

interface Component {
  name: string;
  props?: Record<string, any>;
  element: React.ReactNode;
  image?: string;
}

interface EditorSidebarProps {
  components: Component[];
}

function EditorSidebar({ components }: EditorSidebarProps) {
  // Note: I'm using state to show active item.
  // IRL you should use the url/router.
  const [activeItem, setActiveItem] = useState(data[0]);

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row"
    >
      <PrimarySidebar activeItem={activeItem} setActiveItem={setActiveItem} />

      <ComponentsSidebar components={components} />
    </Sidebar>
  );
}
export default EditorSidebar;
