import { cn } from "@/lib/utils";
import {
  Fullscreen,
  Shrink,
  Unlock,
  ZoomIn,
  ZoomOut,
  Lock,
  Hand,
  Grab,
  ArrowRightFromLine,
  RectangleHorizontal,
  Info,
} from "lucide-react";
import React from "react";
import { Separator } from "../ui/separator";

type Props = {
  zoomHandler: any;
  fullScreen: any;
  setFullScreen: any;
  lockView: any;
  setLockView: any;
  setDragging: any;
  dragging: any;
  pinType: any;
  setPinType: any;
};

const iconClass = "cursor-pointer w-[20px] text-gray-500";

function ControlSelect({
  zoomHandler,
  setFullScreen,
  fullScreen,
  setLockView,
  lockView,
  setDragging,
  dragging,
  setPinType,
  pinType,
}: Props) {
  return (
    <div className="absolute right-1/2 translate-x-1/2 top-2 bg-zinc-100 z-10 border border-zinc-400 rounded px-2">
      <div className="flex flex-row p-1 gap-2 items-center">
        <div className="relative">
          <ArrowRightFromLine
            className={cn(
              iconClass,
              pinType === "section" ? "text-zinc-900" : "text-gray-500"
            )}
            onClick={() => setPinType("section")}
          />{" "}
          <span
            className={cn(
              "text-[7px] absolute -bottom-1 -right-1",
              pinType === "section" ? "text-zinc-900" : "text-gray-500"
            )}
          >
            1
          </span>
        </div>
        <div className="w-[1px] bg-zinc-200 h-[20px]" />

        <div className="relative">
          <RectangleHorizontal
            className={cn(
              iconClass,
              pinType === "rectangle" ? "text-zinc-900" : "text-gray-500"
            )}
            onClick={() => setPinType("rectangle")}
          />{" "}
          <span
            className={cn(
              "text-[7px] absolute -bottom-1 -right-1",
              pinType === "section" ? "text-zinc-900" : "text-gray-500"
            )}
          >
            2
          </span>
        </div>
        <div className="w-[1px] bg-zinc-200 h-[20px]" />

        <div className="relative">
          <Info
            className={cn(
              iconClass,
              pinType === "detail" ? "text-zinc-900" : "text-gray-500"
            )}
            onClick={() => setPinType("detail")}
          />{" "}
          <span
            className={cn(
              "text-[7px] absolute -bottom-1 -right-1",
              pinType === "section" ? "text-zinc-900" : "text-gray-500"
            )}
          >
            3
          </span>
        </div>
        <div className="w-[1px] bg-zinc-400 h-[20px]" />

        <ZoomIn
          className={cn("hover:text-zinc-900", iconClass)}
          onClick={() => zoomHandler(0.1)}
        />
        <div className="w-[1px] bg-zinc-200 h-[20px]" />

        <ZoomOut
          className={cn("hover:text-zinc-900", iconClass)}
          onClick={() => zoomHandler(-0.1)}
        />
        <div className="w-[1px] bg-zinc-200 h-[20px]" />

        {dragging ? (
          <Grab
            className={cn(
              iconClass,
              dragging ? "text-zinc-900" : "text-gray-500"
            )}
            onClick={() => setDragging(false)}
          />
        ) : (
          <Hand
            className={cn(
              iconClass,
              dragging ? "text-zinc-900" : "text-gray-500"
            )}
            onClick={() => setDragging(true)}
          />
        )}
        <div className="w-[1px] bg-zinc-200 h-[20px]" />

        {fullScreen ? (
          <Shrink
            className={cn(
              iconClass,
              fullScreen ? "text-zinc-900" : "text-gray-500"
            )}
            onClick={() => setFullScreen(false)}
          />
        ) : (
          <Fullscreen
            className={cn(
              iconClass,
              !fullScreen ? "text-zinc-900" : "text-gray-500"
            )}
            onClick={() => setFullScreen(true)}
          />
        )}

        <div className="w-[1px] bg-zinc-200 h-[20px]" />

        {lockView ? (
          <Unlock
            className={cn(
              iconClass,
              !lockView ? "text-zinc-900" : "text-gray-500"
            )}
            onClick={() => setLockView(false)}
          />
        ) : (
          <Lock
            className={cn(
              iconClass,
              lockView ? "text-zinc-900" : "text-gray-500"
            )}
            onClick={() => setLockView(true)}
          />
        )}
      </div>
    </div>
  );
}

export default ControlSelect;
