import React from "react";
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";

type Props = {
  open: any;
  onOpenChange: any;
  children: any;
};

function DialogWrapper({ open, onOpenChange, children }: Props) {
  return (
    <div>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <span className="text-xl">Add New Detail</span>
            </DialogTitle>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default DialogWrapper;
