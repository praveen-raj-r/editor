import { ChevronsRight } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface OpenedInspectorProps {
  setInspectorOpen: Dispatch<SetStateAction<boolean>>;
}

const OpenedInspector = ({ setInspectorOpen }: OpenedInspectorProps) => {
  return (
    <div className=" border-l w-[300px] h-full bg-white">
      <div className="flex flex-col">
        <div className="flex justify-between text-black p-2 border-b">
          <h1 className="text-[13px] font-medium">No components </h1>
          <ChevronsRight
            size={18}
            onClick={() => {
              setInspectorOpen(false);
            }}
          />
        </div>

        <div className="p-3">
          <div className="border text-center rounded-sm py-px text-sm text-[#a8a4a4] select-none">
            No components selected
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpenedInspector;
