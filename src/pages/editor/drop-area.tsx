/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import ReactGridLayout, { WidthProvider } from "react-grid-layout";
import Inspector from "./inspector";

const Layout = WidthProvider(ReactGridLayout);

interface Component {
  name: string;
  props?: Record<string, any>;
  element: React.ReactNode;
  image?: string;
}

interface DropAreaProps {
  components: Component[];
}

function DropArea({ components }: DropAreaProps) {
  const [selectedEditItem, setSelectedEditItem] = useState<number | null>(null);
  const [isInspectorOpen, setInspectorOpen] = useState(false);
  const [dashboardComponents, setDashboardComponents] = useState<any[]>([]);
  const [layout, setLayout] = useState<any[]>([]);

  const handleOnDragOver = (e: React.DragEvent) => e.preventDefault();

  const handleOnDrop = (e: React.DragEvent) => {
    const widgetIndex = e.dataTransfer.getData("widgetIndex");

    if (widgetIndex) {
      const newComponent = components[parseInt(widgetIndex)];
      setDashboardComponents((prevDashboardComponents) => {
        const updatedDashboardComponents = [
          ...prevDashboardComponents,
          newComponent,
        ];

        // Update layout after adding the new component
        setLayout((prevLayout) => {
          const layoutLastElement = prevLayout.at(-1);

          return [
            ...prevLayout,
            {
              i: updatedDashboardComponents.length.toString(),
              x: layoutLastElement ? layoutLastElement.x + 1 : 0,
              y: layoutLastElement ? Math.ceil(layoutLastElement.y / 12) : 0,
              w: 4,
              h: 2,
            },
          ];
        });

        return updatedDashboardComponents;
      });

      setSelectedEditItem(dashboardComponents.length);
      setInspectorOpen(true);
    }
  };

  return (
    <div
      onDragOver={handleOnDragOver}
      onDrop={handleOnDrop}
      className="relative w-full h-full p-3"
    >
      <Layout
        className="w-full layout"
        cols={12}
        layout={layout}
        rowHeight={30}
        onLayoutChange={(newLayout) => setLayout(newLayout)}
      >
        {dashboardComponents.map((e, index) => {
          const ComponentType = e.element.type;

          return (
            <div
              key={index}
              className={`p-3 border-2 min-h-max cursor-move hover:border-dashed hover:border-[#9e9e9e] ${
                index === selectedEditItem
                  ? "border-[#9e9e9e]"
                  : "border-transparent"
              } `}
            >
              <div
                className="w-full h-full cursor-default overflow-hidden"
                onMouseDown={(e) => {
                  e.stopPropagation();
                  setSelectedEditItem((prevSelected) =>
                    prevSelected === index ? null : index
                  );
                }}
              >
                {ComponentType ? (
                  <ComponentType key={e.name} {...e.props} />
                ) : null}
              </div>
            </div>
          );
        })}
      </Layout>

      <Inspector
        dashboardComponents={dashboardComponents}
        selectedEditItem={selectedEditItem}
        setInspectorOpen={setInspectorOpen}
        setSelectedEditItem={setSelectedEditItem}
        setDashboardComponents={setDashboardComponents}
        isInspectorOpen={isInspectorOpen}
        className="fixed top-16 right-10"
      />
    </div>
  );
}

export default DropArea;
