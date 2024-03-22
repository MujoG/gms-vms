import { Disc, Info, MessageCircleQuestion } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { trpc } from "@/trpc/client";
import { Badge } from "../ui/badge";

type Props = {
  pinType: "rectangle" | "task" | "section";
  pinData: any;
  handleRefatch: any;
};

function RightClickDetail({ pinType, pinData, handleRefatch }: Props) {
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
      await deleteDetailMutation({ Id: pinData.id });
    } catch (error) {
      console.error("Error deleting detail:", error);
    }
  };

  return (
    <>
      <>
        <ContextMenu>
          <ContextMenuTrigger className="">
            {pinType === "task" ? (
              <>
                {pinData.TaskType === "task" ? (
                  <>
                    <MessageCircleQuestion className="cursor-pointer text-red-700" />
                  </>
                ) : (
                  <>
                    <Info className="text-green-600 cursor-pointer" />
                  </>
                )}
              </>
            ) : pinType === "rectangle" ? (
              <>
                <Badge className="cursor-pointer uppercase bg-zinc-500 ml-2">
                  {pinData.DetailLabel}
                </Badge>
              </>
            ) : pinType === "section" ? (
              <>
                <div className="w-10 h-10  rounded-full cursor-pointer"></div>
              </>
            ) : null}
          </ContextMenuTrigger>
          <ContextMenuContent className="w-64">
            <div
              className="bg-zinc-100 
              m-1 border rounded-sm
              "
            >
              <div className="p-2 text-s">
                <div className="underline uppercase font-semibold">
                  {pinData.DetailLabel}
                </div>
                <div className="flex flex-col gap-1 my-2">
                  <div className="flex flex-col">
                    <div className="uppercase text-xs">INFORMATIONS:</div>
                    <div>{pinData.DetailContent}</div>
                  </div>
                  <div className="flex justify-between text-s border-t">
                    <div>Created On:</div>
                    <div>
                      {new Date(pinData.date_created).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <ContextMenuItem
                inset
                onClick={() => console.log("pinData", pinData)}
              >
                Console Log Data
              </ContextMenuItem> */}
            <ContextMenuItem inset onClick={handleDeleteClick}>
              Remove
            </ContextMenuItem>
            {/* <ContextMenuSub>
                <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
                <ContextMenuSubContent className="w-48">
                  <ContextMenuItem>
                    Save Page As...
                    <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
                  </ContextMenuItem>
                  <ContextMenuItem>Create Shortcut...</ContextMenuItem>
                  <ContextMenuItem>Name Window...</ContextMenuItem>
                  <ContextMenuSeparator />
                  <ContextMenuItem>Developer Tools</ContextMenuItem>
                </ContextMenuSubContent>
              </ContextMenuSub> */}
            <ContextMenuSeparator />
            {/* <ContextMenuCheckboxItem checked>
                Show Bookmarks Bar
                <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
              </ContextMenuCheckboxItem> */}
            <ContextMenuItem inset>More Informations</ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuRadioGroup value="Name">
              <ContextMenuLabel inset>Assigned Person</ContextMenuLabel>
              <ContextMenuSeparator />
              <ContextMenuRadioItem value="Name">
                Name UserName
              </ContextMenuRadioItem>
            </ContextMenuRadioGroup>
          </ContextMenuContent>
        </ContextMenu>
      </>
    </>
  );
}

export default RightClickDetail;
