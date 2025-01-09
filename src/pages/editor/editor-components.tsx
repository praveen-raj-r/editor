/* eslint-disable @typescript-eslint/no-explicit-any */
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
    props: ["content", "color", "size", "weight"],
    element: <div>Donut chart</div>,
  },
  {
    name: "Bar chart",
    props: ["content", "color", "size", "weight"],
    element: <div>Bar chart</div>,
  },
  {
    name: "Table",
    props: ["content", "color", "size", "weight"],
    element: <div>Table</div>,
  },
  {
    name: "Info cards",
    props: ["content", "color", "size", "weight"],
    element: <div>Info cards</div>,
  },
  {
    name: "Label",
    props: ["content", "color", "size", "weight"],
    element: <div>Label</div>,
  },
  {
    name: "Performance tracker",
    props: ["content", "color", "size", "weight"],
    element: <div>Performance tracker</div>,
  },
  {
    name: "Tabbed Container",
    props: ["content", "color", "size", "weight"],
    element: <div>Tabbed Container</div>,
  },
  {
    name: "Stat Card",
    props: ["content", "color", "size", "weight"],
    element: <div>Stat Card</div>,
  },
];

components.forEach((component) => {
  component.image = componentImages[component.name];
});

export { components, data as sidebarData };
