"use client";
import { Button } from "@/components/ui/button";
import { Undo2 } from "lucide-react";
import React from "react";
import Image from "next/image";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";
import DialogWrapper from "@/components/allaround/DialogWrapper";

type Props = {};

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

function Page({}: Props) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-col mt-10 mx-2  relative px-2">
      {/* <DialogWrapper open={open} onOpenChange={setOpen} /> */}
      <div className="text-2xl font-semibold">GOLF 8</div>
      <div>
        <div className="flex w-full justify-between items-center">
          <div className="border rounded bg-white font-bold w-fit px-4 text-sm flex items-center h-fit py-2 mt-2">
            {item.registrationPlate}
          </div>
        </div>

        <div className="flex flex-col md:flex-row">
          <div className=" md:w-1/2 p-4 w-full">
            <div className="text-sm uppercase opacity-80">Actuale Data:</div>
            <ul className="flex flex-col">
              <li className="flex justify-between border-b border-zinc-300 pb-1">
                <span>Mileage</span>
                <span>{item.mileage} Km</span>
              </li>
              <li className="flex justify-between border-b border-zinc-300 pb-1">
                <span>Fuel Type</span>
                <span>{item.fuelType} </span>
              </li>
              <li className="flex justify-between border-b border-zinc-300 pb-1">
                <span>Rides</span>
                <span>{item.vehicleData.ridesMonth} </span>
              </li>

              <li className="flex justify-between border-b border-zinc-300 pb-1">
                <span>Currently In Ride?</span>
                <span>{item.vehicleData.inRide ? "YES" : "NO"} </span>
              </li>
            </ul>
            <div className="text-sm uppercase opacity-80 mt-4">
              Data for last 30 days:
            </div>
            <ul className="flex flex-col">
              <li className="flex justify-between border-b border-zinc-300 pb-1">
                <span>Mileage</span>
                <span>{item.vehicleData.mileageMonth} Km</span>
              </li>
              <li className="flex justify-between border-b border-zinc-300 pb-1">
                <span>Diesel</span>
                <span>{item.vehicleData.gasMonth} E</span>
              </li>
              <li className="flex justify-between border-b border-zinc-300 pb-1">
                <span>Rides</span>
                <span>{item.vehicleData.ridesMonth} </span>
              </li>
              <li className="flex justify-between border-b border-zinc-300 pb-1">
                <span>Cost/Km</span>
                <span>{item.vehicleData.costKm} </span>
              </li>
              <li className="flex justify-between border-b border-zinc-300 pb-1">
                <span>Currently In Ride?</span>
                <span>{item.vehicleData.inRide ? "YES" : "NO"} </span>
              </li>
            </ul>
          </div>

          <div className="md:w-1/2 w-full  p-4">
            <Image
              src={item.vehicleData.image}
              alt={item.vehicleData.image}
              width={200}
              height={200}
              className="w-full"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <div className=" flex">
            <div className="flex items-center uppercase opacity-70 font-semibold text-xl">
              {" "}
              Services:
            </div>
            <div className="w-full  justify-end flex">
              <Button variant="outline">Add new Service</Button>
            </div>
          </div>
          <div>
            <Table>
              <TableCaption>A list of Services for Golf 8.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Date</TableHead>
                  <TableHead className="w-[200px]">
                    Responsibile Person
                  </TableHead>
                  <TableHead className="w-[200px]">
                    Last Service Mileage (Km)
                  </TableHead>
                  <TableHead className="w-[200px]">Short Description</TableHead>
                  <TableHead className="text-right">Cost</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow
                  onClick={() => setOpen(!open)}
                  className="cursor-pointer"
                >
                  <TableCell className="font-medium">10/10/2023</TableCell>
                  <TableCell>Name Lastname</TableCell>
                  <TableCell>125412</TableCell>
                  <TableCell className="text-left">
                    Engine Oil change, brakes, and add winter wheels
                  </TableCell>
                  <TableCell className="text-right">250.00 E</TableCell>
                </TableRow>
                <TableRow
                  onClick={() => setOpen(!open)}
                  className="cursor-pointer"
                >
                  <TableCell className="font-medium">10/10/2023</TableCell>
                  <TableCell>Name Lastname</TableCell>
                  <TableCell>125412</TableCell>
                  <TableCell className="text-left">
                    Engine Oil change, brakes, and add winter wheels
                  </TableCell>
                  <TableCell className="text-right">250.00 E</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
