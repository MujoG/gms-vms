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

const iconClass = "cursor-pointer w-[20px]";

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
        <ArrowRightFromLine
          className={cn(
            iconClass,
            pinType === "section" ? "text-zinc-900" : "text-gray-500"
          )}
          onClick={() => setPinType("section")}
        />
        <div className="w-[1px] bg-zinc-200 h-[20px]" />

        <RectangleHorizontal
          className={cn(
            iconClass,
            pinType === "rectangle" ? "text-zinc-900" : "text-gray-500"
          )}
          onClick={() => setPinType("rectangle")}
        />
        <div className="w-[1px] bg-zinc-200 h-[20px]" />
        <Info
          className={cn(
            iconClass,
            pinType === "detail" ? "text-zinc-900" : "text-gray-500"
          )}
          onClick={() => setPinType("detail")}
        />
        <div className="w-[1px] bg-zinc-200 h-[20px]" />

        <ZoomIn
          className={cn("", iconClass)}
          onClick={() => zoomHandler(0.1)}
        />
        <div className="w-[1px] bg-zinc-200 h-[20px]" />

        <ZoomOut
          className={cn("", iconClass)}
          onClick={() => zoomHandler(-0.1)}
        />
        <div className="w-[1px] bg-zinc-200 h-[20px]" />

        {dragging ? (
          <Grab
            className={cn("", iconClass)}
            onClick={() => setDragging(false)}
          />
        ) : (
          <Hand
            className={cn("", iconClass)}
            onClick={() => setDragging(true)}
          />
        )}
        <div className="w-[1px] bg-zinc-200 h-[20px]" />

        {fullScreen ? (
          <Shrink
            className={cn("", iconClass)}
            onClick={() => setFullScreen(false)}
          />
        ) : (
          <Fullscreen
            className={cn("", iconClass)}
            onClick={() => setFullScreen(true)}
          />
        )}

        <div className="w-[1px] bg-zinc-200 h-[20px]" />

        {lockView ? (
          <Unlock
            className={cn("", iconClass)}
            onClick={() => setLockView(false)}
          />
        ) : (
          <Lock
            className={cn("", iconClass)}
            onClick={() => setLockView(true)}
          />
        )}
      </div>
    </div>
  );
}

export default ControlSelect;
