import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useMoveBack } from "@/hooks/use-move-back";
import { FC } from "react";

const PageNotFound: FC = () => {
  const moveBack = useMoveBack();

  return (
    <div className="h-screen w-screen">
      <div className="flex flex-col gap-5 justify-center items-center h-full">
        <div className="flex items-center gap-5">
          <span className="text-white text-2xl">404</span>
          <Separator className="h-12" orientation="vertical" />
          <p className="text-base">This page could not be found.</p>
        </div>

        <Button onClick={moveBack} variant="destructive" size="sm">
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default PageNotFound;
