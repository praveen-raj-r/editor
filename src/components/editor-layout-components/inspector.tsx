/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChevronsRight, Copy, Trash } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import PropertiesDropdown from "./properties-dropdown";

interface InspectorProps {
  setInspectorOpen: Dispatch<SetStateAction<boolean>>;
  selectedEditItem: number | null;
  dashboardComponents: any[];
  setSelectedEditItem: React.Dispatch<React.SetStateAction<number | null>>;
  setDashboardComponents: React.Dispatch<React.SetStateAction<any[]>>;
}

const Inspector = ({
  setInspectorOpen,
  selectedEditItem,
  dashboardComponents,
  setSelectedEditItem,
  setDashboardComponents,
}: InspectorProps) => {
  const handleDelete = (index: number | null) => {
    if (index !== null) {
      setDashboardComponents(dashboardComponents.filter((_, i) => i !== index));
      setSelectedEditItem(null);
      setInspectorOpen(false);
    }
  };

  const selectedComponent =
    selectedEditItem !== null && dashboardComponents[selectedEditItem];

  return (
    <div className="border-l max-w-[320px] w-full h-full bg-white dark:bg-black">
      <div className="flex flex-col">
        <div className="flex justify-between text-black p-2 border-b dark:border-[#5b5b5b6e]">
          {dashboardComponents.length > 0 && selectedEditItem !== null ? (
            <h1 className="text-[13px] font-medium dark:text-[#ffffff6e]">
              {selectedComponent?.name || "Unnamed Component"}
            </h1>
          ) : (
            <h1 className="text-[13px] font-medium dark:text-[#ffffff6e]">
              No components
            </h1>
          )}
          <ChevronsRight
            className="dark:text-white cursor-pointer"
            size={18}
            onClick={() => {
              setInspectorOpen(false);
            }}
          />
        </div>

        <div className="flex flex-col gap-3">
          {selectedComponent ? (
            <>
              <div className="m-[2px]">
                {selectedComponent.props.map((item: string, key: number) => (
                  <PropertiesDropdown
                    item={item}
                    key={`PropertiesDropdown-${key}`}
                  />
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3 px-10 mt-10">
                <Button variant="secondary" size="sm">
                  <Copy /> Duplicate
                </Button>
                <Button
                  onClick={() => {
                    handleDelete(selectedEditItem);
                  }}
                  variant="destructive"
                  size="sm"
                >
                  <Trash /> Delete
                </Button>
              </div>
            </>
          ) : (
            <div className="border dark:border-[#ffffff6e] text-center rounded-sm py-px text-sm dark:text-[#ffffff6e] text-[#4d4a4a] select-none mx-auto p-3 mt-3">
              No components selected
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inspector;
