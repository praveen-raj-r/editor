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
import { ScrollArea } from "../ui/scroll-area";

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
    <div className="size-full p-5 min-w-[990px]">
      <div className="bg-[#f6f6f6] dark:bg-[#1a1919] relative size-full border-[#3b82f6] border">
        <div
          onDragOver={handleOnDragOver}
          onDrop={handleOnDrop}
          className="relative w-full h-full flex gap-1"
        >
          <ScrollArea className="w-full">
            <Layout
              className="layout w-full min-h-[calc(100vh-106px)] h-full py-2 px-3"
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
                    className={` py-2 px-3 hover:border-1 border-white border min-h-max cursor-move hover:border-dashed hover:border-[#ce79ce] ${
                      index === selectedEditItem
                        ? " !border-[#3b82f6] border-[1.5]"
                        : "border-transparent"
                    } `}
                    onClick={(e) => {
                      e.stopPropagation();
                      // setSelectedEditItem((prevSelected) =>
                      //   prevSelected === index ? null : index
                      // );
                      setSelectedEditItem(index);
                    }}
                  >
                    <div className="w-full cursor-default overflow-hidden">
                      {ComponentType ? <ComponentType key={index} /> : null}
                    </div>
                  </div>
                );
              })}
            </Layout>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}

export default DropArea;
