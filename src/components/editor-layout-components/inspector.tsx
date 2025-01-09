/* eslint-disable @typescript-eslint/no-explicit-any */

import { SquareMousePointer } from "lucide-react";

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
  selectedEditItem,
  setInspectorOpen,
  isInspectorOpen,
}: InspectorProps) {
  return dashboardComponents.length
    ? selectedEditItem != null && (
        <div className={`${className}`}>
          <div
            className="rounded flex justify-center text-[13px] gap-3 p-1 items-center text-black bg-[#f8f2f2] border border-[#bdb1b1]"
            onClick={() => {
              setInspectorOpen(!isInspectorOpen);
            }}
          >
            Inspector
            <SquareMousePointer strokeWidth={1} stroke="#000" size={16} />
          </div>
        </div>
      )
    : null;
}

export default Inspector;
