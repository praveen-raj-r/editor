import { Button } from "@/components/ui/button";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FC, useState } from "react";
import { Line, LineChart } from "recharts";

function generateTempData() {
  const shifts = ["shiftA", "shiftB", "shiftC"];
  const tempData = Array.from({ length: 7 }, () => {
    const entry: { [key: string]: number } = {};
    shifts.forEach((shift) => {
      entry[shift] = Math.floor(Math.random() * 1000);
    });
    return entry;
  });
  return tempData;
}

const chartConfig = {
  shiftA: {
    label: "Shift A",
    color: "hsl(var(--chart-1))",
  },
  shiftB: {
    label: "Shift B",
    color: "hsl(var(--chart-2))",
  },
  shiftC: {
    label: "Shift C",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

const AveragesChart: FC = () => {
  const [activeChart, setActiveChart] = useState("averageCycleTime");

  let data = generateTempData();

  function handleButtonClick(filter: string) {
    data = generateTempData();
    setActiveChart(filter);
  }

  const filters = [
    { label: "Average Cycle time", key: "averageCycleTime" },
    { label: "Average Tonnes / Trips", key: "averageTonnesPerTrips" },
    { label: "Tonnes", key: "tonnes" },
    { label: "Tonnes / hr", key: "tonnesPerHr" },
    { label: "Trips", key: "trips" },
  ];

  return (
    <div className="flex lg:flex-row flex-col">
      <div className="border-r w-full md:w-48 hidden gap-2 md:flex-col p-3 lg:flex">
        {filters.map((filter, key) => (
          <Button
            onClick={() => {
              handleButtonClick(filter.key);
            }}
            key={`filterButtons-${key}`}
            variant={activeChart === filter.key ? "default" : "ghost"}
          >
            {filter.label}
          </Button>
        ))}
      </div>
      <div className="w-full block lg:hidden">
        <Select value={activeChart} onValueChange={setActiveChart}>
          <SelectTrigger
            className="w-[200px] rounded-lg mt-2 ml-3"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            {filters.map((filter, key) => (
              <SelectItem
                key={`filtersDropdown-${key}`}
                value={filter.key}
                className="rounded-lg"
              >
                {filter.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="w-full">
        <ChartContainer
          config={chartConfig}
          className="md:w-[calc(100%-20px)] w-[calc(100vw-20px)] h-[256px] mx-auto p-3"
        >
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              top: 5,
              right: 10,
              left: 10,
              bottom: 0,
            }}
          >
            <Line
              type="monotone"
              strokeWidth={2}
              dataKey="shiftA"
              stroke="var(--color-shiftA)"
              activeDot={{
                r: 6,
                fill: "var(--color-shiftA)",
              }}
            />
            <Line
              type="monotone"
              dataKey="shiftB"
              strokeWidth={2}
              stroke="var(--color-shiftB)"
              activeDot={{
                r: 8,
                style: { fill: "var(--color-shiftB)" },
              }}
            />
            <Line
              type="monotone"
              dataKey="shiftC"
              strokeWidth={2}
              stroke="var(--color-shiftC)"
              activeDot={{
                r: 8,
                style: { fill: "var(--color-shiftC)" },
              }}
            />
            {/* <XAxis tickLine={false} axisLine={false} tickMargin={8} /> */}
            <ChartTooltip content={<ChartTooltipContent />} />
          </LineChart>
        </ChartContainer>
      </div>
    </div>
  );
};

export default AveragesChart;
