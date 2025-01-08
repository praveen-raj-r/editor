/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SquareMousePointer, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Component {
  name: string;
  props?: Record<string, any>;
  element: React.ReactNode;
  image?: string;
}

interface InspectorProps {
  className: string;
  dashboardComponents: Component[];
  setSelectedEditItem: React.Dispatch<React.SetStateAction<number | null>>;
  setDashboardComponents: React.Dispatch<React.SetStateAction<Component[]>>;
  selectedEditItem: number | null;
  setInspectorOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isInspectorOpen: boolean;
}

function Inspector({
  className,
  dashboardComponents,
  setSelectedEditItem,
  setDashboardComponents,
  selectedEditItem,
  setInspectorOpen,
  isInspectorOpen,
}: InspectorProps) {
  const handleDelete = (index: number) => {
    setDashboardComponents(dashboardComponents.filter((_, i) => i !== index));
    setSelectedEditItem(null);
    setInspectorOpen(false);
  };

  return dashboardComponents.length
    ? selectedEditItem != null && (
        <div className={`${className}`}>
          <Popover open={isInspectorOpen}>
            <PopoverTrigger>
              <div
                className="rounded-full size-10 flex justify-center items-center bg-[#ffffff]"
                onClick={() => {
                  setInspectorOpen(!isInspectorOpen);
                }}
              >
                <SquareMousePointer strokeWidth={2} stroke="#000" size={20} />
              </div>
            </PopoverTrigger>

            <PopoverContent className="mt-2 mr-4 w-80">
              <div className="grid gap-4">
                <div className="flex justify-between">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Inspector</h4>
                    <h4 className="font-medium leading-none">Dimensions</h4>

                    <p className="text-sm text-muted-foreground">
                      {dashboardComponents[selectedEditItem]?.name}
                      {" - "}
                      Set the dimensions for the layer.
                    </p>
                  </div>
                  {selectedEditItem != null && (
                    <Button
                      onClick={() => {
                        handleDelete(selectedEditItem);
                      }}
                      variant="destructive"
                      size="icon"
                    >
                      <Trash />
                    </Button>
                  )}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      )
    : null;
}

export default Inspector;
