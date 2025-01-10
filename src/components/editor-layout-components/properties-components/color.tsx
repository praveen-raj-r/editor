import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { rgbaObjectToHex } from "@/lib/utils";
import { useState } from "react";
import { RgbaColorPicker } from "react-colorful";

const Color = () => {
  const [color, setColor] = useState({ r: 200, g: 150, b: 35, a: 0.5 });

  return (
    <div className="flex w-full max-w-sm gap-10 items-center">
      <Label className="text-[12px]">Color</Label>
      <div className="flex items-center">
        <Popover>
          <PopoverTrigger>
            <div
              style={{
                backgroundColor: rgbaObjectToHex(color),
              }}
              className="mr-2 size-5 border rounded flex justify-center items-center text-sm"
            ></div>
          </PopoverTrigger>

          <PopoverContent className="w-[270px] p-0">
            <RgbaColorPicker color={color} onChange={setColor} />
          </PopoverContent>
        </Popover>
        <div className=" text-[12px] uppercase font-mono">
          {rgbaObjectToHex(color)}
        </div>
      </div>
    </div>
  );
};

export default Color;
