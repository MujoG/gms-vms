import React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { Button } from "../ui/button";
import { BadgeInfo, Disc, Info, MessageCircleQuestion } from "lucide-react";
import { Badge } from "../ui/badge";
import { trpc } from "@/trpc/client";

type Props = {
  handlePinClick: any;
  pin: any;
  showIcon?: boolean;
  label?: string;
  handleRefatch?: any;
  zoom: any;
};

function DetailBox({
  handlePinClick,
  pin,
  showIcon,
  label,
  handleRefatch,
  zoom,
}: Props) {
  const { mutate: deleteDetailMutation, isLoading } =
    trpc.deleteDetail.useMutation({
      onSuccess: () => {
        console.log("uspjesnooo");
        handleRefatch();
      },
      onError: () => {
        console.log("error");
      },
    });

  const handleDeleteClick = async () => {
    try {
      // Assuming 'pin' contains the ID of the detail to be deleted
      await deleteDetailMutation({ Id: pin.id }); // Trigger the mutation with the pin ID
    } catch (error) {
      console.error("Error deleting detail:", error);
    }
  };

  const baseContainerSize = 300;
  const baseFontSize = 24;

  const scaledContainerSize = baseContainerSize / zoom;

  const cappedContainerSize = Math.min(Math.max(scaledContainerSize, 170), 255);

  const fontScaledSize = Math.min(Math.max(baseFontSize / zoom, 7), 9);

  return (
    <>
      {" "}
      <HoverCard>
        <HoverCardTrigger>
          <div className="w-[40px] h-[40px]  cursor-pointer z-0">
            {showIcon ? (
              <div className="">
                {pin.TaskType === "info" ? (
                  <Info className="cursor-pointer text-green-700" />
                ) : (
                  <MessageCircleQuestion className="cursor-pointer text-red-700 -z-10" />
                )}
              </div>
            ) : (
              " "
            )}
            {label ? (
              <div className=" w-fit font-semibold text-xs">
                <Badge variant="destructive" className="uppercase">
                  {" "}
                  <span
                    style={{
                      fontSize: fontScaledSize,
                    }}
                  >
                    {label}
                  </span>
                </Badge>
              </div>
            ) : null}
          </div>
        </HoverCardTrigger>
        <HoverCardContent
          className="bg-zinc-600  aspect-square flex flex-col rounded-lg text-white z-50"
          style={{
            width: `${cappedContainerSize}px`,
            height: `${cappedContainerSize}px`,
          }}
        >
          <div className="h-full text-xs">
            <div className="flex flex-col justify-between h-full  p-2">
              <div>{cappedContainerSize}</div>
              <div>{pin.X}</div>
              <div>{pin.Y}</div>
              <div>{pin.X2}</div>
              <div>{pin.Y2}</div>

              <div>Person who added detail</div>
              <div>detail version:{pin.detailType}</div>

              {pin.detailType === "section" ? (
                <Button onClick={() => handlePinClick(pin.id)}>
                  Change Orientation
                </Button>
              ) : null}
              <Button onClick={handleDeleteClick}>Delete Detail</Button>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </>
  );
}

export default DetailBox;
