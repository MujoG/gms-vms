import React from "react";
import { Button } from "../ui/button";
import { ArrowRightFromLine, Disc, RectangleHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  pinType: any;
  setPinType: any;
};

function PinTypeSelect({ setPinType, pinType }: Props) {
  return (
    <div className="absolute right-5 top-5 bg-zinc-200 z-50 border border-zinc-400 rounded ">
      <div className="flex flex-row p-2  gap-1">
        <Button
          variant="ghost"
          className={cn(
            "",
            pinType === "section" ? "bg-zinc-400" : "bg-transparent"
          )}
          onClick={() => setPinType("section")}
        >
          <ArrowRightFromLine />
        </Button>
        <Button
          variant="ghost"
          className={cn(
            "",
            pinType === "rectangle" ? "bg-zinc-400" : "bg-transparent"
          )}
          onClick={() => setPinType("rectangle")}
        >
          <RectangleHorizontal />
        </Button>
        <Button
          variant="ghost"
          className={cn(
            "",
            pinType === "detail" ? "bg-zinc-400" : "bg-transparent"
          )}
          onClick={() => setPinType("detail")}
        >
          <Disc />
        </Button>
      </div>
    </div>
  );
}

export default PinTypeSelect;
