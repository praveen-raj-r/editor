/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction, useState } from "react";
import ReactGridLayout, { WidthProvider } from "react-grid-layout";
// import Inspector from "@/components/editor-layout-components/inspector";
// import InspectorPoc from "./inspector-poc";

const Layout = WidthProvider(ReactGridLayout);

interface Component {
  name: string;
  props?: Record<string, any>;
  element: React.ReactNode;
  image?: string;
}

interface DropAreaProps {
  components: Component[];
  isInspectorOpen: boolean;
  setInspectorOpen: Dispatch<SetStateAction<boolean>>;
}

function DropArea({ components, setInspectorOpen }: DropAreaProps) {
  const [selectedEditItem, setSelectedEditItem] = useState<number | null>(null);

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
      className="relative w-full h-full p-3 flex gap-1"
    >
      <Layout
        className=" layout border w-full border-[#3b82f6]  min-h-96 py-2 px-3"
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
              className={` py-2 px-3 hover:border-2 bg-red-400 border-1 min-h-max cursor-move hover:border-dashed hover:border-[#3b82f6] ${
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

      {/* <Inspector
        dashboardComponents={dashboardComponents}
        selectedEditItem={selectedEditItem}
        setInspectorOpen={setInspectorOpen}
        setSelectedEditItem={setSelectedEditItem}
        setDashboardComponents={setDashboardComponents}
        isInspectorOpen={isInspectorOpen}
        className="w-auto"
      /> */}
    </div>
  );
}

export default DropArea;
