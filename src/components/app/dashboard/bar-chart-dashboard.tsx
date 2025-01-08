import { chartTypes } from "@/types";
import { FC, useMemo, useState } from "react";
import { Clock } from "lucide-react";
import { CHARTS_TYPES_ARRAY } from "@/lib/constants";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  formatTooltipLabel,
  formatXAxisTick,
  generateTempData,
} from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const chartConfig = {
  weight: {
    label: "Total Weight",
  },
  daily: {
    label: "Daily",
    color: "hsl(var(--chart-1))",
  },
  weekly: {
    label: "Weekly",
    color: "hsl(var(--chart-2))",
  },
  monthly: {
    label: "Monthly",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

const BarChartDashboard: FC = () => {
  const [activeChart, setActiveChart] = useState<chartTypes>("daily");

  const chartData = useMemo(() => {
    const dataRange = { daily: 90, weekly: 52, monthly: 12 };
    return generateTempData(dataRange[activeChart], activeChart);
  }, [activeChart]);

  const total = useMemo(
    () => ({
      daily: chartData.reduce((acc, curr) => acc + curr.daily, 0),
      weekly: chartData.reduce((acc, curr) => acc + curr.weekly, 0),
      monthly: chartData.reduce((acc, curr) => acc + curr.monthly, 0),
    }),
    [chartData]
  );

  const fetchedDate = useMemo(() => {
    const formatDate = (date: Date, options: Intl.DateTimeFormatOptions) =>
      date.toLocaleDateString("en-GB", options);

    const formatDateConst: Intl.DateTimeFormatOptions = {
      month: "short",
      year: "numeric",
    };

    const endDate = formatDate(new Date(), {
      day: "2-digit",
      ...formatDateConst,
    });

    if (activeChart === "monthly") {
      const formatMonth = (monthOffset: number): string =>
        formatDate(new Date(new Date().setMonth(monthOffset)), formatDateConst);

      return `${formatMonth(0)} - ${formatMonth(11)}`;
    }

    const daysOffset = activeChart === "weekly" ? 364 : 89;
    const startDate = formatDate(
      new Date(Date.now() - daysOffset * 24 * 60 * 60 * 1000),
      {
        day: "2-digit",
        ...formatDateConst,
      }
    );

    return `${startDate} to ${endDate}`;
  }, [activeChart]);

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 lg:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Bar Chart - Live</CardTitle>

          <CardDescription>
            Showing total data for the last{" "}
            {activeChart === "daily"
              ? "90 Days"
              : activeChart === "weekly"
              ? "52 Weeks"
              : "12 Months"}
            <div className="mt-2">
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger className="flex items-center border rounded-[7px] p-1">
                    <Clock className="h-4" /> <span>{fetchedDate}</span>
                  </TooltipTrigger>

                  <TooltipContent className="dark:bg-white dark:text-black text-white bg-black font-semibold">
                    <p>View overview for fetched period</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardDescription>
        </div>

        <div className="flex">
          {CHARTS_TYPES_ARRAY.map((key) => (
            <button
              key={key}
              data-active={activeChart === key}
              className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
              onClick={() => setActiveChart(key as chartTypes)}
            >
              <span className="text-xs">
                {chartConfig[key as keyof typeof chartConfig].label}
              </span>
              <span className="text-lg font-bold leading-none sm:text-3xl">
                {total[key as keyof typeof total].toLocaleString()}
              </span>
            </button>
          ))}
        </div>
      </CardHeader>

      <CardContent className="px-2 pt-10 sm:px-6 sm:pt-6 pl-0 sm:pl-0">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                return formatXAxisTick(value, activeChart);
              }}
            />
            <YAxis
              dataKey={activeChart}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={1}
              tickFormatter={(value) => {
                return value;
              }}
            />

            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="weight"
                  labelFormatter={(value) => {
                    return formatTooltipLabel(value, activeChart);
                  }}
                />
              }
            />
            <Bar
              radius={10}
              dataKey={activeChart}
              fill={`var(--color-${activeChart})`}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default BarChartDashboard;
