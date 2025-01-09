interface DraggableSidebarItemProps {
  item: {
    name: string;
    image?: string;
  };
}

const DraggableSidebarItem = ({ item }: DraggableSidebarItemProps) => {
  return (
    <div className="flex items-center relative max-w-[72px] flex-col">
      <div className="cursor-grab bg-[#f9f9f9] rounded-[4px] transform rotate-0 border h-[56px] relative w-full transition-[0.15s] ease-in-out will-change-transform hover:z-[1] border-[#d4cccc] hover:border-[#000000]">
        <img src={item.image} className="object-none w-full h-full" />
      </div>
      <div className="text-[10px] font-medium leading-[12px] mt-1 mb-0 mx-[-2px] text-center text-[#808080]">
        {item.name}
      </div>
    </div>
  );
};

export default DraggableSidebarItem;
