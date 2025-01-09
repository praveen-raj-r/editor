/* eslint-disable @typescript-eslint/no-explicit-any */
import DropArea from "@/components/editor-layout-components/drop-area";
import OpenInspectorButton from "@/components/editor-layout-components/open-inspector-button";
import OpenedInspector from "@/components/editor-layout-components/opened-inspector";
import DotPattern from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import { useState } from "react";

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
  const [isInspectorOpen, setInspectorOpen] = useState(false);
  return (
    <div className="max-h-[calc(100%-64px)] h-full">
      <div className="flex h-full w-full">
        <div className="w-full relative h-full">
          <DotPattern
            className={cn(
              "[mask-image:radial-gradient(1000px_circle_at_center,white,transparent)]"
            )}
          />
          <div className="size-full p-5">
            <div className="bg-[#f3f2f2] dark:bg-[#1a1919] relative size-full p-3 border-[#3b82f6] border">
              <DropArea
                isInspectorOpen={isInspectorOpen}
                setInspectorOpen={setInspectorOpen}
                components={components}
              />
            </div>
          </div>
          {!isInspectorOpen && (
            <OpenInspectorButton setInspectorOpen={setInspectorOpen} />
          )}
        </div>
        {isInspectorOpen && (
          <OpenedInspector setInspectorOpen={setInspectorOpen} />
        )}
      </div>
    </div>
  );
};

export default EditorCanvas;
