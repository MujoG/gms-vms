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
} from "lucide-react";
import React from "react";

type Props = {
  zoomHandler: any;
  fullScreen: any;
  setFullScreen: any;
  lockView: any;
  setLockView: any;
  setDragging: any;
  dragging: any;
};

const iconsClass =
  "w-[22px] h-[22px] hover:bg-zinc-100 hover:scale-125 cursor-pointer rounded";

function ControlSelect({
  zoomHandler,
  setFullScreen,
  fullScreen,
  setLockView,
  lockView,
  setDragging,
  dragging,
}: Props) {
  return (
    <div className="absolute right-5 bottom-12 bg-zinc-200 z-50 ">
      <div className="flex flex-col p-2 border border-zinc-400 rounded gap-2">
        <ZoomIn
          className={cn("", iconsClass)}
          onClick={() => zoomHandler(0.1)}
        />
        <div className="border-y py-2">
          <ZoomOut
            className={cn("", iconsClass)}
            onClick={() => zoomHandler(-0.1)}
          />
        </div>
        <div className="border-b pb-2">
          {dragging ? (
            <Grab
              className={cn("", iconsClass)}
              onClick={() => setDragging(false)}
            />
          ) : (
            <Hand
              className={cn("", iconsClass)}
              onClick={() => setDragging(true)}
            />
          )}
        </div>
        <div className="border-b py-2">
          {fullScreen ? (
            <Shrink
              className={cn("", iconsClass)}
              onClick={() => setFullScreen(false)}
            />
          ) : (
            <Fullscreen
              className={cn("", iconsClass)}
              onClick={() => setFullScreen(true)}
            />
          )}
        </div>

        {lockView ? (
          <Unlock
            className={cn("", iconsClass)}
            onClick={() => setLockView(false)}
          />
        ) : (
          <Lock
            className={cn("", iconsClass)}
            onClick={() => setLockView(true)}
          />
        )}
      </div>
    </div>
  );
}

export default ControlSelect;
