/* eslint-disable @typescript-eslint/no-explicit-any */
import DropArea from "@/components/editor-layout-components/drop-area";
import OpenInspectorButton from "@/components/editor-layout-components/open-inspector-button";
import DotPattern from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Inspector from "@/components/editor-layout-components/inspector";

interface Component {
  name: string;
  props?: Record<string, any>;
  element: React.ReactNode;
  image?: string;
}

interface EditorCanvasProps {
  components: Component[];
}

const EditorCanvas = ({ components }: EditorCanvasProps) => {
  const [isInspectorOpen, setInspectorOpen] = useState(true);
  const [selectedEditItem, setSelectedEditItem] = useState<number | null>(null);
  const [dashboardComponents, setDashboardComponents] = useState<Component[]>(
    []
  );

  return (
    <div className="max-h-[calc(100%-64px)] h-full">
      <div className="flex h-full w-full">
        <div className="w-full relative h-full">
          {/* Design Background */}
          <DotPattern
            className={cn(
              "[mask-image:radial-gradient(10000px_circle_at_center,white,transparent)]"
            )}
          />

          <DropArea
            dashboardComponents={dashboardComponents}
            setDashboardComponents={setDashboardComponents}
            selectedEditItem={selectedEditItem}
            setSelectedEditItem={setSelectedEditItem}
            isInspectorOpen={isInspectorOpen}
            setInspectorOpen={setInspectorOpen}
            components={components}
          />

          {!isInspectorOpen && (
            <OpenInspectorButton setInspectorOpen={setInspectorOpen} />
          )}
        </div>

        {isInspectorOpen && (
          <Inspector
            setDashboardComponents={setDashboardComponents}
            setSelectedEditItem={setSelectedEditItem}
            dashboardComponents={dashboardComponents}
            selectedEditItem={selectedEditItem}
            setInspectorOpen={setInspectorOpen}
          />
        )}
      </div>
    </div>
  );
};

export default EditorCanvas;
