import { clsx, type ClassValue } from "clsx";
import { chartTypes } from "@/types";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateTempData = (range: number, chartType: chartTypes) => {
  return Array.from({ length: range }, (_, i) => {
    const date = new Date();
    const startDate = new Date();
    let endDate = new Date();

    if (chartType === "weekly") {
      startDate.setDate(date.getDate() - date.getDay() + i * 7);
      endDate.setDate(startDate.getDate() + 6);
    } else if (chartType === "monthly") {
      startDate.setMonth(date.getMonth() - (range - 1 - i));
      startDate.setDate(1);
      endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
    } else {
      startDate.setDate(date.getDate() - (range - 1 - i));
      endDate = startDate;
    }

    return {
      date:
        chartType === "daily"
          ? startDate.toISOString().split("T")[0]
          : `${startDate.toISOString().split("T")[0]} - ${
              endDate.toISOString().split("T")[0]
            }`,
      daily: Math.floor(Math.random() * 1500),
      weekly: Math.floor(Math.random() * 1500),
      monthly: Math.floor(Math.random() * 1500),
    };
  });
};

export const formatXAxisTick = (value: string, activeChart: string) => {
  const date = new Date(value);
  if (activeChart === "daily") {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  } else if (activeChart === "weekly") {
    const [start, end] = value.split(" - ").map((date) => new Date(date));
    return `${start.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })} - ${end.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })}`;
  } else {
    const [start, end] = value.split(" - ").map((date) => new Date(date));
    const startMonth = start.toLocaleDateString("en-US", { month: "short" });
    const endMonth = end.toLocaleDateString("en-US", { month: "short" });
    return startMonth === endMonth ? startMonth : `${startMonth} - ${endMonth}`;
  }
};

export const formatTooltipLabel = (value: string, activeChart: string) => {
  const [start, end] = value.split(" - ").map((date) => new Date(date));

  if (activeChart === "weekly") {
    return `${start.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })} - ${end.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })}`;
  } else if (activeChart === "monthly") {
    const startMonth = start.toLocaleDateString("en-US", { month: "long" });
    const endMonth = end.toLocaleDateString("en-US", { month: "long" });

    return startMonth === endMonth ? startMonth : `${startMonth} - ${endMonth}`;
  }

  return start.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
