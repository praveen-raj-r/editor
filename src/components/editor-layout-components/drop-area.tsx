/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dispatch,
  DragEvent,
  isValidElement,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import ReactGridLayout, { WidthProvider } from "react-grid-layout";

const Layout = WidthProvider(ReactGridLayout);

interface Component {
  name: string;
  props?: Record<string, any>;
  element: ReactNode;
  image?: string;
}

interface DropAreaProps {
  components: Component[];
  isInspectorOpen: boolean;
  setInspectorOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedEditItem: Dispatch<React.SetStateAction<number | null>>;
  selectedEditItem: number | null;
  dashboardComponents: Component[];
  setDashboardComponents: React.Dispatch<React.SetStateAction<Component[]>>;
}

function DropArea({
  components,
  setInspectorOpen,
  setSelectedEditItem,
  selectedEditItem,
  setDashboardComponents,
  dashboardComponents,
}: DropAreaProps) {
  const [layout, setLayout] = useState<any[]>([]);

  const handleOnDragOver = (e: DragEvent) => e.preventDefault();

  const handleOnDrop = (e: DragEvent) => {
    e.preventDefault();
    const widgetIndex = parseInt(e.dataTransfer.getData("widgetIndex"));

    if (!isNaN(widgetIndex)) {
      setDashboardComponents([...dashboardComponents, components[widgetIndex]]);

      const layoutLastElement = layout.at(-1);

      setLayout([
        ...layout,
        {
          i: dashboardComponents.length.toString(),
          x: layoutLastElement ? layoutLastElement.x + 1 : 0,
          y: layoutLastElement ? Math.ceil(layoutLastElement.y / 12) : 0,
          w: 4,
          h: 2,
        },
      ]);
    }
    setSelectedEditItem(dashboardComponents.length);
    setInspectorOpen(true);
  };

  return (
    <div className="size-full p-5">
      <div className="bg-[#f6f6f6] dark:bg-[#1a1919] relative size-full p-3 border-[#3b82f6] border">
        <div
          onDragOver={handleOnDragOver}
          onDrop={handleOnDrop}
          className="relative w-full h-full p-3 flex gap-1"
        >
          <Layout
            className="layout border w-full border-[#3b82f6] min-h-96 py-2 px-3"
            cols={12}
            layout={layout}
            rowHeight={30}
            onLayoutChange={(newLayout) => setLayout(newLayout)}
          >
            {dashboardComponents.map((e, index) => {
              const ComponentType = isValidElement(e.element)
                ? e.element.type
                : null;

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
                    {ComponentType ? <ComponentType key={index} /> : null}
                  </div>
                </div>
              );
            })}
          </Layout>
        </div>
      </div>
    </div>
  );
}

export default DropArea;
