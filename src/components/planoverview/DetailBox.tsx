import React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { Button } from "../ui/button";
import { Disc } from "lucide-react";
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
                <div className="bg-blue-500 p-2 rounded-lg">Jessin</div>
              </div>
            ) : null}
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="bg-zinc-600 w-[350px] aspect-square flex flex-col rounded-lg text-white">
          <div className="h-full ">
            <div className="flex flex-col justify-between h-full  p-2">
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
