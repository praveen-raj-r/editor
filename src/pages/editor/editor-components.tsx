/* eslint-disable @typescript-eslint/no-explicit-any */
import BarChart from "@/components/drag-components/bar-chart";
import DonutChart from "@/components/drag-components/donut-chart";
import InfoCards from "@/components/drag-components/info-cards";
import Label from "@/components/drag-components/label";
import PerformanceTracker from "@/components/drag-components/performance-tracker";
import StatCard from "@/components/drag-components/stat-card";
import TabbedContainer from "@/components/drag-components/tabbed-container";
import Table from "@/components/drag-components/table";
import data from "@/data/editor/sidebar.json";
interface Component {
  name: string;
  props?: Record<string, any>;
  element: React.ReactNode;
  image?: string;
}

// Create a mapping for component images
const componentImages: Record<string, string> = data.components.reduce(
  (acc: Record<string, string>, component: { name: string; image: string }) => {
    acc[component.name] = component.image;
    return acc;
  },
  {}
);

const components: Component[] = [
  {
    name: "Donut chart",
    props: ["content", "apperance", "size", "weight"],
    element: <DonutChart />,
  },
  {
    name: "Bar chart",
    props: ["content", "apperance", "size", "weight"],
    element: <BarChart />,
  },
  {
    name: "Table",
    props: ["content", "apperance", "size", "weight"],
    element: <Table />,
  },
  {
    name: "Info cards",
    props: ["content", "apperance", "size", "weight"],
    element: <InfoCards />,
  },
  {
    name: "Label",
    props: ["content", "apperance", "size", "weight"],
    element: <Label />,
  },
  {
    name: "Performance tracker",
    props: ["content", "apperance", "size", "weight"],
    element: <PerformanceTracker />,
  },
  {
    name: "Tabbed Container",
    props: ["content", "apperance", "size", "weight"],
    element: <TabbedContainer />,
  },
  {
    name: "Stat Card",
    props: ["content", "apperance", "size", "weight"],
    element: <StatCard />,
  },
];

components.forEach((component) => {
  component.image = componentImages[component.name];
});

export { components, data as sidebarData };
