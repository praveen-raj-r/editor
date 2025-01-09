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
  { name: "Donut chart", props: {}, element: <div>Donut chart</div> },
  { name: "Bar chart", props: {}, element: <div>Bar chart</div> },
  { name: "Table", props: {}, element: <div>Table</div> },
  { name: "Info cards", props: {}, element: <div>Info cards</div> },
  { name: "Label", props: {}, element: <div>Label</div> },
  {
    name: "Performance tracker",
    props: {},
    element: <div>Performance tracker</div>,
  },
  { name: "Tabbed Container", props: {}, element: <div>Tabbed Container</div> },
  { name: "Stat Card", props: {}, element: <div>Stat Card</div> },
];

components.forEach((component) => {
  component.image = componentImages[component.name];
});

export { components, data as sidebarData };
