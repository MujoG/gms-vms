import React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { Button } from "../ui/button";
import { Disc } from "lucide-react";
import { Badge } from "../ui/badge";

type Props = {
  handlePinClick: any;
  pin: any;
  showIcon?: boolean;
  label?: string;
};

function DetailBox({ handlePinClick, pin, showIcon, label }: Props) {
  return (
    <>
      {" "}
      <HoverCard>
        <HoverCardTrigger>
          <div className="w-[40px] h-[40px]  cursor-pointer">
            {showIcon ? <Disc className="cursor-pointer" /> : " "}
            {label ? (
              <div className=" w-fit font-semibold text-xs">
                <Badge variant="destructive" className="uppercase">
                  {" "}
                  {label}
                </Badge>
              </div>
            ) : null}
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="bg-zinc-600 w-[250px] aspect-square flex flex-col rounded-lg text-white">
          <div className="h-full ">
            <div className="flex flex-col justify-between h-full  p-2">
              <div>{pin.X}</div>
              <div>{pin.Y}</div>
              <div>{pin.X2}</div>
              <div>{pin.Y2}</div>
              <div>Person who added detail</div>
              <div>detail version:{pin.detailType}</div>
              <div>PIN COORDINATES</div>

              {pin.detailType === "section" ? (
                <Button onClick={() => handlePinClick(pin.id)}>
                  Change Orientation
                </Button>
              ) : null}
              <Button onClick={() => handlePinClick(pin.id)}>
                Delete Detail
              </Button>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </>
  );
}

export default DetailBox;
