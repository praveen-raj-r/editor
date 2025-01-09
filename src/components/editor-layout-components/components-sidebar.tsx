/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
} from "@/components/ui/sidebar";
import DraggableSidebarItem from "./draggable-sidebar-item";
import { DragEvent } from "react";

interface Component {
  name: string;
  props?: Record<string, any>;
  element: React.ReactNode;
  image?: string;
}

interface ComponentsSidebarProps {
  components: Component[];
}

const ComponentsSidebar = ({ components }: ComponentsSidebarProps) => {
  const handleOnDrag = (e: DragEvent<HTMLDivElement>, i: number) => {
    e.dataTransfer.setData("widgetIndex", i.toString());
  };

  return (
    <Sidebar collapsible="none" className="flex-1 hidden md:flex">
      <SidebarHeader className="gap-3.5 border-b p-4">
        <SidebarInput
          className=" placeholder:text-[#b3b3b3]"
          placeholder="Search components"
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <div className="grid grid-cols-3 2xl:grid-cols-4 2xl:gap-x-2 2xl:gap-y-2">
              {components.map((item, index) => (
                <div
                  key={index}
                  draggable
                  onDragStart={(e) => handleOnDrag(e, index)}
                  className={`font-sans text-black bg-transparent mb-2 p-2 cursor-move`}
                >
                  <DraggableSidebarItem item={item} />
                </div>
              ))}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default ComponentsSidebar;
