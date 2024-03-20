import React from "react";
import { Button } from "../ui/button";
import {
  ArrowRightFromLine,
  Disc,
  Info,
  RectangleHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  pinType: any;
  setPinType: any;
};

const iconClass = "cursor-pointer w-[20px]";

function PinTypeSelect({ setPinType, pinType }: Props) {
  return (
    <div className="absolute right-1/2 translate-x-1/2 top-1 bg-zinc-100 z-10 border border-zinc-400 rounded px-2">
      <div className="flex flex-row p-1 gap-4">
        <ArrowRightFromLine
          className={cn(
            iconClass,
            pinType === "section" ? "text-zinc-900" : "text-gray-500"
          )}
          onClick={() => setPinType("section")}
        />
        <RectangleHorizontal
          className={cn(
            iconClass,
            pinType === "rectangle" ? "text-zinc-900" : "text-gray-500"
          )}
          onClick={() => setPinType("rectangle")}
        />
        <Info
          className={cn(
            iconClass,
            pinType === "detail" ? "text-zinc-900" : "text-gray-500"
          )}
          onClick={() => setPinType("detail")}
        />
      </div>
    </div>
  );
}

export default PinTypeSelect;
