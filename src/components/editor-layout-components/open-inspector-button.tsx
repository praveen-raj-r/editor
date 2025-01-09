import { ChevronsLeft } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface StateAction {
  setInspectorOpen: Dispatch<SetStateAction<boolean>>;
}

const OpenInspectorButton = ({ setInspectorOpen }: StateAction) => {
  return (
    <button
      onClick={() => {
        setInspectorOpen(true);
      }}
      className="border absolute top-0 right-0 mt-2 mr-1 bg-[#ffffff] rounded-[4px] text-black p-1 shadow-[0_1px_2px_#0000000a,0_4px_12px_#1b19195] py-1 px-2"
    >
      <div className="flex justify-center gap-2 items-center">
        <span className="text-sm">Inspector</span>
        <ChevronsLeft size={18} />
      </div>
    </button>
  );
};

export default OpenInspectorButton;
