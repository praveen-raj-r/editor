import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { RgbaColorPicker } from "react-colorful";
const frameworks = [
  {
    value: "primary",
    colorCode: "3170f9",
    label: "Primary",
  },
  {
    value: "success",
    colorCode: "059669",
    label: "Success",
  },
  {
    value: "warning",
    colorCode: "cd6f00",
    label: "Warning",
  },
  {
    value: "danger",
    colorCode: "dc2626",
    label: "Danger",
  },
  {
    value: "info",
    colorCode: "3170f9",
    label: "Info",
  },
  {
    value: "highlight",
    colorCode: "fde68a",
    label: "Highlight",
  },
  {
    value: "canvas",
    colorCode: "f6f6f6",
    label: "Canvas",
  },
  {
    value: "primarySurface",
    colorCode: "ffffff",
    label: "Primary Surface",
  },
  {
    value: "secondarySurface",
    colorCode: "ffffff",
    label: "Secondary Surface",
  },
];
const Color = () => {
  const [value, setValue] = useState("");
  const [color, setColor] = useState({ r: 200, g: 150, b: 35, a: 0.5 });

  return (
    <div>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Label className="text-[12px]">Color</Label>
        <div className="flex items-center gap-3">
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger>
                <Badge>T</Badge>
              </TooltipTrigger>
              <TooltipContent side="left" className="bg-black dark:bg-white">
                <p className=" text-white dark:text-black max-w-56">
                  This color will change automatically to remain readable
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Popover>
            <PopoverTrigger>
              <Badge>Contrast Text</Badge>
            </PopoverTrigger>
            <PopoverContent className="w-[270px] p-0">
              <div>
                <Tabs defaultValue="account" className="">
                  <TabsList className="w-full flex justify-start">
                    <TabsTrigger value="account">Custom</TabsTrigger>
                    <TabsTrigger value="password">Tokens</TabsTrigger>
                  </TabsList>
                  <TabsContent className="mt-0" value="account">
                    <RgbaColorPicker color={color} onChange={setColor} />
                  </TabsContent>
                  <TabsContent className="mt-0" value="password">
                    <Command>
                      <CommandInput placeholder="Search" />
                      <CommandList>
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                          {frameworks.map((framework) => (
                            <CommandItem
                              className={` justify-between ${
                                value === framework.value ? "bg-blue-500" : ""
                              }`}
                              key={framework.value}
                              value={framework.value}
                              onSelect={(currentValue) => {
                                setValue(
                                  currentValue === value ? "" : currentValue
                                );
                              }}
                            >
                              <div className="flex items-center">
                                <span
                                  style={{
                                    backgroundColor: `#${framework.colorCode}`,
                                  }}
                                  className={`mr-2 size-4 border rounded`}
                                />
                                <span className="text-[12px]">
                                  {framework.label}
                                </span>
                              </div>
                              <span className=" uppercase font-mono">
                                {framework.colorCode}
                              </span>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </TabsContent>
                </Tabs>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default Color;
