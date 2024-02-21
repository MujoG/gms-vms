import React from "react";
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Button } from "../ui/button";

type Props = {
  open: any;
  onOpenChange: any;
};

const item = {
  id: 1,
  vehicle: "Golf 7",
  vehicleYear: "2015",
  fuelType: "Diesel",
  registrationPlate: "F-AG 1243",
  mileage: 1234,
  inRide: false,
  vehicleData: {
    mileageMonth: 1250,
    gasMonth: "250e",
    ridesMonth: "5",
    costKm: "1.4E",
    inRide: false,
    image: "/golf.jpg",
  },
};

function DialogWrapper({ open, onOpenChange }: Props) {
  return (
    <div>
      <Dialog open={open} onOpenChange={onOpenChange}>
        {/* <DialogTrigger className="bg-black text-white px-5 py-2 flex items-center justify-center rounded">
          Check More
        </DialogTrigger> */}

        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <span className="text-xl">
                Service of Golf 8 (add registrationPlate) on date 10/10/2023
              </span>
            </DialogTitle>
          </DialogHeader>
          Service Details and more data
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default DialogWrapper;
